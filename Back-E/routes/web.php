<?php

use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Schema;
use Illuminate\Support\Facades\DB;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\URL;
use Illuminate\Auth\Events\Verified;
use App\Actions\Fortify\CreateNewUser as CreateNewUserAction;


// Ruta para obtener el usuario logueado (SPA) SOLO si está verificado
Route::middleware('auth:sanctum')->get('/user', function (Request $request) {
    $user = $request->user();
    if (! $user->hasVerifiedEmail()) {
        return response()->json([
            'message' => 'Debes verificar tu correo electrónico antes de acceder.'
        ], 403);
    }
    return $user;
});
// Endpoint SPA para login que exige correo verificado
Route::post('/spa-login', function (Request $request) {
    $input = $request->all();
    $user = \App\Models\User::where('email', $input['email'] ?? '')->first();
    if (! $user || ! \Illuminate\Support\Facades\Hash::check($input['password'] ?? '', $user->password)) {
        return response()->json(['message' => 'Credenciales incorrectas'], 401);
    }
    if (! $user->hasVerifiedEmail()) {
        return response()->json(['message' => 'Tu correo no está verificado'], 403);
    }
    \Illuminate\Support\Facades\Auth::login($user);
    return response()->json(['message' => 'Login exitoso']);
});

// Debug puntual de correo (proteger con DEBUG_KEY). Úsalo solo temporalmente.
Route::get('/debug-mail', function (Request $request) {
    if ($request->query('key') !== env('DEBUG_KEY')) {
        abort(403, 'forbidden');
    }

    $to = $request->query('to', env('MAIL_TEST_TO'));
    try {
        \Illuminate\Support\Facades\Mail::raw('Prueba de correo desde /debug-mail', function ($m) use ($to) {
            $m->to($to)->subject('Prueba Laravel');
        });

        return response()->json([
            'sent' => true,
            'to' => $to,
            'mailer' => config('mail.default'),
            'from' => config('mail.from'),
            'smtp' => [
                'host' => config('mail.mailers.'.config('mail.default').'.host'),
                'port' => config('mail.mailers.'.config('mail.default').'.port'),
                'encryption' => config('mail.mailers.'.config('mail.default').'.encryption'),
                'username' => (bool) config('mail.mailers.'.config('mail.default').'.username'),
            ],
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'sent' => false,
            'error' => $e->getMessage(),
            'mailer' => config('mail.default'),
            'from' => config('mail.from'),
        ], 500);
    }
});

// Endpoint para solicitar recuperación de contraseña (envía email con link personalizado)
Route::post('/spa-forgot-password', function (Request $request) {
    $request->validate(['email' => 'required|email']);
    $user = \App\Models\User::where('email', $request->email)->first();
    if (! $user) {
        return response()->json(['message' => 'No se encontró un usuario con ese correo.'], 404);
    }
    // Genera el token manualmente
    $token = \Illuminate\Support\Facades\Password::createToken($user);
    // Envía la notificación personalizada
    $user->notify(new \App\Notifications\CustomResetPasswordNotification($token, $user->email));
    return response()->json(['message' => 'Se ha enviado el enlace de recuperación a tu correo.']);
});

// Endpoint para cambiar la contraseña usando el token del email
Route::post('/spa-reset-password', function (Request $request) {
    $request->validate([
        'email' => 'required|email',
        'token' => 'required',
        'password' => 'required|string|min:8|confirmed',
    ]);
    $status = \Illuminate\Support\Facades\Password::reset(
        $request->only('email', 'password', 'password_confirmation', 'token'),
        function ($user, $password) {
            $user->password = \Illuminate\Support\Facades\Hash::make($password);
            $user->save();
        }
    );
    if ($status === \Illuminate\Support\Facades\Password::PASSWORD_RESET) {
        return response()->json(['message' => 'La contraseña se ha cambiado correctamente.']);
    } else {
        return response()->json(['message' => 'No se pudo cambiar la contraseña.'], 500);
    }
});

/*
|--------------------------------------------------------------------------
| Web Routes (SPA-friendly)
|--------------------------------------------------------------------------
|
| Routes here are tailored for an SPA using Sanctum. They return JSON where
| appropriate and expose a temporary /debug-csrf endpoint for diagnostics.
|
*/

Route::get('/', function () {
    return view('welcome');
});

Route::middleware([
    'auth:sanctum',
    config('jetstream.auth_session'),
    'verified',
])->group(function () {
    Route::get('/dashboard', function () {
        return view('dashboard');
    })->name('dashboard');
});

// Authenticated resend verification (for logged-in users)
Route::post('/email/verification-notification', function (Request $request) {
    $request->user()->sendEmailVerificationNotification();
    return response()->json(['message' => 'Verification link sent.']);
})->middleware(['auth:sanctum'])
    ->withoutMiddleware([
            \App\Http\Middleware\VerifyCsrfToken::class,
            \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
    ]);

// Public resend (rate-limited)
Route::post('/email/verification-notification-public', function (Request $request) {
    $request->validate([
        'email' => ['required', 'email'],
    ]);

    $email = $request->input('email');
    $user = \App\Models\User::where('email', $email)->first();

    if (! $user) {
        return response()->json(['message' => 'No se encontró un usuario con ese correo.'], 404);
    }

    if ($user->hasVerifiedEmail()) {
        return response()->json(['message' => 'El correo ya está verificado.'], 400);
    }

    $user->sendEmailVerificationNotification();
    return response()->json(['message' => 'Enlace de verificación enviado.']);
})->middleware('throttle:6,1')
  ->withoutMiddleware([
      \App\Http\Middleware\VerifyCsrfToken::class,
      \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
  ]);

