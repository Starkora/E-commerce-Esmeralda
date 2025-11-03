<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Store;
use Illuminate\Http\Request;

class StoreController extends Controller
{
    /**
     * Display a listing of stores.
     */
    public function index(Request $request)
    {
        try {
            $query = Store::active();

            // Search filter
            if ($request->has('search') && $request->search) {
                $query->search($request->search);
            }

            // City filter
            if ($request->has('city') && $request->city && $request->city !== 'Todas') {
                $query->byCity($request->city);
            }

            // Featured filter
            if ($request->has('featured') && $request->featured == 'true') {
                $query->featured();
            }

            // Order by featured first, then by name
            $query->orderBy('is_featured', 'desc')
                  ->orderBy('name', 'asc');

            $stores = $query->get();

            return response()->json($stores);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener tiendas',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Display the specified store.
     */
    public function show($id)
    {
        try {
            $store = Store::active()->findOrFail($id);
            return response()->json($store);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Tienda no encontrada',
                'error' => $e->getMessage()
            ], 404);
        }
    }

    /**
     * Get list of cities with stores.
     */
    public function cities()
    {
        try {
            $cities = Store::active()
                ->select('city')
                ->distinct()
                ->orderBy('city')
                ->pluck('city');

            return response()->json($cities);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener ciudades',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Get store statistics.
     */
    public function statistics()
    {
        try {
            $stats = [
                'total_stores' => Store::active()->count(),
                'cities_count' => Store::active()->distinct('city')->count('city'),
                'featured_stores' => Store::active()->featured()->count(),
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
     * Find nearest store by coordinates.
     */
    public function nearest(Request $request)
    {
        try {
            $request->validate([
                'latitude' => 'required|numeric',
                'longitude' => 'required|numeric',
            ]);

            $lat = $request->input('latitude');
            $lng = $request->input('longitude');

            // Using Haversine formula to calculate distance
            $stores = Store::active()
                ->whereNotNull('latitude')
                ->whereNotNull('longitude')
                ->selectRaw("
                    *,
                    (6371 * acos(
                        cos(radians(?)) * 
                        cos(radians(latitude)) * 
                        cos(radians(longitude) - radians(?)) + 
                        sin(radians(?)) * 
                        sin(radians(latitude))
                    )) AS distance
                ", [$lat, $lng, $lat])
                ->orderBy('distance')
                ->limit(5)
                ->get();

            return response()->json($stores);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al buscar tiendas cercanas',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
