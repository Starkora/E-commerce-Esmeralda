import React from 'react';
import Link from 'next/link';
import { FaShoppingCart } from 'react-icons/fa';

interface CartBadgeProps {
  count: number;
  href?: string;
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  animate?: boolean;
  className?: string;
}

const CartBadge: React.FC<CartBadgeProps> = ({
  count,
  href = '/cart',
  showLabel = false,
  size = 'md',
  animate = true,
  className = '',
}) => {
  const sizeClasses = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
  };

  const badgeSizes = {
    sm: 'w-4 h-4 text-[10px]',
    md: 'w-5 h-5 text-xs',
    lg: 'w-6 h-6 text-sm',
  };

  const content = (
    <div className={`relative inline-flex items-center gap-2 ${className}`}>
      <div className="relative">
        <FaShoppingCart className={`${sizeClasses[size]} transition-transform hover:scale-110`} />
        {count > 0 && (
          <span
            className={`
              absolute -top-2 -right-2 
              ${badgeSizes[size]}
              bg-red-500 text-white
              rounded-full flex items-center justify-center
              font-bold shadow-lg
              ${animate ? 'animate-bounce' : ''}
            `}
          >
            {count > 99 ? '99+' : count}
          </span>
        )}
      </div>
      {showLabel && (
        <span className="hidden sm:inline text-sm font-medium">
          Carrito
          {count > 0 && <span className="ml-1">({count})</span>}
        </span>
      )}
    </div>
  );

  if (href) {
    return (
      <Link
        href={href}
        className="hover:text-emerald-500 transition-colors"
        aria-label={`Carrito de compras (${count} items)`}
      >
        {content}
      </Link>
    );
  }

  return content;
};

export default CartBadge;
