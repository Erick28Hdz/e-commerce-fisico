import ProductoCard from "../../tarjeta/ProductCard";
import { productosMock } from "@/data/productosMock";

export default function ProductosMasVendidos() {
  const masVendidos = productosMock.slice(0, 5); // Ejemplo simple

  if (masVendidos.length === 0) return null;

  return (
    <div className="mt-16 relative">
      <h4 className="mb-4">Más vendidos</h4>

      {/* Contenedor con scroll y sombras */}
      <div className="relative">
        {/* Scroll horizontal */}
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-2">
          {masVendidos.map((producto) => (
            <div key={producto.slug} className="min-w-[250px] max-w-[250px] flex-shrink-0">
              <ProductoCard {...producto} />
            </div>
          ))}
        </div>

        {/* Sombras izquierda y derecha */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-1 bg-gradient-to-r from-white/90 to-transparent dark:from-black/30 z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1 bg-gradient-to-l from-white/90 to-transparent dark:from-black/30 z-10" />
      </div>
    </div>
  );
}
