// components/productos/ReviewItem.tsx
import { Star } from "lucide-react";

interface Props {
  usuario: string;
  fecha: string;
  calificacion: number;
  comentario: string;
}

export function ReviewItem({ usuario, fecha, calificacion, comentario }: Props) {
  return (
    <div
      className="p-4 rounded-xl shadow-md"
      style={{ backgroundColor: "var(--color-bg-secondary)" }}
    >
      <div className="flex justify-between mb-1">
        <strong className="text-[var(--color-principal)]">{usuario}</strong>
        <span className="text-xs text-gray-600">{fecha}</span>
      </div>
      <div className="text-yellow-500 flex mb-1">
        {Array.from({ length: 5 }, (_, j) => (
          <Star
            key={j}
            className={`w-4 h-4 ${j < calificacion ? "fill-yellow-500" : ""}`}
          />
        ))}
      </div>
      <p className="text-sm text-[var(--color-text-primary)]">{comentario}</p>
    </div>
  );
}
