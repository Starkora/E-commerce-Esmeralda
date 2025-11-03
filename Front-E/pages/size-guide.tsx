import React from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { FaRulerCombined } from 'react-icons/fa';

const SizeGuidePage: React.FC = () => {
  return (
    <>
      <Head>
        <title>Guía de Tallas - Estilo Esmeralda</title>
        <meta name="description" content="Encuentra tu talla perfecta con nuestra guía de medidas detallada." />
      </Head>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-emerald-100 mb-4">
              <FaRulerCombined className="text-emerald-600 text-3xl" />
            </div>
            <h1 className="text-4xl font-bold mb-4 text-gray-900">Guía de Tallas</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Encuentra tu talla perfecta consultando nuestras tablas de medidas
            </p>
          </div>

          {/* Cómo medir */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">¿Cómo tomar tus medidas?</h2>
            <div className="grid md:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="bg-emerald-50 rounded-lg p-4 mb-3">
                  <p className="font-bold text-emerald-700">1. Pecho/Busto</p>
                </div>
                <p className="text-sm text-gray-600">Mide alrededor de la parte más amplia del pecho</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-50 rounded-lg p-4 mb-3">
                  <p className="font-bold text-emerald-700">2. Cintura</p>
                </div>
                <p className="text-sm text-gray-600">Mide la parte más estrecha de tu cintura natural</p>
              </div>
              <div className="text-center">
                <div className="bg-emerald-50 rounded-lg p-4 mb-3">
                  <p className="font-bold text-emerald-700">3. Cadera</p>
                </div>
                <p className="text-sm text-gray-600">Mide alrededor de la parte más amplia de tus caderas</p>
              </div>
            </div>
          </div>

          {/* Tabla Mujer */}
          <div className="bg-white rounded-2xl shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Tallas Mujer</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-emerald-50">
                    <th className="px-4 py-3 font-semibold text-emerald-700">Talla</th>
                    <th className="px-4 py-3 font-semibold text-emerald-700">Pecho (cm)</th>
                    <th className="px-4 py-3 font-semibold text-emerald-700">Cintura (cm)</th>
                    <th className="px-4 py-3 font-semibold text-emerald-700">Cadera (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">XS</td>
                    <td className="px-4 py-3">80-84</td>
                    <td className="px-4 py-3">60-64</td>
                    <td className="px-4 py-3">86-90</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">S</td>
                    <td className="px-4 py-3">84-88</td>
                    <td className="px-4 py-3">64-68</td>
                    <td className="px-4 py-3">90-94</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">M</td>
                    <td className="px-4 py-3">88-92</td>
                    <td className="px-4 py-3">68-72</td>
                    <td className="px-4 py-3">94-98</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">L</td>
                    <td className="px-4 py-3">92-96</td>
                    <td className="px-4 py-3">72-76</td>
                    <td className="px-4 py-3">98-102</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">XL</td>
                    <td className="px-4 py-3">96-100</td>
                    <td className="px-4 py-3">76-80</td>
                    <td className="px-4 py-3">102-106</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Tabla Hombre */}
          <div className="bg-white rounded-2xl shadow-lg p-8">
            <h2 className="text-2xl font-bold mb-6 text-gray-900">Tallas Hombre</h2>
            <div className="overflow-x-auto">
              <table className="w-full text-left">
                <thead>
                  <tr className="bg-blue-50">
                    <th className="px-4 py-3 font-semibold text-blue-700">Talla</th>
                    <th className="px-4 py-3 font-semibold text-blue-700">Pecho (cm)</th>
                    <th className="px-4 py-3 font-semibold text-blue-700">Cintura (cm)</th>
                    <th className="px-4 py-3 font-semibold text-blue-700">Cadera (cm)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200">
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">S</td>
                    <td className="px-4 py-3">88-92</td>
                    <td className="px-4 py-3">74-78</td>
                    <td className="px-4 py-3">92-96</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">M</td>
                    <td className="px-4 py-3">92-96</td>
                    <td className="px-4 py-3">78-82</td>
                    <td className="px-4 py-3">96-100</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">L</td>
                    <td className="px-4 py-3">96-100</td>
                    <td className="px-4 py-3">82-86</td>
                    <td className="px-4 py-3">100-104</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">XL</td>
                    <td className="px-4 py-3">100-104</td>
                    <td className="px-4 py-3">86-90</td>
                    <td className="px-4 py-3">104-108</td>
                  </tr>
                  <tr className="hover:bg-gray-50">
                    <td className="px-4 py-3 font-medium">XXL</td>
                    <td className="px-4 py-3">104-108</td>
                    <td className="px-4 py-3">90-94</td>
                    <td className="px-4 py-3">108-112</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          {/* Ayuda adicional */}
          <div className="mt-8 bg-emerald-50 rounded-2xl p-6 text-center">
            <p className="text-gray-700 mb-4">
              <strong>¿Aún tienes dudas sobre tu talla?</strong>
            </p>
            <p className="text-gray-600 mb-4">
              Contáctanos por WhatsApp y te ayudaremos a elegir la talla perfecta
            </p>
            <a
              href="https://wa.me/521234567890?text=Hola,%20necesito%20ayuda%20con%20las%20tallas"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-block px-6 py-3 bg-green-500 hover:bg-green-600 text-white font-semibold rounded-lg transition-colors"
            >
              Contactar por WhatsApp
            </a>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default SizeGuidePage;
