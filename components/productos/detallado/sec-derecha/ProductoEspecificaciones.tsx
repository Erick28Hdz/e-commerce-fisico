// components/ProductoEspecificaciones.tsx
import React from "react";

export const ProductoEspecificaciones: React.FC = () => {
  return (
    <div className="mt-6">
      <h4 className="font-semibold text-[var(--color-principal)] text-xl border-b border-[var(--color-accent)] pb-1 mb-2">
        Especificaciones
      </h4>
      <ul className="text-sm list-disc pl-5 text-[var(--color-text-primary)] space-y-1">
        <li>Material: Algodón 100%</li>
        <li>Peso: 200g</li>
        <li>Hecho en: México</li>
      </ul>
    </div>
  );
};

