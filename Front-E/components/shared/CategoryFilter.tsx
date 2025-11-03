import React, { ReactNode } from 'react';

interface Category {
  name: string;
  icon?: ReactNode;
  count?: number;
}

interface CategoryFilterProps {
  categories: Category[];
  activeCategory: string;
  onCategoryChange: (category: string) => void;
  variant?: 'pills' | 'tabs' | 'buttons';
  showCount?: boolean;
  className?: string;
}

const CategoryFilter: React.FC<CategoryFilterProps> = ({
  categories,
  activeCategory,
  onCategoryChange,
  variant = 'pills',
  showCount = true,
  className = '',
}) => {
  if (variant === 'tabs') {
    return (
      <div className={`border-b border-gray-200 ${className}`}>
        <div className="flex gap-2 overflow-x-auto">
          {categories.map((cat, idx) => {
            const isActive = activeCategory === cat.name;
            return (
              <button
                key={idx}
                onClick={() => onCategoryChange(cat.name)}
                className={`
                  flex items-center gap-2 px-4 py-3 font-medium whitespace-nowrap
                  transition-all duration-200 border-b-2
                  ${isActive
                    ? 'border-emerald-500 text-emerald-600'
                    : 'border-transparent text-gray-600 hover:text-gray-900 hover:border-gray-300'
                  }
                `}
              >
                {cat.icon && <span className="text-lg">{cat.icon}</span>}
                <span>{cat.name}</span>
                {showCount && cat.count !== undefined && (
                  <span
                    className={`
                      text-xs px-2 py-0.5 rounded-full
                      ${isActive ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'}
                    `}
                  >
                    {cat.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  if (variant === 'buttons') {
    return (
      <div className={`flex flex-wrap gap-3 ${className}`}>
        {categories.map((cat, idx) => {
          const isActive = activeCategory === cat.name;
          return (
            <button
              key={idx}
              onClick={() => onCategoryChange(cat.name)}
              className={`
                flex items-center gap-2 px-5 py-2.5 rounded-lg font-medium
                transition-all duration-200 border-2
                ${isActive
                  ? 'bg-emerald-500 text-white border-emerald-500 shadow-lg scale-105'
                  : 'bg-white text-gray-700 border-gray-200 hover:bg-gray-50 hover:border-gray-300 shadow'
                }
              `}
            >
              {cat.icon && <span className="text-lg">{cat.icon}</span>}
              <span>{cat.name}</span>
              {showCount && cat.count !== undefined && (
                <span
                  className={`
                    text-xs px-2 py-0.5 rounded-full
                    ${isActive ? 'bg-white/20' : 'bg-gray-100'}
                  `}
                >
                  {cat.count}
                </span>
              )}
            </button>
          );
        })}
      </div>
    );
  }

  // Pills variant (default)
  return (
    <div className={`flex flex-wrap gap-2 ${className}`}>
      {categories.map((cat, idx) => {
        const isActive = activeCategory === cat.name;
        return (
          <button
            key={idx}
            onClick={() => onCategoryChange(cat.name)}
            className={`
              flex items-center gap-2 px-4 py-2 rounded-full font-medium text-sm
              transition-all duration-200
              ${isActive
                ? 'bg-emerald-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }
            `}
          >
            {cat.icon && <span>{cat.icon}</span>}
            <span>{cat.name}</span>
            {showCount && cat.count !== undefined && (
              <span
                className={`
                  text-xs px-2 py-0.5 rounded-full
                  ${isActive ? 'bg-white/20' : 'bg-white'}
                `}
              >
                {cat.count}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
};

export default CategoryFilter;
