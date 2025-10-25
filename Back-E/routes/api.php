<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

// ✅ Obtener usuario autenticado (protegido por Sanctum)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ✅ Registro SPA-friendly
Route::post('/spa-register', function (Request $request) {
    try {
        $validator = Validator::make($request->all(), [
            'name' => ['required', 'string', 'max:255'],
            'last_name' => ['nullable', 'string', 'max:255'],
            'email' => ['required', 'string', 'email', 'max:255', 'unique:users'],
            'phone' => ['nullable', 'string', 'max:20'],
            'password' => ['required', 'string', 'min:6', 'confirmed'],
        ]);

        if ($validator->fails()) {
            return response()->json(['errors' => $validator->errors()], 422);
        }

        $user = \App\Models\User::create([
            'name' => $request->input('name'),
            'last_name' => $request->input('last_name', ''),
            'email' => $request->input('email'),
            'phone' => $request->input('phone'),
            'password' => $request->input('password'), // 'hashed' cast se encarga del hash
        ]);

        // Inicia sesión automáticamente
        Auth::login($user);

        return response()->json([
            'message' => 'Registro exitoso, revisa tu correo para verificar tu cuenta.',
            'user' => $user
        ]);
    } catch (\Throwable $e) {
        Log::error('SPA Register error', [
            'message' => $e->getMessage(),
            'file' => $e->getFile(),
            'line' => $e->getLine(),
        ]);
        return response()->json([
            'message' => 'Error interno al registrar. Intente nuevamente más tarde.'
        ], 500);
    }
});
