import React from "react";

const About: React.FC = () => {
  return (
    <section className="bg-white px-8 py-28 animate-fade-in">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        <div>
          <h2 className="text-4xl font-extrabold text-gray-900 mb-4">
            Sobre Nosotros
          </h2>
          <p className="text-lg text-gray-700 mb-6 text-justify">
            Somos apasionados por la moda y el estilo. Nuestra misión es
            brindarte ropa de calidad y las últimas tendencias.
          </p>
          <p className="text-gray-600 text-md text-justify">
            Desde nuestro comienzo, nos hemos dedicado a ofrecer una experiencia
            de compra excepcional, combinando diseño innovador con materiales
            cuidadosamente seleccionados.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 mt-10 text-center">
            <div className="flex flex-col items-center">
              <div className="text-3xl text-emerald-600 mb-2">❤️</div>
              <h3 className="font-semibold">Calidad Superior</h3>
              <p className="text-sm text-gray-500 text-justify">
                Ropa confeccionada con altos estándares de calidad.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl text-emerald-600 mb-2">📣</div>
              <h3 className="font-semibold">Tendencias Modernas</h3>
              <p className="text-sm text-gray-500 text-justify">
                Estilos actuales que se adaptan a tus necesidades.
              </p>
            </div>
            <div className="flex flex-col items-center">
              <div className="text-3xl text-emerald-600 mb-2">🎧</div>
              <h3 className="font-semibold">Atención Personalizada</h3>
              <p className="text-sm text-gray-500 text-justify">
                Servicio dedicado y amable para cada cliente.
              </p>
            </div>
          </div>
        </div>

        {/* ✅ Imagen más grande y bien posicionada */}
        <div className="flex justify-center md:justify-end">
          <img
            src="/assets/about/Portada.webp"
            alt="Nuestro equipo"
            className="w-full max-w-2xl rounded-xl shadow-xl transform hover:scale-105 transition duration-300 ease-in-out"
          />
        </div>
      </div>
    </section>
  );
};

export default About;
