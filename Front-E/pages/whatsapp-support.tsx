
import React from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaWhatsapp } from 'react-icons/fa';

const WhatsappSupportPage: React.FC = () => {
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-200">
        <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-emerald-100">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow">
              <FaWhatsapp className="text-emerald-500 text-5xl" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2 text-emerald-700 tracking-tight">Atención por WhatsApp</h1>
            <p className="text-gray-700 text-lg">¿Tienes dudas sobre tu pedido, envíos, tallas o devoluciones? ¡Estamos para ayudarte!</p>
          </div>
          <a
            href="https://wa.me/521234567890"
            target="_blank"
            rel="noopener"
            className="inline-flex items-center gap-2 bg-emerald-500 text-white px-8 py-3 rounded-full text-lg font-semibold shadow hover:bg-emerald-600 transition duration-200 mb-4"
          >
            <FaWhatsapp className="text-xl" /> Chatear por WhatsApp
          </a>
          <div className="mt-6 text-left">
            <h2 className="text-lg font-bold text-emerald-700 mb-1">¿Por qué contactarnos?</h2>
            <ul className="list-disc pl-6 text-gray-700 mb-4">
              <li>Consultas sobre productos, tallas y disponibilidad</li>
              <li>Seguimiento de pedidos y envíos</li>
              <li>Devoluciones, cambios y garantías</li>
              <li>Promociones y descuentos exclusivos</li>
            </ul>
            <div className="bg-emerald-50 p-4 rounded-lg mb-2">
              <span className="font-semibold text-emerald-700">Horario de atención:</span> Lunes a Sábado, 9:00 a 18:00 hrs.
            </div>
            <div className="text-gray-600 text-sm">
              También puedes escribirnos a <a href="mailto:soporte@estiloesmeralda.com" className="text-emerald-500 underline">soporte@estiloesmeralda.com</a>
            </div>
          </div>
          <img src="/assets/whatsapp-fashion.png" alt="Soporte WhatsApp Estilo Esmeralda" className="w-full max-w-xs mx-auto mt-8 rounded-xl shadow-md" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default WhatsappSupportPage;
