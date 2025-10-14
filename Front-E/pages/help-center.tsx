
import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaRegQuestionCircle, FaChevronDown, FaChevronUp } from 'react-icons/fa';

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

const HelpCenterPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  return (
    <>
      <Header />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-emerald-100 via-white to-emerald-200">
        <div className="max-w-xl w-full bg-white p-8 rounded-2xl shadow-lg text-center border border-emerald-100">
          <div className="flex flex-col items-center mb-6">
            <div className="w-24 h-24 rounded-full bg-emerald-100 flex items-center justify-center mb-4 shadow">
              <FaRegQuestionCircle className="text-emerald-500 text-5xl" />
            </div>
            <h1 className="text-3xl font-extrabold mb-2 text-emerald-700 tracking-tight">Centro de Ayuda</h1>
            <p className="text-gray-700 text-lg">¿Tienes dudas sobre tu compra, envíos, tallas o devoluciones? Aquí encontrarás respuestas y formas de contactarnos.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4 text-left">
            <div>
              <h2 className="text-lg font-bold text-emerald-700 mb-1">Preguntas Frecuentes</h2>
              <ul className="list-none pl-0 text-gray-700 mb-4">
                {faqs.map((faq, idx) => (
                  <li key={idx} className="mb-4">
                    <button
                      className="w-full flex items-center justify-between font-semibold text-emerald-700 bg-emerald-50 rounded p-2 hover:bg-emerald-100 transition"
                      onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                      aria-expanded={openIndex === idx}
                    >
                      <span>{faq.question}</span>
                      {openIndex === idx ? (
                        <FaChevronUp className="text-emerald-500" />
                      ) : (
                        <FaChevronDown className="text-emerald-500" />
                      )}
                    </button>
                    <div
                      className={`overflow-hidden transition-all duration-300 ${openIndex === idx ? 'max-h-40 opacity-100 mt-2' : 'max-h-0 opacity-0'} text-sm text-gray-600 bg-emerald-50 rounded p-2`}
                      style={{ pointerEvents: openIndex === idx ? 'auto' : 'none' }}
                    >
                      {faq.answer}
                    </div>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h2 className="text-lg font-bold text-emerald-700 mb-1">Contacto</h2>
              <ul className="mt-2 text-gray-700">
                <li>Email: <a href="mailto:soporte@estiloesmeralda.com" className="text-emerald-500 underline">soporte@estiloesmeralda.com</a></li>
                <li>WhatsApp: <a href="https://wa.me/521234567890" target="_blank" rel="noopener" className="text-emerald-500 underline">+52 123 456 7890</a></li>
                <li>Teléfono: <span className="text-emerald-500">(55) 1234-5678</span></li>
              </ul>
              <div className="bg-emerald-50 p-4 rounded-lg mt-4">
                <span className="font-semibold text-emerald-700">Horario de atención:</span> Lunes a Sábado, 9:00 a 18:00 hrs.
              </div>
            </div>
          </div>
          <img src="/assets/help-fashion.png" alt="Centro de Ayuda Estilo Esmeralda" className="w-full max-w-xs mx-auto mt-8 rounded-xl shadow-md" />
        </div>
      </div>
      <Footer />
    </>
  );
};

export default HelpCenterPage;
