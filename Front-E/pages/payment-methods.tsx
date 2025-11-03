import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { PaymentMethodCard, StatCard } from '@/components/shared';
import {
  FaMobileAlt,
  FaCreditCard,
  FaUniversity,
  FaShieldAlt,
  FaBolt,
  FaCheckCircle,
  FaPercent,
} from 'react-icons/fa';

const PaymentMethodsPage: React.FC = () => {
  const paymentMethods = [
    {
      title: 'Yape',
      description: 'Paga de forma instantánea con tu celular',
      icon: <FaMobileAlt className="text-5xl" />,
      color: 'purple' as const,
      features: [
        'Pago instantáneo',
        'Sin comisiones',
        '100% seguro',
        'Disponible 24/7',
      ],
      link: '/payment-yape',
    },
    {
      title: 'Plin',
      description: 'Método interbancario rápido y seguro',
      icon: <FaMobileAlt className="text-5xl" />,
      color: 'blue' as const,
      features: [
        'Todos los bancos',
        'Sin comisiones',
        'Confirmación inmediata',
        'Fácil de usar',
      ],
      link: '/payment-plin',
    },
    {
      title: 'Tarjeta de Crédito/Débito',
      description: 'Paga con Visa, Mastercard o American Express',
      icon: <FaCreditCard className="text-5xl" />,
      color: 'orange' as const,
      features: [
        'Hasta 12 cuotas sin interés',
        'Todas las tarjetas',
        'Pago 100% seguro',
        'Promociones bancarias',
      ],
      link: '/payment-card',
    },
    {
      title: 'Transferencia Bancaria',
      description: 'Transfiere desde cualquier banco',
      icon: <FaUniversity className="text-5xl" />,
      color: 'green' as const,
      features: [
        'Sin límite de monto',
        'Múltiples cuentas',
        'Proceso seguro',
        'Ideal para compras grandes',
      ],
      link: '/payment-transfer',
    },
  ];

  const statistics = [
    {
      icon: <FaShieldAlt />,
      number: '100%',
      label: 'Pagos Seguros',
      color: 'emerald' as const,
      variant: 'default' as const,
    },
    {
      icon: <FaBolt />,
      number: '24/7',
      label: 'Disponibilidad',
      color: 'blue' as const,
      variant: 'default' as const,
    },
    {
      icon: <FaCheckCircle />,
      number: '4',
      label: 'Métodos de Pago',
      color: 'purple' as const,
      variant: 'default' as const,
    },
  ];

  return (
    <>
      <Head>
        <title>Métodos de Pago - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Conoce todos nuestros métodos de pago: Yape, Plin, Tarjetas de Crédito y Transferencias Bancarias. Proceso seguro y fácil."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-blue-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-24 h-24 rounded-full bg-emerald-100 mb-4">
              <FaCreditCard className="text-emerald-600 text-5xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Métodos de Pago
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Elige el método de pago que más te convenga. Todos nuestros procesos
              son 100% seguros y verificados.
            </p>
          </div>

          {/* Statistics */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            {statistics.map((stat, idx) => (
              <StatCard
                key={idx}
                icon={stat.icon}
                number={stat.number}
                label={stat.label}
                color={stat.color}
                variant={stat.variant}
              />
            ))}
          </div>

          {/* Payment Methods Grid */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              Elige tu Método Preferido
            </h2>
            <div className="grid md:grid-cols-2 gap-8">
              {paymentMethods.map((method, idx) => (
                <Link key={idx} href={method.link}>
                  <div className="cursor-pointer h-full">
                    <PaymentMethodCard
                      icon={method.icon}
                      title={method.title}
                      description={method.description}
                      features={method.features}
                      color={method.color}
                      className="h-full hover:scale-105 transition-transform"
                    />
                  </div>
                </Link>
              ))}
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ¿Por Qué Comprar con Nosotros?
            </h2>
            <div className="grid md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-green-100 mb-4">
                  <FaShieldAlt className="text-green-600 text-3xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">100% Seguro</h3>
                <p className="text-gray-600 text-sm">
                  Todos los pagos están protegidos con tecnología de encriptación
                  de última generación.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-blue-100 mb-4">
                  <FaBolt className="text-blue-600 text-3xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Confirmación Rápida
                </h3>
                <p className="text-gray-600 text-sm">
                  Procesamos tu pedido en menos de 30 minutos durante horario de
                  atención.
                </p>
              </div>
              <div className="text-center">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-orange-100 mb-4">
                  <FaPercent className="text-orange-600 text-3xl" />
                </div>
                <h3 className="font-bold text-gray-900 mb-2">
                  Sin Comisiones Ocultas
                </h3>
                <p className="text-gray-600 text-sm">
                  El precio que ves es el precio que pagas. Sin sorpresas ni
                  cargos adicionales.
                </p>
              </div>
            </div>
          </div>

          {/* Comparison Table */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12 overflow-x-auto">
            <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              Comparación de Métodos
            </h2>
            <table className="w-full min-w-[600px]">
              <thead>
                <tr className="border-b-2 border-gray-200">
                  <th className="text-left py-4 px-4 font-bold text-gray-900">
                    Método
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">
                    Velocidad
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">
                    Comisión
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">
                    Límite
                  </th>
                  <th className="text-center py-4 px-4 font-bold text-gray-900">
                    Cuotas
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold text-purple-600">
                    Yape
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    Instantáneo
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    S/ 0
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    S/ 2,000
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">No</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold text-blue-600">Plin</td>
                  <td className="py-4 px-4 text-center text-green-600">
                    Instantáneo
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    S/ 0
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">
                    S/ 2,000
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">No</td>
                </tr>
                <tr className="border-b border-gray-100">
                  <td className="py-4 px-4 font-semibold text-orange-600">
                    Tarjeta
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    Instantáneo
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    S/ 0
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    Sin límite
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    Hasta 12
                  </td>
                </tr>
                <tr>
                  <td className="py-4 px-4 font-semibold text-green-600">
                    Transferencia
                  </td>
                  <td className="py-4 px-4 text-center text-yellow-600">
                    24-48 hrs
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    S/ 0*
                  </td>
                  <td className="py-4 px-4 text-center text-green-600">
                    Sin límite
                  </td>
                  <td className="py-4 px-4 text-center text-gray-700">No</td>
                </tr>
              </tbody>
            </table>
            <p className="text-sm text-gray-600 mt-4 text-center">
              * Tu banco puede cobrar comisiones por transferencias interbancarias
            </p>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Preguntas Frecuentes
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Cuál es el método de pago más rápido?
                </h3>
                <p className="text-gray-600">
                  Yape y Plin son los métodos más rápidos, con confirmación
                  instantánea. Las tarjetas también son inmediatas.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Puedo combinar métodos de pago?
                </h3>
                <p className="text-gray-600">
                  Sí, contáctanos y podemos coordinar pagos parciales con
                  diferentes métodos según tus necesidades.
                </p>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-2">
                  ¿Los pagos son seguros?
                </h3>
                <p className="text-gray-600">
                  Absolutamente. Todos nuestros métodos de pago cumplen con
                  estándares internacionales de seguridad y están respaldados por
                  entidades bancarias oficiales.
                </p>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaCheckCircle className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">¿Listo para Comprar?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Elige tu método de pago favorito y disfruta de una experiencia de
              compra segura y confiable.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/catalog"
                className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Ver Catálogo
              </a>
              <a
                href="/whatsapp-support"
                className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors border-2 border-white"
              >
                Consultar por WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default PaymentMethodsPage;
