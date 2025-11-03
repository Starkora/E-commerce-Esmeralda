import React, { useState, useEffect } from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

interface SearchBarProps {
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  debounceMs?: number;
  showClearButton?: boolean;
  variant?: 'default' | 'large' | 'minimal';
  className?: string;
}

const SearchBar: React.FC<SearchBarProps> = ({
  value,
  onChange,
  placeholder = 'Buscar...',
  debounceMs = 0,
  showClearButton = true,
  variant = 'default',
  className = '',
}) => {
  const [localValue, setLocalValue] = useState(value);

  useEffect(() => {
    setLocalValue(value);
  }, [value]);

  useEffect(() => {
    if (debounceMs > 0) {
      const timer = setTimeout(() => {
        onChange(localValue);
      }, debounceMs);

      return () => clearTimeout(timer);
    } else {
      onChange(localValue);
    }
  }, [localValue, debounceMs]);

  const handleClear = () => {
    setLocalValue('');
    onChange('');
  };

  const variantClasses = {
    default: {
      container: 'relative',
      input: 'w-full pl-12 pr-12 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent',
      icon: 'absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-400 text-lg',
      clear: 'absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600',
    },
    large: {
      container: 'relative',
      input: 'w-full pl-14 pr-14 py-4 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent text-lg',
      icon: 'absolute left-5 top-1/2 transform -translate-y-1/2 text-gray-400 text-xl',
      clear: 'absolute right-5 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600',
    },
    minimal: {
      container: 'relative',
      input: 'w-full pl-10 pr-10 py-2 border-b-2 border-gray-300 focus:outline-none focus:border-emerald-500 bg-transparent',
      icon: 'absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400',
      clear: 'absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600',
    },
  };

  const classes = variantClasses[variant];

  return (
    <div className={`${classes.container} ${className}`}>
      <FaSearch className={classes.icon} />
      <input
        type="text"
        placeholder={placeholder}
        value={localValue}
        onChange={(e) => setLocalValue(e.target.value)}
        className={classes.input}
      />
      {showClearButton && localValue && (
        <button
          onClick={handleClear}
          className={`${classes.clear} cursor-pointer transition-colors`}
          aria-label="Limpiar búsqueda"
        >
          <FaTimes />
        </button>
      )}
    </div>
  );
};

export default SearchBar;
