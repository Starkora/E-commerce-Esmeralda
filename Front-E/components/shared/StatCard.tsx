import React, { ReactNode } from 'react';

interface StatCardProps {
  number: string;
  label: string;
  icon?: ReactNode;
  description?: string;
  variant?: 'default' | 'gradient' | 'minimal';
  color?: 'emerald' | 'blue' | 'purple' | 'orange' | 'white';
  className?: string;
}

const StatCard: React.FC<StatCardProps> = ({
  number,
  label,
  icon,
  description,
  variant = 'default',
  color = 'emerald',
  className = '',
}) => {
  const colorClasses = {
    emerald: {
      bg: 'bg-emerald-50',
      text: 'text-emerald-600',
      border: 'border-emerald-200',
    },
    blue: {
      bg: 'bg-blue-50',
      text: 'text-blue-600',
      border: 'border-blue-200',
    },
    purple: {
      bg: 'bg-purple-50',
      text: 'text-purple-600',
      border: 'border-purple-200',
    },
    orange: {
      bg: 'bg-orange-50',
      text: 'text-orange-600',
      border: 'border-orange-200',
    },
    white: {
      bg: 'bg-white',
      text: 'text-gray-900',
      border: 'border-gray-200',
    },
  };

  const colors = colorClasses[color];

  if (variant === 'gradient') {
    return (
      <div className={`text-center ${className}`}>
        {icon && (
          <div className="text-4xl mb-3 flex justify-center">
            {icon}
          </div>
        )}
        <div className="text-4xl md:text-5xl font-extrabold mb-2">
          {number}
        </div>
        <div className="font-medium opacity-90">
          {label}
        </div>
        {description && (
          <p className="text-sm mt-2 opacity-75">
            {description}
          </p>
        )}
      </div>
    );
  }

  if (variant === 'minimal') {
    return (
      <div className={`text-center ${className}`}>
        <div className={`text-5xl font-bold ${colors.text} mb-2`}>
          {number}
        </div>
        <div className="text-gray-700 font-medium">
          {label}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        ${colors.bg} ${colors.border} border rounded-xl p-6 text-center
        hover:shadow-lg transition-all duration-300 hover:-translate-y-1
        ${className}
      `}
    >
      {icon && (
        <div className={`${colors.text} text-4xl mb-3 flex justify-center`}>
          {icon}
        </div>
      )}
      <div className={`text-4xl font-bold ${colors.text} mb-2`}>
        {number}
      </div>
      <div className="text-gray-700 font-medium mb-1">
        {label}
      </div>
      {description && (
        <p className="text-sm text-gray-600 mt-2">
          {description}
        </p>
      )}
    </div>
  );
};

export default StatCard;
