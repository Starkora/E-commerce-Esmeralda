import React, { ReactNode } from 'react';
import { FaCheckCircle } from 'react-icons/fa';

interface PaymentMethodCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  features: string[];
  color?: 'purple' | 'blue' | 'green' | 'orange' | 'emerald';
  className?: string;
}

const PaymentMethodCard: React.FC<PaymentMethodCardProps> = ({
  icon,
  title,
  description,
  features,
  color = 'emerald',
  className = '',
}) => {
  const colorClasses = {
    purple: {
      bg: 'bg-purple-500',
      border: 'border-purple-500',
      text: 'text-purple-600',
      bgLight: 'bg-purple-50',
      hover: 'hover:bg-purple-600',
    },
    blue: {
      bg: 'bg-blue-500',
      border: 'border-blue-500',
      text: 'text-blue-600',
      bgLight: 'bg-blue-50',
      hover: 'hover:bg-blue-600',
    },
    green: {
      bg: 'bg-green-500',
      border: 'border-green-500',
      text: 'text-green-600',
      bgLight: 'bg-green-50',
      hover: 'hover:bg-green-600',
    },
    orange: {
      bg: 'bg-orange-500',
      border: 'border-orange-500',
      text: 'text-orange-600',
      bgLight: 'bg-orange-50',
      hover: 'hover:bg-orange-600',
    },
    emerald: {
      bg: 'bg-emerald-500',
      border: 'border-emerald-500',
      text: 'text-emerald-600',
      bgLight: 'bg-emerald-50',
      hover: 'hover:bg-emerald-600',
    },
  };

  const colors = colorClasses[color];

  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg p-6
        hover:shadow-xl transition-all duration-300
        border-2 border-transparent hover:${colors.border}
        ${className}
      `}
    >
      <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full ${colors.bgLight} mb-4`}>
        <div className={colors.text}>{icon}</div>
      </div>
      <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      <p className="text-gray-600 mb-4">{description}</p>
      <ul className="space-y-2">
        {features.map((feature, idx) => (
          <li key={idx} className="flex items-start gap-2">
            <FaCheckCircle className={`${colors.text} mt-0.5 flex-shrink-0`} />
            <span className="text-gray-700 text-sm">{feature}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default PaymentMethodCard;
