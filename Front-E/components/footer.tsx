import React, { useState, useRef } from 'react';  // Importa useState y useRef para manejar referencias
import { FaWhatsapp, FaFacebook, FaInstagramSquare } from 'react-icons/fa'; // Importa iconos
import Image from 'next/image';  // Si usarás la funcionalidad de Next.js para optimizar imágenes.


const Footer: React.FC = () => {

    return (
        <footer className="bg-black">
            <section>
                <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 p-4'>
                    <div className='flex justify-between items-center p-4'>
                        <nav>
                            <div>
                                <h1 className='text-white text-2xl font-black'>Te ayudamos</h1>
                                <ul>
                                    <a href="/help-center" className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>
                                        Centro de Ayuda
                                    </a>

                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>  <a href="/whatsapp-support">
                                        Atencion por Whatsapp
                                    </a></li>

                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'> <a href="/delivery-types  ">
                                        Tipos de Entrega
                                    </a></li>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>
                                        <a href="/faq">
                                        Preguntas Frecuentes
                                    </a>
                                    </li>
                                </ul>
                            </div>
                        </nav>
                    </div>

                    <div className='flex justify-between items-center p-4'>
                        <nav>
                            <div>
                                <h1 className='text-white text-2xl font-black text-right'>Estilo Esmeralda</h1>
                                <ul>
                                    <a href="./about"><li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Sobre nosotros</li></a>
                                    <a href="./contact"><li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Contactanos</li></a>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Catalogo</li>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Tiendas</li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                    <div className='flex justify-between items-center p-4'>
                        <nav>
                            <div>
                                <h1 className='text-white text-2xl font-black text-center'>Nuevas Ofertas</h1>
                                <p className='text-white leading-10'>Subscribete para nuevas ofertas</p>
                                <input type="text" id="first_name" className="leading-5 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Ingresa tu Email" required />
                                <div className='flex justify-between items-center p-6'>
                                    <a href="#" className="hover:border-b hover:border-white">
                                        <FaWhatsapp className="fill-blue-500 text-3xl" />
                                    </a>
                                    <a href="#" className="relative hover:border-b hover:border-white">
                                        <FaInstagramSquare className="fill-blue-500 text-3xl">
                                            <span className="absolute top-0 right-0 bg-red-500 text-white text-xs w-4 h-4 rounded-full flex items-center justify-center">0</span>
                                        </FaInstagramSquare >
                                    </a>
                                    <a href="#" className="hover:border-b hover:border-white">
                                        <FaFacebook className="fill-blue-500 text-3xl" />
                                    </a>
                                </div>
                            </div>
                        </nav>
                    </div>
                    <div className='flex justify-between items-center p-4'>
                        <nav>
                            <div>
                                <h1 className='text-white text-2xl font-black '>Tipos de pago</h1>
                                <ul>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Yape</li>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Plin</li>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Tarjeta de Credito</li>
                                    <li className='text-white hover:text-emerald-100 cursor-pointer	 leading-10'>Transferencia</li>
                                </ul>
                            </div>
                        </nav>
                    </div>
                </div>
            </section>

            <section>
                <div className='flex justify-between items-center'>
                    <a href='https://www.facebook.com/profile.php?id=61564968620856&mibextid=LQQJ4d' target='_blank' className='text-white hover:text-emerald-100 cursor-pointer font-semibold p-4'>
                        Desarrollado por CodeTechSolutions
                    </a>
                    <p className='text-white font-semibold p-4'>
                        Estilo Esmeralda 2024 © Todos los derechos reservados
                    </p>
                </div>
            </section>

        </footer>
    )
}

export default Footer;