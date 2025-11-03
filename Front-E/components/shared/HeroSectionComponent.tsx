import React from 'react';
import Link from 'next/link';
import { FaArrowRight, FaShippingFast, FaUndo, FaShieldAlt } from 'react-icons/fa';

const HeroSection: React.FC = () => {
  return (
    <div className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50">
      {/* Hero principal */}
      <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Contenido */}
          <div className="space-y-6 animate-fade-in">
            <div className="inline-block">
              <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                Nueva Temporada 2024
              </span>
            </div>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              Descubre tu
              <span className="text-emerald-600"> Estilo Único</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              Moda femenina de calidad que resalta tu personalidad. 
              Desde lo casual hasta lo elegante, encuentra piezas que te hacen sentir increíble.
            </p>
            <div className="flex flex-wrap gap-4">
              <Link
                href="/catalog"
                className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:scale-105"
              >
                Ver Catálogo
                <FaArrowRight />
              </Link>
              <Link
                href="/stores"
                className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg"
              >
                Nuestras Tiendas
              </Link>
            </div>

            {/* Trust badges */}
            <div className="grid grid-cols-3 gap-4 pt-8 border-t border-gray-200">
              <div className="flex items-center gap-2">
                <FaShippingFast className="text-emerald-600 text-2xl flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Envío Gratis</p>
                  <p className="text-xs text-gray-500">Compras +S/199</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaUndo className="text-emerald-600 text-2xl flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">30 días</p>
                  <p className="text-xs text-gray-500">Devolución</p>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <FaShieldAlt className="text-emerald-600 text-2xl flex-shrink-0" />
                <div>
                  <p className="font-semibold text-sm">Pago Seguro</p>
                  <p className="text-xs text-gray-500">100% Protegido</p>
                </div>
              </div>
            </div>
          </div>

          {/* Imagen Hero */}
          <div className="relative lg:h-[600px] h-[400px] animate-fade-in-right">
            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-3xl" />
            <img
              src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop"
              alt="Moda Estilo Esmeralda"
              className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl"
            />
            
            {/* Badge flotante */}
            <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4">
              <p className="text-3xl font-bold text-emerald-600">-20%</p>
              <p className="text-xs text-gray-600">En todo</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
