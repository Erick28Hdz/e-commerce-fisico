// @/components/productos/ProductosRecomendados.tsx
import ProductoCard from "../../tarjeta/ProductCard";
import { productosMock } from "@/data/productosMock";

export default function ProductosRecomendados() {
  const recomendados = productosMock.slice(-5); // Simulación simple

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
              <ProductoCard {...producto} />
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
