
import React, { useState } from 'react';
import Head from 'next/head';
import Header from '../components/header';
import Footer from '../components/footer';
import { 
  FaRegQuestionCircle, 
  FaChevronDown, 
  FaChevronUp, 
  FaSearch,
  FaWhatsapp,
  FaBox,
  FaCreditCard,
  FaUndoAlt,
  FaUser,
  FaTshirt,
  FaClock,
  FaEnvelope,
  FaPhone,
  FaMapMarkerAlt,
  FaRulerCombined,
  FaShippingFast
} from 'react-icons/fa';
import Link from 'next/link';

type FAQ = {
  question: string;
  answer: string;
  category: 'pedidos' | 'pagos' | 'devoluciones' | 'cuenta' | 'productos';
};

const faqs: FAQ[] = [
  {
    category: 'pedidos',
    question: '¿Cómo puedo rastrear mi pedido?',
    answer: 'Puedes rastrear tu pedido desde la sección "Mis Pedidos" en tu cuenta o consultando el enlace de seguimiento enviado por correo tras la compra. También puedes contactarnos por WhatsApp con tu número de pedido.'
  },
  {
    category: 'pedidos',
    question: '¿Cuánto tarda en llegar mi pedido?',
    answer: 'Los tiempos de entrega varían según tu ubicación: Lima Metropolitana (2-3 días), Provincias (5-7 días). Recibirás una notificación cuando tu pedido esté en camino.'
  },
  {
    category: 'pedidos',
    question: '¿Puedo modificar mi pedido después de realizarlo?',
    answer: 'Si tu pedido aún no ha sido procesado, puedes solicitar cambios contactándonos inmediatamente por WhatsApp o correo con tu número de pedido.'
  },
  {
    category: 'pagos',
    question: '¿Cuáles son los métodos de pago disponibles?',
    answer: 'Aceptamos Yape, Plin, tarjetas de crédito/débito (Visa, Mastercard), transferencia bancaria y pago contra entrega en zonas seleccionadas de Lima.'
  },
  {
    category: 'pagos',
    question: '¿Es seguro pagar con tarjeta en su sitio?',
    answer: 'Sí, utilizamos encriptación SSL y procesadores de pago certificados para garantizar la seguridad de tus transacciones. Nunca almacenamos tu información bancaria.'
  },
  {
    category: 'pagos',
    question: '¿Emiten factura o boleta?',
    answer: 'Sí, emitimos comprobantes electrónicos. Puedes solicitar factura o boleta al momento de realizar tu compra. El comprobante se enviará a tu correo.'
  },
  {
    category: 'devoluciones',
    question: '¿Cómo solicito un cambio o devolución?',
    answer: 'Tienes 30 días desde la recepción para solicitar cambios o devoluciones. Contáctanos por WhatsApp o correo indicando tu número de pedido y motivo. El producto debe estar sin uso y con etiquetas.'
  },
  {
    category: 'devoluciones',
    question: '¿Cuánto tarda el proceso de devolución?',
    answer: 'Una vez recibido el producto, verificamos su estado (1-2 días) y procesamos el reembolso en 5-7 días hábiles. Para cambios, enviamos el nuevo producto de inmediato.'
  },
  {
    category: 'devoluciones',
    question: '¿Quién cubre el costo de envío en devoluciones?',
    answer: 'Si el producto tiene defectos o error de envío, cubrimos el costo. Si es cambio de opinión, el costo de envío corre por cuenta del cliente.'
  },
  {
    category: 'cuenta',
    question: '¿Qué hago si tengo problemas con mi cuenta?',
    answer: 'Puedes restablecer tu contraseña desde la pantalla de login usando "¿Olvidó su contraseña?". Si tienes otros problemas, escríbenos para asistencia personalizada.'
  },
  {
    category: 'cuenta',
    question: '¿Cómo actualizo mi información personal?',
    answer: 'Inicia sesión en "Mi Cuenta" donde podrás editar tu nombre, apellido, correo, teléfono y dirección de envío.'
  },
  {
    category: 'cuenta',
    question: '¿Puedo eliminar mi cuenta?',
    answer: 'Sí, puedes solicitar la eliminación de tu cuenta y datos personales contactándonos por correo. Procesamos la solicitud en 48 horas según la ley de protección de datos.'
  },
  {
    category: 'productos',
    question: '¿Cómo saber la talla ideal?',
    answer: 'Consulta nuestra guía de tallas en cada producto o solicita asesoría por WhatsApp. También puedes ver las medidas exactas en la descripción del producto.'
  },
  {
    category: 'productos',
    question: '¿Los productos son originales?',
    answer: 'Todas nuestras prendas son auténticas y trabajamos directamente con marcas y proveedores certificados. Garantizamos la calidad de cada producto.'
  },
  {
    category: 'productos',
    question: '¿Tienen tienda física?',
    answer: 'Actualmente operamos solo online, pero puedes agendar una cita para ver productos en nuestro showroom en Lima (previa coordinación por WhatsApp).'
  },
];

