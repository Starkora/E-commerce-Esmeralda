import React from 'react';
import { FaTimes, FaShoppingBag, FaTrash } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';
import CartItemComponent from './CartItem';
import Link from 'next/link';

const CartDrawer: React.FC = () => {
  const { cart, isCartOpen, closeCart, clearCart, loading } = useCart();

  if (!isCartOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity"
        onClick={closeCart}
      />

      {/* Drawer */}
      <div className="fixed right-0 top-0 h-full w-full max-w-md bg-white shadow-2xl z-50 flex flex-col animate-slide-in-right">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <div className="flex items-center gap-2">
            <FaShoppingBag className="text-emerald-600 text-xl" />
            <h2 className="text-xl font-bold text-gray-900">
              Mi Carrito
              {cart && cart.total_items > 0 && (
                <span className="ml-2 text-sm text-gray-600">
                  ({cart.total_items} {cart.total_items === 1 ? 'item' : 'items'})
                </span>
              )}
            </h2>
          </div>
          <button
            onClick={closeCart}
            className="text-gray-500 hover:text-gray-700 transition-colors p-2"
            aria-label="Cerrar carrito"
          >
            <FaTimes className="text-xl" />
          </button>
        </div>

        {/* Cart Items */}
        <div className="flex-1 overflow-y-auto p-6">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
            </div>
          ) : cart && cart.items && cart.items.length > 0 ? (
            <div className="space-y-2">
              {cart.items.map((item) => (
                <CartItemComponent key={item.id} {...item} />
              ))}
            </div>
          ) : (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <FaShoppingBag className="text-6xl text-gray-300 mb-4" />
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                Tu carrito está vacío
              </h3>
              <p className="text-gray-600 mb-6">
                Agrega productos para comenzar tu compra
              </p>
              <Link
                href="/catalog"
                onClick={closeCart}
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-6 py-3 rounded-lg font-semibold transition-colors"
              >
                Ir al Catálogo
              </Link>
            </div>
          )}
        </div>

        {/* Footer with totals and checkout */}
        {cart && cart.items && cart.items.length > 0 && (
          <div className="border-t border-gray-200 p-6 space-y-4">
            {/* Clear Cart Button */}
            <button
              onClick={clearCart}
              className="w-full flex items-center justify-center gap-2 text-red-600 hover:text-red-700 py-2 text-sm font-semibold transition-colors"
            >
              <FaTrash />
              Vaciar Carrito
            </button>

            {/* Totals */}
            <div className="space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Subtotal:</span>
                <span className="font-semibold">S/ {Number(cart.subtotal).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">IGV (18%):</span>
                <span className="font-semibold">S/ {Number(cart.tax).toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-lg font-bold border-t pt-2">
                <span>Total:</span>
                <span className="text-emerald-600">S/ {Number(cart.total).toFixed(2)}</span>
              </div>
            </div>

            {/* Checkout Button */}
            <button
              className="w-full bg-emerald-600 hover:bg-emerald-700 text-white py-4 rounded-lg font-bold text-lg transition-colors shadow-lg hover:shadow-xl"
              onClick={() => {
                // TODO: Implement checkout
                alert('Función de checkout en desarrollo');
              }}
            >
              Proceder al Pago
            </button>

            {/* Continue Shopping */}
            <Link
              href="/catalog"
              onClick={closeCart}
              className="block text-center text-emerald-600 hover:text-emerald-700 font-semibold py-2 transition-colors"
            >
              Continuar Comprando
            </Link>
          </div>
        )}
      </div>
    </>
  );
};

export default CartDrawer;
