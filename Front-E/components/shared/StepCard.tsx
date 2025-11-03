import React, { ReactNode } from 'react';

interface StepCardProps {
  step: number;
  title: string;
  description: string;
  icon?: ReactNode;
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'emerald';
  className?: string;
}

const StepCard: React.FC<StepCardProps> = ({
  step,
  title,
  description,
  icon,
  color = 'emerald',
  className = '',
}) => {
  const colorClasses = {
    purple: 'bg-purple-500',
    blue: 'bg-blue-500',
    green: 'bg-green-500',
    orange: 'bg-orange-500',
    emerald: 'bg-emerald-500',
  };

  return (
    <div
      className={`
        relative bg-white rounded-2xl shadow-lg p-6
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        ${className}
      `}
    >
      <div className="flex items-start gap-4">
        <div className={`flex-shrink-0 w-12 h-12 ${colorClasses[color]} rounded-full flex items-center justify-center text-white font-bold text-xl`}>
          {step}
        </div>
        <div className="flex-1">
          {icon && <div className="mb-2">{icon}</div>}
          <h3 className="text-lg font-bold text-gray-900 mb-2">{title}</h3>
          <p className="text-gray-600 text-sm">{description}</p>
        </div>
      </div>
    </div>
  );
};

export default StepCard;