// Email verification redirect back to frontend
Route::get('/email/verify/{id}/{hash}', function (Request $request, $id, $hash) {
    $user = \App\Models\User::findOrFail($id);

    if (! hash_equals((string) $hash, sha1($user->getEmailForVerification()))) {
        abort(403);
    }

    if (! $user->hasVerifiedEmail()) {
        $user->markEmailAsVerified();
        event(new Verified($user));
    }

    $frontUrl = rtrim(env('FORTIFY_URL', 'http://localhost:3000'), '/');
    return redirect()->away($frontUrl.'/?verified=1');
})->name('verification.verify');

// SPA-friendly registration endpoint that returns JSON
Route::post('/spa-register', function (Request $request) {
    try {
        $input = $request->all();

        $validator = \Illuminate\Support\Facades\Validator::make($input, [
            'name' => ['required', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        Log::info('spa-register-payload', [
            'name' => $input['name'] ?? null,
            'last_name' => $input['last_name'] ?? null,
            'email' => $input['email'] ?? null,
            'phone' => $input['phone'] ?? null,
        ]);

        // Arma los campos a insertar según existan en la tabla (producción puede no tener
        // last_name/phone aún si no corriste migraciones)
        $data = [
            'name' => $input['name'],
            'email' => $input['email'],
            'password' => $input['password'],
        ];
        if (Schema::hasColumn('users', 'last_name')) {
            $data['last_name'] = $input['last_name'] ?? '';
        }
        if (Schema::hasColumn('users', 'phone')) {
            $data['phone'] = $input['phone'] ?? null;
        }

        // Si el modelo ya usa cast 'password' => 'hashed', no vuelvas a hashear
        try {
            $user = \App\Models\User::create($data);
        } catch (\Illuminate\Database\QueryException $qe) {
            Log::error('spa-register-db-exception', [
                'message' => $qe->getMessage(),
                'sql_state' => $qe->getSql(),
                'bindings' => $qe->getBindings(),
            ]);
            return response()->json([
                'message' => 'Error de base de datos al crear el usuario',
                'type' => 'db',
                'error' => $qe->getMessage(),
            ], 500);
        }

        Auth::login($user);

        try {
            $user->sendEmailVerificationNotification();
        } catch (\Throwable $e) {
            Log::error('verification-send-error', [
                'message' => $e->getMessage(),
                'mail_from_config' => config('mail.from.address'),
                'mail_from_env' => env('MAIL_FROM_ADDRESS'),
                'user_email' => $user->email,
                'exception' => (string) $e,
            ]);
        }

        return response()->json(['message' => 'Usuario creado', 'needsVerification' => true], 201);
    } catch (\Throwable $e) {
        Log::error('spa-register-exception', [
            'message' => $e->getMessage(),
            'trace' => $e->getTraceAsString(),
        ]);
        return response()->json([
            'message' => 'Error interno al registrar',
            'type' => get_class($e),
            'error' => $e->getMessage(),
        ], 500);
    }
})
// Asegura que este endpoint quede temporalmente exento del CSRF middleware,
// incluso si hubiera cache de config/rutas en producción.
->withoutMiddleware([
    \App\Http\Middleware\VerifyCsrfToken::class,
    \Illuminate\Foundation\Http\Middleware\VerifyCsrfToken::class,
]);

// Temporary debug route: inspect CSRF headers/cookies/session
Route::any('/debug-csrf', function (Request $request) {
    $headers = $request->headers->all();
    $cookies = $request->cookies->all();
    $sessionId = session()->getId();
    $sessionDriver = config('session.driver');

    $receivedToken = $request->header('X-XSRF-TOKEN') ?? $request->header('x-xsrf-token') ?? null;
    $cookieToken = $request->cookie('XSRF-TOKEN');
    $sessionToken = session()->get('_token');

    Log::info('debug-csrf', [
        'session_id' => $sessionId,
        'session_driver' => $sessionDriver,
        'cookie_token' => $cookieToken,
        'received_token_header' => $receivedToken,
        'session_token' => $sessionToken,
    ]);

    return response()->json([
        'headers' => $headers,
        'cookies' => $cookies,
        'session_id' => $sessionId,
        'session_driver' => $sessionDriver,
        'cookie_token' => $cookieToken,
        'received_token_header' => $receivedToken,
        'session_token' => $sessionToken,
    ]);
});

// Lightweight endpoint to retrieve the current CSRF token tied to the session cookie
Route::get('/csrf-token', function (Request $request) {
    return response()->json([
        'csrf_token' => csrf_token(),
    ]);
});

// Quick debug route to check whether the current request is authenticated
Route::get('/debug-auth', function (Request $request) {
    return response()->json([
        'authenticated' => Auth::check(),
        'user_id' => Auth::id(),
        'session_id' => session()->getId(),
    ]);
});

// Minimal DB diagnostics to entender el 500 en producción (temporal)
Route::get('/debug-db', function (Request $request) {
    try {
        $email = $request->query('email');
        $canConnect = false;
        try {
            DB::select('select 1');
            $canConnect = true;
        } catch (\Throwable $e) {
            // ignore, we'll return details below
        }

        $hasUsers = Schema::hasTable('users');
        $columns = $hasUsers ? Schema::getColumnListing('users') : [];
        $existsEmail = null;
        if ($hasUsers && $email) {
            $existsEmail = DB::table('users')->where('email', $email)->exists();
        }

        return response()->json([
            'connection' => config('database.default'),
            'can_connect' => $canConnect,
            'has_users_table' => $hasUsers,
            'users_columns' => $columns,
            'email_checked' => $email,
            'email_exists' => $existsEmail,
        ]);
    } catch (\Throwable $e) {
        return response()->json([
            'message' => 'db_debug_error',
            'type' => get_class($e),
            'error' => $e->getMessage(),
        ], 500);
    }
});
