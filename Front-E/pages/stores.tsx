import React, { useState } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { StoreCard, StatCard, SearchBar, InfoCard } from '@/components/shared';
import {
  FaStore,
  FaMapMarkerAlt,
  FaClock,
  FaPhone,
  FaShoppingBag,
  FaUsers,
  FaAward,
  FaCheckCircle,
  FaParking,
  FaWheelchair,
  FaWifi,
  FaCreditCard
} from 'react-icons/fa';

const StoresPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCity, setSelectedCity] = useState('Todas');

  const stores = [
    {
      id: 1,
      name: 'Estilo Esmeralda - Miraflores',
      address: 'Av. Larco 1234, Centro Comercial Larcomar',
      city: 'Lima',
      phone: '+51 987 654 321',
      hours: {
        weekday: '10:00 - 21:00',
        weekend: '10:00 - 22:00',
      },
      mapUrl: 'https://maps.google.com/?q=Larcomar+Miraflores',
      imageUrl: '/assets/stores/store1.jpg',
      featured: true,
    },
    {
      id: 2,
      name: 'Estilo Esmeralda - San Isidro',
      address: 'Av. Conquistadores 890, Plaza San Miguel',
      city: 'Lima',
      phone: '+51 987 654 322',
      hours: {
        weekday: '09:00 - 20:00',
        weekend: '10:00 - 20:00',
      },
      mapUrl: 'https://maps.google.com/?q=San+Isidro+Lima',
      imageUrl: '/assets/stores/store2.jpg',
    },
    {
      id: 3,
      name: 'Estilo Esmeralda - Arequipa Centro',
      address: 'Portal de Flores 123, Plaza de Armas',
      city: 'Arequipa',
      phone: '+51 987 654 323',
      hours: {
        weekday: '09:00 - 20:00',
        weekend: '10:00 - 19:00',
      },
      mapUrl: 'https://maps.google.com/?q=Plaza+Armas+Arequipa',
      imageUrl: '/assets/stores/store3.jpg',
    },
    {
      id: 4,
      name: 'Estilo Esmeralda - Cusco',
      address: 'Av. El Sol 456, Centro Histórico',
      city: 'Cusco',
      phone: '+51 987 654 324',
      hours: {
        weekday: '09:00 - 19:00',
        weekend: '10:00 - 18:00',
      },
      mapUrl: 'https://maps.google.com/?q=Centro+Cusco',
      imageUrl: '/assets/stores/store4.jpg',
    },
    {
      id: 5,
      name: 'Estilo Esmeralda - Trujillo',
      address: 'Jr. Pizarro 789, Centro Comercial Mall Aventura',
      city: 'Trujillo',
      phone: '+51 987 654 325',
      hours: {
        weekday: '10:00 - 21:00',
        weekend: '10:00 - 21:00',
      },
      mapUrl: 'https://maps.google.com/?q=Mall+Aventura+Trujillo',
      imageUrl: '/assets/stores/store5.jpg',
    },
    {
      id: 6,
      name: 'Estilo Esmeralda - Chiclayo',
      address: 'Av. Balta 234, Real Plaza Chiclayo',
      city: 'Chiclayo',
      phone: '+51 987 654 326',
      hours: {
        weekday: '10:00 - 21:00',
        weekend: '10:00 - 21:00',
      },
      mapUrl: 'https://maps.google.com/?q=Real+Plaza+Chiclayo',
      imageUrl: '/assets/stores/store6.jpg',
    },
  ];

  const cities = ['Todas', 'Lima', 'Arequipa', 'Cusco', 'Trujillo', 'Chiclayo'];

  const statistics = [
    {
      icon: <FaStore />,
      number: '15+',
      label: 'Tiendas en todo el Perú',
      color: 'emerald' as const,
      variant: 'default' as const,
    },
    {
      icon: <FaUsers />,
      number: '50,000+',
      label: 'Clientes atendidos',
      color: 'blue' as const,
      variant: 'default' as const,
    },
    {
      icon: <FaAward />,
      number: '10 años',
      label: 'De experiencia',
      color: 'purple' as const,
      variant: 'default' as const,
    },
  ];

  const storeFeatures = [
    {
      icon: <FaParking className="text-emerald-500 text-4xl" />,
      title: 'Estacionamiento Gratuito',
      description: 'Todas nuestras tiendas cuentan con estacionamiento disponible para tu comodidad.',
      features: ['Espacios amplios', 'Seguridad 24/7', 'Sin costo adicional'],
    },
    {
      icon: <FaWheelchair className="text-blue-500 text-4xl" />,
      title: 'Accesibilidad Total',
      description: 'Instalaciones completamente accesibles para personas con movilidad reducida.',
      features: ['Rampas de acceso', 'Ascensores', 'Probadores adaptados'],
    },
    {
      icon: <FaWifi className="text-purple-500 text-4xl" />,
      title: 'WiFi Gratis',
      description: 'Conéctate a internet mientras compras en cualquiera de nuestras tiendas.',
      features: ['Alta velocidad', 'Conexión segura', 'Sin límite de tiempo'],
    },
    {
      icon: <FaCreditCard className="text-orange-500 text-4xl" />,
      title: 'Múltiples Formas de Pago',
      description: 'Acepta todas las tarjetas, efectivo, yape y transferencias bancarias.',
      features: ['Tarjetas de crédito/débito', 'Yape y Plin', 'Cuotas sin intereses'],
    },
  ];

  const filteredStores = stores.filter((store) => {
    const matchesSearch = store.name
      .toLowerCase()
      .includes(searchQuery.toLowerCase()) ||
      store.address.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCity = selectedCity === 'Todas' || store.city === selectedCity;
    return matchesSearch && matchesCity;
  });

  return (
    <>
      <Head>
        <title>Nuestras Tiendas - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Encuentra tu tienda Estilo Esmeralda más cercana. 15+ tiendas en todo el Perú con la mejor atención."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
              <FaStore className="text-emerald-600 text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Nuestras Tiendas
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Visítanos en cualquiera de nuestras tiendas y descubre la mejor
              experiencia de compra en moda femenina.
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

          {/* Search and Filter */}
          <div className="bg-white rounded-2xl shadow-lg p-6 mb-12">
            <div className="grid md:grid-cols-2 gap-4">
              {/* Search Bar */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Buscar tienda
                </label>
                <SearchBar
                  value={searchQuery}
                  onChange={setSearchQuery}
                  placeholder="Buscar por nombre o dirección..."
                  variant="default"
                />
              </div>

              {/* City Filter */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Filtrar por ciudad
                </label>
                <select
                  value={selectedCity}
                  onChange={(e) => setSelectedCity(e.target.value)}
                  className="w-full px-4 py-3 border-2 border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                >
                  {cities.map((city) => (
                    <option key={city} value={city}>
                      {city}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Results Count */}
            <div className="mt-4 text-center text-gray-600">
              Mostrando <span className="font-bold text-gray-900">{filteredStores.length}</span> tienda(s)
            </div>
          </div>

          {/* Stores Grid */}
          {filteredStores.length > 0 ? (
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
              {filteredStores.map((store) => (
                <StoreCard
                  key={store.id}
                  name={store.name}
                  address={store.address}
                  city={store.city}
                  phone={store.phone}
                  hours={store.hours}
                  mapUrl={store.mapUrl}
                  imageUrl={store.imageUrl}
                  featured={store.featured}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16 bg-white rounded-2xl shadow-lg">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <FaStore className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No se encontraron tiendas
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta ajustar tu búsqueda o filtros
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setSelectedCity('Todas');
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Mostrar Todas las Tiendas
              </button>
            </div>
          )}

          {/* Store Features */}
          <div className="mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">
              ¿Qué Encontrarás en Nuestras Tiendas?
            </h2>
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
              {storeFeatures.map((feature, idx) => (
                <InfoCard
                  key={idx}
                  icon={feature.icon}
                  title={feature.title}
                  description={feature.description}
                  features={feature.features}
                />
              ))}
            </div>
          </div>

          {/* General Store Hours */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <div className="flex items-center gap-3 mb-6">
              <FaClock className="text-emerald-600 text-3xl" />
              <h2 className="text-2xl font-bold text-gray-900">
                Horarios Generales
              </h2>
            </div>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  Tiendas en Centros Comerciales
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">
                      Lunes - Domingo
                    </span>
                    <span className="text-gray-900 font-semibold">
                      10:00 - 22:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Feriados</span>
                    <span className="text-gray-900 font-semibold">
                      10:00 - 20:00
                    </span>
                  </div>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-gray-900 mb-4">
                  Tiendas en Calle
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">
                      Lunes - Sábado
                    </span>
                    <span className="text-gray-900 font-semibold">
                      09:00 - 20:00
                    </span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Domingo</span>
                    <span className="text-red-600 font-semibold">Cerrado</span>
                  </div>
                </div>
              </div>
            </div>
            <div className="mt-6 p-4 bg-blue-50 rounded-lg">
              <p className="text-sm text-blue-700">
                <strong>Nota:</strong> Los horarios pueden variar según la
                ubicación y fechas especiales. Verifica el horario específico de
                cada tienda antes de visitarnos.
              </p>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-12">
            <h2 className="text-2xl font-bold text-gray-900 mb-6">
              Beneficios de Comprar en Tienda
            </h2>
            <div className="grid md:grid-cols-2 gap-6">
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Prueba antes de comprar
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Todos nuestros probadores están disponibles para que encuentres
                    tu talla perfecta
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Asesoramiento personalizado
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Nuestro equipo experto te ayudará a encontrar el look perfecto
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Lleva tu compra al instante
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Sin esperas de envío, tu producto está listo para usar
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <FaCheckCircle className="text-emerald-500 text-xl mt-1 flex-shrink-0" />
                <div>
                  <h3 className="font-semibold text-gray-900 mb-1">
                    Promociones exclusivas
                  </h3>
                  <p className="text-gray-600 text-sm">
                    Ofertas especiales solo disponibles en tienda física
                  </p>
                </div>
              </div>
            </div>
          </div>

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaShoppingBag className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">
              ¿Tienes Preguntas sobre Nuestras Tiendas?
            </h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Contáctanos para consultar disponibilidad de productos, horarios
              especiales o cualquier otra duda.
            </p>
            <div className="flex flex-wrap gap-4 justify-center">
              <a
                href="/contact"
                className="bg-white text-emerald-600 font-bold px-8 py-3 rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Contactar
              </a>
              <a
                href="/whatsapp-support"
                className="bg-emerald-600 text-white font-bold px-8 py-3 rounded-lg hover:bg-emerald-700 transition-colors border-2 border-white"
              >
                WhatsApp
              </a>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
};

export default StoresPage;
