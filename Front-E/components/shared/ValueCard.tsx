import React, { ReactNode } from 'react';

interface ValueCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  color?: 'emerald' | 'blue' | 'purple' | 'orange' | 'pink' | 'indigo';
  variant?: 'default' | 'hover-lift' | 'bordered';
  iconSize?: 'sm' | 'md' | 'lg';
  className?: string;
}

const ValueCard: React.FC<ValueCardProps> = ({
  icon,
  title,
  description,
  color = 'emerald',
  variant = 'hover-lift',
  iconSize = 'md',
  className = '',
}) => {
  const colorClasses = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    pink: 'text-pink-600',
    indigo: 'text-indigo-600',
  };

  const iconSizes = {
    sm: 'text-3xl',
    md: 'text-4xl',
    lg: 'text-5xl',
  };

  const baseClasses = variant === 'bordered'
    ? 'border-2 border-gray-200 hover:border-emerald-500'
    : 'bg-white shadow-md';

  const hoverClasses = variant === 'hover-lift'
    ? 'hover:shadow-xl hover:-translate-y-2'
    : 'hover:shadow-lg';

  return (
    <div
      className={`
        ${baseClasses} rounded-xl p-6 
        transition-all duration-300 ${hoverClasses}
        ${className}
      `}
    >
      <div className="flex flex-col items-center text-center">
        <div
          className={`
            ${colorClasses[color]} ${iconSizes[iconSize]} mb-4
            transition-transform duration-300 hover:scale-110
          `}
        >
          {icon}
        </div>
        <h3 className="text-xl font-bold text-gray-900 mb-2">
          {title}
        </h3>
        <p className="text-gray-600 leading-relaxed">
          {description}
        </p>
      </div>
    </div>
  );
};

export default ValueCard;
