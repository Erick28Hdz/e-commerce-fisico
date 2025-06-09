// @/components/productos/ProductosRecomendados.tsx
import ProductoCard from "../../tarjeta/ProductCard";
import { productosMock } from "@/data/productosMock";

export default function ProductosRecomendados() {
  const recomendados = productosMock.slice(-5); // Simulación simple

  if (recomendados.length === 0) return null;

  return (
    <div className="mt-16">
      <h4 className="mb-4">Recomendados para ti</h4>
      <div className="flex overflow-x-auto gap-4 pb-4">
        {recomendados.map((producto) => (
          <div key={producto.slug} className="min-w-[250px] max-w-[250px] flex-shrink-0">
            <ProductoCard {...producto} />
          </div>
        ))}
      </div>
    </div>
  );
}
