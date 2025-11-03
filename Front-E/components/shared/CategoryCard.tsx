import React from 'react';
import Image from 'next/image';
import Link from 'next/link';

interface CategoryCardProps {
  name: string;
  imageUrl: string;
  href: string;
  className?: string;
}

const CategoryCard: React.FC<CategoryCardProps> = ({
  name,
  imageUrl,
  href,
  className = '',
}) => {
  return (
    <Link href={href} className={`group ${className}`}>
      <div className="flex flex-col items-center justify-center space-y-3">
        <div className="relative w-32 h-32 md:w-40 md:h-40 lg:w-48 lg:h-48">
          <div className="absolute inset-0 rounded-full bg-gradient-to-br from-emerald-400 to-emerald-600 opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          <Image
            src={imageUrl}
            alt={name}
            fill
            sizes="(max-width: 768px) 128px, (max-width: 1024px) 160px, 192px"
            className="rounded-full object-cover border-4 border-transparent group-hover:border-emerald-500 transition-all duration-300 group-hover:shadow-2xl group-hover:scale-105"
          />
        </div>
        <p className="text-center font-bold text-gray-900 group-hover:text-emerald-600 transition-colors text-lg">
          {name}
        </p>
      </div>
    </Link>
  );
};

export default CategoryCard;
