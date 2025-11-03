import React, { useState, useMemo, useEffect } from 'react';
import Head from 'next/head';
import Header from '@/components/header';
import Footer from '@/components/footer';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
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

interface Product {
  id: number;
  name: string;
  price: number;
  old_price?: number;
  primary_image: string;
  category: {
    id: number;
    name: string;
  };
  rating: number;
  review_count: number;
  in_stock: boolean;
  badge?: string;
  badge_color?: 'red' | 'green' | 'blue' | 'orange';
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon?: string;
  products_count?: number;
}

interface ProductStats {
  total_products: number;
  in_stock: number;
  featured: number;
  average_rating: number;
  average_discount: number;
}

const CatalogPage: React.FC = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('Todos');
  const [sortBy, setSortBy] = useState('featured');
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [showFilters, setShowFilters] = useState(false);
  const [favorites, setFavorites] = useState<Set<number>>(new Set());
  
  // API Data
  const [products, setProducts] = useState<Product[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [statistics, setStatistics] = useState<ProductStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const apiBase = getApiBaseUrl();

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(`${apiBase}/api/categories?with_count=true`);
        if (!response.ok) throw new Error('Error al cargar categorías');
        
        const data = await response.json();
        setCategories(data);
      } catch (err: any) {
        console.error('Error loading categories:', err);
      }
    };

    fetchCategories();
  }, [apiBase]);

  // Fetch statistics
  useEffect(() => {
    const fetchStats = async () => {
      try {
        const response = await fetch(`${apiBase}/api/products/statistics`);
        if (!response.ok) throw new Error('Error al cargar estadísticas');
        
        const data = await response.json();
        setStatistics(data);
      } catch (err) {
        console.error('Error loading statistics:', err);
      }
    };

    fetchStats();
  }, [apiBase]);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const params = new URLSearchParams();
        
        if (searchQuery) params.append('search', searchQuery);
        if (activeCategory !== 'Todos') {
          const category = categories.find(c => c.name === activeCategory);
          if (category) params.append('category_id', category.id.toString());
        }
        if (priceRange[0] > 0) params.append('min_price', priceRange[0].toString());
        if (priceRange[1] < 1000) params.append('max_price', priceRange[1].toString());
        params.append('sort_by', sortBy);
        params.append('per_page', '50');

        const response = await fetch(`${apiBase}/api/products?${params}`);
        if (!response.ok) throw new Error('Error al cargar productos');
        
        const data = await response.json();
        // Manejar respuesta paginada de Laravel
        const productsData = Array.isArray(data) ? data : (data.data || []);
        
        // Mapear productos y extraer imagen principal
        const cleanedProducts = productsData.map((product: any) => {
          // Intentar obtener la imagen desde diferentes fuentes
          let imageUrl = '';
          
          if (product.primary_image) {
            imageUrl = product.primary_image.replace(/\\\//g, '/');
          } else if (product.images && product.images.length > 0) {
            // Buscar imagen principal o tomar la primera
            const primaryImg = product.images.find((img: any) => img.is_primary) || product.images[0];
            imageUrl = primaryImg?.image_url?.replace(/\\\//g, '/') || '';
          }
          
          return {
            ...product,
            primary_image: imageUrl
          };
        });
        
        // Debug: verificar estructura de datos
        console.log('Raw API response:', data);
        console.log('Products from API:', cleanedProducts);
        if (cleanedProducts.length > 0) {
          console.log('First product:', cleanedProducts[0]);
          console.log('First product primary_image:', cleanedProducts[0].primary_image);
          console.log('First product images:', cleanedProducts[0].images);
        }
        
        setProducts(cleanedProducts);
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [searchQuery, activeCategory, sortBy, priceRange, categories, apiBase]);

  // Prepare categories for filter
  const categoryOptions = useMemo(() => {
    const allCategories = [
      { name: 'Todos', icon: <FaShoppingBag />, count: statistics?.total_products || 0 },
      ...categories.map(cat => ({
        name: cat.name,
        icon: <FaTshirt />,
        count: cat.products_count || 0
      }))
    ];
    return allCategories;
  }, [categories, statistics]);

  // Prepare statistics for display
  const statsDisplay = useMemo(() => {
    if (!statistics) return [];
    
    return [
      {
        icon: <FaShoppingBag />,
        number: `${statistics.total_products || 0}`,
        label: 'Productos disponibles',
        color: 'emerald' as const,
        variant: 'default' as const,
      },
      {
        icon: <FaTags />,
        number: `${Math.round(statistics.average_discount || 0)}%`,
        label: 'Descuentos promedio',
        color: 'orange' as const,
        variant: 'default' as const,
      },
      {
        icon: <FaStar />,
        number: `${(Number(statistics.average_rating) || 0).toFixed(1)}/5`,
        label: 'Calificación promedio',
        color: 'blue' as const,
        variant: 'default' as const,
      },
    ];
  }, [statistics]);

  const filteredProducts = products;

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
            {statsDisplay.map((stat, idx) => (
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
              categories={categoryOptions}
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
          {loading ? (
            <div className="text-center py-16">
              <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-emerald-600"></div>
              <p className="mt-4 text-gray-600">Cargando productos...</p>
            </div>
          ) : error ? (
            <div className="text-center py-16">
              <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-100 mb-4">
                <FaShoppingBag className="text-red-400 text-4xl" />
              </div>
              <h3 className="text-2xl font-bold text-gray-900 mb-2">
                Error al cargar productos
              </h3>
              <p className="text-gray-600 mb-6">{error}</p>
            </div>
          ) : filteredProducts.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {filteredProducts.map((product) => (
                <CatalogProductCard
                  key={product.id}
                  id={product.id}
                  name={product.name}
                  price={product.price}
                  oldPrice={product.old_price}
                  imageUrl={product.primary_image}
                  rating={product.rating}
                  reviewCount={product.review_count}
                  inStock={product.in_stock}
                  badge={product.badge}
                  badgeColor={product.badge_color}
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
