import React from "react";
import { 
  FaHeart, 
  FaTshirt, 
  FaUsers, 
  FaLeaf,
  FaAward,
  FaChartLine,
  FaStore,
  FaGlobe,
  FaMapMarkerAlt,
} from "react-icons/fa";
import { 
  HeroSection, 
  ValueCard, 
  StatCard, 
  FeatureGrid 
} from "@/components/shared";

const About: React.FC = () => {
  const values = [
    {
      icon: <FaHeart />,
      title: "Calidad Superior",
      description: "Ropa confeccionada con los más altos estándares de calidad y materiales cuidadosamente seleccionados.",
      color: "emerald" as const
    },
    {
      icon: <FaTshirt />,
      title: "Tendencias Modernas",
      description: "Diseños actuales que se adaptan a tu estilo de vida y personalidad única.",
      color: "blue" as const
    },
    {
      icon: <FaUsers />,
      title: "Atención Personalizada",
      description: "Servicio dedicado y amable para cada cliente, porque tu satisfacción es nuestra prioridad.",
      color: "purple" as const
    },
    {
      icon: <FaLeaf />,
      title: "Moda Sostenible",
      description: "Comprometidos con prácticas sostenibles y responsables con el medio ambiente.",
      color: "orange" as const
    },
  ];

  const stats = [
    { number: "10+", label: "Años de Experiencia", icon: <FaAward /> },
    { number: "50K+", label: "Clientes Satisfechos", icon: <FaUsers /> },
    { number: "15+", label: "Tiendas en Perú", icon: <FaStore /> },
    { number: "98%", label: "Satisfacción", icon: <FaChartLine /> },
  ];

  const timeline = [
    {
      year: "2014",
      title: "Nuestro Comienzo",
      description: "Iniciamos con una pequeña tienda en Lima con la visión de revolucionar la moda peruana."
    },
    {
      year: "2017",
      title: "Expansión Nacional",
      description: "Abrimos sucursales en las principales ciudades del Perú: Arequipa, Cusco y Trujillo."
    },
    {
      year: "2020",
      title: "Tienda Online",
      description: "Lanzamos nuestra plataforma e-commerce para llegar a todo el país con envíos rápidos."
    },
    {
      year: "2025",
      title: "Líder en Moda",
      description: "Nos consolidamos como una de las marcas de moda más queridas y confiables del Perú."
    },
  ];

  const sustainabilityFeatures = [
    {
      icon: <FaLeaf />,
      title: "Materiales Eco-Friendly",
      description: "Uso de materiales eco-friendly y reciclados en nuestras colecciones"
    },
    {
      icon: <FaLeaf />,
      title: "Reducción de Residuos",
      description: "Reducción de residuos en nuestros procesos de producción"
    },
    {
      icon: <FaUsers />,
      title: "Condiciones Justas",
      description: "Condiciones laborales justas y éticas para todos nuestros colaboradores"
    },
    {
      icon: <FaLeaf />,
      title: "Empaque Sostenible",
      description: "Empaque biodegradable y minimizado para reducir el impacto ambiental"
    },
  ];

  const locations = [
    {
      icon: <FaStore />,
      title: "Lima y Callao",
      description: "8 tiendas estratégicamente ubicadas"
    },
    {
      icon: <FaStore />,
      title: "Principales Ciudades",
      description: "Arequipa, Cusco, Trujillo, Chiclayo"
    },
    {
      icon: <FaGlobe />,
      title: "Envíos Nacionales",
      description: "Cobertura en todo el territorio peruano"
    },
  ];

  return (
    <div className="bg-gradient-to-br from-white via-emerald-50 to-white">
      
      {/* Hero Section */}
      <HeroSection
        badge="Desde 2014"
        title={
          <>
            Estilo Esmeralda
            <span className="block text-emerald-600">Tu Moda, Tu Estilo</span>
          </>
        }
        description="Somos apasionados por la moda y el estilo. Nuestra misión es brindarte ropa de calidad excepcional y las últimas tendencias, siempre pensando en tu comodidad y confianza. Desde nuestros inicios en Lima, nos hemos dedicado a ofrecer una experiencia de compra excepcional."
        primaryButton={{ label: "Ver Colección", href: "/products" }}
        secondaryButton={{ label: "Contáctanos", href: "/contact" }}
        image="/assets/about/Portada.webp"
        imageAlt="Estilo Esmeralda - Moda Peruana"
        variant="split"
      />

      {/* Valores */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestros Valores
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Los principios que nos guían día a día para ofrecerte lo mejor
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, idx) => (
              <ValueCard
                key={idx}
                icon={value.icon}
                title={value.title}
                description={value.description}
                color={value.color}
                variant="hover-lift"
                iconSize="lg"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Estadísticas */}
      <section className="px-4 py-16 bg-gradient-to-r from-emerald-600 to-green-600 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, idx) => (
              <StatCard
                key={idx}
                number={stat.number}
                label={stat.label}
                icon={stat.icon}
                variant="gradient"
              />
            ))}
          </div>
        </div>
      </section>

      {/* Nuestra Historia - Timeline */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Nuestra Historia
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Un viaje de pasión, dedicación y crecimiento continuo
            </p>
          </div>

          <div className="relative">
            {/* Línea vertical */}
            <div className="absolute left-8 md:left-1/2 top-0 bottom-0 w-1 bg-emerald-200 transform md:-translate-x-1/2" />

            <div className="space-y-12">
              {timeline.map((item, idx) => (
                <div
                  key={idx}
                  className={`relative flex items-center ${
                    idx % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
                  } flex-col`}
                >
                  {/* Punto en la línea */}
                  <div className="absolute left-8 md:left-1/2 w-4 h-4 bg-emerald-600 rounded-full border-4 border-white shadow-lg transform md:-translate-x-1/2 z-10" />

                  {/* Contenido */}
                  <div className={`w-full md:w-5/12 ${idx % 2 === 0 ? 'md:pr-12 pl-16 md:pl-0' : 'md:pl-12 pl-16 md:pr-0'}`}>
                    <div className="bg-white rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow border-l-4 border-emerald-500">
                      <div className="inline-block px-3 py-1 bg-emerald-100 text-emerald-700 rounded-full text-sm font-bold mb-3">
                        {item.year}
                      </div>
                      <h3 className="text-xl font-bold text-gray-900 mb-2">
                        {item.title}
                      </h3>
                      <p className="text-gray-600">
                        {item.description}
                      </p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Compromiso Sostenible */}
      <section className="px-4 py-16 bg-gradient-to-br from-green-50 to-emerald-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-12">
            <FaLeaf className="text-5xl text-green-600 mx-auto mb-4" />
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Compromiso Sostenible
            </h2>
            <p className="text-gray-700 leading-relaxed max-w-3xl mx-auto mb-8">
              En Estilo Esmeralda creemos en la moda responsable. Trabajamos constantemente 
              para reducir nuestro impacto ambiental y promover prácticas sostenibles en toda 
              nuestra cadena de producción.
            </p>
          </div>

          <FeatureGrid
            features={sustainabilityFeatures}
            columns={4}
            variant="centered"
            iconColor="emerald"
          />
        </div>
      </section>

      {/* Presencia Nacional */}
      <section className="px-4 py-16 bg-white">
        <div className="max-w-7xl mx-auto text-center">
          <FaMapMarkerAlt className="text-5xl text-emerald-600 mx-auto mb-6" />
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Presencia en Todo el Perú
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto mb-12">
            Nos encontramos en las principales ciudades del país y enviamos a todo el territorio nacional
          </p>

          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {locations.map((location, idx) => {
              const bgColors = [
                'bg-gradient-to-br from-emerald-50 to-green-50',
                'bg-gradient-to-br from-blue-50 to-emerald-50',
                'bg-gradient-to-br from-purple-50 to-emerald-50'
              ];
              const iconColors = ['text-emerald-600', 'text-blue-600', 'text-purple-600'];
              
              return (
                <div key={idx} className={`${bgColors[idx]} rounded-xl p-6`}>
                  <div className={`${iconColors[idx]} text-4xl mb-3 flex justify-center`}>
                    {location.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{location.title}</h3>
                  <p className="text-sm text-gray-600">{location.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Final */}
      <section className="px-4 py-16 bg-gradient-to-r from-emerald-600 to-green-600">
        <div className="max-w-4xl mx-auto text-center text-white">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            ¿Listo para Descubrir Tu Estilo?
          </h2>
          <p className="text-emerald-100 mb-8 text-lg">
            Explora nuestra colección y encuentra las piezas perfectas que reflejen tu personalidad
          </p>
          <div className="flex flex-wrap gap-4 justify-center">
            <a
              href="/products"
              className="px-8 py-4 bg-white text-emerald-600 font-bold rounded-lg hover:bg-emerald-50 transition-colors shadow-xl hover:shadow-2xl"
            >
              Explorar Colección
            </a>
            <a
              href="/whatsapp-support"
              className="px-8 py-4 bg-emerald-700 text-white font-bold rounded-lg hover:bg-emerald-800 transition-colors border-2 border-white"
            >
              Hablar con Asesor
            </a>
          </div>
        </div>
      </section>
    </div>
  );
};

export default About;
