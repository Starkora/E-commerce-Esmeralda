import React from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PaymentMethodCard, StepCard, InfoCard } from '@/components/shared';
import {
  FaMobileAlt,
  FaQrcode,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaBolt,
  FaUserCheck,
  FaCamera,
  FaPaperPlane,
  FaExclamationTriangle,
} from 'react-icons/fa';

const PlinPaymentPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pagar con Plin - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Paga tus compras de forma rápida y segura con Plin. Proceso instantáneo sin comisiones."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-blue-100 mb-4">
              <FaMobileAlt className="text-blue-600 text-5xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Pagar con <span className="text-blue-600">Plin</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Realiza tus pagos de forma instantánea y segura con Plin, el método
              interbancario que acepta todas las cuentas de ahorros del Perú.
            </p>
          </div>

          {/* Plin QR Card */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-gradient-to-br from-blue-500 to-blue-700 rounded-3xl shadow-2xl p-8 text-white text-center">
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="bg-gray-200 h-64 flex items-center justify-center rounded-xl mb-4">
                  <FaQrcode className="text-gray-400 text-8xl" />
                </div>
                <p className="text-gray-700 font-semibold text-lg">
                  Escanea para pagar
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm opacity-90">Número de Plin</p>
                <p className="text-3xl font-bold tracking-wider">987 654 321</p>
                <p className="text-sm opacity-90">Estilo Esmeralda SAC</p>
              </div>
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <PaymentMethodCard
              icon={<FaBolt className="text-4xl" />}
              title="Pago Instantáneo"
              description="Tu pago se procesa al instante"
              features={[
                'Confirmación inmediata',
                'Compatible con todos los bancos',
                'Disponible 24/7',
              ]}
              color="blue"
            />
            <PaymentMethodCard
              icon={<FaShieldAlt className="text-4xl" />}
              title="100% Seguro"
              description="Protección garantizada en cada transacción"
              features={[
                'Encriptación de datos',
                'Respaldado por múltiples bancos',
                'Sistema interbancario oficial',
              ]}
              color="blue"
            />
            <PaymentMethodCard
              icon={<FaCheckCircle className="text-4xl" />}
              title="Sin Comisiones"
              description="Paga solo el precio del producto"
              features={[
                '0% de comisión',
                'Sin importar tu banco',
                'Precio final transparente',
              ]}
              color="blue"
            />
          </div>

          {/* How to Pay Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo Pagar con Plin?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StepCard
                step={1}
                title="Abre tu App Bancaria"
                description="Ingresa a la app de tu banco y busca la opción Plin"
                icon={<FaMobileAlt className="text-blue-600 text-2xl" />}
                color="blue"
              />
              <StepCard
                step={2}
                title="Escanea el QR"
                description="Escanea el código QR o ingresa nuestro número Plin"
                icon={<FaCamera className="text-blue-600 text-2xl" />}
                color="blue"
              />
              <StepCard
                step={3}
                title="Confirma el Pago"
                description="Verifica el monto y confirma la transferencia"
                icon={<FaUserCheck className="text-blue-600 text-2xl" />}
                color="blue"
              />
              <StepCard
                step={4}
                title="Envía Comprobante"
                description="Envíanos el screenshot por WhatsApp"
                icon={<FaPaperPlane className="text-blue-600 text-2xl" />}
                color="blue"
              />
            </div>
          </div>

          {/* Compatible Banks */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Bancos Compatibles con Plin
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
              {[
                'BCP',
                'Interbank',
                'BBVA',
                'Scotiabank',
                'Banco Pichincha',
                'Banco de la Nación',
                'BanBif',
                'Banco GNB',
              ].map((bank, idx) => (
                <div
                  key={idx}
                  className="bg-gray-50 rounded-lg p-4 font-semibold text-gray-700 hover:bg-blue-50 transition-colors"
                >
                  {bank}
                </div>
              ))}
            </div>
            <p className="text-center text-gray-600 mt-6">
              Y muchos más bancos del Perú
            </p>
          </div>

          {/* Important Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<FaClock className="text-blue-500 text-4xl" />}
              title="Tiempo de Confirmación"
              description="Una vez realizado el pago, confirmaremos tu pedido rápidamente."
              features={[
                'Confirmación en menos de 30 minutos',
                'Horario de atención: Lun-Sáb 9AM-8PM',
                'Domingos: 10AM-6PM',
              ]}
            />
            <InfoCard
              icon={<FaExclamationTriangle className="text-orange-500 text-4xl" />}
              title="Importante Recordar"
              description="Para procesar tu pedido correctamente:"
              features={[
                'Envía el comprobante completo y legible',
                'Incluye tu número de pedido',
                'Verifica el número antes de transferir',
                'Guarda el comprobante hasta recibir tu producto',
              ]}
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes sobre Plin
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Puedo usar Plin desde cualquier banco?
                </h3>
                <p className="text-gray-600">
                  Sí, Plin es un sistema interbancario. Puedes usar la app de tu
                  banco para hacer pagos Plin a cualquier otro banco del Perú.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Cuál es el límite de Plin?
                </h3>
                <p className="text-gray-600">
                  El límite varía según tu banco, generalmente es de S/ 2,000
                  diarios. Si tu compra supera este monto, podemos coordinar pagos
                  múltiples.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Plin cobra comisión?
                </h3>
                <p className="text-gray-600">
                  No, Plin es gratuito. No cobramos ninguna comisión por pagos con
                  este método.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Qué hago si no tengo app de mi banco?
                </h3>
                <p className="text-gray-600">
                  Descarga la app oficial de tu banco desde la Play Store o App
                  Store y activa la función Plin siguiendo las instrucciones de tu
                  banco.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-blue-500 to-cyan-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaMobileAlt className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">¿Listo para Pagar con Plin?</h2>
            <p className="text-blue-100 mb-6 max-w-2xl mx-auto">
              Si tienes dudas sobre el proceso de pago con Plin, contáctanos y te
              ayudaremos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/whatsapp-support"
                className="bg-white text-blue-600 font-bold px-8 py-3 rounded-lg hover:bg-blue-50 transition-colors"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="/catalog"
                className="bg-blue-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-blue-700 transition-colors border-2 border-white"
              >
                Ver Catálogo
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PlinPaymentPage;
