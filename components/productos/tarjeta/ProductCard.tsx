import Link from "next/link";
import { ProductoImagen } from "./ProductoImagen";
import { ProductoTitulo } from "./ProductoTitulo";
import { ProductoPrecio } from "../detallado/sec-derecha/ProductoPrecio";
import { ProductoPuntuacion } from "../detallado/review/ProductoPuntuacion";
import { ProductoMensaje } from "../detallado/sec-derecha/ProductoMensaje";
import type { Producto } from '@prisma/client';

interface ProductoCardProps extends Producto {
  rating?: number;
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
  rating = 0,
}: ProductoCardProps) {
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
          <ProductoPuntuacion productoId={id} rating={rating} />
          <ProductoPrecio
            precio={precio}
            precioAntiguo={precioAntiguo ?? undefined}
            descuento={descuento ?? undefined}
          />
        </div>
      </div>
    </Link>
  );
}
