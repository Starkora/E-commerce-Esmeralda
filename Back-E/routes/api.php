
<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;

Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');
// Exponer la ruta sanctum/csrf-cookie en el grupo api para CORS
use Illuminate\Support\Facades\Cookie;
use Illuminate\Support\Facades\Response;


Route::get('/sanctum/csrf-cookie', function (Request $request) {
    // Laravel ya gestiona el CSRF cookie, solo devolvemos una respuesta vacía
    return response()->json(['csrf' => true]);
});
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;

// SPA-friendly registration endpoint que retorna JSON
Route::post('/spa-register', function (Illuminate\Http\Request $request) {
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

    $user = \App\Models\User::create([
        'name' => $input['name'],
        'last_name' => $input['last_name'] ?? '',
        'email' => $input['email'],
        'phone' => $input['phone'] ?? null,
        'password' => Hash::make($input['password']),
    ]);

    Auth::login($user);

    return response()->json(['message' => 'Registro exitoso, revisa tu correo para verificar tu cuenta.']);
});
