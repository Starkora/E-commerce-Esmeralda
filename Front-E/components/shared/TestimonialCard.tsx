import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

interface TestimonialCardProps {
  name: string;
  role?: string;
  avatar?: string;
  rating: number;
  text: string;
  date?: string;
  verified?: boolean;
  className?: string;
}

const TestimonialCard: React.FC<TestimonialCardProps> = ({
  name,
  role,
  avatar,
  rating,
  text,
  date,
  verified = false,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white rounded-xl shadow-lg p-6 
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        border border-gray-100 relative
        ${className}
      `}
    >
      {/* Quote Icon */}
      <div className="absolute top-4 right-4 text-emerald-100">
        <FaQuoteLeft className="text-3xl" />
      </div>

      {/* Rating */}
      <div className="flex items-center gap-1 mb-4">
        {[...Array(5)].map((_, idx) => (
          <FaStar
            key={idx}
            className={`${
              idx < rating ? 'text-yellow-400' : 'text-gray-300'
            } text-lg`}
          />
        ))}
      </div>

      {/* Testimonial Text */}
      <p className="text-gray-700 leading-relaxed mb-6 relative z-10">
        "{text}"
      </p>

      {/* Author Info */}
      <div className="flex items-center gap-3">
        {avatar ? (
          <img
            src={avatar}
            alt={name}
            className="w-12 h-12 rounded-full object-cover border-2 border-emerald-500"
          />
        ) : (
          <div className="w-12 h-12 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600 font-bold text-lg">
            {name.charAt(0).toUpperCase()}
          </div>
        )}
        
        <div className="flex-1">
          <div className="flex items-center gap-2">
            <h4 className="font-bold text-gray-900">{name}</h4>
            {verified && (
              <span className="text-blue-500 text-sm" title="Cliente Verificado">
                ✓
              </span>
            )}
          </div>
          {role && (
            <p className="text-sm text-gray-500">{role}</p>
          )}
          {date && (
            <p className="text-xs text-gray-400 mt-1">{date}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default TestimonialCard;
