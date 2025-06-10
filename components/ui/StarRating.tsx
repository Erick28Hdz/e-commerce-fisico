import React, { useState } from 'react';
import { Star } from 'lucide-react';

export interface StarRatingProps {
  rating: number; // Calificación actual
  onRatingChange?: (rating: number) => void; // Callback al cambiar la calificación
  totalStars?: number; // Total de estrellas (por defecto 5)
  editable?: boolean; // Si el usuario puede editar la calificación
}

const StarRating: React.FC<StarRatingProps> = ({
  rating,
  onRatingChange,
  totalStars = 5,
  editable = false,
}) => {
  const [hoveredStar, setHoveredStar] = useState<number | null>(null);

  const handleClick = (index: number) => {
    if (!editable || !onRatingChange) return;
    onRatingChange(index);
  };

  return (
    <div className="flex items-center gap-1">
      {Array.from({ length: totalStars }, (_, i) => {
        const index = i + 1;
        const isFilled = hoveredStar ? index <= hoveredStar : index <= rating;

        return (
          <Star
            key={index}
            size={20}
            className={editable ? 'cursor-pointer transition-colors' : 'transition-colors'}
            style={{
              fill: isFilled ? 'var(--color-principal)' : 'none',
              stroke: 'var(--color-principal)',
            }}
            onClick={() => handleClick(index)}
            onMouseEnter={() => editable && setHoveredStar(index)}
            onMouseLeave={() => editable && setHoveredStar(null)}
          />
        );
      })}
    </div>
  );
};

export default StarRating;
