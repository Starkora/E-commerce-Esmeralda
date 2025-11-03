import React from 'react';
import Link from 'next/link';
import Image from 'next/image';

interface MegaMenuItem {
  title: string;
  items: { label: string; href: string }[];
}

interface MegaMenuProps {
  isOpen: boolean;
  title: string;
  columns: MegaMenuItem[];
  featuredImage?: string;
  featuredLink?: string;
  onClose: () => void;
  className?: string;
}

const MegaMenu: React.FC<MegaMenuProps> = ({
  isOpen,
  title,
  columns,
  featuredImage,
  featuredLink,
  onClose,
  className = '',
}) => {
  if (!isOpen) return null;

  return (
    <div
      className={`
        absolute left-0 right-0 top-full mt-0 bg-white shadow-2xl z-50
        border-t-4 border-emerald-500
        ${className}
      `}
      onMouseLeave={onClose}
    >
      <div className="max-w-7xl mx-auto px-6 py-8">
        <div className="grid grid-cols-4 gap-8">
          {/* Columns */}
          {columns.map((column, index) => (
            <div key={index}>
              <h3 className="text-lg font-bold text-gray-900 mb-4 border-b-2 border-emerald-500 pb-2">
                {column.title}
              </h3>
              <ul className="space-y-3">
                {column.items.map((item, itemIndex) => (
                  <li key={itemIndex}>
                    <Link
                      href={item.href}
                      className="text-gray-700 hover:text-emerald-600 transition-colors flex items-center group"
                    >
                      <span className="w-0 group-hover:w-2 h-2 bg-emerald-500 rounded-full transition-all duration-200 mr-0 group-hover:mr-2"></span>
                      {item.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          {/* Featured Image */}
          {featuredImage && featuredLink && (
            <div className="relative rounded-lg overflow-hidden group cursor-pointer">
              <Link href={featuredLink}>
                <div className="relative h-full min-h-[300px]">
                  <Image
                    src={featuredImage}
                    alt={title}
                    fill
                    className="object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent flex items-end p-6">
                    <div>
                      <h4 className="text-white text-2xl font-bold mb-2">
                        Nueva Colección
                      </h4>
                      <p className="text-white/90 mb-3">
                        Descubre las últimas tendencias
                      </p>
                      <span className="bg-white text-emerald-600 px-4 py-2 rounded-lg font-semibold inline-block">
                        Ver más →
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MegaMenu;
