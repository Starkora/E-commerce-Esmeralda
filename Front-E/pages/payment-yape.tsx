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

const YapePaymentPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pagar con Yape - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Paga tus compras de forma rápida y segura con Yape. Proceso instantáneo sin comisiones."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-pink-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-purple-100 mb-4">
              <FaMobileAlt className="text-purple-600 text-5xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Pagar con <span className="text-purple-600">Yape</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Realiza tus pagos de forma instantánea, segura y sin comisiones con
              Yape, el método de pago más popular del Perú.
            </p>
          </div>

          {/* Yape QR Card */}
          <div className="max-w-md mx-auto mb-12">
            <div className="bg-gradient-to-br from-purple-500 to-purple-700 rounded-3xl shadow-2xl p-8 text-white text-center">
              <div className="bg-white rounded-2xl p-6 mb-6">
                <div className="bg-gray-200 h-64 flex items-center justify-center rounded-xl mb-4">
                  <FaQrcode className="text-gray-400 text-8xl" />
                </div>
                <p className="text-gray-700 font-semibold text-lg">
                  Escanea para pagar
                </p>
              </div>
              <div className="space-y-2">
                <p className="text-sm opacity-90">Número de Yape</p>
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
                'Sin tiempos de espera',
                'Disponible 24/7',
              ]}
              color="purple"
            />
            <PaymentMethodCard
              icon={<FaShieldAlt className="text-4xl" />}
              title="100% Seguro"
              description="Protección garantizada en cada transacción"
              features={[
                'Encriptación de datos',
                'Verificación doble',
                'Respaldado por el BCP',
              ]}
              color="purple"
            />
            <PaymentMethodCard
              icon={<FaCheckCircle className="text-4xl" />}
              title="Sin Comisiones"
              description="Paga solo el precio del producto"
              features={[
                '0% de comisión',
                'Sin cargos ocultos',
                'Precio final transparente',
              ]}
              color="purple"
            />
          </div>

          {/* How to Pay Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo Pagar con Yape?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StepCard
                step={1}
                title="Abre tu App Yape"
                description="Ingresa a tu aplicación Yape en tu celular"
                icon={<FaMobileAlt className="text-purple-600 text-2xl" />}
                color="purple"
              />
              <StepCard
                step={2}
                title="Escanea el QR"
                description="Escanea el código QR mostrado arriba o ingresa el número"
                icon={<FaCamera className="text-purple-600 text-2xl" />}
                color="purple"
              />
              <StepCard
                step={3}
                title="Confirma el Monto"
                description="Verifica que el monto sea correcto y confirma el pago"
                icon={<FaUserCheck className="text-purple-600 text-2xl" />}
                color="purple"
              />
              <StepCard
                step={4}
                title="Envía Comprobante"
                description="Envíanos el screenshot del comprobante por WhatsApp"
                icon={<FaPaperPlane className="text-purple-600 text-2xl" />}
                color="purple"
              />
            </div>
          </div>

          {/* Important Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<FaClock className="text-blue-500 text-4xl" />}
              title="Tiempo de Confirmación"
              description="Una vez realizado el pago, confirmaremos tu pedido en menos de 30 minutos durante horario de atención."
              features={[
                'Lunes a Sábado: 9:00 AM - 8:00 PM',
                'Domingos: 10:00 AM - 6:00 PM',
                'Confirmación automática en compras frecuentes',
              ]}
            />
            <InfoCard
              icon={<FaExclamationTriangle className="text-orange-500 text-4xl" />}
              title="Importante Recordar"
              description="Para procesar tu pedido correctamente, ten en cuenta estas recomendaciones."
              features={[
                'Envía el comprobante completo con fecha y hora',
                'Incluye tu número de pedido en el mensaje',
                'Verifica el monto antes de confirmar',
                'Guarda tu comprobante hasta recibir el producto',
              ]}
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes sobre Yape
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Cuánto tarda en confirmarse mi pago?
                </h3>
                <p className="text-gray-600">
                  Una vez que envíes el comprobante, confirmaremos tu pedido en
                  menos de 30 minutos durante nuestro horario de atención.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Puedo pagar en partes con Yape?
                </h3>
                <p className="text-gray-600">
                  Sí, puedes realizar pagos parciales. Contáctanos para coordinar
                  un plan de pagos que se ajuste a tus necesidades.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Qué hago si yapeo a un número equivocado?
                </h3>
                <p className="text-gray-600">
                  Contacta inmediatamente a tu banco BCP para solicitar la
                  reversión del pago. También notifícanos para ayudarte en el
                  proceso.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Hay un monto mínimo o máximo para yapear?
                </h3>
                <p className="text-gray-600">
                  Yape tiene un límite diario de S/ 2,000 por operación. Si tu
                  compra supera este monto, podemos coordinar pagos múltiples o
                  usar otro método de pago.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaMobileAlt className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">¿Listo para Yapear?</h2>
            <p className="text-purple-100 mb-6 max-w-2xl mx-auto">
              Si tienes alguna duda sobre el proceso de pago con Yape, nuestro
              equipo está listo para ayudarte.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/whatsapp-support"
                className="bg-white text-purple-600 font-bold px-8 py-3 rounded-lg hover:bg-purple-50 transition-colors"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="/catalog"
                className="bg-purple-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-purple-700 transition-colors border-2 border-white"
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

export default YapePaymentPage;
