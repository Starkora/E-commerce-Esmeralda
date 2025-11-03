import React, { ReactNode } from 'react';
import { FaCopy } from 'react-icons/fa';

interface BankCardProps {
  bankName: string;
  accountNumber: string;
  accountType: string;
  accountHolder: string;
  cci?: string;
  icon?: ReactNode;
  color?: 'blue' | 'red' | 'orange' | 'purple' | 'green';
  className?: string;
}

const BankCard: React.FC<BankCardProps> = ({
  bankName,
  accountNumber,
  accountType,
  accountHolder,
  cci,
  icon,
  color = 'blue',
  className = '',
}) => {
  const colorClasses = {
    blue: 'from-blue-500 to-blue-700',
    red: 'from-red-500 to-red-700',
    orange: 'from-orange-500 to-orange-700',
    purple: 'from-purple-500 to-purple-700',
    green: 'from-green-500 to-green-700',
  };

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    alert('Copiado al portapapeles');
  };

  return (
    <div
      className={`
        relative bg-gradient-to-br ${colorClasses[color]}
        rounded-2xl shadow-xl p-6 text-white
        hover:shadow-2xl transition-all duration-300 hover:scale-105
        ${className}
      `}
    >
      <div className="flex justify-between items-start mb-6">
        <h3 className="text-2xl font-bold">{bankName}</h3>
        {icon && <div className="text-3xl opacity-80">{icon}</div>}
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-sm opacity-80 mb-1">Tipo de Cuenta</p>
          <p className="text-lg font-semibold">{accountType}</p>
        </div>

        <div>
          <p className="text-sm opacity-80 mb-1">Número de Cuenta</p>
          <div className="flex items-center gap-2">
            <p className="text-xl font-bold tracking-wider">{accountNumber}</p>
            <button
              onClick={() => copyToClipboard(accountNumber)}
              className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
              aria-label="Copiar número de cuenta"
            >
              <FaCopy />
            </button>
          </div>
        </div>

        {cci && (
          <div>
            <p className="text-sm opacity-80 mb-1">CCI</p>
            <div className="flex items-center gap-2">
              <p className="text-lg font-mono">{cci}</p>
              <button
                onClick={() => copyToClipboard(cci)}
                className="p-2 bg-white/20 hover:bg-white/30 rounded-lg transition-colors"
                aria-label="Copiar CCI"
              >
                <FaCopy />
              </button>
            </div>
          </div>
        )}

        <div>
          <p className="text-sm opacity-80 mb-1">Titular</p>
          <p className="text-lg font-semibold">{accountHolder}</p>
        </div>
      </div>

      <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -mr-16 -mt-16"></div>
      <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full -ml-12 -mb-12"></div>
    </div>
  );
};

export default BankCard;
