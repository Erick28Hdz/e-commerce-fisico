// @/components/productos/ProductosMismaCategoria.tsx

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
    <div className="mt-16">
      <h4 className="mb-4">Productos de la misma categoría</h4>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {productosRelacionados.map((producto) => (
          <div key={producto.slug} className="min-w-[250px] max-w-[250px] flex-shrink-0">
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
    </div>
  );
}
