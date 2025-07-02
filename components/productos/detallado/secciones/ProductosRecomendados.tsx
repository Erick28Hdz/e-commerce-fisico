import { useEffect, useState } from 'react';
import ProductoCard from "../../tarjeta/ProductCard";
import type { Producto } from '@prisma/client';

type ProductoConRating = Producto & {
  rating: number;
};

export default function ProductosRecomendados() {
  const [recomendados, setRecomendados] = useState<ProductoConRating[]>([]);

  useEffect(() => {
    fetch('/api/productos/recomendados')
      .then((res) => res.json())
      .then((data: ProductoConRating[]) => setRecomendados(data));
  }, []);

  if (recomendados.length === 0) return null;

  return (
    <div className="mt-16 relative">
      <h4 className="mb-4">Recomendados para ti</h4>

      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 px-2 scrollbar-hide">
          {recomendados.map((producto) => (
            <div
              key={producto.slug}
              className="min-w-[250px] max-w-[250px] flex-shrink-0"
            >
              <ProductoCard {...producto} rating={producto.rating} />
            </div>
          ))}
        </div>

        {/* Sombras laterales */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-1 bg-gradient-to-r from-white/90 to-transparent dark:from-black/30 z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1 bg-gradient-to-l from-white/90 to-transparent dark:from-black/30 z-10" />
      </div>
    </div>
  );
}
