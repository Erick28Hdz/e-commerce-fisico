// components/ProductoTitulo.tsx
interface ProductoTituloProps {
  nombre: string;
  className?: string;
}

export function ProductoTitulo({ nombre, className = "text-base" }: ProductoTituloProps) {
  return <h5 className={`mt-2 font-bold ${className}`}>{nombre}</h5>;
}
