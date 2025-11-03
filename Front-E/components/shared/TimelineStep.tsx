import React, { ReactNode } from 'react';

interface TimelineStepProps {
  number: number;
  title: string;
  description: string;
  icon?: ReactNode;
  isLast?: boolean;
  status?: 'completed' | 'active' | 'pending';
}

const TimelineStep: React.FC<TimelineStepProps> = ({
  number,
  title,
  description,
  icon,
  isLast = false,
  status = 'pending',
}) => {
  const statusColors = {
    completed: 'bg-emerald-500 text-white',
    active: 'bg-blue-500 text-white',
    pending: 'bg-gray-300 text-gray-600',
  };

  const lineColors = {
    completed: 'bg-emerald-500',
    active: 'bg-blue-500',
    pending: 'bg-gray-300',
  };

  return (
    <div className="relative flex gap-4">
      {/* Línea vertical */}
      {!isLast && (
        <div className="absolute left-6 top-14 bottom-0 w-0.5 bg-gray-200">
          <div className={`w-full h-1/2 ${lineColors[status]}`}></div>
        </div>
      )}
      
      {/* Círculo numerado */}
      <div className="flex-shrink-0 z-10">
        <div
          className={`
            w-12 h-12 rounded-full flex items-center justify-center 
            font-bold text-lg shadow-lg transition-all duration-300
            ${statusColors[status]}
          `}
        >
          {icon || number}
        </div>
      </div>
      
      {/* Contenido */}
      <div className="flex-1 pb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-1">{title}</h3>
        <p className="text-gray-600 text-sm">{description}</p>
      </div>
    </div>
  );
};

export default TimelineStep;
