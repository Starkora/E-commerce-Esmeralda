<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Models\Cart;
use App\Models\CartItem;
use App\Models\Product;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;

class CartController extends Controller
{
    /**
     * Get or create cart for current user/session
     */
    private function getOrCreateCart(Request $request)
    {
        if (Auth::check()) {
            $cart = Cart::firstOrCreate(
                ['user_id' => Auth::id()],
                ['subtotal' => 0, 'tax' => 0, 'total' => 0]
            );
        } else {
            $sessionId = $request->session()->get('cart_session_id');
            
            if (!$sessionId) {
                $sessionId = Str::uuid()->toString();
                $request->session()->put('cart_session_id', $sessionId);
            }
            
            $cart = Cart::firstOrCreate(
                ['session_id' => $sessionId],
                ['subtotal' => 0, 'tax' => 0, 'total' => 0]
            );
        }
        
        return $cart;
    }

    /**
     * Get cart with items
     */
    public function index(Request $request)
    {
        try {
            $cart = $this->getOrCreateCart($request);
            $cart->load('items.product.images');
            
            return response()->json([
                'cart' => $cart,
                'items' => $cart->items,
                'total_items' => $cart->total_items,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al obtener el carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Add item to cart
     */
    public function addItem(Request $request)
    {
        try {
            $validated = $request->validate([
                'product_id' => 'required|exists:products,id',
                'quantity' => 'required|integer|min:1',
                'size' => 'nullable|string',
                'color' => 'nullable|string',
            ]);

            $cart = $this->getOrCreateCart($request);
            $product = Product::findOrFail($validated['product_id']);

            // Check if item already exists
            $existingItem = $cart->items()
                ->where('product_id', $product->id)
                ->where('size', $validated['size'] ?? null)
                ->where('color', $validated['color'] ?? null)
                ->first();

            if ($existingItem) {
                // Update quantity
                $existingItem->quantity += $validated['quantity'];
                $existingItem->subtotal = $existingItem->quantity * $existingItem->price;
                $existingItem->save();
                $item = $existingItem;
            } else {
                // Create new item
                $item = $cart->items()->create([
                    'product_id' => $product->id,
                    'quantity' => $validated['quantity'],
                    'size' => $validated['size'] ?? null,
                    'color' => $validated['color'] ?? null,
                    'price' => $product->price,
                    'subtotal' => $product->price * $validated['quantity'],
                ]);
            }

            $cart->updateTotals();
            $cart->load('items.product.images');

            return response()->json([
                'message' => 'Producto agregado al carrito',
                'cart' => $cart,
                'item' => $item,
            ], 201);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al agregar producto al carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cart item quantity
     */
    public function updateItem(Request $request, $itemId)
    {
        try {
            $validated = $request->validate([
                'quantity' => 'required|integer|min:1',
            ]);

            $cart = $this->getOrCreateCart($request);
            $item = CartItem::where('cart_id', $cart->id)->findOrFail($itemId);

            $item->quantity = $validated['quantity'];
            $item->subtotal = $item->quantity * $item->price;
            $item->save();

            $cart->updateTotals();
            $cart->load('items.product.images');

            return response()->json([
                'message' => 'Cantidad actualizada',
                'cart' => $cart,
                'item' => $item,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al actualizar cantidad',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Remove item from cart
     */
    public function removeItem(Request $request, $itemId)
    {
        try {
            $cart = $this->getOrCreateCart($request);
            $item = CartItem::where('cart_id', $cart->id)->findOrFail($itemId);

            $item->delete();

            $cart->updateTotals();
            $cart->load('items.product.images');

            return response()->json([
                'message' => 'Producto eliminado del carrito',
                'cart' => $cart,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al eliminar producto',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clear all items from cart
     */
    public function clear(Request $request)
    {
        try {
            $cart = $this->getOrCreateCart($request);
            $cart->items()->delete();
            $cart->updateTotals();

            return response()->json([
                'message' => 'Carrito vaciado',
                'cart' => $cart,
            ]);
        } catch (\Exception $e) {
            return response()->json([
                'message' => 'Error al vaciar carrito',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}
