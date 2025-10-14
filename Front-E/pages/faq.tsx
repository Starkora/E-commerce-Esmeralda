import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

const faqs = [
  {
    question: '¿Cómo puedo rastrear mi pedido?',
    answer: 'Puedes rastrear tu pedido desde la sección "Mis pedidos" en tu cuenta o consultando el enlace de seguimiento enviado por correo tras la compra.'
  },
  {
    question: '¿Cuáles son los métodos de pago disponibles?',
    answer: 'Aceptamos Yape, Plin, tarjeta de crédito, transferencia bancaria y pago contra entrega en algunas zonas.'
  },
  {
    question: '¿Cómo solicito un cambio o devolución?',
    answer: 'Contáctanos por WhatsApp o correo, indicando tu número de pedido y motivo. Te guiaremos en el proceso de devolución o cambio.'
  },
  {
    question: '¿Qué hago si tengo problemas con mi cuenta?',
    answer: 'Puedes restablecer tu contraseña desde la pantalla de login o escribirnos para asistencia personalizada.'
  },
  {
    question: '¿Cómo saber la talla ideal?',
    answer: 'Consulta nuestra guía de tallas en cada producto o solicita asesoría por WhatsApp para elegir la mejor opción.'
  },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <Header />
      <div className="min-h-screen bg-white flex flex-col items-center py-12 px-4">
        <div className="w-full max-w-2xl mx-auto">
          <div className="flex items-center gap-3 mb-8">
            <FaQuestionCircle className="text-emerald-500 text-4xl" />
            <h1 className="text-3xl font-bold text-gray-800">Preguntas Frecuentes</h1>
          </div>
          <div className="divide-y divide-emerald-100 bg-gray-50 rounded-xl shadow-md">
            {faqs.map((faq, idx) => (
              <div key={idx} className="py-6 px-6 hover:bg-emerald-50 transition">
                <button
                  className="w-full flex items-center justify-between text-lg font-semibold text-emerald-700 focus:outline-none"
                  onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                  aria-expanded={openIndex === idx}
                >
                  <span className="flex items-center gap-2">
                    <span className="bg-emerald-100 text-emerald-700 px-2 py-1 rounded-full text-xs font-bold">{idx + 1}</span>
                    {faq.question}
                  </span>
                  {openIndex === idx ? (
                    <FaChevronUp className="text-emerald-500 transition-transform duration-300 rotate-180" />
                  ) : (
                    <FaChevronDown className="text-emerald-500 transition-transform duration-300" />
                  )}
                </button>
                <div
                  className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'} text-base text-gray-700 pl-6`}
                  style={{ pointerEvents: openIndex === idx ? 'auto' : 'none' }}
                >
                  {faq.answer}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 text-center">
            <span className="text-gray-600">¿No encuentras tu respuesta? <a href="/help-center" className="text-emerald-500 underline">Contáctanos aquí</a></span>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default FaqPage;
