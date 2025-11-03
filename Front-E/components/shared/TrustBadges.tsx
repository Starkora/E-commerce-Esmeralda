import React from 'react';
import { FaShippingFast, FaUndo, FaLock, FaHeadset, FaCreditCard, FaAward } from 'react-icons/fa';

interface Badge {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}

const TrustBadges: React.FC = () => {
  const badges: Badge[] = [
    {
      icon: <FaShippingFast />,
      title: 'Envío Gratis',
      description: 'En compras mayores a S/199',
      color: 'emerald',
    },
    {
      icon: <FaUndo />,
      title: 'Devolución Gratis',
      description: 'Hasta 30 días después',
      color: 'blue',
    },
    {
      icon: <FaLock />,
      title: 'Pago Seguro',
      description: '100% protegido',
      color: 'purple',
    },
    {
      icon: <FaHeadset />,
      title: 'Soporte 24/7',
      description: 'Siempre disponibles',
      color: 'orange',
    },
    {
      icon: <FaCreditCard />,
      title: 'Múltiples Pagos',
      description: 'Hasta 6 cuotas',
      color: 'pink',
    },
    {
      icon: <FaAward />,
      title: 'Calidad Premium',
      description: 'Productos verificados',
      color: 'yellow',
    },
  ];

  const getColorClasses = (color: string) => {
    const colors: Record<string, { bg: string; text: string; hover: string }> = {
      emerald: { bg: 'bg-emerald-100', text: 'text-emerald-600', hover: 'hover:bg-emerald-200' },
      blue: { bg: 'bg-blue-100', text: 'text-blue-600', hover: 'hover:bg-blue-200' },
      purple: { bg: 'bg-purple-100', text: 'text-purple-600', hover: 'hover:bg-purple-200' },
      orange: { bg: 'bg-orange-100', text: 'text-orange-600', hover: 'hover:bg-orange-200' },
      pink: { bg: 'bg-pink-100', text: 'text-pink-600', hover: 'hover:bg-pink-200' },
      yellow: { bg: 'bg-yellow-100', text: 'text-yellow-600', hover: 'hover:bg-yellow-200' },
    };
    return colors[color] || colors.emerald;
  };

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="max-w-7xl mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            ¿Por Qué Comprar con Nosotros?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Tu satisfacción es nuestra prioridad. Ofrecemos las mejores garantías y servicios.
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
          {badges.map((badge, index) => {
            const colors = getColorClasses(badge.color);
            return (
              <div
                key={index}
                className={`
                  ${colors.bg} ${colors.hover} 
                  rounded-2xl p-6 text-center transition-all duration-300 
                  hover:shadow-lg hover:-translate-y-1 cursor-pointer
                `}
              >
                <div className={`${colors.text} text-4xl mb-3 flex justify-center`}>
                  {badge.icon}
                </div>
                <h3 className="font-bold text-gray-900 mb-1 text-sm">
                  {badge.title}
                </h3>
                <p className="text-xs text-gray-600">
                  {badge.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default TrustBadges;
