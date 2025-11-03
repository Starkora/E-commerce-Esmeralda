import React, { ReactNode } from 'react';

interface HeroSectionProps {
  badge?: string;
  title: string | ReactNode;
  subtitle?: string;
  description?: string;
  primaryButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  secondaryButton?: {
    label: string;
    href: string;
    onClick?: () => void;
  };
  image?: string;
  imageAlt?: string;
  variant?: 'default' | 'centered' | 'split';
  gradient?: boolean;
  className?: string;
}

const HeroSection: React.FC<HeroSectionProps> = ({
  badge,
  title,
  subtitle,
  description,
  primaryButton,
  secondaryButton,
  image,
  imageAlt = 'Hero image',
  variant = 'default',
  gradient = true,
  className = '',
}) => {
  const renderButtons = () => {
    if (!primaryButton && !secondaryButton) return null;

    return (
      <div className="flex flex-wrap gap-4 pt-4">
        {primaryButton && (
          <a
            href={primaryButton.href}
            onClick={primaryButton.onClick}
            className="px-8 py-3 bg-emerald-600 text-white font-bold rounded-lg hover:bg-emerald-700 transition-colors shadow-lg hover:shadow-xl inline-block"
          >
            {primaryButton.label}
          </a>
        )}
        {secondaryButton && (
          <a
            href={secondaryButton.href}
            onClick={secondaryButton.onClick}
            className="px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-gray-50 transition-colors border-2 border-emerald-600 inline-block"
          >
            {secondaryButton.label}
          </a>
        )}
      </div>
    );
  };

  if (variant === 'centered') {
    return (
      <section
        className={`
          relative px-4 py-20 md:py-32 overflow-hidden text-center
          ${className}
        `}
      >
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5" />
        )}
        <div className="max-w-4xl mx-auto relative z-10">
          {badge && (
            <div className="inline-block mb-6">
              <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                {badge}
              </span>
            </div>
          )}
          <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
            {title}
          </h1>
          {subtitle && (
            <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-6">
              {subtitle}
            </p>
          )}
          {description && (
            <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-2xl mx-auto">
              {description}
            </p>
          )}
          {renderButtons()}
          {image && (
            <div className="mt-12">
              <img
                src={image}
                alt={imageAlt}
                className="w-full max-w-3xl mx-auto rounded-2xl shadow-2xl"
              />
            </div>
          )}
        </div>
      </section>
    );
  }

  if (variant === 'split') {
    return (
      <section
        className={`
          relative px-4 py-20 md:py-28 overflow-hidden
          ${className}
        `}
      >
        {gradient && (
          <div className="absolute inset-0 bg-gradient-to-r from-emerald-500/5 to-green-500/5" />
        )}
        <div className="max-w-7xl mx-auto relative z-10">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              {badge && (
                <div className="inline-block">
                  <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
                    {badge}
                  </span>
                </div>
              )}
              <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight">
                {title}
              </h1>
              {subtitle && (
                <p className="text-xl text-emerald-600 font-semibold">
                  {subtitle}
                </p>
              )}
              {description && (
                <p className="text-lg text-gray-700 leading-relaxed">
                  {description}
                </p>
              )}
              {renderButtons()}
            </div>

            {image && (
              <div className="relative">
                <div className="absolute -inset-4 bg-gradient-to-r from-emerald-400 to-green-400 rounded-2xl blur-2xl opacity-20 animate-pulse" />
                <img
                  src={image}
                  alt={imageAlt}
                  className="relative w-full rounded-2xl shadow-2xl transform hover:scale-105 transition duration-500 ease-in-out"
                />
              </div>
            )}
          </div>
        </div>
      </section>
    );
  }

  // Default variant
  return (
    <section
      className={`
        relative px-4 py-20 md:py-28 overflow-hidden
        ${className}
      `}
    >
      {gradient && (
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-50 to-green-50" />
      )}
      <div className="max-w-5xl mx-auto text-center relative z-10">
        {badge && (
          <div className="inline-block mb-6">
            <span className="px-4 py-2 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold">
              {badge}
            </span>
          </div>
        )}
        <h1 className="text-4xl md:text-6xl font-extrabold text-gray-900 leading-tight mb-6">
          {title}
        </h1>
        {subtitle && (
          <p className="text-xl md:text-2xl text-emerald-600 font-semibold mb-6">
            {subtitle}
          </p>
        )}
        {description && (
          <p className="text-lg text-gray-700 leading-relaxed mb-8 max-w-3xl mx-auto">
            {description}
          </p>
        )}
        <div className="flex justify-center">
          {renderButtons()}
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
