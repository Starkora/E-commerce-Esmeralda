import React from 'react';

interface PricingRow {
  label: string;
  price: string;
  delivery: string;
  note?: string;
}

interface PricingTableProps {
  title?: string;
  description?: string;
  headers: string[];
  rows: PricingRow[];
  className?: string;
}

const PricingTable: React.FC<PricingTableProps> = ({
  title,
  description,
  headers,
  rows,
  className = '',
}) => {
  return (
    <div className={`bg-white rounded-xl shadow-lg p-6 ${className}`}>
      {title && (
        <h3 className="text-xl font-bold text-gray-900 mb-2">{title}</h3>
      )}
      {description && (
        <p className="text-gray-600 text-sm mb-4">{description}</p>
      )}
      
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="border-b-2 border-gray-200">
              {headers.map((header, idx) => (
                <th
                  key={idx}
                  className="text-left py-3 px-4 text-sm font-bold text-gray-700 uppercase tracking-wide"
                >
                  {header}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row, idx) => (
              <tr
                key={idx}
                className="border-b border-gray-100 hover:bg-gray-50 transition-colors"
              >
                <td className="py-4 px-4 text-gray-900 font-medium">{row.label}</td>
                <td className="py-4 px-4 text-emerald-600 font-bold">{row.price}</td>
                <td className="py-4 px-4 text-gray-700">{row.delivery}</td>
                {row.note && (
                  <td className="py-4 px-4 text-xs text-gray-500 italic">{row.note}</td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      <div className="mt-4 p-3 bg-blue-50 rounded-lg">
        <p className="text-xs text-blue-700">
          <strong>Nota:</strong> Los precios y tiempos son aproximados y pueden variar según la ubicación exacta y disponibilidad.
        </p>
      </div>
    </div>
  );
};

export default PricingTable;
