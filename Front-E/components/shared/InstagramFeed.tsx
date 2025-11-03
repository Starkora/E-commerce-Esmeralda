import React from 'react';
import { FaInstagram, FaHeart, FaComment } from 'react-icons/fa';

interface InstagramPost {
  id: number;
  imageUrl: string;
  likes: number;
  comments: number;
  url: string;
}

const InstagramFeed: React.FC = () => {
  const posts: InstagramPost[] = [
    {
      id: 1,
      imageUrl: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=400&auto=format&fit=crop',
      likes: 234,
      comments: 12,
      url: '#',
    },
    {
      id: 2,
      imageUrl: 'https://images.unsplash.com/photo-1509631179647-0177331693ae?w=400&auto=format&fit=crop',
      likes: 189,
      comments: 8,
      url: '#',
    },
    {
      id: 3,
      imageUrl: 'https://images.unsplash.com/photo-1485968579580-b6d095142e6e?w=400&auto=format&fit=crop',
      likes: 456,
      comments: 23,
      url: '#',
    },
    {
      id: 4,
      imageUrl: 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=400&auto=format&fit=crop',
      likes: 321,
      comments: 15,
      url: '#',
    },
    {
      id: 5,
      imageUrl: 'https://images.unsplash.com/photo-1487412720507-e7ab37603c6f?w=400&auto=format&fit=crop',
      likes: 278,
      comments: 19,
      url: '#',
    },
    {
      id: 6,
      imageUrl: 'https://images.unsplash.com/photo-1483181957632-8bda974cbc91?w=400&auto=format&fit=crop',
      likes: 512,
      comments: 31,
      url: '#',
    },
  ];

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
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-60 transition-all duration-300 flex items-center justify-center">
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
