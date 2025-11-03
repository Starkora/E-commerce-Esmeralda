import React, { ReactNode } from 'react';
import { FaMapMarkerAlt, FaClock, FaPhone, FaDirections } from 'react-icons/fa';

interface StoreCardProps {
  name: string;
  address: string;
  city: string;
  phone: string;
  hours: {
    weekday: string;
    weekend: string;
  };
  mapUrl?: string;
  imageUrl?: string;
  featured?: boolean;
  className?: string;
}

const StoreCard: React.FC<StoreCardProps> = ({
  name,
  address,
  city,
  phone,
  hours,
  mapUrl,
  imageUrl,
  featured = false,
  className = '',
}) => {
  return (
    <div
      className={`
        bg-white rounded-2xl shadow-lg overflow-hidden
        hover:shadow-xl transition-all duration-300 hover:-translate-y-1
        ${featured ? 'ring-2 ring-emerald-500' : ''}
        ${className}
      `}
    >
      {/* Image or Map Preview */}
      {imageUrl && (
        <div className="relative h-48 overflow-hidden">
          <img
            src={imageUrl}
            alt={name}
            className="w-full h-full object-cover"
          />
          {featured && (
            <div className="absolute top-4 right-4 bg-emerald-500 text-white px-3 py-1 rounded-full text-xs font-bold">
              Tienda Principal
            </div>
          )}
        </div>
      )}

      <div className="p-6">
        {/* Store Name */}
        <h3 className="text-xl font-bold text-gray-900 mb-4">{name}</h3>

        {/* Address */}
        <div className="space-y-3 mb-4">
          <div className="flex items-start gap-3">
            <FaMapMarkerAlt className="text-emerald-600 text-lg mt-1 flex-shrink-0" />
            <div>
              <p className="text-gray-700 font-medium">{address}</p>
              <p className="text-gray-600 text-sm">{city}</p>
            </div>
          </div>

          {/* Phone */}
          <div className="flex items-center gap-3">
            <FaPhone className="text-blue-600 text-lg flex-shrink-0" />
            <a
              href={`tel:${phone}`}
              className="text-gray-700 hover:text-blue-600 transition-colors"
            >
              {phone}
            </a>
          </div>

          {/* Hours */}
          <div className="flex items-start gap-3">
            <FaClock className="text-purple-600 text-lg mt-1 flex-shrink-0" />
            <div className="text-sm">
              <p className="text-gray-700">
                <span className="font-medium">Lun-Vie:</span> {hours.weekday}
              </p>
              <p className="text-gray-700">
                <span className="font-medium">Sáb-Dom:</span> {hours.weekend}
              </p>
            </div>
          </div>
        </div>

        {/* Action Button */}
        {mapUrl && (
          <a
            href={mapUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full bg-emerald-600 text-white py-2.5 px-4 rounded-lg font-semibold hover:bg-emerald-700 transition-colors inline-flex items-center justify-center gap-2"
          >
            <FaDirections />
            Cómo Llegar
          </a>
        )}
      </div>
    </div>
  );
};

export default StoreCard;
