<?php

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\Facades\Log;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;
use App\Support\Recaptcha;
use App\Http\Controllers\Api\ContactController;
use App\Http\Controllers\Api\ProductController;
use App\Http\Controllers\Api\CategoryController;
use App\Http\Controllers\Api\StoreController;
use App\Http\Controllers\Api\CartController;

// ✅ Health check & Database diagnostic endpoint
Route::get('/health', function () {
    try {
        $productCount = \App\Models\Product::count();
        $categoryCount = \App\Models\Category::count();
        $storeCount = \App\Models\Store::count();
        
        return response()->json([
            'status' => 'ok',
            'database' => [
                'connected' => true,
                'products' => $productCount,
                'categories' => $categoryCount,
                'stores' => $storeCount,
            ],
            'message' => $productCount > 0 
                ? 'Database is populated' 
                : 'Database is empty. Run: php artisan db:seed --force'
        ]);
    } catch (\Exception $e) {
        return response()->json([
            'status' => 'error',
            'database' => [
                'connected' => false,
                'error' => $e->getMessage()
            ],
            'message' => 'Database connection failed or tables not created. Run migrations first.'
        ], 500);
    }
});

// ✅ Obtener usuario autenticado (protegido por Sanctum)
Route::get('/user', function (Request $request) {
    return $request->user();
})->middleware('auth:sanctum');

// ✅ Registro SPA-friendly
Route::post('/spa-register', function (Request $request) {
    try {
        // reCAPTCHA v3 (opcional si está configurado)
        $verify = Recaptcha::verify($request->input('recaptchaToken'), $request->ip());
        if (!($verify['success'] ?? true)) {
            return response()->json(['message' => 'Verificación reCAPTCHA fallida'], 429);
        }
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

// ✅ Contact form endpoint (throttled)
Route::post('/contact', [ContactController::class, 'send'])
    ->middleware('throttle:5,1');

// ===== Products & Catalog Routes =====
// Public product routes
Route::prefix('products')->group(function () {
    Route::get('/', [ProductController::class, 'index']); // List all products with filters
    Route::get('/statistics', [ProductController::class, 'statistics']); // Product stats
    Route::get('/featured', [ProductController::class, 'featured']); // Featured products
    Route::get('/{id}', [ProductController::class, 'show']); // Get single product
    Route::get('/{id}/related', [ProductController::class, 'related']); // Related products
});

// Category routes
Route::prefix('categories')->group(function () {
    Route::get('/', [CategoryController::class, 'index']); // List all categories
    Route::get('/{id}', [CategoryController::class, 'show']); // Get single category
    Route::get('/{id}/products', [CategoryController::class, 'products']); // Get category products
});

// ===== Stores Routes =====
Route::prefix('stores')->group(function () {
    Route::get('/', [StoreController::class, 'index']); // List all stores
    Route::get('/cities', [StoreController::class, 'cities']); // Get list of cities
    Route::get('/statistics', [StoreController::class, 'statistics']); // Store stats
    Route::get('/nearest', [StoreController::class, 'nearest']); // Find nearest store
    Route::get('/{id}', [StoreController::class, 'show']); // Get single store
});

// ===== Cart Routes (Requiere autenticación) =====
Route::prefix('cart')->middleware('auth:sanctum')->group(function () {
    Route::get('/', [CartController::class, 'index']); // Get cart
    Route::post('/items', [CartController::class, 'addItem']); // Add item to cart
    Route::put('/items/{id}', [CartController::class, 'updateItem']); // Update item quantity
    Route::delete('/items/{id}', [CartController::class, 'removeItem']); // Remove item
    Route::delete('/clear', [CartController::class, 'clear']); // Clear cart
});