const categories = [
  { id: 'pedidos', name: 'Pedidos y Envíos', icon: FaBox, color: 'emerald' },
  { id: 'pagos', name: 'Pagos', icon: FaCreditCard, color: 'blue' },
  { id: 'devoluciones', name: 'Cambios y Devoluciones', icon: FaUndoAlt, color: 'orange' },
  { id: 'cuenta', name: 'Mi Cuenta', icon: FaUser, color: 'purple' },
  { id: 'productos', name: 'Productos', icon: FaTshirt, color: 'pink' },
];

const quickLinks = [
  { name: 'Rastrear Pedido', href: '/account/orders', icon: FaShippingFast },
  { name: 'Guía de Tallas', href: '/size-guide', icon: FaRulerCombined },
  { name: 'Política de Devoluciones', href: '/return-policy', icon: FaUndoAlt },
  { name: 'Formas de Envío', href: '/delivery-types', icon: FaBox },
];

const HelpCenterPage: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [contactForm, setContactForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  // Filtrar FAQs por búsqueda y categoría
  const filteredFaqs = faqs.filter(faq => {
    const matchesSearch = searchTerm === '' || 
      faq.question.toLowerCase().includes(searchTerm.toLowerCase()) ||
      faq.answer.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === null || faq.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleContactSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Simular envío de formulario
    setTimeout(() => {
      const toast = require('react-hot-toast').default;
      toast.success('Mensaje enviado exitosamente. Te responderemos pronto.');
      setContactForm({ name: '', email: '', subject: '', message: '' });
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <>
      <Head>
        <title>Centro de Ayuda - Estilo Esmeralda</title>
        <meta name="description" content="¿Necesitas ayuda? Encuentra respuestas sobre pedidos, pagos, devoluciones y más en nuestro Centro de Ayuda." />
      </Head>
      <Header />
      
      {/* Botón flotante de WhatsApp */}
      <a
        href="https://wa.me/51987654321?text=Hola,%20necesito%20ayuda%20con..."
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 bg-green-500 hover:bg-green-600 text-white rounded-full p-4 shadow-2xl transition-all duration-300 hover:scale-110 group"
        aria-label="Contactar por WhatsApp"
      >
        <FaWhatsapp className="text-3xl" />
        <span className="absolute right-full mr-3 top-1/2 -translate-y-1/2 bg-gray-900 text-white px-3 py-1 rounded-lg text-sm whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity">
          ¿Necesitas ayuda?
        </span>
      </a>

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-emerald-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
              <FaRegQuestionCircle className="text-emerald-600 text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">Centro de Ayuda</h1>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              ¿Tienes dudas? Encuentra respuestas rápidas o contáctanos directamente.
            </p>
          </div>

          {/* Buscador */}
          <div className="max-w-2xl mx-auto mb-8">
            <div className="relative">
              <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400" />
              <input
                type="text"
                placeholder="Buscar en preguntas frecuentes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-12 pr-4 py-4 border-2 border-gray-200 rounded-xl focus:border-emerald-500 focus:outline-none transition-colors text-lg"
              />
            </div>
            {searchTerm && (
              <p className="text-sm text-gray-500 mt-2">
                {filteredFaqs.length} resultado{filteredFaqs.length !== 1 ? 's' : ''} encontrado{filteredFaqs.length !== 1 ? 's' : ''}
              </p>
            )}
          </div>

          {/* Categorías */}
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4 mb-12">
            {categories.map((cat) => {
              const Icon = cat.icon;
              const isActive = selectedCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(isActive ? null : cat.id)}
                  className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                    isActive
                      ? 'border-emerald-500 bg-emerald-50 shadow-md'
                      : 'border-gray-200 hover:border-emerald-300 hover:shadow-sm'
                  }`}
                >
                  <Icon className={`text-3xl mx-auto mb-2 ${isActive ? 'text-emerald-600' : 'text-gray-600'}`} />
                  <p className={`text-sm font-medium ${isActive ? 'text-emerald-700' : 'text-gray-700'}`}>
                    {cat.name}
                  </p>
                </button>
              );
            })}
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* FAQs */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-6 md:p-8">
                <h2 className="text-2xl font-bold mb-6 text-gray-900">
                  {selectedCategory 
                    ? categories.find(c => c.id === selectedCategory)?.name 
                    : 'Preguntas Frecuentes'}
                </h2>
                
                {filteredFaqs.length === 0 ? (
                  <div className="text-center py-12">
                    <FaRegQuestionCircle className="text-6xl text-gray-300 mx-auto mb-4" />
                    <p className="text-gray-500">No se encontraron resultados para "{searchTerm}"</p>
                    <button
                      onClick={() => { setSearchTerm(''); setSelectedCategory(null); }}
                      className="mt-4 text-emerald-600 hover:text-emerald-700 font-medium"
                    >
                      Limpiar búsqueda
                    </button>
                  </div>
                ) : (
                  <div className="space-y-4">
                    {filteredFaqs.map((faq, idx) => (
                      <div key={idx} className="border border-gray-200 rounded-lg overflow-hidden">
                        <button
                          className="w-full flex items-center justify-between p-4 text-left hover:bg-gray-50 transition-colors"
                          onClick={() => setOpenIndex(openIndex === idx ? null : idx)}
                        >
                          <span className="font-semibold text-gray-900 pr-4">{faq.question}</span>
                          {openIndex === idx ? (
                            <FaChevronUp className="text-emerald-600 flex-shrink-0" />
                          ) : (
                            <FaChevronDown className="text-gray-400 flex-shrink-0" />
                          )}
                        </button>
                        <div
                          className={`transition-all duration-300 ${
                            openIndex === idx ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
                          } overflow-hidden`}
                        >
                          <div className="p-4 pt-0 text-gray-600 bg-gray-50">
                            {faq.answer}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              
              {/* Contacto */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Contacto Directo</h3>
                <div className="space-y-3">
                  <div className="flex items-start gap-3">
                    <FaWhatsapp className="text-green-500 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">WhatsApp</p>
                      <a 
                        href="https://wa.me/51987654321" 
                        target="_blank" 
                        rel="noopener"
                        className="text-emerald-600 hover:text-emerald-700"
                      >
                        +51 987 654 321
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaEnvelope className="text-blue-500 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Email</p>
                      <a 
                        href="mailto:soporte@estiloesmeralda.com"
                        className="text-emerald-600 hover:text-emerald-700 break-all"
                      >
                        soporte@estiloesmeralda.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start gap-3">
                    <FaPhone className="text-purple-500 text-xl mt-1 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-gray-700">Teléfono</p>
                      <p className="text-gray-600">(55) 1234-5678</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-emerald-50 rounded-lg">
                  <div className="flex items-center gap-2 text-emerald-700">
                    <FaClock className="flex-shrink-0" />
                    <div>
                      <p className="font-medium">Horario de atención</p>
                      <p className="text-sm">Lun-Sáb: 9:00 - 18:00 hrs</p>
                    </div>
                  </div>
                </div>
                <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                  <div className="flex items-center gap-2 text-blue-700">
                    <FaClock className="flex-shrink-0" />
                    <div>
                      <p className="font-medium">Tiempo de respuesta</p>
                      <p className="text-sm">WhatsApp: 5-10 min</p>
                      <p className="text-sm">Email: 24-48 horas</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Links Útiles */}
              <div className="bg-white rounded-2xl shadow-lg p-6">
                <h3 className="text-xl font-bold mb-4 text-gray-900">Enlaces Útiles</h3>
                <div className="space-y-2">
                  {quickLinks.map((link, idx) => {
                    const Icon = link.icon;
                    return (
                      <Link
                        key={idx}
                        href={link.href}
                        className="flex items-center gap-3 p-3 rounded-lg hover:bg-emerald-50 transition-colors group"
                      >
                        <Icon className="text-emerald-600 group-hover:text-emerald-700" />
                        <span className="text-gray-700 group-hover:text-emerald-700 font-medium">
                          {link.name}
                        </span>
                      </Link>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          {/* Formulario de Contacto */}
          <div className="mt-12 bg-white rounded-2xl shadow-lg p-6 md:p-8">
            <h2 className="text-2xl font-bold mb-2 text-gray-900">¿No encontraste lo que buscabas?</h2>
            <p className="text-gray-600 mb-6">Envíanos un mensaje y te responderemos a la brevedad.</p>
            
            <form onSubmit={handleContactSubmit} className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Nombre completo *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.name}
                  onChange={(e) => setContactForm({ ...contactForm, name: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="Tu nombre"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Correo electrónico *
                </label>
                <input
                  type="email"
                  required
                  value={contactForm.email}
                  onChange={(e) => setContactForm({ ...contactForm, email: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="tu@email.com"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Asunto *
                </label>
                <input
                  type="text"
                  required
                  value={contactForm.subject}
                  onChange={(e) => setContactForm({ ...contactForm, subject: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent"
                  placeholder="¿En qué podemos ayudarte?"
                />
              </div>
              
              <div className="md:col-span-2">
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Mensaje *
                </label>
                <textarea
                  required
                  rows={5}
                  value={contactForm.message}
                  onChange={(e) => setContactForm({ ...contactForm, message: e.target.value })}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-emerald-500 focus:border-transparent resize-none"
                  placeholder="Describe tu consulta en detalle..."
                />
              </div>
              
              <div className="md:col-span-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-semibold rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Enviando...' : 'Enviar Mensaje'}
                </button>
              </div>
            </form>
          </div>

        </div>
      </div>
      
      <Footer />
    </>
  );
};

export default HelpCenterPage;
