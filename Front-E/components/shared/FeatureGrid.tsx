import React, { ReactNode } from 'react';

interface Feature {
  icon: ReactNode;
  title: string;
  description: string;
}

interface FeatureGridProps {
  features: Feature[];
  columns?: 2 | 3 | 4;
  variant?: 'default' | 'centered' | 'minimal';
  iconColor?: 'emerald' | 'blue' | 'purple' | 'orange' | 'mixed';
  className?: string;
}

const FeatureGrid: React.FC<FeatureGridProps> = ({
  features,
  columns = 3,
  variant = 'default',
  iconColor = 'emerald',
  className = '',
}) => {
  const columnClasses = {
    2: 'md:grid-cols-2',
    3: 'md:grid-cols-3',
    4: 'md:grid-cols-2 lg:grid-cols-4',
  };

  const colorClasses = {
    emerald: 'text-emerald-600',
    blue: 'text-blue-600',
    purple: 'text-purple-600',
    orange: 'text-orange-600',
    mixed: '', // Se maneja individualmente
  };

  const mixedColors = ['text-emerald-600', 'text-blue-600', 'text-purple-600', 'text-orange-600'];

  const getIconColor = (index: number) => {
    if (iconColor === 'mixed') {
      return mixedColors[index % mixedColors.length];
    }
    return colorClasses[iconColor];
  };

  if (variant === 'minimal') {
    return (
      <div className={`grid gap-8 ${columnClasses[columns]} ${className}`}>
        {features.map((feature, idx) => (
          <div key={idx} className="flex items-start gap-4">
            <div className={`${getIconColor(idx)} text-3xl mt-1 flex-shrink-0`}>
              {feature.icon}
            </div>
            <div>
              <h3 className="font-bold text-gray-900 mb-1">{feature.title}</h3>
              <p className="text-gray-600 text-sm leading-relaxed">
                {feature.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (variant === 'centered') {
    return (
      <div className={`grid gap-8 ${columnClasses[columns]} ${className}`}>
        {features.map((feature, idx) => (
          <div key={idx} className="text-center">
            <div className={`${getIconColor(idx)} text-5xl mb-4 flex justify-center`}>
              {feature.icon}
            </div>
            <h3 className="font-bold text-gray-900 text-lg mb-2">
              {feature.title}
            </h3>
            <p className="text-gray-600 leading-relaxed">
              {feature.description}
            </p>
          </div>
        ))}
      </div>
    );
  }

  // Default variant
  return (
    <div className={`grid gap-6 ${columnClasses[columns]} ${className}`}>
      {features.map((feature, idx) => (
        <div
          key={idx}
          className="bg-white rounded-xl p-6 shadow-md hover:shadow-lg transition-all duration-200 hover:-translate-y-1 border border-gray-100"
        >
          <div className={`${getIconColor(idx)} text-4xl mb-4`}>
            {feature.icon}
          </div>
          <h3 className="font-bold text-gray-900 text-lg mb-2">
            {feature.title}
          </h3>
          <p className="text-gray-600 leading-relaxed">
            {feature.description}
          </p>
        </div>
      ))}
    </div>
  );
};

export default FeatureGrid;
