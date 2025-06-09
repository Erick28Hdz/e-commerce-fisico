// components/productos/GaleriaMiniaturas.tsx
interface GaleriaMiniaturasProps {
  imagenes: string[];
  imagenSeleccionada: string;
  setImagenSeleccionada: (img: string) => void;
  alt: string;
}

export function GaleriaMiniaturas({
  imagenes,
  imagenSeleccionada,
  setImagenSeleccionada,
  alt,
}: GaleriaMiniaturasProps) {
  return (
    <div className="flex gap-4 justify-center mt-2">
      {imagenes.length > 1
        ? imagenes.map((img, index) => (
            <button
              key={index}
              onClick={() => setImagenSeleccionada(img)}
              className={`w-16 h-16 rounded-md overflow-hidden border-2 transition-all duration-300 shadow-sm ${
                imagenSeleccionada === img
                  ? "border-[var(--color-principal)] ring-2 ring-[var(--color-principal)] scale-105"
                  : "border-[var(--color-accent)] hover:ring-2 hover:ring-[var(--color-accent)]"
              }`}
              aria-label={`Miniatura ${index + 1}`}
            >
              <img
                src={img}
                alt={`${alt} miniatura ${index + 1}`}
                className="w-full h-full object-cover"
              />
            </button>
          ))
        : Array.from({ length: 5 }).map((_, index) => (
            <div
              key={index}
              className="w-16 h-16 border-2 border-dashed border-[var(--color-accent)] bg-[var(--color-bg-secondary)] rounded-md flex items-center justify-center text-[var(--color-text-primary)] text-xs shadow-inner"
            >
              Vacío
            </div>
          ))}
    </div>
  );
}
