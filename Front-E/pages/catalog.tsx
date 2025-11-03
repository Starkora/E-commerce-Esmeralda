import React, { useState, useMemo } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { 
  SearchBar, 
  CategoryFilter, 
  CatalogProductCard, 
  StatCard 
} from '@/components/shared';
import {
  FaShoppingBag,
  FaTshirt,
  FaShoePrints,
  FaGem,
  FaCrown,
  FaHeart,
  FaFire,
  FaTags,
  FaStar,
  FaFilter,
  FaSortAmountDown
} from 'react-icons/fa';

const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());

  // Mock products data
  const products = [
    {
      id: 1,
      name: 'Vestido Elegante de Noche',
      price: 289.99,
      oldPrice: 399.99,
      imageUrl: '/assets/products/dress1.jpg',
      category: 'Vestidos',
      rating: 4.8,
      reviewCount: 156,
      inStock: true,
      badge: 'Nuevo',
      badgeColor: 'green' as const,
    },
    {
      id: 2,
      name: 'Blusa Casual con Estampado Floral',
      price: 89.99,
      oldPrice: 129.99,
      imageUrl: '/assets/products/blouse1.jpg',
      category: 'Blusas',
      rating: 4.5,
      reviewCount: 89,
      inStock: true,
      badge: 'Oferta',
      badgeColor: 'red' as const,
    },
    {
      id: 3,
      name: 'Pantalón de Vestir Negro',
      price: 159.99,
      imageUrl: '/assets/products/pants1.jpg',
      category: 'Pantalones',
      rating: 4.7,
      reviewCount: 234,
      inStock: true,
    },
    {
      id: 4,
      name: 'Zapatos de Tacón Alto',
      price: 199.99,
      oldPrice: 279.99,
      imageUrl: '/assets/products/shoes1.jpg',
      category: 'Zapatos',
      rating: 4.9,
      reviewCount: 312,
      inStock: true,
      badge: 'Popular',
      badgeColor: 'orange' as const,
    },
    {
      id: 5,
      name: 'Collar de Perlas Elegante',
      price: 349.99,
      imageUrl: '/assets/products/necklace1.jpg',
      category: 'Accesorios',
      rating: 4.6,
      reviewCount: 67,
      inStock: true,
      badge: 'Exclusivo',
      badgeColor: 'blue' as const,
    },
    {
      id: 6,
      name: 'Falda Midi Plisada',
      price: 119.99,
      oldPrice: 179.99,
      imageUrl: '/assets/products/skirt1.jpg',
      category: 'Faldas',
      rating: 4.4,
      reviewCount: 145,
      inStock: false,
    },
    {
      id: 7,
      name: 'Abrigo de Lana Premium',
      price: 459.99,
      imageUrl: '/assets/products/coat1.jpg',
      category: 'Abrigos',
      rating: 4.9,
      reviewCount: 198,
      inStock: true,
      badge: 'Premium',
      badgeColor: 'blue' as const,
    },
    {
      id: 8,
      name: 'Conjunto Deportivo',
      price: 139.99,
      oldPrice: 189.99,
      imageUrl: '/assets/products/sportswear1.jpg',
      category: 'Deportivo',
      rating: 4.3,
      reviewCount: 421,
      inStock: true,
      badge: 'Oferta',
      badgeColor: 'red' as const,
    },
  ];

  const categories = [
    { name: 'Todos', icon: <FaShoppingBag />, count: products.length },
    { name: 'Vestidos', icon: <FaTshirt />, count: products.filter(p => p.category === 'Vestidos').length },
    { name: 'Blusas', icon: <FaTshirt />, count: products.filter(p => p.category === 'Blusas').length },
    { name: 'Pantalones', icon: <FaTshirt />, count: products.filter(p => p.category === 'Pantalones').length },
    { name: 'Zapatos', icon: <FaShoePrints />, count: products.filter(p => p.category === 'Zapatos').length },
    { name: 'Accesorios', icon: <FaGem />, count: products.filter(p => p.category === 'Accesorios').length },
  ];

  const statistics = [
    {
      icon: <FaShoppingBag />,
      number: '500+',
      label: 'Productos disponibles',
      color: 'emerald' as const,
      variant: 'default' as const,
    },
    {
      icon: <FaTags />,
      number: '30%',
      label: 'Descuentos promedio',
      color: 'orange' as const,
      variant: 'default' as const,
    },
    {
      icon: <FaStar />,
      number: '4.8/5',
      label: 'Calificación promedio',
      color: 'blue' as const,
      variant: 'default' as const,
    },
  ];

  // Filter and sort products
  const filteredProducts = useMemo(() => {
    let filtered = products;

    // Filter by search
    if (searchQuery) {
      filtered = filtered.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    // Filter by category
    if (activeCategory !== 'Todos') {
      filtered = filtered.filter(p => p.category === activeCategory);
    }

    // Filter by price range
    filtered = filtered.filter(
      p => p.price >= priceRange[0] && p.price <= priceRange[1]
    );

    // Sort products
    switch (sortBy) {
      case 'price-low':
        filtered.sort((a, b) => a.price - b.price);
        break;
      case 'price-high':
        filtered.sort((a, b) => b.price - a.price);
        break;
      case 'name':
        filtered.sort((a, b) => a.name.localeCompare(b.name));
        break;
      case 'rating':
        filtered.sort((a, b) => b.rating - a.rating);
        break;
      default:
        // featured - keep original order
        break;
    }

    return filtered;
  }, [searchQuery, activeCategory, sortBy, priceRange]);

  const handleAddToCart = (id: string | number) => {
    console.log('Added to cart:', id);
    // Implement add to cart logic
  };

  const handleToggleFavorite = (id: string | number) => {
    setFavorites(prev => {
      const newFavorites = new Set(prev);
      if (newFavorites.has(id as number)) {
        newFavorites.delete(id as number);
      } else {
        newFavorites.add(id as number);
      }
      return newFavorites;
    });
  };

  return (
    <>
      <Head>
        <title>Catálogo - Estilo Esmeralda</title>
        <meta
          name="description"
          content="Explora nuestro catálogo completo de moda femenina. Vestidos, blusas, zapatos y accesorios con los mejores precios."
        />
      </Head>
      <Header />

      <div className="min-h-screen bg-gradient-to-br from-emerald-50 via-white to-green-100 py-12">
        <div className="max-w-7xl mx-auto px-4">
          {/* Hero Section */}
          <div className="text-center mb-12">
            <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-emerald-100 mb-4">
              <FaShoppingBag className="text-emerald-600 text-4xl" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold mb-4 text-gray-900">
              Nuestro Catálogo
            </h1>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Descubre las últimas tendencias en moda femenina. Calidad,
              elegancia y estilo en cada prenda.
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

          {/* Search Bar */}
          <div className="mb-8">
            <SearchBar
              value={searchQuery}
              onChange={setSearchQuery}
              placeholder="Buscar productos por nombre..."
              variant="large"
              debounceMs={300}
            />
          </div>

          {/* Category Filter */}
          <div className="mb-8">
            <CategoryFilter
              categories={categories}
              activeCategory={activeCategory}
              onCategoryChange={setActiveCategory}
              variant="buttons"
              showCount={true}
            />
          </div>

          {/* Filters and Sort Bar */}
          <div className="bg-white rounded-xl shadow-md p-4 mb-8">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
              {/* Filter Toggle */}
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center gap-2 text-gray-700 hover:text-emerald-600 transition-colors"
              >
                <FaFilter />
                <span className="font-medium">Filtros</span>
              </button>

              {/* Results Count */}
              <div className="text-gray-600">
                Mostrando <span className="font-bold text-gray-900">{filteredProducts.length}</span> productos
              </div>

              {/* Sort By */}
              <div className="flex items-center gap-3">
                <FaSortAmountDown className="text-gray-600" />
                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
                >
                  <option value="featured">Destacados</option>
                  <option value="price-low">Precio: Menor a Mayor</option>
                  <option value="price-high">Precio: Mayor a Menor</option>
                  <option value="name">Nombre: A-Z</option>
                  <option value="rating">Mejor Calificados</option>
                </select>
              </div>
            </div>

            {/* Expandable Filters */}
            {showFilters && (
              <div className="mt-6 pt-6 border-t border-gray-200">
                <div className="grid md:grid-cols-2 gap-6">
                  {/* Price Range Filter */}
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-3">
                      Rango de Precio: S/ {priceRange[0]} - S/ {priceRange[1]}
                    </label>
                    <input
                      type="range"
                      min="0"
                      max="1000"
                      step="10"
                      value={priceRange[1]}
                      onChange={(e) =>
                        setPriceRange([priceRange[0], Number(e.target.value)])
                      }
                      className="w-full"
                    />
                  </div>

                  {/* Stock Filter */}
                  <div className="flex items-center gap-4">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="checkbox"
                        className="w-4 h-4 text-emerald-600 border-gray-300 rounded focus:ring-emerald-500"
                      />
                      <span className="text-sm text-gray-700">Solo productos disponibles</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Products Grid */}
          {filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <CatalogProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.oldPrice}
                  imageUrl={product.imageUrl}
                  rating={product.rating}
                  reviewCount={product.reviewCount}
                  inStock={product.inStock}
                  badge={product.badge}
                  badgeColor={product.badgeColor}
                  onAddToCart={handleAddToCart}
                  onToggleFavorite={handleToggleFavorite}
                  isFavorite={favorites.has(product.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-gray-100 mb-4">
                <FaShoppingBag className="text-gray-400 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                No se encontraron productos
              </h3>
              <p className="text-gray-600 mb-6">
                Intenta ajustar tus filtros o búsqueda
              </p>
              <button
                onClick={() => {
                  setSearchQuery('');
                  setActiveCategory('Todos');
                  setPriceRange([0, 1000]);
                }}
                className="bg-emerald-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
              >
                Limpiar Filtros
              </button>
            </div>
          )}

          {/* CTA Section */}
          <div className="bg-gradient-to-r from-emerald-500 to-green-600 rounded-2xl shadow-xl p-8 text-center text-white">
            <FaHeart className="text-5xl mx-auto mb-4" />
            <h2 className="text-3xl font-bold mb-4">¿No encuentras lo que buscas?</h2>
            <p className="text-emerald-100 mb-6 max-w-2xl mx-auto">
              Contáctanos y te ayudaremos a encontrar el producto perfecto para ti.
              También hacemos pedidos especiales.
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

export default CatalogPage;
