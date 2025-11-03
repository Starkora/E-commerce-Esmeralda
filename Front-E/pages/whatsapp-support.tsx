
import React, { useState, useEffect } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { StatCard, ContactCard } from '@/components/shared';
import { 
  FaWhatsapp, 
  FaClock, 
  FaCheckCircle, 
  FaHeadset,
  FaShoppingBag,
  FaUndoAlt,
  FaQuestionCircle,
  FaCopy,
  FaStar,
  FaBolt,
  FaUserFriends,
  FaPhoneAlt,
  FaEnvelope,
  FaPhone,
  FaSave
} from 'react-icons/fa';

const WHATSAPP_NUMBER = '51987654321'; // Número peruano
const BUSINESS_HOURS = {
  start: 9,
  end: 18,
  days: [1, 2, 3, 4, 5, 6], // Lunes a Sábado
};

const WhatsappSupportPage: React.FC = () => {
  const [isOnline, setIsOnline] = useState(false);
  const [copiedIndex, setCopiedIndex] = useState<number | null>(null);

  // Verificar si está dentro del horario de atención
  useEffect(() => {
    const checkAvailability = () => {
      const now = new Date();
      const day = now.getDay();
      const hour = now.getHours();
      
      const isBusinessDay = BUSINESS_HOURS.days.includes(day);
      const isBusinessHour = hour >= BUSINESS_HOURS.start && hour < BUSINESS_HOURS.end;
      
      setIsOnline(isBusinessDay && isBusinessHour);
    };

    checkAvailability();
    const interval = setInterval(checkAvailability, 60000); // Actualizar cada minuto

    return () => clearInterval(interval);
  }, []);

  const departments = [
    {
      name: 'Ventas',
      icon: <FaShoppingBag />,
      color: 'emerald' as const,
      message: 'Hola! Quiero consultar sobre productos y realizar una compra',
      description: 'Consultas sobre productos, precios y compras'
    },
    {
      name: 'Soporte',
      icon: <FaHeadset />,
      color: 'blue' as const,
      message: 'Hola! Necesito ayuda con mi pedido',
      description: 'Seguimiento de pedidos y asistencia técnica'
    },
    {
      name: 'Cambios y Devoluciones',
      icon: <FaUndoAlt />,
      color: 'orange' as const,
      message: 'Hola! Quiero solicitar un cambio o devolución',
      description: 'Gestión de cambios, devoluciones y garantías'
    },
  ];

  const statistics = [
    {
      icon: <FaBolt />,
      number: "5-10 min",
      label: "Tiempo de respuesta promedio",
      color: "orange" as const,
      variant: "default" as const
    },
    {
      icon: <FaUserFriends />,
      number: "10,000+",
      label: "Clientes atendidos",
      color: "blue" as const,
      variant: "default" as const
    },
    {
      icon: <FaStar />,
      number: "4.9/5",
      label: "Satisfacción del cliente",
      color: "emerald" as const,
      variant: "default" as const
    },
  ];

  const quickMessages = [
    {
      title: '¿Cuál es el estado de mi pedido?',
      message: 'Hola! Quiero consultar el estado de mi pedido. Mi número de orden es: [TU NÚMERO]'
    },
    {
      title: '¿Tienen este producto en otra talla?',
      message: 'Hola! Me interesa un producto pero necesito otra talla. ¿Tienen disponibilidad?'
    },
    {
      title: '¿Cuánto tarda el envío a mi zona?',
      message: 'Hola! Quiero saber los tiempos de envío para mi ubicación en: [TU CIUDAD]'
    },
    {
      title: 'Necesito cambiar mi dirección de envío',
      message: 'Hola! Realicé un pedido y necesito cambiar la dirección de envío. Mi número de orden es: [TU NÚMERO]'
    },
  ];

  const handleCopyMessage = (message: string, index: number) => {
    navigator.clipboard.writeText(message);
    setCopiedIndex(index);
    setTimeout(() => setCopiedIndex(null), 2000);
  };

  const openWhatsApp = (message: string = '') => {
    const encodedMessage = encodeURIComponent(message);
    window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${encodedMessage}`, '_blank');
  };

  const saveContact = () => {
    // Crear un vCard
    const vcard = `BEGIN:VCARD
VERSION:3.0
FN:Estilo Esmeralda Soporte
TEL;TYPE=CELL:+${WHATSAPP_NUMBER}
END:VCARD`;
    
    const blob = new Blob([vcard], { type: 'text/vcard' });
    const url = URL.createObjectURL(blob);
    
    const link = document.createElement('a');
    link.href = url;
    link.download = 'EstiloEsmeralda_Soporte.vcf';
    link.click();
    
    URL.revokeObjectURL(url);
  };

  return (
    <>
      <Head>
        <title>Soporte por WhatsApp - Estilo Esmeralda</title>
        <meta name="description" content="Contacta con nuestro equipo de soporte por WhatsApp. Respuesta rápida y personalizada." />
      </Head>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-emerald-100 py-12">
        <div className="max-w-6xl mx-auto px-4">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-green-100 mb-4 relative">
              <FaWhatsapp className="text-green-600 text-5xl" />
              {isOnline && (
                <span className="absolute -top-1 -right-1 w-6 h-6 bg-green-500 rounded-full border-4 border-white animate-pulse" />
              )}
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Soporte por WhatsApp
            </h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Estamos listos para ayudarte. Contacta directamente con nuestro equipo.
            </p>
            
            {/* Estado en línea */}
            <div className="mt-6 inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white shadow-md">
              <div className={`w-3 h-3 rounded-full ${isOnline ? 'bg-green-500 animate-pulse' : 'bg-gray-400'}`} />
              <span className={`font-medium ${isOnline ? 'text-green-700' : 'text-gray-600'}`}>
                {isOnline ? 'En línea - Respuesta en 5-10 min' : 'Fuera de línea - Responderemos pronto'}
              </span>
            </div>
          </div>

          {/* Estadísticas */}
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

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* Departamentos */}
            <div className="lg:col-span-2 space-y-6">
              
              {/* Contacto rápido por departamento */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Elige tu Departamento</h2>
                <div className="grid md:grid-cols-3 gap-4">
                  {departments.map((dept, idx) => (
                    <button
                      key={idx}
                      onClick={() => openWhatsApp(dept.message)}
                      className="group relative p-6 rounded-xl border-2 border-gray-200 hover:border-green-500 hover:shadow-lg transition-all duration-200 text-left"
                    >
                      <div className={`text-4xl text-${dept.color}-600 mb-3 group-hover:scale-110 transition-transform`}>
                        {dept.icon}
                      </div>
                      <h3 className="font-bold text-gray-900 mb-2">{dept.name}</h3>
                      <p className="text-sm text-gray-600 mb-4">{dept.description}</p>
                      <div className="flex items-center gap-2 text-green-600 font-medium text-sm">
                        <FaWhatsapp />
                        <span>Chatear ahora</span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>

              {/* Mensajes rápidos */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Mensajes Rápidos</h2>
                <p className="text-gray-600 mb-4">Copia y pega estos mensajes para agilizar tu consulta</p>
                <div className="space-y-3">
                  {quickMessages.map((msg, idx) => (
                    <div key={idx} className="border border-gray-200 rounded-lg p-4 hover:border-green-500 transition-colors">
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-1">
                          <h3 className="font-semibold text-gray-900 mb-2">{msg.title}</h3>
                          <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">{msg.message}</p>
                        </div>
                        <button
                          onClick={() => handleCopyMessage(msg.message, idx)}
                          className={`flex-shrink-0 p-2 rounded-lg transition-colors ${
                            copiedIndex === idx 
                              ? 'bg-green-100 text-green-700' 
                              : 'bg-gray-100 hover:bg-gray-200 text-gray-700'
                          }`}
                          title="Copiar mensaje"
                        >
                          {copiedIndex === idx ? <FaCheckCircle /> : <FaCopy />}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* FAQ Rápido */}
              <div className="bg-white rounded-2xl shadow-lg p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">Respuestas Instantáneas</h2>
                <div className="space-y-4">
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FaQuestionCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">¿Cuál es el horario de atención?</h3>
                      <p className="text-gray-600 text-sm">Lunes a Sábado de 9:00 a 18:00 hrs (GMT-5)</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FaQuestionCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">¿Qué información necesito para consultar mi pedido?</h3>
                      <p className="text-gray-600 text-sm">Tu número de orden y correo electrónico registrado</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-3 p-4 bg-gray-50 rounded-lg">
                    <FaQuestionCircle className="text-green-600 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <h3 className="font-semibold text-gray-900 mb-1">¿Responden fuera del horario?</h3>
                      <p className="text-gray-600 text-sm">Puedes enviar tu mensaje y te responderemos al iniciar labores</p>
                    </div>
                  </div>
                </div>
              </div>

            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Contacto principal */}
              <div className="bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl shadow-lg p-8 text-white sticky top-4">
                <div className="text-center mb-6">
                  <FaWhatsapp className="text-6xl mx-auto mb-4" />
                  <h3 className="text-2xl font-bold mb-2">Chatea con Nosotros</h3>
                  <p className="text-green-100">Respuesta inmediata</p>
                </div>
                
                <button
                  onClick={() => openWhatsApp()}
                  className="w-full bg-white text-green-600 font-bold py-4 px-6 rounded-xl hover:bg-green-50 transition-colors mb-4 flex items-center justify-center gap-2 text-lg"
                >
                  <FaWhatsapp className="text-2xl" />
                  Abrir WhatsApp
                </button>

                <div className="space-y-3 text-sm">
                  <div className="flex items-center gap-2 text-green-100">
                    <FaPhoneAlt className="flex-shrink-0" />
                    <span className="font-mono">+51 987 654 321</span>
                  </div>
                  <button
                    onClick={saveContact}
                    className="w-full text-center py-2 px-4 border-2 border-white/30 rounded-lg hover:bg-white/10 transition-colors flex items-center justify-center gap-2"
                  >
                    <FaSave />
                    Guardar Contacto
                  </button>
                </div>
              </div>

              {/* Horario detallado */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <div className="flex items-center gap-2 mb-4">
                  <FaClock className="text-emerald-600 text-xl" />
                  <h3 className="text-lg font-bold text-gray-900">Horarios de Atención</h3>
                </div>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Lunes - Viernes</span>
                    <span className="text-gray-900 font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2 border-b border-gray-100">
                    <span className="text-gray-700 font-medium">Sábado</span>
                    <span className="text-gray-900 font-semibold">9:00 - 18:00</span>
                  </div>
                  <div className="flex justify-between items-center py-2">
                    <span className="text-gray-700 font-medium">Domingo</span>
                    <span className="text-red-600 font-semibold">Cerrado</span>
                  </div>
                </div>
                <div className="mt-4 p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-700">
                    <strong>Nota:</strong> Fuera del horario puedes enviar tu mensaje y te responderemos a primera hora.
                  </p>
                </div>
              </div>

              {/* Otros canales */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-lg font-bold text-gray-900 mb-4">Otros Canales</h3>
                <div className="space-y-3 text-sm">
                  <a 
                    href="mailto:soporte@estiloesmeralda.com"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaEnvelope className="text-blue-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Email</p>
                      <p className="text-gray-600 text-xs">24-48 hrs</p>
                    </div>
                  </a>
                  <a 
                    href="tel:+51987654321"
                    className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-50 transition-colors"
                  >
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center flex-shrink-0">
                      <FaPhone className="text-purple-600 text-lg" />
                    </div>
                    <div>
                      <p className="font-medium text-gray-900">Teléfono</p>
                      <p className="text-gray-600 text-xs">(01) 987-6543</p>
                    </div>
                  </a>
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default WhatsappSupportPage;
