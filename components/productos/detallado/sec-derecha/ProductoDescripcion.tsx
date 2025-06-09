import React from "react";

interface ProductoDescripcionProps {
  descripcion: string;
}

export const ProductoDescripcion: React.FC<ProductoDescripcionProps> = ({ descripcion }) => {
  return (
    <div className="mt-2">
      <h4 className="font-semibold mb-3 text-[var(--color-principal)] text-xl border-b border-[var(--color-accent)] pb-1">
        Descripción
      </h4>
      <p className="leading-relaxed text-base">{descripcion}</p>
    </div>
  );
};
