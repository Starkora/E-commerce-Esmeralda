import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { SearchBar, CategoryFilter, ContactCard } from '@/components/shared';
import { 
  FaQuestionCircle, 
  FaChevronDown,
  FaShoppingBag,
  FaCreditCard,
  FaUndoAlt,
  FaTruck,
  FaUserCircle,
  FaWhatsapp,
  FaEnvelope,
  FaPhone,
  FaLightbulb
} from 'react-icons/fa';

interface FAQ {
  question: string;
  answer: string;
  category: string;
}

const faqs: FAQ[] = [
  // Pedidos y Envíos
  {
    category: 'Pedidos y Envíos',
    question: '¿Cómo puedo rastrear mi pedido?',
    answer: 'Puedes rastrear tu pedido desde la sección "Mis pedidos" en tu cuenta. También recibirás un número de guía por correo electrónico una vez que tu pedido sea enviado. Con este número podrás hacer seguimiento en tiempo real en nuestra página o en la del proveedor de logística.'
  },
  {
    category: 'Pedidos y Envíos',
    question: '¿Cuánto tiempo tarda en llegar mi pedido?',
    answer: 'Los tiempos de entrega varían según tu ubicación: Lima Metropolitana 1-2 días hábiles, principales ciudades (Arequipa, Trujillo, Chiclayo) 2-4 días hábiles, otras ciudades 3-5 días hábiles. Para envío express en Lima el mismo día (4-8 horas) tiene un costo adicional.'
  },
  {
    category: 'Pedidos y Envíos',
    question: '¿Cuánto cuesta el envío?',
    answer: 'El costo de envío es de S/ 15 en Lima Metropolitana y desde S/ 25 en provincias. ¡Buenas noticias! El envío es GRATIS en compras mayores a S/ 300 en todo el Perú (excepto zonas rurales).'
  },
  {
    category: 'Pedidos y Envíos',
    question: '¿Puedo cambiar la dirección de entrega después de hacer el pedido?',
    answer: 'Sí, puedes modificar la dirección de entrega antes de que el pedido sea enviado. Contacta inmediatamente a nuestro equipo por WhatsApp (+51 987 654 321) o correo indicando tu número de pedido y la nueva dirección.'
  },
  {
    category: 'Pedidos y Envíos',
    question: '¿Qué pasa si no estoy en casa al momento de la entrega?',
    answer: 'El repartidor dejará un aviso de visita y realizará hasta 2 intentos adicionales de entrega. También puedes solicitar que dejen el paquete con un vecino de confianza o redirigirlo a un punto de entrega cercano.'
  },
  {
    category: 'Pedidos y Envíos',
    question: '¿Hacen entregas los fines de semana?',
    answer: 'Sí, realizamos entregas de lunes a sábado en horario normal. Los domingos solo realizamos envíos express en Lima Metropolitana con un cargo adicional. Consulta disponibilidad al momento de tu compra.'
  },

  // Pagos
  {
    category: 'Pagos',
    question: '¿Cuáles son los métodos de pago disponibles?',
    answer: 'Aceptamos múltiples métodos de pago: Yape, Plin, tarjetas de crédito y débito (Visa, Mastercard, American Express), transferencia bancaria y pago contra entrega en zonas seleccionadas de Lima.'
  },
  {
    category: 'Pagos',
    question: '¿Es seguro pagar con tarjeta en su sitio web?',
    answer: 'Absolutamente. Utilizamos encriptación SSL de última generación y cumplimos con los estándares PCI DSS para garantizar la seguridad de tus datos. Nunca almacenamos información completa de tarjetas de crédito en nuestros servidores.'
  },
  {
    category: 'Pagos',
    question: '¿Puedo pagar con Yape o Plin?',
    answer: 'Sí, aceptamos Yape y Plin. Al finalizar tu compra, selecciona el método de pago preferido y recibirás las instrucciones para completar la transacción. Una vez confirmado el pago, procesaremos tu pedido inmediatamente.'
  },
  {
    category: 'Pagos',
    question: '¿Emiten factura o boleta?',
    answer: 'Sí, emitimos tanto boletas como facturas electrónicas. Puedes seleccionar el tipo de comprobante que necesites al momento de realizar tu pedido. Si requieres factura, asegúrate de proporcionar tu RUC y razón social correctamente.'
  },
  {
    category: 'Pagos',
    question: '¿Puedo pagar en cuotas?',
    answer: 'Sí, ofrecemos opciones de pago en cuotas sin intereses con tarjetas de crédito participantes. Las opciones disponibles (3, 6 o 12 cuotas) aparecerán automáticamente al seleccionar tu tarjeta, según el banco emisor.'
  },

  // Cambios y Devoluciones
  {
    category: 'Cambios y Devoluciones',
    question: '¿Cómo solicito un cambio o devolución?',
    answer: 'Tienes 30 días desde la recepción de tu pedido para solicitar cambios o devoluciones. Contáctanos por WhatsApp (+51 987 654 321) o correo (soporte@estiloesmeralda.com) indicando tu número de pedido y el motivo. Te guiaremos en el proceso paso a paso.'
  },
  {
    category: 'Cambios y Devoluciones',
    question: '¿Quién paga el envío de la devolución?',
    answer: 'Si el producto tiene defectos de fabricación o recibiste un artículo incorrecto, nosotros cubrimos el costo del envío. Si es por cambio de talla o simplemente no te gustó, el costo del envío de devolución corre por cuenta del cliente.'
  },
  {
    category: 'Cambios y Devoluciones',
    question: '¿En qué condiciones debe estar el producto para devolverlo?',
    answer: 'El producto debe estar sin usar, con todas sus etiquetas originales, en su empaque original y en perfectas condiciones. No se aceptan devoluciones de productos usados, lavados, alterados o sin etiquetas.'
  },
  {
    category: 'Cambios y Devoluciones',
    question: '¿Cuánto tiempo tarda el reembolso?',
    answer: 'Una vez que recibamos y validemos tu devolución, procesamos el reembolso en 3-5 días hábiles. El tiempo que tarde en reflejarse en tu cuenta depende de tu banco o método de pago, generalmente entre 5-10 días hábiles adicionales.'
  },

  // Productos y Tallas
  {
    category: 'Productos y Tallas',
    question: '¿Cómo saber cuál es mi talla ideal?',
    answer: 'Consulta nuestra guía de tallas detallada disponible en cada página de producto. Incluye medidas en centímetros para busto, cintura y cadera. Si tienes dudas, nuestro equipo por WhatsApp puede asesorarte personalmente para elegir la mejor opción.'
  },
  {
    category: 'Productos y Tallas',
    question: '¿Puedo ver los productos en tienda física antes de comprar?',
    answer: 'Sí, tenemos tiendas físicas donde puedes ver, probar y comprar nuestros productos. También ofrecemos la opción de "Retiro en Tienda" sin costo adicional: compras online y recoges en la sucursal más cercana en 24-48 horas.'
  },
  {
    category: 'Productos y Tallas',
    question: '¿Los colores de los productos son exactos a las fotos?',
    answer: 'Hacemos nuestro mejor esfuerzo para mostrar colores precisos, pero pueden variar ligeramente debido a la configuración de pantalla de cada dispositivo. Si el color no cumple tus expectativas, puedes hacer uso de nuestra política de cambios dentro de los 30 días.'
  },
  {
    category: 'Productos y Tallas',
    question: '¿Notifican cuando hay productos agotados nuevamente en stock?',
    answer: 'Sí, en productos agotados encontrarás el botón "Notificarme". Ingresa tu correo y te avisaremos automáticamente cuando vuelva a estar disponible. También puedes seguirnos en redes sociales para conocer los reabastecimientos.'
  },

  // Cuenta y Seguridad
  {
    category: 'Cuenta y Seguridad',
    question: '¿Qué hago si olvidé mi contraseña?',
    answer: 'En la página de inicio de sesión, haz clic en "¿Olvidaste tu contraseña?". Ingresa tu correo electrónico registrado y recibirás un enlace para restablecer tu contraseña. El enlace es válido por 24 horas por seguridad.'
  },
  {
    category: 'Cuenta y Seguridad',
    question: '¿Cómo actualizo mi información personal?',
    answer: 'Inicia sesión en tu cuenta y dirígete a "Mi Cuenta". Desde ahí puedes actualizar tu nombre, apellido, teléfono, correo y contraseña. Los cambios se guardan automáticamente y recibirás una confirmación por correo.'
  },
  {
    category: 'Cuenta y Seguridad',
    question: '¿Puedo tener múltiples direcciones de envío guardadas?',
    answer: 'Actualmente puedes guardar una dirección principal en tu perfil. Al realizar un pedido, siempre puedes ingresar una dirección diferente si necesitas enviar a otra ubicación específica.'
  },
  {
    category: 'Cuenta y Seguridad',
    question: '¿Cómo puedo eliminar mi cuenta?',
    answer: 'Si deseas eliminar tu cuenta permanentemente, contáctanos por correo a soporte@estiloesmeralda.com desde el correo registrado. Procesaremos tu solicitud en 48 horas. Ten en cuenta que esto eliminará todo tu historial de pedidos.'
  },

  // General
  {
    category: 'General',
    question: '¿Ofrecen descuentos o promociones?',
    answer: 'Sí, regularmente ofrecemos promociones, descuentos por temporada y ofertas especiales. Suscríbete a nuestro newsletter para recibir códigos de descuento exclusivos y ser el primero en conocer nuestras promociones.'
  },
  {
    category: 'General',
    question: '¿Puedo comprar al por mayor?',
    answer: 'Sí, manejamos ventas corporativas y al por mayor. Para cotizaciones especiales y condiciones preferenciales, contáctanos directamente por correo a ventas@estiloesmeralda.com con los detalles de tu solicitud.'
  },
];

