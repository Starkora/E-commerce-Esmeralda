import React from "react";
import Image from "next/image";
import ButtonVerProductos from "./ButtonVerProductos"; // Asegúrate de tener el botón en el mismo directorio o ajusta la ruta.

interface ProductoCardProps {
    src: string;
    alt: string;
    title: string;
}

const ProductoCard: React.FC<ProductoCardProps> = ({ src, alt, title }) => {
    return (
        <a href="#">
            <div className="relative group overflow-hidden">
                <div className="transform transition duration-500 ease-in-out group-hover:scale-110">
                    <Image src={src} alt={alt} className="w-full h-96 object-cover" width={500} height={384} />
                </div>
                {/* Texto y botón superpuestos */}
                <div className="absolute bottom-0 left-0 p-6 flex flex-col justify-start items-start">
                    <h2 className="text-orange-400 text-2xl font-extrabold mb-2">{title}</h2>
                    <ButtonVerProductos />
                </div>
            </div>
        </a>
    );
};

export default ProductoCard;
