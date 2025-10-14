import React, { useState, useRef } from 'react';
import { FaShoppingCart, FaUser, FaTruck } from 'react-icons/fa';
import Image from 'next/image';
import AnnouncementBar from './AnnouncementBar';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Header: React.FC = () => {
    const [isSearchActive, setIsSearchActive] = useState(false);
    const inputRef = useRef<HTMLInputElement>(null);
    // Estado local del usuario
    const [user, setUser] = useState<{ name?: string } | null>(null);
    // Detectar login por evento global
    React.useEffect(() => {
        const fetchUser = async () => {
            try {
                const axios = (await import('axios')).default;
                const response = await axios.get('/api/user', { withCredentials: true });
                setUser({ name: response.data.name });
            } catch (e) {
                setUser(null);
            }
        };
        const handleLogin = () => {
            fetchUser();
        };
        window.addEventListener('login', handleLogin);
        fetchUser(); // Intentar obtener usuario al cargar
        return () => window.removeEventListener('login', handleLogin);
    }, []);
    const router = useRouter();

    // Redirigir al formulario de login
    const handleLogin = () => {
        router.push('/login');
    };

    const handleLogout = async () => {
        try {
            const axios = (await import('axios')).default;
            await axios.post('/api/logout', {}, { withCredentials: true });
        } catch (e) {}
        setUser(null);
        const toast = (await import('react-hot-toast')).default;
        toast.success('Sesión cerrada correctamente', { duration: 1000 });
        window.location.replace('/login');
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

    return (
        <header className="bg-white border-b-2">
            <div className="bg-black text-white text-center py-1">
                <AnnouncementBar message='🎉 DESCUENTO DEL 20% EN TODOS LOS PRODUCTOS 🎉' />
            </div>

            <div className="flex flex-col md:flex-row justify-between items-center p-4 bg-black">
                <div className="flex items-center">
                    <a href="./">
                        <Image
                            className="rounded-full object-fill"
                            src="/LogoTipo.svg"
                            alt="Logo"
                            width={100}
                            height={100}
                        />
                    </a>
                </div>

                <nav className="hidden md:block space-x-6 text-white">
                    <a href="#" className="hover:underline">Mujer</a>
                    <a href="#" className="hover:underline">Hombre</a>
                    <a href="#" className="hover:underline">Niños</a>
                    <a href="#" className="hover:underline">Denim</a>
                    <a href="#" className="hover:underline">Básicos</a>
                    <a href="./contact" className="hover:underline">Contacto</a>
                </nav>

                <div className="flex items-center space-x-4 text-white">
                    {user ? (
                        <div className="flex items-center space-x-3">
                            <div className="hidden sm:block">
                                <span className="mr-2">Hola,</span>
                                <span className="font-semibold">{user.name}</span>
                            </div>
                            <button
                                onClick={handleLogout}
                                className="bg-white text-black px-3 py-1 rounded-full text-sm hover:opacity-90"
                            >
                                Cerrar sesión
                            </button>
                        </div>
                    ) : (
                        <button onClick={handleLogin} className="hover:border-b hover:border-white flex items-center bg-transparent border-none">
                            <FaUser className="text-xl cursor-pointer" />
                            <span className="ml-2 hidden sm:inline cursor-pointer">Iniciar sesión</span>
                        </button>
                    )}
                    <a href="#" className="relative hover:border-b hover:border-white">
                        <FaShoppingCart className="text-xl">
                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
                        </FaShoppingCart>
                    </a>
                    <a href="#" className="hover:border-b hover:border-white">
                        <FaTruck className="text-xl" />
                    </a>
                </div>

                <div className="relative mt-4 md:mt-0 bg-white rounded-full">
                    <input
                        ref={inputRef}
                        type="text"
                        placeholder="Digite Aquí"
                        onClick={handleSearchClick}
                        onBlur={handleSearchBlur}
                        className={`border rounded-full pl-4 pr-10 py-1 transition-all duration-300 ${isSearchActive ? 'w-96' : 'w-64'}`}
                    />
                    <svg
                        onClick={handleSearchClick}
                        onBlur={handleSearchBlur}
                        tabIndex={0}
                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 cursor-pointer"
                        fill="currentColor"
                        viewBox="0 0 20 20"
                        width="20"
                        height="20"
                    >
                        <path fillRule="evenodd" d="M12.9 14.32a8 8 0 111.414-1.414l4.9 4.9a1 1 0 01-1.414 1.414l-4.9-4.9zm-5.9 0A6 6 0 1010 4a6 6 0 00-3 10.32z" clipRule="evenodd" />
                    </svg>
                </div>
            </div>
        </header>
    );
};

export default Header;
