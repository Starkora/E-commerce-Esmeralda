import React, { useState, useEffect } from 'react';
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';

interface Product {
  id: number;
  primary_image: string;
  name: string;
}

interface InstagramPost {
  id: number;
  imageUrl: string;
  likes: number;
  comments: number;
  url: string;
}

const InstagramFeed: React.FC = () => {
  const [posts, setPosts] = useState<InstagramPost[]>([]);
  const [loading, setLoading] = useState(true);
  const apiBase = getApiBaseUrl();

  useEffect(() => {
    const fetchInstagramPosts = async () => {
      try {
        // Obtener productos aleatorios de la BD para simular feed de Instagram
        const response = await fetch(`${apiBase}/api/products?per_page=6`);
        if (!response.ok) throw new Error('Error al cargar imágenes');
        
        const data = await response.json();
        const products = data.data || data;
        
        // Transformar productos en posts de Instagram
        const instagramPosts: InstagramPost[] = products.map((product: Product) => ({
          id: product.id,
          imageUrl: product.primary_image,
          likes: Math.floor(Math.random() * 400) + 100, // Likes aleatorios entre 100-500
          comments: Math.floor(Math.random() * 30) + 5, // Comentarios aleatorios entre 5-35
          url: `https://instagram.com/estiloesmeralda`, // Link real a Instagram
        }));
        
        setPosts(instagramPosts);
      } catch (err) {
        console.error('Error loading instagram feed:', err);
        // Fallback con datos por defecto si falla la API
        setPosts([]);
      } finally {
        setLoading(false);
      }
    };

    fetchInstagramPosts();
  }, [apiBase]);

  return (
    <section className="py-16 bg-white">
      <div className="max-w-7xl mx-auto px-4">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-3 rounded-full mb-4">
            <FaInstagram className="text-2xl" />
            <span className="font-bold">@estiloesmeralda</span>
          </div>
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Síguenos en Instagram
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Inspírate con nuestras clientas y descubre cómo lucen nuestras prendas. 
            Etiquétanos para aparecer aquí.
          </p>
        </div>

        {/* Instagram Grid */}
        {loading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {[...Array(6)].map((_, i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 aspect-square rounded-lg" />
              </div>
            ))}
          </div>
        ) : posts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {posts.map((post) => (
            <a
              key={post.id}
              href={post.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative aspect-square overflow-hidden rounded-lg"
            >
              <img
                src={post.imageUrl}
                alt={`Instagram post ${post.id}`}
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110"
              />
              
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 text-white flex gap-6">
                  <div className="flex items-center gap-2">
                    <FaHeart />
                    <span className="font-semibold">{post.likes}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaComment />
                    <span className="font-semibold">{post.comments}</span>
                  </div>
                </div>
              </div>

              {/* Instagram icon */}
              <div className="absolute top-2 right-2 bg-white/90 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <FaInstagram className="text-pink-600" />
              </div>
            </a>
          ))}
        </div>
        ) : (
          <div className="text-center py-12">
            <p className="text-gray-500">No hay imágenes disponibles en este momento</p>
          </div>
        )}

        {/* CTA */}
        <div className="text-center mt-12">
          <a
            href="https://instagram.com/estiloesmeralda"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105"
          >
            <FaInstagram className="text-xl" />
            Síguenos en Instagram
          </a>
        </div>
      </div>
    </section>
  );
};

export default InstagramFeed;
