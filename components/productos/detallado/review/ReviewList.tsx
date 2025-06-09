// components/productos/ReviewList.tsx
import { ReviewItem } from "./ReviewItem";

interface Props {
  comentarios: {
    usuario: string;
    fecha: string;
    calificacion: number;
    comentario: string;
  }[];
}

export function ReviewList({ comentarios }: Props) {
  return (
    <div
      className="space-y-6 overflow-y-auto pr-2"
      style={{ maxHeight: "400px" }}
    >
      {comentarios.map((r, i) => (
        <ReviewItem key={i} {...r} />
      ))}
    </div>
  );
}
