<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Product;
use App\Models\Category;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\DB;

class ProductController extends Controller
{
    /**
     * Display a listing of products with filters.
     */
    public function index(Request $request)
    {
        try {
            $query = Product::with(['category', 'images'])
                ->active();

            // Search filter
            if ($request->has('search') && $request->search) {
                $query->search($request->search);
            }

            // Category filter
            if ($request->has('category_id') && $request->category_id) {
                $query->byCategory($request->category_id);
            }

            // Price range filter
            if ($request->has('min_price') && $request->has('max_price')) {
                $query->priceRange($request->min_price, $request->max_price);
            }

            // Stock filter
            if ($request->has('in_stock') && $request->in_stock == 'true') {
                $query->inStock();
            }

            // Featured filter
            if ($request->has('featured') && $request->featured == 'true') {
                $query->featured();
            }

            // Sorting
            $sortBy = $request->input('sort_by', 'featured');
            switch ($sortBy) {
                case 'price-low':
                    $query->orderBy('price', 'asc');
                    break;
                case 'price-high':
                    $query->orderBy('price', 'desc');
                    break;
                case 'name':
                    $query->orderBy('name', 'asc');
                    break;
                case 'rating':
                    $query->orderBy('rating', 'desc');
                    break;
                case 'newest':
                    $query->orderBy('created_at', 'desc');
                    break;
                default: // featured
                    $query->orderBy('is_featured', 'desc')
                          ->orderBy('created_at', 'desc');
                    break;
            }

            // Pagination
            $perPage = $request->input('per_page', 12);
            $products = $query->paginate($perPage);

            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener productos',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified product.
     */
    public function show($id)
    {
        try {
            $product = Product::with(['category', 'images'])
                ->active()
                ->findOrFail($id);

            return response()->json($product);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Producto no encontrado',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get product statistics.
     */
    public function statistics()
    {
        try {
            $stats = [
                'total_products' => Product::active()->count(),
                'in_stock' => Product::active()->inStock()->count(),
                'featured' => Product::active()->featured()->count(),
                'average_rating' => round(Product::active()->avg('rating'), 1),
                'average_discount' => round(
                    Product::active()
                        ->whereNotNull('old_price')
                        ->selectRaw('AVG((old_price - price) / old_price * 100) as avg_discount')
                        ->value('avg_discount'),
                    0
                ),
            ];

            return response()->json($stats);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener estadísticas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get featured products.
     */
    public function featured(Request $request)
    {
        try {
            $limit = $request->input('limit', 8);
            $products = Product::with(['category', 'images'])
                ->active()
                ->featured()
                ->inStock()
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get();

            return response()->json($products);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener productos destacados',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get related products.
     */
    public function related($id, Request $request)
    {
        try {
            $product = Product::findOrFail($id);
            $limit = $request->input('limit', 4);

            $related = Product::with(['category', 'images'])
                ->active()
                ->inStock()
                ->where('id', '!=', $id)
                ->where('category_id', $product->category_id)
                ->orderBy('is_featured', 'desc')
                ->orderBy('created_at', 'desc')
                ->limit($limit)
                ->get();

            return response()->json($related);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener productos relacionados',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
