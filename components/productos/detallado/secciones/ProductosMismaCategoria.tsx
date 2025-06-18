import ProductoCard from "../../tarjeta/ProductCard";
import { productosMock } from "@/data/productosMock";

interface Props {
  categoria: string;
  actualSlug: string;
}

export default function ProductosMismaCategoria({ categoria, actualSlug }: Props) {
  const productosRelacionados = productosMock.filter(
    (p) => p.categoria === categoria && p.slug !== actualSlug
  );

  if (productosRelacionados.length === 0) return null;

  return (
    <div className="mt-16 relative">
      <h4 className="mb-4">Productos de la misma categoría</h4>

      <div className="relative">
        <div className="flex overflow-x-auto gap-4 pb-4 scrollbar-hide px-2">
          {productosRelacionados.map((producto) => (
            <div
              key={producto.slug}
              className="min-w-[250px] max-w-[250px] flex-shrink-0"
            >
              <ProductoCard
                id={producto.id}
                slug={producto.slug}
                nombre={producto.nombre}
                imagen={producto.imagen}
                precio={producto.precio}
                precioAntiguo={producto.precioAntiguo}
                descuento={producto.descuento}
                mensaje={producto.mensaje}
              />
            </div>
          ))}
        </div>

        {/* Sombras en los extremos */}
        <div className="pointer-events-none absolute top-0 left-0 h-full w-1 bg-gradient-to-r from-white/90 to-transparent dark:from-black/30 z-10" />
        <div className="pointer-events-none absolute top-0 right-0 h-full w-1 bg-gradient-to-l from-white/90 to-transparent dark:from-black/30 z-10" />
      </div>
    </div>
  );
}
