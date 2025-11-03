import React, { useState, useRef, useEffect } from 'react';
import { FaShoppingCart, FaUser, FaTruck, FaBars, FaTimes, FaSearch, FaChevronDown } from 'react-icons/fa';
import Image from 'next/image';
import AnnouncementBar from './AnnouncementBar';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useAuth } from '@/context/AuthContext';
import AccountMenu from './AccountMenu';

const Header: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isScrolled, setIsScrolled] = useState(false);
    const [searchQuery, setSearchQuery] = useState('');
    const [activeSubmenu, setActiveSubmenu] = useState<string | null>(null);
    const submenuTimeoutRef = useRef<NodeJS.Timeout | null>(null);
    const inputRef = useRef<HTMLInputElement>(null);
    const { user, logout } = useAuth();
    const router = useRouter();

    // Redirigir al formulario de login
    const handleLogin = () => {
        router.push('/login');
    };

    const handleLogout = async () => {
        const toast = (await import('react-hot-toast')).default;
        toast.loading('Cerrando sesión...', { id: 'logout-toast' });
        
        try {
            await logout();
            toast.success('Sesión cerrada', { id: 'logout-toast', duration: 1000 });
        } catch (error) {
            toast.success('Sesión cerrada', { id: 'logout-toast', duration: 1000 });
        }
        
        // Forzar recarga completa de la página para limpiar todo el estado
        setTimeout(() => {
            window.location.href = '/login';
        }, 500);
    };

    const handleSearchClick = () => {
        setIsSearchActive(true);
        if (inputRef.current) {
            inputRef.current.focus();
        }
    };

    const handleSearchBlur = () => {
        setIsSearchActive(false);
    };

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/catalog?search=${encodeURIComponent(searchQuery)}`);
            setSearchQuery('');
            setIsSearchActive(false);
        }
    };

    const handleMouseEnterMenu = (categoryName: string) => {
        // Cancelar cualquier timeout pendiente
        if (submenuTimeoutRef.current) {
            clearTimeout(submenuTimeoutRef.current);
        }
        setActiveSubmenu(categoryName);
    };

    const handleMouseLeaveMenu = () => {
        // Agregar delay de 300ms antes de cerrar el menú
        submenuTimeoutRef.current = setTimeout(() => {
            setActiveSubmenu(null);
        }, 300);
    };

    const toggleMobileMenu = () => {
        setIsMobileMenuOpen(!isMobileMenuOpen);
    };

    // Sticky header on scroll
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    // Close mobile menu on route change
    useEffect(() => {
        setIsMobileMenuOpen(false);
    }, [router.pathname]);

    // Cleanup timeout on unmount
    useEffect(() => {
        return () => {
            if (submenuTimeoutRef.current) {
                clearTimeout(submenuTimeoutRef.current);
            }
        };
    }, []);

    const categories = [
        {
            name: 'Mujer',
            subcategories: ['Vestidos', 'Blusas', 'Pantalones', 'Faldas', 'Accesorios']
        },
        {
            name: 'Hombre',
            subcategories: ['Camisas', 'Pantalones', 'Polos', 'Chaquetas']
        },
        {
            name: 'Niños',
            subcategories: ['Niñas', 'Niños', 'Bebés']
        }
    ];

    return (
        <header className={`bg-black sticky top-0 z-50 transition-shadow duration-300 ${isScrolled ? 'shadow-lg' : 'border-b-2'}`}>
            <div className="bg-black text-white text-center py-1">
                <AnnouncementBar message='🎉 DESCUENTO DEL 20% EN TODOS LOS PRODUCTOS 🎉' />
            </div>

            <div className="max-w-7xl mx-auto px-4 py-3">
                <div className="flex justify-between items-center">
                    {/* Logo */}
                    <Link href="/" className="flex-shrink-0">
                        <Image
                            className="rounded-full object-fill transition-transform hover:scale-105"
                            src="/LogoTipo.svg"
                            alt="Estilo Esmeralda"
                            width={80}
                            height={80}
                            priority
                        />
                    </Link>

                    {/* Desktop Navigation */}
                    <nav className="hidden lg:flex items-center space-x-6 text-white">
                        {categories.map((category) => (
                            <div
                                key={category.name}
                                className="relative group"
                                onMouseEnter={() => handleMouseEnterMenu(category.name)}
                                onMouseLeave={handleMouseLeaveMenu}
                            >
                                <button className="flex items-center gap-1 hover:text-emerald-400 transition-colors py-2">
                                    {category.name}
                                    <FaChevronDown className="text-xs" />
                                </button>
                                
                                {/* Submenu */}
                                {activeSubmenu === category.name && (
                                    <div 
                                        className="absolute top-full left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-xl py-2 min-w-[200px] animate-fade-in"
                                        onMouseEnter={() => handleMouseEnterMenu(category.name)}
                                        onMouseLeave={handleMouseLeaveMenu}
                                    >
                                        {category.subcategories.map((sub) => (
                                            <Link
                                                key={sub}
                                                href={`/catalog?category=${sub.toLowerCase()}`}
                                                className="block px-4 py-2 hover:bg-emerald-50 hover:text-emerald-600 transition-colors"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        <Link href="/catalog" className="hover:text-emerald-400 transition-colors">Catálogo</Link>
                        <Link href="/stores" className="hover:text-emerald-400 transition-colors">Tiendas</Link>
                        <Link href="/contact" className="hover:text-emerald-400 transition-colors">Contacto</Link>
                    </nav>

                    {/* Search Bar - Desktop */}
                    <form onSubmit={handleSearch} className="hidden md:flex relative">
                        <input
                            ref={inputRef}
                            type="text"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                            placeholder="Buscar productos..."
                            className="border-2 border-gray-300 rounded-full pl-4 pr-10 py-2 w-64 focus:w-80 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                        />
                        <button
                            type="submit"
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-emerald-600"
                        >
                            <FaSearch />
                        </button>
                    </form>

                    {/* User Actions */}
                    <div className="flex items-center space-x-4 text-white">
                        {user ? (
                            <div className="hidden lg:flex items-center space-x-3">
                                <span className="text-sm">Hola, <span className="font-semibold">{user.name}</span></span>
                                <AccountMenu userName={user.name} onLogout={handleLogout} />
                            </div>
                        ) : (
                            <button
                                onClick={handleLogin}
                                className="hidden lg:flex items-center gap-2 hover:text-emerald-400 transition-colors"
                            >
                                <FaUser />
                                <span className="text-sm">Iniciar sesión</span>
                            </button>
                        )}

                        <Link href="/cart" className="relative hover:text-emerald-400 transition-colors">
                            <FaShoppingCart className="text-xl" />
                            <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-bold">
                                0
                            </span>
                        </Link>

                        <Link href="/delivery-types" className="hidden md:block hover:text-emerald-400 transition-colors">
                            <FaTruck className="text-xl" />
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={toggleMobileMenu}
                            className="lg:hidden text-2xl hover:text-emerald-400 transition-colors"
                        >
                            {isMobileMenuOpen ? <FaTimes /> : <FaBars />}
                        </button>
                    </div>
                </div>

                {/* Mobile Search */}
                <form onSubmit={handleSearch} className="md:hidden mt-3 relative">
                    <input
                        type="text"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        placeholder="Buscar productos..."
                        className="w-full border-2 border-gray-300 rounded-full pl-4 pr-10 py-2 focus:outline-none focus:ring-2 focus:ring-emerald-500 text-gray-800"
                    />
                    <button
                        type="submit"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                    >
                        <FaSearch />
                    </button>
                </form>
            </div>

            {/* Mobile Menu */}
            {isMobileMenuOpen && (
                <div className="lg:hidden bg-white border-t-2">
                    <nav className="max-w-7xl mx-auto px-4 py-4 space-y-2">
                        {user && (
                            <div className="pb-3 border-b mb-3">
                                <p className="text-sm text-gray-600">Hola, <span className="font-semibold text-gray-900">{user.name}</span></p>
                            </div>
                        )}
                        
                        {categories.map((category) => (
                            <div key={category.name} className="border-b pb-2">
                                <button
                                    onClick={() => setActiveSubmenu(activeSubmenu === category.name ? null : category.name)}
                                    className="w-full flex items-center justify-between py-2 text-gray-800 font-semibold"
                                >
                                    {category.name}
                                    <FaChevronDown className={`text-xs transition-transform ${activeSubmenu === category.name ? 'rotate-180' : ''}`} />
                                </button>
                                {activeSubmenu === category.name && (
                                    <div className="pl-4 space-y-2 mt-2">
                                        {category.subcategories.map((sub) => (
                                            <Link
                                                key={sub}
                                                href={`/catalog?category=${sub.toLowerCase()}`}
                                                className="block py-1 text-gray-600 hover:text-emerald-600"
                                            >
                                                {sub}
                                            </Link>
                                        ))}
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        <Link href="/catalog" className="block py-2 text-gray-800 hover:text-emerald-600">Catálogo</Link>
                        <Link href="/stores" className="block py-2 text-gray-800 hover:text-emerald-600">Tiendas</Link>
                        <Link href="/contact" className="block py-2 text-gray-800 hover:text-emerald-600">Contacto</Link>
                        
                        {!user && (
                            <button
                                onClick={handleLogin}
                                className="w-full mt-4 bg-emerald-600 text-white py-2 rounded-lg font-semibold hover:bg-emerald-700 transition-colors"
                            >
                                Iniciar sesión
                            </button>
                        )}
                    </nav>
                </div>
            )}
        </header>
    );
};

export default Header;
