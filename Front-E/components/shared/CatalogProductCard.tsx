import React from 'react';
import { FaStar, FaHeart, FaShoppingCart, FaEye } from 'react-icons/fa';

interface CatalogProductCardProps {
  id: string | number;
  name: string;
  price: number;
  oldPrice?: number;
  imageUrl: string;
  rating?: number;
  reviewCount?: number;
  inStock?: boolean;
  badge?: string;
  badgeColor?: 'red' | 'green' | 'blue' | 'orange';
  onAddToCart?: (id: string | number) => void;
  onToggleFavorite?: (id: string | number) => void;
  isFavorite?: boolean;
  className?: string;
}

const CatalogProductCard: React.FC<CatalogProductCardProps> = ({
  id,
  name,
  price,
  oldPrice,
  imageUrl,
  rating = 0,
  reviewCount = 0,
  inStock = true,
  badge,
  badgeColor = 'red',
  onAddToCart,
  onToggleFavorite,
  isFavorite = false,
  className = '',
}) => {
  // Debug: verificar URL de imagen 
  if (process.env.NODE_ENV === 'development') {
    console.log(`Product ${name} imageUrl:`, imageUrl);
  }
  
  const discount = oldPrice ? Math.round(((oldPrice - price) / oldPrice) * 100) : 0;

  const badgeColors = {
    red: 'bg-red-500',
    green: 'bg-green-500',
    blue: 'bg-blue-500',
    orange: 'bg-orange-500',
  };

  return (
    <div
      className={`
        group relative bg-white rounded-2xl shadow-md overflow-hidden
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        ${!inStock ? 'opacity-75' : ''}
        ${className}
      `}
    >
      {/* Image Container */}
      <div className="relative aspect-square overflow-hidden bg-gray-200">
        {imageUrl ? (
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
            style={{ display: 'block', minHeight: '100%', minWidth: '100%' }}
            onLoad={() => console.log(`Image loaded successfully: ${name}`)}
            onError={(e) => {
              console.error(`Error loading image for ${name}:`, imageUrl);
              e.currentTarget.src = 'https://via.placeholder.com/500x500/cccccc/666666?text=Error+Cargando';
            }}
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gray-300">
            <span className="text-gray-600">Sin imagen</span>
          </div>
        )}

        {/* Badge */}
        {badge && (
          <div className={`absolute top-3 left-3 ${badgeColors[badgeColor]} text-white px-3 py-1 rounded-full text-xs font-bold`}>
            {badge}
          </div>
        )}

        {/* Discount Badge */}
        {discount > 0 && (
          <div className="absolute top-3 right-3 bg-red-500 text-white px-2 py-1 rounded-lg text-xs font-bold">
            -{discount}%
          </div>
        )}

        {/* Out of Stock Overlay */}
        {!inStock && (
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <span className="bg-white text-gray-900 px-4 py-2 rounded-lg font-bold">
              Agotado
            </span>
          </div>
        )}

        {/* Hover Actions */}
        <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-20 transition-all duration-300">
          <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            {onToggleFavorite && (
              <button
                onClick={() => onToggleFavorite(id)}
                className={`
                  w-10 h-10 rounded-full flex items-center justify-center
                  transition-colors shadow-lg
                  ${isFavorite ? 'bg-red-500 text-white' : 'bg-white text-gray-600 hover:bg-red-50 hover:text-red-500'}
                `}
                aria-label="Agregar a favoritos"
              >
                <FaHeart />
              </button>
            )}
            <a
              href={`/product/${id}`}
              className="w-10 h-10 bg-white rounded-full flex items-center justify-center text-gray-600 hover:bg-emerald-50 hover:text-emerald-600 transition-colors shadow-lg"
              aria-label="Ver producto"
            >
              <FaEye />
            </a>
          </div>
        </div>
      </div>

      {/* Product Info */}
      <div className="p-4">
        {/* Product Name */}
        <h3 className="text-gray-900 font-semibold mb-2 line-clamp-2 min-h-[3rem]">
          {name}
        </h3>

        {/* Rating */}
        {rating > 0 && (
          <div className="flex items-center gap-2 mb-2">
            <div className="flex items-center gap-1">
              {[...Array(5)].map((_, i) => (
                <FaStar
                  key={i}
                  className={`text-sm ${
                    i < Math.floor(rating) ? 'text-yellow-400' : 'text-gray-300'
                  }`}
                />
              ))}
            </div>
            {reviewCount > 0 && (
              <span className="text-xs text-gray-500">({reviewCount})</span>
            )}
          </div>
        )}

        {/* Price */}
        <div className="flex items-center gap-2 mb-3">
          <span className="text-2xl font-bold text-gray-900">
            S/ {Number(price).toFixed(2)}
          </span>
          {oldPrice && (
            <span className="text-sm text-gray-500 line-through">
              S/ {Number(oldPrice).toFixed(2)}
            </span>
          )}
        </div>

        {/* Add to Cart Button */}
        {onAddToCart && inStock && (
          <button
            onClick={() => onAddToCart(id)}
            className="w-full bg-emerald-600 text-white py-2.5 rounded-lg font-semibold hover:bg-emerald-700 transition-colors flex items-center justify-center gap-2"
          >
            <FaShoppingCart />
            Agregar al Carrito
          </button>
        )}

        {!inStock && (
          <button
            disabled
            className="w-full bg-gray-300 text-gray-500 py-2.5 rounded-lg font-semibold cursor-not-allowed"
          >
            No Disponible
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogProductCard;
