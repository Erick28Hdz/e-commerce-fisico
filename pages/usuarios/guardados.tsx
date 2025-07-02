'use client';

import { useEffect, useState } from "react";
import { Section } from "@/components/ui/Section";
import ProductoCard from "@/components/productos/tarjeta/ProductCard";
import type { Producto } from "@prisma/client";

export default function ProductosGuardados() {
  const [guardados, setGuardados] = useState<Producto[]>([]);

  useEffect(() => {
    fetch("/api/productos/productos-guardados")
      .then(res => res.json())
      .then(setGuardados)
      .catch(err => console.error("Error cargando productos guardados:", err));
  }, []);

  return (
    <Section>
      <h2 className="text-2xl font-bold text-center text-[var(--color-principal)] mb-6">
        Productos Guardados
      </h2>

      {guardados.length === 0 ? (
        <p className="text-center text-gray-500">No tienes productos guardados.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {guardados.map((producto) => (
            <ProductoCard key={producto.id} {...producto} />
          ))}
        </div>
      )}
    </Section>
  );
}
