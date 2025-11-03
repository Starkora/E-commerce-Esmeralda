import React from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PaymentMethodCard, StepCard, BankCard, InfoCard } from '@/components/shared';
import {
  FaUniversity,
  FaCheckCircle,
  FaClock,
  FaShieldAlt,
  FaFileInvoice,
  FaCamera,
  FaPaperPlane,
  FaExclamationTriangle,
} from 'react-icons/fa';

const BankTransferPaymentPage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Pagar por Transferencia Bancaria - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Realiza tu pago por transferencia bancaria. Cuentas en BCP, Interbank, BBVA y Scotiabank."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-green-100 mb-4">
              <FaUniversity className="text-green-600 text-5xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Pagar por{' '}
              <span className="text-green-600">Transferencia Bancaria</span>
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Realiza transferencias bancarias desde cualquier banco del Perú a
              nuestras cuentas. Proceso seguro y confiable.
            </p>
          </div>

          {/* Bank Accounts */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Nuestras Cuentas Bancarias
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <BankCard
                bankName="BCP"
                accountType="Cuenta de Ahorros"
                accountNumber="194-12345678-0-99"
                cci="00219419412345678099"
                accountHolder="ESTILO ESMERALDA SAC"
                color="blue"
              />
              <BankCard
                bankName="Interbank"
                accountType="Cuenta Corriente"
                accountNumber="200-3001234567"
                cci="00320020030012345678"
                accountHolder="ESTILO ESMERALDA SAC"
                color="green"
              />
              <BankCard
                bankName="BBVA"
                accountType="Cuenta de Ahorros"
                accountNumber="0011-0123-4567890123"
                cci="01101100112345678901"
                accountHolder="ESTILO ESMERALDA SAC"
                color="blue"
              />
              <BankCard
                bankName="Scotiabank"
                accountType="Cuenta Corriente"
                accountNumber="000-1234567"
                cci="00900100012345678901"
                accountHolder="ESTILO ESMERALDA SAC"
                color="red"
              />
            </div>
          </div>

          {/* Benefits */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <PaymentMethodCard
              icon={<FaUniversity className="text-4xl" />}
              title="Todos los Bancos"
              description="Transfiere desde cualquier banco"
              features={[
                'Compatible con todos los bancos',
                'Transferencias interbancarias',
                'Múltiples cuentas disponibles',
              ]}
              color="green"
            />
            <PaymentMethodCard
              icon={<FaShieldAlt className="text-4xl" />}
              title="100% Seguro"
              description="Transacciones protegidas"
              features={[
                'Cuentas verificadas',
                'Sin intermediarios',
                'Respaldo bancario oficial',
              ]}
              color="green"
            />
            <PaymentMethodCard
              icon={<FaCheckCircle className="text-4xl" />}
              title="Sin Límites"
              description="Transferencias de cualquier monto"
              features={[
                'Sin límite de monto',
                'Ideal para compras grandes',
                'Confirmación rápida',
              ]}
              color="green"
            />
          </div>

          {/* How to Pay Steps */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo Realizar una Transferencia?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              <StepCard
                step={1}
                title="Elige tu Banco"
                description="Selecciona la cuenta bancaria de tu preferencia"
                icon={<FaUniversity className="text-green-600 text-2xl" />}
                color="green"
              />
              <StepCard
                step={2}
                title="Realiza la Transferencia"
                description="Transfiere desde la app o agencia de tu banco"
                icon={<FaFileInvoice className="text-green-600 text-2xl" />}
                color="green"
              />
              <StepCard
                step={3}
                title="Captura el Voucher"
                description="Toma screenshot o foto del comprobante"
                icon={<FaCamera className="text-green-600 text-2xl" />}
                color="green"
              />
              <StepCard
                step={4}
                title="Envía el Comprobante"
                description="Envíanos el voucher por WhatsApp o email"
                icon={<FaPaperPlane className="text-green-600 text-2xl" />}
                color="green"
              />
            </div>
          </div>

          {/* Types of Transfer */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Tipos de Transferencia
            </h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center p-6 bg-blue-50 rounded-xl">
                <div className="text-4xl mb-4">🏦</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Transferencia Mismo Banco
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Si tienes cuenta en el mismo banco
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-1">
                  <li>• Inmediato</li>
                  <li>• Sin costo</li>
                  <li>• 24/7 disponible</li>
                </ul>
              </div>
              <div className="text-center p-6 bg-green-50 rounded-xl">
                <div className="text-4xl mb-4">🔄</div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Transferencia Interbancaria
                </h3>
                <p className="text-gray-600 text-sm mb-3">
                  Entre bancos diferentes
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-1">
                  <li>• Usa el CCI</li>
                  <li>• Comisión según banco</li>
                  <li>• Hasta 24 horas</li>
                </ul>
              </div>
              <div className="text-center p-6 bg-purple-50 rounded-xl">
                <div className="text-4xl mb-4">🏪</div>
                <h3 className="font-bold text-gray-900 mb-2">Desde Agencia</h3>
                <p className="text-gray-600 text-sm mb-3">
                  Depósito en ventanilla o agente
                </p>
                <ul className="text-left text-sm text-gray-700 space-y-1">
                  <li>• En efectivo</li>
                  <li>• Horario bancario</li>
                  <li>• Comisión aplica</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Important Information */}
          <div className="grid md:grid-cols-2 gap-6 mb-12">
            <InfoCard
              icon={<FaClock className="text-blue-500 text-4xl" />}
              title="Tiempo de Confirmación"
              description="Confirmaremos tu pedido una vez verifiquemos el pago."
              features={[
                'Transferencias mismo banco: inmediato',
                'Interbancarias: hasta 24 horas',
                'Horario verificación: Lun-Sáb 9AM-8PM',
                'Envío tras confirmación de pago',
              ]}
            />
            <InfoCard
              icon={<FaExclamationTriangle className="text-orange-500 text-4xl" />}
              title="Datos Importantes"
              description="Asegúrate de incluir esta información:"
              features={[
                'Titular exacto: ESTILO ESMERALDA SAC',
                'Monto exacto de tu pedido',
                'Envía comprobante completo y legible',
                'Incluye número de pedido o operación',
              ]}
            />
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes sobre Transferencias
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Cuánto tarda en procesarse mi transferencia?
                </h3>
                <p className="text-gray-600">
                  Las transferencias del mismo banco son inmediatas. Las
                  interbancarias pueden tardar hasta 24 horas hábiles.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Puedo transferir desde el extranjero?
                </h3>
                <p className="text-gray-600">
                  Sí, pero ten en cuenta que las transferencias internacionales
                  pueden tener comisiones adicionales y tardar más tiempo. Consulta
                  con tu banco.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Qué es el CCI y cuándo lo necesito?
                </h3>
                <p className="text-gray-600">
                  El CCI (Código de Cuenta Interbancario) es necesario para
                  transferencias entre bancos diferentes. Es un código de 20
                  dígitos que identifica tu cuenta de manera única.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Qué hago si me equivoqué en la transferencia?
                </h3>
                <p className="text-gray-600">
                  Contacta inmediatamente a tu banco para solicitar la reversión.
                  También notifícanos para ayudarte en el proceso de recuperación.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-green-500 to-emerald-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaUniversity className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Necesitas Ayuda con tu Transferencia?
            </h2>
            <p className="text-green-100 mb-6 max-w-2xl mx-auto">
              Nuestro equipo está disponible para resolver cualquier duda sobre el
              proceso de transferencia bancaria.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/whatsapp-support"
                className="bg-white text-green-600 font-bold px-8 py-3 rounded-lg hover:bg-green-50 transition-colors"
              >
                Contactar por WhatsApp
              </a>
              <a
                href="/catalog"
                className="bg-green-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-green-700 transition-colors border-2 border-white"
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

export default BankTransferPaymentPage;
