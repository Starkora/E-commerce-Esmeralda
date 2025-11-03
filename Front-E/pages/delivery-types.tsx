import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { InfoCard, PricingTable, TimelineStep, FeatureGrid, HeroSection } from '@/components/shared';
import { 
  FaTruck, 
  FaStore, 
  FaBoxOpen, 
  FaMapMarkerAlt, 
  FaClock,
  FaShieldAlt,
  FaMoneyBillWave,
  FaCalculator,
  FaQuestionCircle,
  FaCheckCircle,
  FaBox,
  FaClipboardCheck,
  FaShippingFast,
  FaShoppingBag,
  FaLightbulb,
  FaGift
} from 'react-icons/fa';

const DeliveryTypesPage: React.FC = () => {
  const [selectedRegion, setSelectedRegion] = useState('lima');
  const [cartValue, setCartValue] = useState(150);

  // Opciones de entrega
  const deliveryOptions = [
    {
      icon: <FaTruck className="text-emerald-500 text-5xl" />,
      title: 'Envío a Domicilio',
      description: 'Recibe tu pedido directamente en la puerta de tu casa con seguimiento en tiempo real.',
      badge: 'Más Popular',
      badgeColor: 'emerald' as const,
      features: [
        'Cobertura nacional',
        'Seguimiento en línea 24/7',
        'Entrega segura y verificada',
        'Empaque premium incluido',
        'Seguro de envío gratis'
      ],
    },
    {
      icon: <FaStore className="text-blue-500 text-5xl" />,
      title: 'Retiro en Tienda',
      description: 'Compra online y recoge en cualquiera de nuestras sucursales sin costo adicional.',
      badge: 'Envío Gratis',
      badgeColor: 'blue' as const,
      features: [
        'Sin costo de envío',
        'Disponible en 24-48 hrs',
        'Prueba tu compra al recoger',
        'Atención personalizada',
        'Cambio inmediato si es necesario'
      ],
    },
    {
      icon: <FaBoxOpen className="text-purple-500 text-5xl" />,
      title: 'Punto de Entrega',
      description: 'Recoge en el punto más cercano a tu ubicación con horarios extendidos.',
      badge: 'Más Flexible',
      badgeColor: 'purple' as const,
      features: [
        '500+ puntos en todo el país',
        'Horario extendido 7am-10pm',
        'Retención hasta 7 días',
        'Sin necesidad de estar en casa',
        'Notificación al llegar'
      ],
    },
  ];

  // Tabla de precios
  const pricingData = {
    lima: [
      { label: 'Lima Metropolitana', price: 'S/ 15', delivery: '1-2 días hábiles' },
      { label: 'Envío Express (mismo día)', price: 'S/ 35', delivery: '4-8 horas', note: 'Solo Lima' },
    ],
    nacional: [
      { label: 'Arequipa, Trujillo, Chiclayo', price: 'S/ 25', delivery: '2-4 días hábiles' },
      { label: 'Cusco, Piura, Iquitos', price: 'S/ 30', delivery: '3-5 días hábiles' },
      { label: 'Otras ciudades principales', price: 'S/ 28', delivery: '3-5 días hábiles' },
      { label: 'Zonas rurales', price: 'S/ 40', delivery: '5-8 días hábiles' },
    ],
  };

  // Calcular costo de envío
  const calculateShipping = () => {
    if (cartValue >= 300) return 0;
    return selectedRegion === 'lima' ? 15 : 25;
  };

  const shippingCost = calculateShipping();

  // Proceso de entrega
  const deliverySteps = [
    {
      number: 1,
      title: 'Realizas tu Pedido',
      description: 'Completa tu compra online seleccionando tu método de entrega preferido.',
      icon: <FaShoppingBag className="text-2xl" />,
      status: 'completed' as const,
    },
    {
      number: 2,
      title: 'Preparamos tu Orden',
      description: 'Verificamos disponibilidad, empacamos cuidadosamente y preparamos el envío.',
      icon: <FaBox className="text-2xl" />,
      status: 'active' as const,
    },
    {
      number: 3,
      title: 'En Tránsito',
      description: 'Tu pedido está en camino. Recibe actualizaciones en tiempo real por email y SMS.',
      icon: <FaShippingFast className="text-2xl" />,
      status: 'pending' as const,
    },
    {
      number: 4,
      title: 'Entrega Exitosa',
      description: 'Recibe tu pedido y verifica que todo esté perfecto. ¡Disfruta tu compra!',
      icon: <FaCheckCircle className="text-2xl" />,
      status: 'pending' as const,
    },
  ];

  // FAQs
  const faqs = [
    {
      question: '¿Puedo cambiar mi dirección de entrega después de realizar el pedido?',
      answer: 'Sí, puedes modificar la dirección antes de que el pedido sea enviado. Contacta a soporte lo antes posible por WhatsApp.'
    },
    {
      question: '¿Qué pasa si no estoy en casa al momento de la entrega?',
      answer: 'El repartidor dejará un aviso y realizará hasta 2 intentos más. También puedes solicitar que dejen el paquete con un vecino o en tu punto de entrega más cercano.'
    },
    {
      question: '¿Los envíos incluyen seguro?',
      answer: 'Todos nuestros envíos incluyen seguro sin costo adicional contra pérdida o daño durante el transporte.'
    },
    {
      question: '¿Puedo rastrear mi pedido?',
      answer: 'Sí, recibirás un número de guía por email para rastrear tu pedido en tiempo real desde nuestra página o la del proveedor de logística.'
    },
    {
      question: '¿Hacen entregas los fines de semana?',
      answer: 'Sí, realizamos entregas de lunes a sábado. Los domingos solo para envíos express en Lima (con cargo adicional).'
    },
  ];

  return (
    <>
      <Head>
        <title>Tipos de Entrega - Estilo Esmeralda</title>
        <meta name="description" content="Conoce nuestras opciones de entrega: envío a domicilio, retiro en tienda y puntos de entrega. Cobertura nacional." />
      </Head>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Hero */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
              <FaTruck className="text-emerald-600 text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Opciones de Entrega
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Elige el método de entrega que mejor se adapte a tu estilo de vida. Todas nuestras opciones son seguras, confiables y pensadas para tu comodidad.
            </p>
          </div>

          {/* Tarjetas de opciones */}
          <div className="grid md:grid-cols-3 gap-8 mb-16">
            {deliveryOptions.map((option, idx) => (
              <InfoCard
                key={idx}
                icon={option.icon}
                title={option.title}
                description={option.description}
                badge={option.badge}
                badgeColor={option.badgeColor}
                features={option.features}
                highlighted={idx === 0}
              />
            ))}
          </div>

          {/* Calculadora de envío */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaCalculator className="text-3xl text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Calculadora de Costo de Envío</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Destino
                </label>
                <select
                  value={selectedRegion}
                  onChange={(e) => setSelectedRegion(e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="lima">Lima Metropolitana</option>
                  <option value="nacional">Provincias</option>
                </select>
              </div>
              
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Valor del carrito: S/ {cartValue}
                </label>
                <input
                  type="range"
                  min="50"
                  max="600"
                  step="10"
                  value={cartValue}
                  onChange={(e) => setCartValue(Number(e.target.value))}
                  className="w-full"
                />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>S/ 50</span>
                  <span>S/ 600</span>
                </div>
              </div>
            </div>

            <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-xl p-6 text-white">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-emerald-100 mb-1">Costo de envío estimado</p>
                  <p className="text-4xl font-bold">
                    {shippingCost === 0 ? '¡GRATIS!' : `S/ ${shippingCost}`}
                  </p>
                  {cartValue < 300 && (
                    <p className="text-sm text-emerald-100 mt-2 flex items-center gap-2">
                      <FaLightbulb className="flex-shrink-0" />
                      <span>Agrega S/ {300 - cartValue} más para envío gratis</span>
                    </p>
                  )}
                </div>
                <FaMoneyBillWave className="text-6xl text-white/20" />
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8 mb-12">
            
            {/* Tabla de precios */}
            <div className="lg:col-span-2">
              <PricingTable
                title="Costos y Tiempos de Entrega"
                description="Precios por zona y tiempo estimado de entrega"
                headers={['Zona', 'Costo', 'Tiempo de Entrega']}
                rows={selectedRegion === 'lima' ? pricingData.lima : pricingData.nacional}
              />
            </div>

            {/* Beneficios */}
            <div className="space-y-6">
              <div className="bg-white rounded-xl shadow-lg p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Beneficios</h3>
                <div className="space-y-4">
                  <div className="flex items-start gap-3">
                    <FaShieldAlt className="text-emerald-500 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Seguro Incluido</h4>
                      <p className="text-sm text-gray-600">Protección total contra daños</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaMapMarkerAlt className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Seguimiento Real</h4>
                      <p className="text-sm text-gray-600">Rastrea tu pedido 24/7</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaClock className="text-purple-500 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold text-gray-900">Entregas Puntuales</h4>
                      <p className="text-sm text-gray-600">95% de entregas a tiempo</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl shadow-lg p-6 text-white">
                <div className="flex items-center gap-2 mb-2">
                  <FaGift className="text-2xl" />
                  <h3 className="text-xl font-bold">Envío Gratis</h3>
                </div>
                <p className="text-emerald-100 mb-4">
                  En compras mayores a S/ 300
                </p>
                <div className="bg-white/20 rounded-lg p-3 text-sm">
                  Válido para todo el Perú excepto zonas rurales
                </div>
              </div>
            </div>
          </div>

          {/* Proceso de entrega */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center">
              ¿Cómo Funciona el Proceso de Entrega?
            </h2>
            <div className="max-w-3xl mx-auto">
              {deliverySteps.map((step, idx) => (
                <TimelineStep
                  key={idx}
                  number={step.number}
                  title={step.title}
                  description={step.description}
                  icon={step.icon}
                  status={step.status}
                  isLast={idx === deliverySteps.length - 1}
                />
              ))}
            </div>
          </div>

          {/* Cobertura */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaMapMarkerAlt className="text-3xl text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Cobertura Nacional</h2>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Principales Ciudades</h3>
                <ul className="space-y-2 text-gray-700">
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" />
                    Lima y Callao
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" />
                    Arequipa, Trujillo, Chiclayo
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" />
                    Cusco, Piura, Iquitos
                  </li>
                  <li className="flex items-center gap-2">
                    <FaCheckCircle className="text-emerald-500" />
                    Huancayo, Tacna, Pucallpa
                  </li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-bold text-gray-900 mb-3">Puntos de Entrega</h3>
                <div className="bg-emerald-50 rounded-lg p-4">
                  <p className="text-4xl font-bold text-emerald-600 mb-2">200+</p>
                  <p className="text-gray-700">
                    Puntos de entrega disponibles en todo el Perú para mayor comodidad
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* FAQs */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <div className="flex items-center gap-3 mb-6">
              <FaQuestionCircle className="text-3xl text-emerald-600" />
              <h2 className="text-2xl font-bold text-gray-900">Preguntas Frecuentes</h2>
            </div>
            
            <div className="space-y-4">
              {faqs.map((faq, idx) => (
                <details
                  key={idx}
                  className="group border border-gray-200 rounded-lg overflow-hidden"
                >
                  <summary className="flex items-center justify-between cursor-pointer p-4 hover:bg-gray-50 transition-colors">
                    <h3 className="font-semibold text-gray-900 pr-4">{faq.question}</h3>
                    <span className="text-emerald-500 text-xl group-open:rotate-180 transition-transform">
                      ▼
                    </span>
                  </summary>
                  <div className="p-4 pt-0 text-gray-600 border-t border-gray-100">
                    {faq.answer}
                  </div>
                </details>
              ))}
            </div>
          </div>

          {/* CTA */}
          <div className="mt-12 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <h2 className="text-3xl font-bold mb-4">¿Necesitas Ayuda con tu Entrega?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Nuestro equipo está listo para resolver todas tus dudas sobre envíos, tiempos de entrega y rastreo de pedidos.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/whatsapp-support"
                className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors inline-flex items-center gap-2"
              >
                <FaShieldAlt />
                Contactar Soporte
              </a>
              <a
                href="/help-center"
                className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors border-2 border-white inline-flex items-center gap-2"
              >
                <FaQuestionCircle />
                Centro de Ayuda
              </a>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default DeliveryTypesPage;
