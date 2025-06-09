// @/components/productos/ProductosMasVendidos.tsx
import ProductoCard from "../../tarjeta/ProductCard";
import { productosMock } from "@/data/productosMock";

export default function ProductosMasVendidos() {
  const masVendidos = productosMock.slice(0, 5); // Ejemplo simple

  if (masVendidos.length === 0) return null;

  return (
    <div className="mt-16">
      <h4 className="mb-4">Más vendidos</h4>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {masVendidos.map((producto) => (
          <div key={producto.slug} className="min-w-[250px] max-w-[250px] flex-shrink-0">
            <ProductoCard {...producto} />
          </div>
        ))}
      </div>
    </div>
  );
}