const categories = [
  { name: 'Todos', icon: <FaLightbulb />, count: 0 },
  { name: 'Pedidos y Envíos', icon: <FaTruck />, count: 0 },
  { name: 'Pagos', icon: <FaCreditCard />, count: 0 },
  { name: 'Cambios y Devoluciones', icon: <FaUndoAlt />, count: 0 },
  { name: 'Productos y Tallas', icon: <FaShoppingBag />, count: 0 },
  { name: 'Cuenta y Seguridad', icon: <FaUserCircle />, count: 0 },
  { name: 'General', icon: <FaQuestionCircle />, count: 0 },
];

const FaqPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('Todos');

  // Calcular conteos de categorías
  const categoriesWithCounts = categories.map(cat => ({
    ...cat,
    count: cat.name === 'Todos' 
      ? faqs.length 
      : faqs.filter(faq => faq.category === cat.name).length
  }));

  // Filtrar FAQs
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = 
      faq.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'Todos' || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const contactMethods = [
    {
      icon: <FaWhatsapp />,
      title: "WhatsApp",
      value: "+51 987 654 321",
      description: "Respuesta en 5-10 min",
      href: "/whatsapp-support",
      color: "emerald" as const
    },
    {
      icon: <FaEnvelope />,
      title: "Email",
      value: "soporte@estiloesmeralda.com",
      description: "Respuesta en 24 hrs",
      href: "mailto:soporte@estiloesmeralda.com",
      color: "blue" as const
    },
    {
      icon: <FaPhone />,
      title: "Teléfono",
      value: "(01) 987-6543",
      description: "Lun-Sáb 9-18 hrs",
      href: "tel:+51987654321",
      color: "purple" as const
    },
  ];

  return (
    <>
      <Head>
        <title>Preguntas Frecuentes - Estilo Esmeralda</title>
        <meta name="description" content="Encuentra respuestas a todas tus preguntas sobre pedidos, pagos, cambios y más." />
      </Head>
      <Header />
      
      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12">
        <div className="max-w-5xl mx-auto px-4">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <FaQuestionCircle className="text-6xl text-emerald-600 mx-auto mb-4" />
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Preguntas Frecuentes
            </h1>
            <p className="text-lg text-gray-600">
              Encuentra respuestas rápidas a las preguntas más comunes
            </p>
          </div>

          {/* Buscador */}
          <div className="max-w-2xl mx-auto mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar preguntas..."
              variant="large"
              debounceMs={300}
            />
          </div>

          {/* Categorías */}
          <div className="mb-8">
            <CategoryFilter
              categories={categoriesWithCounts}
              activeCategory={selectedCategory}
              onCategoryChange={(category) => {
                setSelectedCategory(category);
                setOpenIndex(null);
              }}
              variant="buttons"
              showCount={true}
            />
          </div>

          {/* Lista de FAQs */}
          <div className="max-w-4xl mx-auto">
            {filteredFaqs.length === 0 ? (
              <div className="text-center py-12 bg-white rounded-2xl shadow-lg">
                <FaQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                <h3 className="text-xl font-bold text-gray-700 mb-2">
                  No se encontraron resultados
                </h3>
                <p className="text-gray-600 mb-6">
                  Intenta con otros términos de búsqueda o selecciona otra categoría
                </p>
                <button
                  onClick={() => {
                    setSearchQuery('');
                    setSelectedCategory('Todos');
                  }}
                  className="px-6 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition-colors"
                >
                  Ver todas las preguntas
                </button>
              </div>
            ) : (
              <div className="space-y-4">
                {filteredFaqs.map((faq, idx) => {
                  const isOpen = openIndex === idx;
                  const categoryInfo = categories.find(c => c.name === faq.category);
                  
                  return (
                    <div
                      key={idx}
                      className="bg-white rounded-xl shadow-md hover:shadow-lg transition-shadow duration-200 overflow-hidden"
                    >
                      <button
                        onClick={() => setOpenIndex(isOpen ? null : idx)}
                        className="w-full p-6 text-left flex items-start justify-between gap-4 hover:bg-gray-50 transition-colors"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-2">
                            <span className="px-3 py-1 bg-emerald-100 text-emerald-700 text-xs font-bold rounded-full">
                              {faq.category}
                            </span>
                          </div>
                          <h3 className="text-lg font-bold text-gray-900 mb-1">
                            {faq.question}
                          </h3>
                        </div>
                        <div className={`
                          flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center
                          transition-all duration-200
                          ${isOpen ? 'bg-emerald-500 text-white rotate-180' : 'bg-gray-100 text-gray-600'}
                        `}>
                          <FaChevronDown className="text-sm" />
                        </div>
                      </button>
                      
                      <div
                        className={`
                          transition-all duration-300 overflow-hidden
                          ${isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'}
                        `}
                      >
                        <div className="px-6 pb-6 pt-0">
                          <div className="pl-4 border-l-4 border-emerald-500">
                            <p className="text-gray-700 leading-relaxed">
                              {faq.answer}
                            </p>
                          </div>
                        </div>
                      </div>
                    </div>
                  );
                })}
              </div>
            )}

            {/* Contador de resultados */}
            {filteredFaqs.length > 0 && (
              <div className="mt-6 text-center text-gray-600">
                Mostrando {filteredFaqs.length} de {faqs.length} preguntas
              </div>
            )}
          </div>

          {/* CTA de contacto */}
          <div className="mt-16 bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-8 text-white">
            <div className="text-center mb-6">
              <h2 className="text-3xl font-bold mb-2">¿No encontraste tu respuesta?</h2>
              <p className="text-emerald-100">
                Nuestro equipo de soporte está disponible para ayudarte con cualquier duda
              </p>
            </div>
            
            <div className="grid md:grid-cols-3 gap-4 max-w-3xl mx-auto">
              {contactMethods.map((method, idx) => (
                <ContactCard
                  key={idx}
                  icon={method.icon}
                  title={method.title}
                  value={method.value}
                  description={method.description}
                  href={method.href}
                  color={method.color}
                  variant="compact"
                  className="bg-white/10 hover:bg-white/20 backdrop-blur rounded-xl p-4 text-white"
                />
              ))}
            </div>

            <div className="mt-6 text-center">
              <a
                href="/help-center"
                className="inline-block px-8 py-3 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors"
              >
                Ir al Centro de Ayuda
              </a>
            </div>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default FaqPage;