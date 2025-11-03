import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaUndoAlt, FaCheckCircle, FaTimesCircle, FaClock } from 'react-icons/fa';

const ReturnPolicyPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Política de Cambios y Devoluciones - Estilo Esmeralda</title>
        <meta name="description" content="Conoce nuestra política de cambios y devoluciones. Proceso simple y transparente." />
      </Head>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-12">
        <div className="max-w-4xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <FaUndoAlt className="text-emerald-600 text-3xl" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Política de Cambios y Devoluciones</h1>
            <p className="text-lg text-gray-600">
              Tu satisfacción es nuestra prioridad. Proceso simple y transparente.
            </p>
          </div>

          {/* Plazo */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-4">
              <FaClock className="text-3xl text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Plazo para Cambios y Devoluciones</h2>
            </div>
            <p className="text-gray-700 text-lg mb-4">
              Tienes <strong className="text-emerald-600">30 días corridos</strong> desde que recibes tu pedido para solicitar un cambio o devolución.
            </p>
            <div className="bg-emerald-50 rounded-lg p-4">
              <p className="text-sm text-gray-600">
                <strong>Importante:</strong> El producto debe estar sin uso, con etiquetas originales y en su empaque original.
              </p>
            </div>
          </div>

          {/* Condiciones Aceptadas */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FaCheckCircle className="text-3xl text-green-600" />
              <h2 className="text-2xl font-bold text-gray-900">Casos en que Aceptamos Devoluciones</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Producto defectuoso o con fallas de fabricación</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Error en el envío (producto diferente al solicitado)</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Talla incorrecta (cambio por otra talla disponible)</span>
              </li>
              <li className="flex items-start gap-3">
                <FaCheckCircle className="text-green-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Cambio de opinión (dentro de los 30 días, producto sin uso)</span>
              </li>
            </ul>
          </div>

          {/* Condiciones NO Aceptadas */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FaTimesCircle className="text-3xl text-red-600" />
              <h2 className="text-2xl font-bold text-gray-900">NO Aceptamos Devoluciones si:</h2>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">El producto ha sido usado, lavado o alterado</span>
              </li>
              <li className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">No tiene etiquetas originales o empaque</span>
              </li>
              <li className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Han pasado más de 30 días desde la recepción</span>
              </li>
              <li className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Productos en liquidación o con descuento mayor al 50%</span>
              </li>
              <li className="flex items-start gap-3">
                <FaTimesCircle className="text-red-500 mt-1 flex-shrink-0" />
                <span className="text-gray-700">Ropa interior, trajes de baño o productos personalizados</span>
              </li>
            </ul>
          </div>

          {/* Proceso */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Proceso de Devolución</h2>
            <div className="space-y-6">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  1
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Contacta con nosotros</h3>
                  <p className="text-gray-600">Escríbenos por WhatsApp, correo o teléfono indicando tu número de pedido y motivo de devolución.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  2
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Aprobación</h3>
                  <p className="text-gray-600">Revisaremos tu solicitud en 24 horas y te enviaremos instrucciones de envío.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  3
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Envío del producto</h3>
                  <p className="text-gray-600">Empaca el producto en su caja original con etiquetas. Te indicaremos la dirección de envío.</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  4
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Verificación</h3>
                  <p className="text-gray-600">Al recibir el producto, verificamos su estado (1-2 días hábiles).</p>
                </div>
              </div>
              
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-10 h-10 bg-emerald-100 rounded-full flex items-center justify-center text-emerald-700 font-bold">
                  5
                </div>
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">Reembolso o cambio</h3>
                  <p className="text-gray-600">Procesamos el reembolso (5-7 días) o enviamos el nuevo producto de inmediato.</p>
                </div>
              </div>
            </div>
          </div>

          {/* Costos de Envío */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-900">Costos de Envío</h2>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="bg-green-50 rounded-lg p-4">
                <h3 className="font-semibold text-green-700 mb-2">Nosotros pagamos el envío si:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Producto defectuoso</li>
                  <li>• Error en el envío</li>
                  <li>• Problema de calidad</li>
                </ul>
              </div>
              <div className="bg-orange-50 rounded-lg p-4">
                <h3 className="font-semibold text-orange-700 mb-2">Tú pagas el envío si:</h3>
                <ul className="text-sm text-gray-700 space-y-1">
                  <li>• Cambio de opinión</li>
                  <li>• Talla incorrecta (tu error)</li>
                  <li>• No cumple expectativas personales</li>
                </ul>
              </div>
            </div>
          </div>

          {/* CTA */}
          <div className="mt-8 bg-emerald-50 rounded-2xl p-8 text-center">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">¿Necesitas hacer una devolución?</h3>
            <p className="text-gray-700 mb-6">
              Contáctanos y te guiaremos en el proceso paso a paso
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a
                href="https://wa.me/51987654321?text=Hola,%20quiero%20solicitar%20una%20devolución"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
              >
                WhatsApp
              </a>
              <a
                href="mailto:soporte@estiloesmeralda.com?subject=Solicitud de Devolución"
                className="inline-block px-6 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors"
              >
                Enviar Email
              </a>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default ReturnPolicyPage;
