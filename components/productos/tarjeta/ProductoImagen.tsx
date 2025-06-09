// components/productos/ProductoImagen.tsx
import Image from "next/image";

interface ProductoImagenProps {
  src: string;
  alt: string;
  className?: string;
}

export function ProductoImagen({ src, alt, className = "" }: ProductoImagenProps) {
  return (
    <div
      className={`
    relative 
    overflow-hidden 
    rounded-lg 
    shadow-lg 
    group 
    w-full 
    h-[250px]     // <- altura fija para todas las imágenes
    ${className}
  `}
    >
      <Image
        src={src}
        alt={alt}
        fill              // <- ocupa todo el contenedor
        className="object-contain transition-transform duration-300 group-hover:scale-105"
        placeholder="blur"
        blurDataURL="/placeholder.png"
      />
    </div>
  );
}
