import React from 'react';
import { FaStar, FaQuoteLeft } from 'react-icons/fa';

interface Testimonial {
  id: number;
  name: string;
  location: string;
  rating: number;
  comment: string;
  avatar: string;
  date: string;
}

const Testimonials: React.FC = () => {
  const testimonials: Testimonial[] = [
    {
      id: 1,
      name: 'María González',
      location: 'Lima, Perú',
      rating: 5,
      comment: '¡Excelente calidad! Las prendas superaron mis expectativas. El envío fue rápido y el servicio al cliente impecable.',
      avatar: 'https://ui-avatars.com/api/?name=Maria+Gonzalez&background=10b981&color=fff',
      date: 'Hace 2 días',
    },
    {
      id: 2,
      name: 'Andrea Quispe',
      location: 'Arequipa, Perú',
      rating: 5,
      comment: 'Me encanta la variedad de estilos. Siempre encuentro lo que busco y los precios son muy accesibles.',
      avatar: 'https://ui-avatars.com/api/?name=Andrea+Quispe&background=3b82f6&color=fff',
      date: 'Hace 1 semana',
    },
    {
      id: 3,
      name: 'Carla Mendoza',
      location: 'Cusco, Perú',
      rating: 5,
      comment: 'La atención en tienda es excelente. Las chicas me ayudaron a encontrar el outfit perfecto para mi evento.',
      avatar: 'https://ui-avatars.com/api/?name=Carla+Mendoza&background=8b5cf6&color=fff',
      date: 'Hace 2 semanas',
    },
  ];

  return (
    <section className="py-16 bg-gradient-to-br from-emerald-50 to-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Lo Que Dicen Nuestras Clientas
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Miles de mujeres confían en nosotros para lucir increíbles cada día
          </p>
          <div className="flex items-center justify-center gap-2 mt-4">
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <FaStar key={i} className="text-yellow-400 text-xl" />
              ))}
            </div>
            <span className="text-gray-600 font-semibold">4.9/5 de 2,340 reseñas</span>
          </div>
        </div>

        {/* Testimonials Grid */}
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial) => (
            <div
              key={testimonial.id}
              className="bg-white rounded-2xl shadow-lg p-6 hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Quote Icon */}
              <FaQuoteLeft className="text-emerald-200 text-3xl mb-4" />

              {/* Rating */}
              <div className="flex gap-1 mb-4">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <FaStar key={i} className="text-yellow-400" />
                ))}
              </div>

              {/* Comment */}
              <p className="text-gray-700 mb-6 line-clamp-4">
                {testimonial.comment}
              </p>

              {/* User Info */}
              <div className="flex items-center gap-3 pt-4 border-t border-gray-100">
                <img
                  src={testimonial.avatar}
                  alt={testimonial.name}
                  className="w-12 h-12 rounded-full"
                />
                <div className="flex-1">
                  <h4 className="font-semibold text-gray-900">
                    {testimonial.name}
                  </h4>
                  <p className="text-sm text-gray-500">{testimonial.location}</p>
                </div>
                <span className="text-xs text-gray-400">{testimonial.date}</span>
              </div>
            </div>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-3 rounded-lg font-semibold transition-colors">
            Ver Todas las Reseñas
          </button>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
