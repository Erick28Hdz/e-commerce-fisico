import { useState, useEffect } from "react";
import { ProductoPuntuacion } from "../review/ProductoPuntuacion";
import { ReviewList } from "../review/ReviewList";
import { ReviewForm } from "../review/ReviewForm";

interface Review {
  productoId: string;
  usuario: string;
  fecha: string;
  calificacion: number;
  comentario: string;
}

interface Producto {
  id: string;
  nombre: string;
}

interface ProductoReviewsProps {
  producto: Producto;
  initialReviews: Review[]; // ⚠️ Ahora es obligatorio
}

export function ProductoReviews({ producto, initialReviews }: ProductoReviewsProps) {
  // Estado local con las reseñas filtradas ya recibidas
  const [comentarios, setComentarios] = useState<Review[]>(initialReviews);

  useEffect(() => {
    setComentarios(initialReviews);
  }, [initialReviews]);

  const promedio =
    comentarios.length > 0
      ? comentarios.reduce((acc, r) => acc + r.calificacion, 0) / comentarios.length
      : 0;

  const handleSubmit = (comentario: string, calificacion: number) => {
    const nuevaReview: Review = {
      productoId: producto.id,
      usuario: "Usuario anónimo",
      fecha: new Date().toISOString().split("T")[0],
      calificacion,
      comentario,
    };
    setComentarios((prev) => [...prev, nuevaReview]);
  };

  return (
    <div className="mt-16">
      <h4 className="mb-4 text-center">Reseñas y calificaciones</h4>

      <div className="flex justify-center mb-10">
        <ProductoPuntuacion productoId={producto.id} rating={promedio} />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
        <ReviewList comentarios={comentarios} />
        <ReviewForm onSubmit={handleSubmit} />
      </div>
    </div>
  );
}
