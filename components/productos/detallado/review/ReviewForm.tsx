// components/productos/ReviewForm.tsx
import { useState } from "react";
import { Star } from "lucide-react";
import { Textarea } from "@/components/ui/Textarea";
import { Button } from "@/components/ui/Button";

interface Props {
  onSubmit: (comentario: string, calificacion: number) => void;
}

export function ReviewForm({ onSubmit }: Props) {
  const [comentario, setComentario] = useState("");
  const [calificacion, setCalificacion] = useState(0);

  const handleSubmit = () => {
    if (!comentario || calificacion === 0) return;
    onSubmit(comentario, calificacion);
    setComentario("");
    setCalificacion(0);
  };
  return (
    <div className="bg-[var(--color-bg-secondary)] p-6 rounded-xl shadow-md">
      <h5 className="mb-4 text-[var(--color-principal)]">
        Escribe tu reseña
      </h5>
      <div className="flex gap-1 mb-4">
        {Array.from({ length: 5 }, (_, i) => (
          <Star
            key={i}
            onClick={() => setCalificacion(i + 1)}
            className={`cursor-pointer w-6 h-6 transition-all ${
              i < calificacion ? "fill-yellow-500" : "text-gray-300"
            }`}
          />
        ))}
      </div>
      <Textarea
        label="Comentario"
        placeholder="Escribe tu opinión sobre el producto..."
        rows={5}
        value={comentario}
        onChange={(e) => setComentario(e.target.value)}
      />
      <Button className="mt-4 w-full" variant="default" onClick={handleSubmit}>
        Enviar reseña
      </Button>
    </div>
  );
}
