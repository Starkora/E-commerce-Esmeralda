import React, { useState } from 'react';
import Link from 'next/link';
import { FaWhatsapp, FaFacebook, FaInstagram, FaCreditCard, FaUniversity, FaMobileAlt } from 'react-icons/fa';
import { SiVisa, SiMastercard } from 'react-icons/si';
import Image from 'next/image';

const Footer: React.FC = () => {
    const [email, setEmail] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);

    const handleNewsletterSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email.trim()) return;

        setIsSubmitting(true);
        // Simulación de envío - aquí conectarías con tu API
        setTimeout(() => {
            alert('¡Gracias por suscribirte! Recibirás nuestras ofertas en tu correo.');
            setEmail('');
            setIsSubmitting(false);
        }, 1000);
    };

    return (
        <footer className="bg-gradient-to-b from-gray-900 to-black text-white">
            {/* Main Footer Content */}
            <div className="max-w-7xl mx-auto px-4 py-12">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Te Ayudamos */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-emerald-400">Te Ayudamos</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/help-center" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    📋 Centro de Ayuda
                                </Link>
                            </li>
                            <li>
                                <Link href="/whatsapp-support" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    💬 Atención por WhatsApp
                                </Link>
                            </li>
                            <li>
                                <Link href="/delivery-types" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    🚚 Tipos de Entrega
                                </Link>
                            </li>
                            <li>
                                <Link href="/faq" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    ❓ Preguntas Frecuentes
                                </Link>
                            </li>
                        </ul>
                    </div>

                    {/* Estilo Esmeralda */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-emerald-400">Estilo Esmeralda</h3>
                        <ul className="space-y-3">
                            <li>
                                <Link href="/about" className="text-gray-300 hover:text-emerald-400 transition-colors">
                                    Sobre Nosotros
                                </Link>
                            </li>
                            <li>
                                <Link href="/contact" className="text-gray-300 hover:text-emerald-400 transition-colors">
                                    Contáctanos
                                </Link>
                            </li>
                            <li>
                                <Link href="/catalog" className="text-gray-300 hover:text-emerald-400 transition-colors">
                                    Catálogo
                                </Link>
                            </li>
                            <li>
                                <Link href="/stores" className="text-gray-300 hover:text-emerald-400 transition-colors">
                                    Tiendas
                                </Link>
                            </li>
                        </ul>

                        {/* Políticas */}
                        <div className="mt-6">
                            <h4 className="font-semibold mb-2 text-sm">Políticas</h4>
                            <ul className="space-y-2 text-sm">
                                <li>
                                    <Link href="/privacy-policy" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                        Privacidad
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/terms" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                        Términos y Condiciones
                                    </Link>
                                </li>
                                <li>
                                    <Link href="/returns" className="text-gray-400 hover:text-emerald-400 transition-colors">
                                        Devoluciones
                                    </Link>
                                </li>
                            </ul>
                        </div>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-emerald-400">Nuevas Ofertas</h3>
                        <p className="text-gray-300 mb-4 text-sm">
                            Suscríbete para recibir ofertas exclusivas y novedades
                        </p>
                        <form onSubmit={handleNewsletterSubmit} className="space-y-3">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                placeholder="tu@email.com"
                                required
                                className="w-full px-4 py-2 rounded-lg bg-gray-800 border border-gray-700 text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-emerald-500"
                            />
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="w-full bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-2 rounded-lg transition-colors disabled:opacity-50"
                            >
                                {isSubmitting ? 'Enviando...' : 'Suscribirse'}
                            </button>
                        </form>

                        {/* Social Media */}
                        <div className="mt-6">
                            <h4 className="font-semibold mb-3">Síguenos</h4>
                            <div className="flex gap-4">
                                <a
                                    href="https://wa.me/51999999999"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-green-600 hover:bg-green-700 p-3 rounded-full transition-colors"
                                >
                                    <FaWhatsapp className="text-xl" />
                                </a>
                                <a
                                    href="https://instagram.com/estiloesmeralda"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-gradient-to-br from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 p-3 rounded-full transition-colors"
                                >
                                    <FaInstagram className="text-xl" />
                                </a>
                                <a
                                    href="https://facebook.com/estiloesmeralda"
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="bg-blue-600 hover:bg-blue-700 p-3 rounded-full transition-colors"
                                >
                                    <FaFacebook className="text-xl" />
                                </a>
                            </div>
                        </div>
                    </div>

                    {/* Métodos de Pago */}
                    <div>
                        <h3 className="text-xl font-bold mb-4 text-emerald-400">Métodos de Pago</h3>
                        <ul className="space-y-3 mb-6">
                            <li>
                                <Link href="/payment-yape" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    <FaMobileAlt /> Yape
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment-plin" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    <FaMobileAlt /> Plin
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment-card" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    <FaCreditCard /> Tarjeta de Crédito
                                </Link>
                            </li>
                            <li>
                                <Link href="/payment-transfer" className="text-gray-300 hover:text-emerald-400 transition-colors flex items-center gap-2">
                                    <FaUniversity /> Transferencia
                                </Link>
                            </li>
                        </ul>

                        {/* Payment Icons */}
                        <div className="space-y-2">
                            <p className="text-sm text-gray-400 font-semibold">Aceptamos:</p>
                            <div className="flex flex-wrap gap-3">
                                <div className="bg-white p-2 rounded">
                                    <SiVisa className="text-blue-600 text-2xl" />
                                </div>
                                <div className="bg-white p-2 rounded">
                                    <SiMastercard className="text-red-600 text-2xl" />
                                </div>
                                <div className="bg-gradient-to-r from-purple-600 to-purple-800 p-2 rounded text-white font-bold text-xs flex items-center">
                                    YAPE
                                </div>
                                <div className="bg-gradient-to-r from-blue-500 to-blue-700 p-2 rounded text-white font-bold text-xs flex items-center">
                                    PLIN
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div className="border-t border-gray-800">
                <div className="max-w-7xl mx-auto px-4 py-6">
                    <div className="flex flex-col md:flex-row justify-between items-center gap-4">
                        <a
                            href="https://www.facebook.com/profile.php?id=61564968620856&mibextid=LQQJ4d"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-400 hover:text-emerald-400 transition-colors text-sm"
                        >
                            Desarrollado por <span className="font-semibold">CodeTechSolutions</span>
                        </a>
                        <p className="text-gray-400 text-sm text-center">
                            © 2024 Estilo Esmeralda. Todos los derechos reservados.
                        </p>
                        <div className="flex gap-4 text-sm text-gray-400">
                            <Link href="/privacy-policy" className="hover:text-emerald-400 transition-colors">
                                Privacidad
                            </Link>
                            <Link href="/terms" className="hover:text-emerald-400 transition-colors">
                                Términos
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;