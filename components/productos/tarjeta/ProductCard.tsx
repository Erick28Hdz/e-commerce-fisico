import Link from "next/link";
import { ProductoImagen } from "./ProductoImagen";
import { ProductoTitulo } from "./ProductoTitulo";
import { ProductoPrecio } from "../detallado/sec-derecha/ProductoPrecio";
import { ProductoPuntuacion } from "../detallado/review/ProductoPuntuacion";
import { ProductoMensaje } from "../detallado/sec-derecha/ProductoMensaje";
import { reviewsMock } from "@/data/reviewsMock";  // Importa las reseñas

interface ProductoCardProps {
  id: string;
  slug: string;
  nombre: string;
  imagen: string;
  precio: number;
  precioAntiguo?: number;
  descuento?: number;
  mensaje?: string;
}

export default function ProductoCard({
  id,
  slug,
  nombre,
  imagen,
  precio,
  precioAntiguo,
  descuento,
  mensaje,
}: ProductoCardProps) {
  // 1️⃣ Filtrar reseñas del producto actual
  const reseñasDelProducto = reviewsMock.filter((r) => r.productoId === id);

  // 2️⃣ Calcular promedio de puntuación
  const promedio =
    reseñasDelProducto.length > 0
      ? reseñasDelProducto.reduce((acc, r) => acc + r.calificacion, 0) / reseñasDelProducto.length
      : 0;

  return (
    <Link href={`/productos/${slug}`}>
      <div
        className="border rounded-lg p-4 hover:shadow-lg transition cursor-pointer relative flex flex-col justify-between h-[450px]"
        style={{
          backgroundColor: "var(--color-bg-light)",
          color: "var(--color-text-primary)",
          borderColor: "var(--color-accent)",
        }}
      >
        {/* BLOQUE SUPERIOR: Imagen + Mensaje */}
        <div className="relative">
          {mensaje && (
            <div className="absolute top-0 left-0 z-10">
              <ProductoMensaje mensaje={mensaje} />
            </div>
          )}
          <ProductoImagen src={imagen} alt={nombre} />
        </div>

        {/* BLOQUE INFERIOR: Título + Puntuación + Precio */}
        <div className="flex flex-col gap-1 mt-4">
          <ProductoTitulo nombre={nombre} />
          {/* Mostrar la puntuación calculada */}
          <ProductoPuntuacion productoId={id} rating={promedio} />
          <ProductoPrecio
            precio={precio}
            precioAntiguo={precioAntiguo}
            descuento={descuento}
          />
        </div>
      </div>
    </Link>
  );
}
