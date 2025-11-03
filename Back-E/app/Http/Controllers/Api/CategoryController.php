<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Category;
use Illuminate\Http\Request;

class CategoryController extends Controller
{
    /**
     * Display a listing of categories.
     */
    public function index(Request $request)
    {
        try {
            $query = Category::active()->ordered();

            // Include product count
            if ($request->has('with_count') && $request->with_count == 'true') {
                $query->withCount(['products' => function ($q) {
                    $q->active();
                }]);
            }

            $categories = $query->get();

            return response()->json($categories);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener categorías',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified category.
     */
    public function show($id)
    {
        try {
            $category = Category::active()
                ->withCount(['products' => function ($q) {
                    $q->active();
                }])
                ->findOrFail($id);

            return response()->json($category);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Categoría no encontrada',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get category with products.
     */
    public function products($id, Request $request)
    {
        try {
            $category = Category::active()->findOrFail($id);
            
            $perPage = $request->input('per_page', 12);
            $products = $category->products()
                ->with('images')
                ->active()
                ->paginate($perPage);

            return response()->json([
                'category' => $category,
                'products' => $products
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener productos de la categoría',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
