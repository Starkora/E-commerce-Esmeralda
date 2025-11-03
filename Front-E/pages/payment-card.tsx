import React from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PaymentMethodCard, StepCard, InfoCard } from '@/components/shared';
import {
  FaCreditCard,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaLock,
  FaPercent,
  FaGift,
  FaCalendarAlt,
  FaExclamationTriangle,
} from 'react-icons/fa';

const CardPaymentPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pagar con Tarjeta de Crédito/Débito - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Paga con todas las tarjetas Visa, Mastercard y American Express. Hasta 12 cuotas sin intereses."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-amber-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-orange-100 mb-4">
              <FaCreditCard className="text-orange-600 text-5xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Pagar con{' '}
              <span className="text-orange-600">Tarjeta de Crédito o Débito</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Acepta todas las tarjetas de crédito y débito. Paga en cuotas sin
              intereses y disfruta de promociones exclusivas.
            </p>
          </div>

          {/* Card Brands */}
          <div className="max-w-4xl mx-auto mb-12">
            <div className="bg-white rounded-2xl shadow-xl p-8">
              <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
                Tarjetas Aceptadas
              </h2>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                {[
                  { name: 'Visa', color: 'from-blue-600 to-blue-800' },
                  { name: 'Mastercard', color: 'from-red-600 to-orange-600' },
                  { name: 'American Express', color: 'from-blue-400 to-blue-600' },
                  { name: 'Diners Club', color: 'from-gray-600 to-gray-800' },
                ].map((card, idx) => (
                  <div
                    key={idx}
                    className={`bg-gradient-to-br ${card.color} rounded-xl p-6 text-white text-center font-bold shadow-lg hover:scale-105 transition-transform`}
                  >
                    {card.name}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <PaymentMethodCard
              icon={<FaPercent className="text-4xl" />}
              title="Cuotas Sin Intereses"
              description="Paga hasta en 12 cuotas sin intereses"
              features={[
                '3 cuotas sin intereses',
                '6 cuotas sin intereses',
                '12 cuotas sin intereses',
              ]}
              color="orange"
            />
            <PaymentMethodCard
              icon={<FaLock className="text-4xl" />}
              title="Pago 100% Seguro"
              description="Protección total de tus datos"
              features={[
                'Encriptación SSL',
                'Verificación 3D Secure',
                'Certificado PCI DSS',
              ]}
              color="orange"
            />
            <PaymentMethodCard
              icon={<FaGift className="text-4xl" />}
              title="Promociones Bancarias"
              description="Aprovecha ofertas especiales"
              features={[
                'Descuentos con bancos aliados',
                'Puntos y millas',
                'Cashback en compras',
              ]}
              color="orange"
            />
          </div>

          {/* How to Pay Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo Pagar con Tarjeta?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StepCard
                step={1}
                title="Selecciona tus Productos"
                description="Agrega los productos que deseas al carrito de compras"
                icon={<FaCreditCard className="text-orange-600 text-2xl" />}
                color="orange"
              />
              <StepCard
                step={2}
                title="Procede al Checkout"
                description="Ingresa tus datos de envío y selecciona pago con tarjeta"
                icon={<FaCheckCircle className="text-orange-600 text-2xl" />}
                color="orange"
              />
              <StepCard
                step={3}
                title="Completa los Datos"
                description="Ingresa los datos de tu tarjeta de forma segura"
                icon={<FaShieldAlt className="text-orange-600 text-2xl" />}
                color="orange"
              />
              <StepCard
                step={4}
                title="Confirma tu Pedido"
                description="Recibe la confirmación inmediata por email"
                icon={<FaCalendarAlt className="text-orange-600 text-2xl" />}
                color="orange"
              />
            </div>
          </div>

          {/* Payment Plans */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Planes de Cuotas Disponibles
            </h2>
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b-2 border-gray-200">
                    <th className="text-left py-4 px-4 font-bold text-gray-900">
                      Cuotas
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">
                      Interés
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">
                      Monto Mínimo
                    </th>
                    <th className="text-left py-4 px-4 font-bold text-gray-900">
                      Ejemplo
                    </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      3 cuotas
                    </td>
                    <td className="py-4 px-4 text-green-600 font-bold">
                      Sin interés
                    </td>
                    <td className="py-4 px-4 text-gray-700">S/ 100</td>
                    <td className="py-4 px-4 text-gray-700">
                      S/ 300 = 3 x S/ 100
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      6 cuotas
                    </td>
                    <td className="py-4 px-4 text-green-600 font-bold">
                      Sin interés
                    </td>
                    <td className="py-4 px-4 text-gray-700">S/ 300</td>
                    <td className="py-4 px-4 text-gray-700">
                      S/ 600 = 6 x S/ 100
                    </td>
                  </tr>
                  <tr className="border-b border-gray-100">
                    <td className="py-4 px-4 font-semibold text-gray-900">
                      12 cuotas
                    </td>
                    <td className="py-4 px-4 text-green-600 font-bold">
                      Sin interés
                    </td>
                    <td className="py-4 px-4 text-gray-700">S/ 600</td>
                    <td className="py-4 px-4 text-gray-700">
                      S/ 1,200 = 12 x S/ 100
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p className="text-sm text-gray-600 mt-4 text-center">
              * Disponibilidad de cuotas sujeta a aprobación de tu banco emisor
            </p>
          </div>

          {/* Important Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<FaShieldAlt className="text-green-500 text-4xl" />}
              title="Seguridad Garantizada"
              description="Tu información está protegida con los más altos estándares de seguridad."
              features={[
                'No almacenamos datos de tarjetas',
                'Conexión encriptada SSL',
                'Verificación 3D Secure',
                'Certificación internacional PCI DSS',
              ]}
            />
            <InfoCard
              icon={<FaExclamationTriangle className="text-orange-500 text-4xl" />}
              title="Importante Recordar"
              description="Antes de realizar tu pago, verifica:"
              features={[
                'Que tu tarjeta esté habilitada para compras online',
                'Tener cupo disponible suficiente',
                'Datos correctos (número, CVV, fecha)',
                'Confirmación por email tras el pago',
              ]}
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes sobre Pagos con Tarjeta
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Es seguro pagar con tarjeta en su página?
                </h3>
                <p className="text-gray-600">
                  Absolutamente. Usamos tecnología de encriptación de última
                  generación y cumplimos con todos los estándares internacionales
                  de seguridad PCI DSS.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Puedo cambiar el número de cuotas después?
                </h3>
                <p className="text-gray-600">
                  No, el número de cuotas se define al momento de la compra.
                  Algunos bancos permiten diferir pagos posteriormente, consulta
                  con tu banco.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Qué hago si mi pago fue rechazado?
                </h3>
                <p className="text-gray-600">
                  Verifica con tu banco que tu tarjeta esté habilitada para
                  compras online y que tengas cupo disponible. También puedes
                  intentar con otra tarjeta o método de pago.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Aceptan tarjetas internacionales?
                </h3>
                <p className="text-gray-600">
                  Sí, aceptamos tarjetas Visa y Mastercard internacionales. Ten en
                  cuenta que tu banco puede cobrar comisiones por transacciones
                  internacionales.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-orange-500 to-amber-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaCreditCard className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Listo para Comprar con tu Tarjeta?
            </h2>
            <p className="text-orange-100 mb-6 max-w-2xl mx-auto">
              Aprovecha nuestras cuotas sin intereses y promociones bancarias.
              ¡Compra ahora y paga después!
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/catalog"
                className="bg-white text-orange-600 font-bold px-8 py-3 rounded-lg hover:bg-orange-50 transition-colors"
              >
                Ver Catálogo
              </a>
              <a
                href="/contact"
                className="bg-orange-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-orange-700 transition-colors border-2 border-white"
              >
                Consultar Promociones
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default CardPaymentPage;
