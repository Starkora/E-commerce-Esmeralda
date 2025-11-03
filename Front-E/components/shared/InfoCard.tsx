import React, { ReactNode } from 'react';

interface InfoCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  badge?: string;
  badgeColor?: 'emerald' | 'blue' | 'purple' | 'orange' | 'red';
  features?: string[];
  actionLabel?: string;
  onAction?: () => void;
  highlighted?: boolean;
  className?: string;
}

const InfoCard: React.FC<InfoCardProps> = ({
  icon,
  title,
  description,
  badge,
  badgeColor = 'emerald',
  features,
  actionLabel,
  onAction,
  highlighted = false,
  className = '',
}) => {
  const badgeColors = {
    emerald: 'bg-emerald-100 text-emerald-700',
    blue: 'bg-blue-100 text-blue-700',
    purple: 'bg-purple-100 text-purple-700',
    orange: 'bg-orange-100 text-orange-700',
    red: 'bg-red-100 text-red-700',
  };

  return (
    <div
      className={`
        relative bg-white rounded-xl shadow-lg p-6 
        transition-all duration-300 hover:shadow-xl hover:-translate-y-1
        ${highlighted ? 'border-2 border-emerald-500' : 'border border-gray-200'}
        ${className}
      `}
    >
      {badge && (
        <div className={`absolute -top-3 right-4 px-3 py-1 rounded-full text-xs font-bold ${badgeColors[badgeColor]}`}>
          {badge}
        </div>
      )}
      
      <div className="flex flex-col items-center text-center">
        <div className="mb-4 transform transition-transform hover:scale-110">
          {icon}
        </div>
        
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
        <p className="text-gray-600 text-sm mb-4">{description}</p>
        
        {features && features.length > 0 && (
          <ul className="w-full space-y-2 mb-4 text-left">
            {features.map((feature, idx) => (
              <li key={idx} className="flex items-start gap-2 text-sm text-gray-700">
                <span className="text-emerald-500 mt-0.5">✓</span>
                <span>{feature}</span>
              </li>
            ))}
          </ul>
        )}
        
        {actionLabel && onAction && (
          <button
            onClick={onAction}
            className="mt-4 w-full bg-emerald-500 text-white font-semibold py-2 px-4 rounded-lg hover:bg-emerald-600 transition-colors"
          >
            {actionLabel}
          </button>
        )}
      </div>
    </div>
  );
};

export default InfoCard;
