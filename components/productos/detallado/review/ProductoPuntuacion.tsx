import React from 'react';
import StarRating from '@/components/ui/StarRating'; // Asegúrate de que la ruta esté bien
import { reviewsMock } from '@/data/reviewsMock';

interface ProductoPuntuacionProps {
    productoId?: string;
    rating?: number;
}

export const ProductoPuntuacion: React.FC<ProductoPuntuacionProps> = ({ productoId, rating }) => {
  let promedio = rating ?? 0;
  let reseñas = [];

  if (productoId) {
    reseñas = reviewsMock.filter(review => review.productoId === productoId);
    promedio = reseñas.length > 0
      ? reseñas.reduce((acc, curr) => acc + curr.calificacion, 0) / reseñas.length
      : 0;
  }

  return (
    <div className="flex items-center gap-2">
      <StarRating rating={promedio} />
      <span className="text-sm text-gray-500">({reseñas.length} reseña{reseñas.length !== 1 ? 's' : ''})</span>
    </div>
  );
};
