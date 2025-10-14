import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaTruck, FaStore, FaBoxOpen } from 'react-icons/fa';

const deliveryOptions = [
  {
    icon: <FaTruck className="text-emerald-500 text-3xl" />,
    title: 'Envío a domicilio',
    description: 'Recibe tu pedido en la puerta de tu casa en todo el país. Seguimiento online y entrega segura.'
  },
  {
    icon: <FaStore className="text-emerald-500 text-3xl" />,
    title: 'Retiro en tienda',
    description: 'Compra online y recoge tu pedido en cualquiera de nuestras tiendas físicas sin costo adicional.'
  },
  {
    icon: <FaBoxOpen className="text-emerald-500 text-3xl" />,
    title: 'Punto de entrega',
    description: 'Elige un punto de entrega cercano para mayor comodidad y flexibilidad en la recepción.'
  },
];

const DeliveryTypesPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-200">
        <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-emerald-100">
          <h1 className="text-3xl font-extrabold mb-4 text-emerald-700 tracking-tight">Tipos de Entrega</h1>
          <p className="text-gray-700 text-lg mb-6">Elige la opción de entrega que mejor se adapte a tus necesidades. Todas nuestras modalidades son seguras y pensadas para tu comodidad.</p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
            {deliveryOptions.map((opt, idx) => (
              <div key={idx} className="flex flex-col items-center bg-emerald-50 rounded-xl p-6 shadow hover:scale-105 transition-transform duration-200">
                {opt.icon}
                <h2 className="text-lg font-bold text-emerald-700 mt-2 mb-1">{opt.title}</h2>
                <p className="text-gray-600 text-sm">{opt.description}</p>
              </div>
            ))}
          </div>
          <div className="bg-emerald-50 p-4 rounded-lg mt-8 text-left">
            <span className="font-semibold text-emerald-700">¿Dudas sobre tu entrega?</span> Contáctanos por WhatsApp o revisa el Centro de Ayuda para más información.
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default DeliveryTypesPage;
