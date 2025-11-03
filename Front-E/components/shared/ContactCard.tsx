import React, { ReactNode } from 'react';

interface ContactCardProps {
  icon: ReactNode;
  title: string;
  value: string;
  description?: string;
  href?: string;
  color?: 'emerald' | 'blue' | 'purple' | 'orange';
  variant?: 'default' | 'compact' | 'featured';
  className?: string;
}

const ContactCard: React.FC<ContactCardProps> = ({
  icon,
  title,
  value,
  description,
  href,
  color = 'emerald',
  variant = 'default',
  className = '',
}) => {
  const colorClasses = {
    emerald: {
      icon: 'text-emerald-600',
      bg: 'bg-emerald-100',
      hover: 'hover:bg-emerald-50',
    },
    blue: {
      icon: 'text-blue-600',
      bg: 'bg-blue-100',
      hover: 'hover:bg-blue-50',
    },
    purple: {
      icon: 'text-purple-600',
      bg: 'bg-purple-100',
      hover: 'hover:bg-purple-50',
    },
    orange: {
      icon: 'text-orange-600',
      bg: 'bg-orange-100',
      hover: 'hover:bg-orange-50',
    },
  };

  const colors = colorClasses[color];

  const CardContent = () => (
    <>
      <div className={`w-12 h-12 ${colors.bg} rounded-full flex items-center justify-center flex-shrink-0`}>
        <span className={`${colors.icon} text-xl`}>{icon}</span>
      </div>
      <div className="flex-1">
        <h3 className="font-bold text-gray-900 mb-1">{title}</h3>
        <p className={`${colors.icon} font-medium`}>{value}</p>
        {description && (
          <p className="text-sm text-gray-600 mt-1">{description}</p>
        )}
      </div>
    </>
  );

  if (variant === 'compact') {
    return href ? (
      <a
        href={href}
        target={href.startsWith('http') ? '_blank' : undefined}
        rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
        className={`
          flex items-center gap-3 p-3 rounded-lg transition-colors
          ${colors.hover}
          ${className}
        `}
      >
        <CardContent />
      </a>
    ) : (
      <div className={`flex items-center gap-3 p-3 ${className}`}>
        <CardContent />
      </div>
    );
  }

  if (variant === 'featured') {
    return (
      <div
        className={`
          bg-gradient-to-br from-white to-gray-50 rounded-2xl p-8 shadow-xl
          hover:shadow-2xl transition-all duration-300 hover:-translate-y-1
          border border-gray-100
          ${className}
        `}
      >
        <div className="text-center">
          <div className={`inline-flex items-center justify-center w-16 h-16 ${colors.bg} rounded-full mb-4`}>
            <span className={`${colors.icon} text-3xl`}>{icon}</span>
          </div>
          <h3 className="font-bold text-gray-900 text-xl mb-2">{title}</h3>
          <p className={`${colors.icon} font-bold text-lg mb-2`}>{value}</p>
          {description && (
            <p className="text-sm text-gray-600">{description}</p>
          )}
          {href && (
            <a
              href={href}
              target={href.startsWith('http') ? '_blank' : undefined}
              rel={href.startsWith('http') ? 'noopener noreferrer' : undefined}
              className={`
                inline-block mt-4 px-6 py-2 ${colors.bg} ${colors.icon}
                font-semibold rounded-lg hover:opacity-80 transition-opacity
              `}
            >
              Contactar
            </a>
          )}
        </div>
      </div>
    );
  }

  // Default variant
  const Container = href ? 'a' : 'div';
  const containerProps = href
    ? {
        href,
        target: href.startsWith('http') ? '_blank' : undefined,
        rel: href.startsWith('http') ? 'noopener noreferrer' : undefined,
      }
    : {};

  return (
    <Container
      {...containerProps}
      className={`
        flex items-start gap-4 p-6 bg-white rounded-xl shadow-md
        hover:shadow-lg transition-all duration-200
        ${href ? 'cursor-pointer hover:-translate-y-1' : ''}
        ${className}
      `}
    >
      <CardContent />
    </Container>
  );
};

export default ContactCard;
