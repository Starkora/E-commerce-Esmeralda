import React from 'react';
import { FaPlus, FaMinus, FaTrash } from 'react-icons/fa';
import { useCart } from '@/context/CartContext';

interface CartItemProps {
  id: number;
  product_id: number;
  quantity: number;
  size?: string;
  color?: string;
  price: number;
  subtotal: number;
  product: {
    id: number;
    name: string;
    primary_image: string;
    price: number;
  };
}

const CartItemComponent: React.FC<CartItemProps> = ({
  id,
  quantity,
  size,
  color,
  price,
  subtotal,
  product,
}) => {
  const { updateQuantity, removeItem } = useCart();

  const handleIncrease = () => {
    updateQuantity(id, quantity + 1);
  };

  const handleDecrease = () => {
    if (quantity > 1) {
      updateQuantity(id, quantity - 1);
    }
  };

  const handleRemove = () => {
    removeItem(id);
  };

  return (
    <div className="flex gap-4 py-4 border-b border-gray-200">
      {/* Product Image */}
      <div className="flex-shrink-0 w-20 h-20 bg-gray-200 rounded-lg overflow-hidden">
        <img
          src={product.primary_image}
          alt={product.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Product Info */}
      <div className="flex-1 min-w-0">
        <h4 className="text-sm font-semibold text-gray-900 line-clamp-2 mb-1">
          {product.name}
        </h4>
        
        {/* Size & Color */}
        {(size || color) && (
          <div className="flex gap-2 text-xs text-gray-600 mb-2">
            {size && <span>Talla: {size}</span>}
            {color && <span>Color: {color}</span>}
          </div>
        )}

        {/* Price */}
        <div className="text-sm font-bold text-emerald-600">
          S/ {Number(price).toFixed(2)}
        </div>

        {/* Quantity Controls */}
        <div className="flex items-center gap-2 mt-2">
          <button
            onClick={handleDecrease}
            className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
            disabled={quantity <= 1}
          >
            <FaMinus className="text-xs" />
          </button>
          <span className="w-8 text-center font-semibold">{quantity}</span>
          <button
            onClick={handleIncrease}
            className="w-7 h-7 flex items-center justify-center bg-gray-100 hover:bg-gray-200 rounded transition-colors"
          >
            <FaPlus className="text-xs" />
          </button>
        </div>
      </div>

      {/* Subtotal & Remove */}
      <div className="flex flex-col items-end justify-between">
        <button
          onClick={handleRemove}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          aria-label="Eliminar producto"
        >
          <FaTrash className="text-sm" />
        </button>
        <div className="text-sm font-bold text-gray-900">
          S/ {Number(subtotal).toFixed(2)}
        </div>
      </div>
    </div>
  );
};

export default CartItemComponent;
