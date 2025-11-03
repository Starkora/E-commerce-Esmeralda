import React, { useState } from 'react';
import Link from 'next/link';
import { FaTimes, FaChevronDown, FaChevronUp } from 'react-icons/fa';

interface MenuItem {
  label: string;
  href: string;
  submenu?: { label: string; href: string }[];
}

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  menuItems: MenuItem[];
  className?: string;
}

const MobileMenu: React.FC<MobileMenuProps> = ({
  isOpen,
  onClose,
  menuItems,
  className = '',
}) => {
  const [expandedItems, setExpandedItems] = useState<string[]>([]);

  const toggleSubmenu = (label: string) => {
    setExpandedItems((prev) =>
      prev.includes(label)
        ? prev.filter((item) => item !== label)
        : [...prev, label]
    );
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Overlay */}
      <div
        className="fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300"
        onClick={onClose}
      />

      {/* Menu Panel */}
      <div
        className={`
          fixed top-0 left-0 h-full w-80 bg-white z-50
          transform transition-transform duration-300 ease-in-out
          ${isOpen ? 'translate-x-0' : '-translate-x-full'}
          shadow-2xl overflow-y-auto
          ${className}
        `}
      >
        {/* Header */}
        <div className="flex justify-between items-center p-6 border-b border-gray-200 bg-gradient-to-r from-emerald-500 to-green-600">
          <h2 className="text-2xl font-bold text-white">Menú</h2>
          <button
            onClick={onClose}
            className="text-white hover:bg-white/20 p-2 rounded-full transition-colors"
            aria-label="Cerrar menú"
          >
            <FaTimes className="text-2xl" />
          </button>
        </div>

        {/* Menu Items */}
        <nav className="py-4">
          {menuItems.map((item, index) => (
            <div key={index} className="border-b border-gray-100">
              {item.submenu ? (
                <div>
                  <button
                    onClick={() => toggleSubmenu(item.label)}
                    className="w-full flex items-center justify-between px-6 py-4 text-gray-800 hover:bg-emerald-50 transition-colors"
                  >
                    <span className="font-semibold text-lg">{item.label}</span>
                    {expandedItems.includes(item.label) ? (
                      <FaChevronUp className="text-emerald-600" />
                    ) : (
                      <FaChevronDown className="text-gray-400" />
                    )}
                  </button>
                  {expandedItems.includes(item.label) && (
                    <div className="bg-gray-50 py-2">
                      {item.submenu.map((subItem, subIndex) => (
                        <Link
                          key={subIndex}
                          href={subItem.href}
                          onClick={onClose}
                          className="block px-10 py-3 text-gray-700 hover:bg-emerald-100 hover:text-emerald-700 transition-colors"
                        >
                          {subItem.label}
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ) : (
                <Link
                  href={item.href}
                  onClick={onClose}
                  className="block px-6 py-4 text-gray-800 hover:bg-emerald-50 hover:text-emerald-600 transition-colors font-semibold text-lg"
                >
                  {item.label}
                </Link>
              )}
            </div>
          ))}
        </nav>

        {/* Footer CTA */}
        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-r from-emerald-500 to-green-600">
          <Link
            href="/catalog"
            onClick={onClose}
            className="block w-full bg-white text-emerald-600 text-center font-bold py-3 rounded-lg hover:bg-emerald-50 transition-colors shadow-lg"
          >
            Ver Catálogo Completo
          </Link>
        </div>
      </div>
    </>
  );
};

export default MobileMenu;
