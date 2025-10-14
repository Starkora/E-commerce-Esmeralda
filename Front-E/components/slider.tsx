import Image from 'next/image';
import { useState, useEffect } from 'react';
import { ChevronLeftIcon, ChevronRightIcon } from '@heroicons/react/24/solid'; // Importamos los iconos

export default function Slider() {
    const images = ['Imagen1.svg', 'Imagen2.svg', 'Imagen3.svg']; // Asegúrate de que las imágenes estén en public/assets/slider1/
    const [selectedIndex, setSelectedIndex] = useState(0);

    const selectNewImage = (next = true) => {
        const condition = next ? selectedIndex < images.length - 1 : selectedIndex > 0;
        const nextIndex = next ? (condition ? selectedIndex + 1 : 0) : condition ? selectedIndex - 1 : images.length - 1;
        setSelectedIndex(nextIndex);
    };

    useEffect(() => {
        const interval = setInterval(() => {
            selectNewImage();
        }, 3000);
        
        return () => clearInterval(interval);
    }, [selectedIndex]);

    return (
        <div className="relative w-full h-[70vh] md:h-screen">
            <Image
                src={`/assets/slider1/${images[selectedIndex]}`}
                alt="Imagen del slider"
                fill
                priority
                className="z-0 object-cover"
            />

            <button
                onClick={selectNewImage.bind(null, false)}
                className="absolute top-1/2 left-4 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-2 rounded-full focus:outline-none transition z-10"
            >
                <ChevronLeftIcon className="h-6 w-6" />
            </button>

            <button
                onClick={selectNewImage.bind(null, true)}
                className="absolute top-1/2 right-4 transform -translate-y-1/2 bg-emerald-600 hover:bg-emerald-800 text-white font-bold py-2 px-2 rounded-full focus:outline-none transition z-10"
            >
                <ChevronRightIcon className="h-6 w-6" />
            </button>
        </div>
    );
}
