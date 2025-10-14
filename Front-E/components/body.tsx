import AnnouncementBar from './AnnouncementBar';
import ButtonVerProductos from './ButtonVerProductos';
import ProductoCard from "./ProductCard"; 
import { useRouter } from 'next/router';
import { useEffect } from 'react';
import toast from 'react-hot-toast';

const Body: React.FC = () => {
    const router = useRouter();

    useEffect(() => {
        if (router.isReady) {
            const { verified } = router.query;
            const v = Array.isArray(verified) ? verified[0] : verified;
            if (v === '1') {
                toast.success('Tu correo fue verificado correctamente');
                // Optional: remove query param from URL
                const { pathname, query } = router;
                delete query.verified;
                router.replace({ pathname, query }, undefined, { shallow: true });
            }
        }
    }, [router]);
    return (
        <div>
            <section className="flex flex-col md:flex-row justify-between items-center p-10">
                <div className="w-full flex flex-col items-center justify-center">
                    <img src="/assets/body/first_section/medias.webp"
                        alt="medias"
                        className="rounded-full w-5/12 cursor-pointer border-4 border-transparent hover:border-emerald-500 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-black"
                    />
                    <p className="text-center font-bold">Medias</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <img src="/assets/body/first_section/Polos.webp"
                        alt="polos"
                        className="rounded-full w-5/12 cursor-pointer border-4 border-transparent hover:border-emerald-500 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-black"
                    />
                    <p className="text-center font-bold">Polos</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <img src="/assets/body/first_section/Pantalones.webp"
                        alt="pantalones"
                        className="rounded-full w-5/12 cursor-pointer border-4 border-transparent hover:border-emerald-500 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-black"
                    />
                    <p className="text-center font-bold">Pantalones</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <img src="/assets/body/first_section/Zapatillas.webp"
                        alt="Zapatillas"
                        className="rounded-full w-5/12 cursor-pointer border-4 border-transparent hover:border-emerald-500 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-black"
                    />
                    <p className="text-center font-bold">Zapatillas</p>
                </div>
                <div className="w-full flex flex-col items-center justify-center">
                    <img src="/assets/body/first_section/Casacas.webp"
                        alt="casacas"
                        className="rounded-full w-5/12 cursor-pointer border-4 border-transparent hover:border-emerald-500 hover:shadow-lg hover:scale-105 transition-all duration-300 bg-black"
                    />
                    <p className="text-center font-bold">Casacas</p>
                </div>
            </section>
            <section>
                <div className="text-center p-2">
                    <h3 className="p-2">PROMOCION</h3>
                    <h1 className="p-2 font-medium text-3xl	">Final de Temporada de Invierno</h1>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-8">
                    <div className="w-full bg-gray-300 p-4">
                        <a href="">
                            <div className="relative">
                                {/* Imagen por defecto */}
                                <img
                                    src="/assets/body/second_section/Polera.webp"
                                    alt="Short básico"
                                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-0"
                                />
                                {/* Imagen al hacer hover */}
                                <img
                                    src="/assets/body/second_section/Polera2.webp"
                                    alt="Short hover"
                                    className="w-full h-full object-cover absolute top-0 left-0 transition duration-300 ease-in-out opacity-0 hover:opacity-100"
                                />
                            </div>
                        </a>
                        <div className="text-center font-medium tracking-widest mt-8">
                            <h2>
                                <a href="">POLERA M/L BASICA VERDE</a>
                            </h2>
                        </div>
                        <div className="text-center font-thin text-2 tracking-widest p-2">
                            <p>s/.30.90</p>
                        </div>
                        <div className="text-center">
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                S
                            </button>
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                M
                            </button>
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                L
                            </button>
                        </div>
                    </div>

                    <div className="w-full bg-gray-300 p-4">
                        <a href="">
                            <div className="relative">
                                {/* Imagen por defecto */}
                                <img
                                    src="/assets/body/second_section/Pantalon.webp"
                                    alt="Short básico"
                                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-0"
                                />
                                {/* Imagen al hacer hover */}
                                <img
                                    src="/assets/body/second_section/Pantalon2.webp"
                                    alt="Short hover"
                                    className="w-full h-full object-cover absolute top-0 left-0 transition duration-300 ease-in-out opacity-0 hover:opacity-100"
                                />
                            </div>
                        </a>
                        <div className="text-center font-medium tracking-widest mt-8">
                            <h2>
                                <a href="">PANTALON M/L BASICO BEIGE</a>
                            </h2>
                        </div>
                        <div className="text-center font-thin text-2 tracking-widest p-2">
                            <p>s/.30.90</p>
                        </div>
                        <div className="text-center">
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                S
                            </button>
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                M
                            </button>
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                L
                            </button>
                        </div>
                    </div>

                    <div className="w-full bg-gray-300 p-4">
                        <a href="">
                            <div className="relative">
                                {/* Imagen por defecto */}
                                <img
                                    src="/assets/body/second_section/Short.webp"
                                    alt="Short básico"
                                    className="w-full h-full object-cover transition duration-300 ease-in-out hover:opacity-0 mt-8"
                                />
                                {/* Imagen al hacer hover */}
                                <img
                                    src="/assets/body/second_section/Short2.webp"
                                    alt="Short hover"
                                    className="w-full h-full object-cover absolute top-0 left-0 transition duration-300 ease-in-out opacity-0 hover:opacity-100"
                                />
                            </div>
                        </a>
                        <div className="text-center font-medium tracking-widest mt-12">
                            <h2>
                                <a href="">SHORT M/L BASICO PLOMO</a>
                            </h2>
                        </div>
                        <div className="text-center font-thin text-2 tracking-widest p-2">
                            <p>s/.30.90</p>
                        </div>
                        <div className="text-center">
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                S
                            </button>
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                M
                            </button>
                            <button className="border-2 border-black mx-1 px-2 py-1 hover:bg-black hover:text-white">
                                L
                            </button>
                        </div>
                    </div>
                </div>

                <div className="text-center p-6 tracking-widest mt-6 my-6">
                    <button className="border-2 border-black bg-black text-white p-4 w-96 font-light tracking-widest uppercase transition duration-300 ease-in-out transform hover:bg-white hover:text-black hover:scale-105 cursor-pointer">
                        VER MÁS PRODUCTOS
                    </button>
                </div>


            </section>

            <section>
                <div className="text-center p-2">
                    <h3 className="p-2 font-thin">PROMOCION</h3>
                    <h1 className="p-2 font-extralight text-3xl	">Incio de Temporada de Verano</h1>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-8">

                    {/* Producto 1 */}
                    <ProductoCard
                        src="/assets/body/third_section/Camisa.webp"
                        alt="Camisas"
                        title="Camisas"
                    />

                    {/* Producto 2 */}
                    <ProductoCard
                        src="/assets/body/third_section/Short.webp"
                        alt="Shorts"
                        title="Shorts"
                    />


                    {/* Producto 3 */}
                    <ProductoCard
                        src="/assets/body/third_section/Pantalon.webp"
                        alt="Pantalones"
                        title="Pantalones"
                    />


                </div>
            </section>

            <section>
                <div>
                    <AnnouncementBar message='🚚 ENVÍO GRATIS POR COMPRAS SUPERIORES A S/199 🚚' />
                    {/* Resto de tu aplicación */}
                </div>
            </section>

            <section>
                <div className="text-center p-2">
                    <h1 className="p-2 font-semibold text-3xl">NUEVAS OFERTAS</h1>
                    <h3 className="p-2 font-extralight text-2xl">Otros Estilos</h3>
                </div>

                <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 p-8">

                    {/* Producto 1 */}
                    <ProductoCard
                        src="/assets/body/for_section/Gabardina.avif"
                        alt="Gabardina"
                        title="Gabardina"
                    />

                    {/* Producto 2 */}
                    <ProductoCard
                        src="/assets/body/for_section/Pantalon_italiano.webp"
                        alt="Pantalon"
                        title="Pantalon"
                    />

                    {/* Producto 3 */}
                    <ProductoCard
                        src="/assets/body/for_section/Cafarenas.webp"
                        alt="Cafarenas"
                        title="CAFARENAS"
                    />

                </div>

            </section>
        </div>
    );
}

export default Body;
