// components/ProductoTituloDetalle.tsx

interface ProductoTituloDetalleProps {
  nombre: string;
  className?: string;
}

export function ProductoTituloDetalle({
  nombre,
  className = "",
}: ProductoTituloDetalleProps) {
  return <h3 className={`mt-2 ${className}`}>{nombre}</h3>;
}
