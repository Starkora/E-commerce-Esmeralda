import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import toast from 'react-hot-toast';
import Link from 'next/link';
import { getApiBaseUrl } from '@/utils/apiBaseUrl';
import { 
  CategoryCard, 
  TrustBadges, 
  Testimonials, 
  InstagramFeed,
  CatalogProductCard 
} from './shared';
import { FaArrowRight } from 'react-icons/fa';

interface Product {
  id: number;
  name: string;
  price: number;
  old_price?: number;
  primary_image: string;
  rating?: number;
  review_count?: number;
  is_active: boolean;
  is_featured: boolean;
}

const Body: React.FC = () => {
    const router = useRouter();
    const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
    const [newProducts, setNewProducts] = useState<Product[]>([]);
    const [loading, setLoading] = useState(true);
    const apiBase = getApiBaseUrl();

    useEffect(() => {
        if (router.isReady) {
            const { verified } = router.query;
            const v = Array.isArray(verified) ? verified[0] : verified;
            if (v === '1') {
                toast.success('Tu correo fue verificado correctamente');
                const { pathname, query } = router;
                delete query.verified;
                router.replace({ pathname, query }, undefined, { shallow: true });
            }
        }
    }, [router]);

    // Fetch productos destacados y nuevos
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetch(`${apiBase}/api/products?per_page=8`);
                if (!response.ok) throw new Error('Error al cargar productos');
                
                const data = await response.json();
                const products = data.data || data;
                
                setFeaturedProducts(products.filter((p: Product) => p.is_featured).slice(0, 4));
                setNewProducts(products.slice(0, 6));
            } catch (err) {
                console.error('Error loading products:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [apiBase]);

    const categories = [
        { name: 'Medias', imageUrl: '/assets/body/first_section/medias.webp', href: '/catalog?category=medias' },
        { name: 'Polos', imageUrl: '/assets/body/first_section/Polos.webp', href: '/catalog?category=polos' },
        { name: 'Pantalones', imageUrl: '/assets/body/first_section/Pantalones.webp', href: '/catalog?category=pantalones' },
        { name: 'Zapatillas', imageUrl: '/assets/body/first_section/Zapatillas.webp', href: '/catalog?category=zapatillas' },
        { name: 'Casacas', imageUrl: '/assets/body/first_section/Casacas.webp', href: '/catalog?category=casacas' },
    ];
    return (
        <div className="bg-white">
            {/* Hero Section */}
            <section className="relative bg-gradient-to-br from-emerald-50 via-white to-green-50">
                <div className="max-w-7xl mx-auto px-4 py-16 lg:py-24">
                    <div className="grid lg:grid-cols-2 gap-12 items-center">
                        <div className="space-y-6">
                            <div className="inline-block">
                                <span className="bg-emerald-100 text-emerald-700 px-4 py-2 rounded-full text-sm font-semibold">
                                    Nueva Temporada 2024
                                </span>
                            </div>
                            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
                                Descubre tu
                                <span className="text-emerald-600"> Estilo Único</span>
                            </h1>
                            <p className="text-lg text-gray-600 max-w-xl">
                                Moda femenina de calidad que resalta tu personalidad. 
                                Desde lo casual hasta lo elegante, encuentra piezas que te hacen sentir increíble.
                            </p>
                            <div className="flex flex-wrap gap-4">
                                <Link
                                    href="/catalog"
                                    className="bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold flex items-center gap-2 transition-all hover:shadow-lg hover:scale-105"
                                >
                                    Ver Catálogo
                                    <FaArrowRight />
                                </Link>
                                <Link
                                    href="/stores"
                                    className="bg-white hover:bg-gray-50 text-gray-900 border-2 border-gray-200 px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg"
                                >
                                    Nuestras Tiendas
                                </Link>
                            </div>
                        </div>
                        <div className="relative lg:h-[600px] h-[400px]">
                            <div className="absolute inset-0 bg-gradient-to-br from-emerald-400/20 to-green-600/20 rounded-3xl" />
                            <img
                                src="https://images.unsplash.com/photo-1483985988355-763728e1935b?w=800&auto=format&fit=crop"
                                alt="Moda Estilo Esmeralda"
                                className="absolute inset-0 w-full h-full object-cover rounded-3xl shadow-2xl"
                            />
                            <div className="absolute top-6 right-6 bg-white rounded-2xl shadow-xl p-4">
                                <p className="text-3xl font-bold text-emerald-600">-20%</p>
                                <p className="text-xs text-gray-600">En todo</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Categorías */}
            <section className="py-16 bg-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
                            Explora por Categoría
                        </h2>
                        <p className="text-gray-600">Encuentra exactamente lo que buscas</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-8">
                        {categories.map((category) => (
                            <CategoryCard
                                key={category.name}
                                name={category.name}
                                imageUrl={category.imageUrl}
                                href={category.href}
                            />
                        ))}
                    </div>
                </div>
            </section>

            {/* Trust Badges */}
            <TrustBadges />

            {/* Productos Destacados */}
            <section className="py-16 bg-white">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-semibold uppercase tracking-wide text-sm">
                            Lo Mejor de la Temporada
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-2">
                            Productos Destacados
                        </h2>
                        <p className="text-gray-600">Nuestras piezas más populares y vendidas</p>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {[...Array(4)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 h-64 rounded-2xl mb-4" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
                            {featuredProducts.map((product) => (
                                <CatalogProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    oldPrice={product.old_price}
                                    imageUrl={product.primary_image}
                                    rating={product.rating}
                                    reviewCount={product.review_count}
                                    inStock={product.is_active}
                                    badge={product.is_featured ? 'Destacado' : undefined}
                                    badgeColor="green"
                                />
                            ))}
                        </div>
                    )}

                    <div className="text-center mt-12">
                        <Link
                            href="/catalog"
                            className="inline-flex items-center gap-2 bg-emerald-600 hover:bg-emerald-700 text-white px-8 py-4 rounded-lg font-semibold transition-all hover:shadow-lg hover:scale-105"
                        >
                            Ver Todos los Productos
                            <FaArrowRight />
                        </Link>
                    </div>
                </div>
            </section>

            {/* Testimonials */}
            <Testimonials />

            {/* Nuevos Productos */}
            <section className="py-16 bg-gradient-to-b from-white to-gray-50">
                <div className="max-w-7xl mx-auto px-4">
                    <div className="text-center mb-12">
                        <span className="text-emerald-600 font-semibold uppercase tracking-wide text-sm">
                            Recién Llegados
                        </span>
                        <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4 mt-2">
                            Nuevas Ofertas
                        </h2>
                        <p className="text-gray-600">Últimas tendencias de la temporada</p>
                    </div>

                    {loading ? (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {[...Array(6)].map((_, i) => (
                                <div key={i} className="animate-pulse">
                                    <div className="bg-gray-200 h-80 rounded-2xl mb-4" />
                                    <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                                    <div className="h-4 bg-gray-200 rounded w-1/2" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                            {newProducts.map((product) => (
                                <CatalogProductCard
                                    key={product.id}
                                    id={product.id}
                                    name={product.name}
                                    price={product.price}
                                    oldPrice={product.old_price}
                                    imageUrl={product.primary_image}
                                    rating={product.rating}
                                    reviewCount={product.review_count}
                                    inStock={product.is_active}
                                    badge="Nuevo"
                                    badgeColor="blue"
                                />
                            ))}
                        </div>
                    )}
                </div>
            </section>

            {/* Instagram Feed */}
            <InstagramFeed />

            {/* CTA Final */}
            <section className="py-16 bg-gradient-to-r from-emerald-600 to-green-600">
                <div className="max-w-4xl mx-auto px-4 text-center text-white">
                    <h2 className="text-3xl md:text-4xl font-bold mb-4">
                        ¿Lista para Renovar tu Guardarropa?
                    </h2>
                    <p className="text-lg text-emerald-100 mb-8">
                        Suscríbete a nuestro newsletter y recibe un 10% de descuento en tu primera compra
                    </p>
                    <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
                        <input
                            type="email"
                            placeholder="tu@email.com"
                            className="flex-1 px-6 py-4 rounded-lg text-gray-900 focus:outline-none focus:ring-2 focus:ring-white"
                        />
                        <button className="bg-white text-emerald-600 px-8 py-4 rounded-lg font-semibold hover:bg-emerald-50 transition-colors">
                            Suscribirse
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
}
         
export default Body;
