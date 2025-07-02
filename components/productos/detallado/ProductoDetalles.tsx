import React from "react";
import { ProductoTituloDetalle } from "./sec-derecha/ProductoTituloDetalle";
import { ProductoCategoria } from "./sec-derecha/ProductoCategoria";
import { ProductoPrecio } from "./sec-derecha/ProductoPrecio";
import { ProductoTallas } from "./sec-derecha/ProductoTallas";
import { ProductoColor } from "./sec-derecha/ProductoColor";
import { ProductoPuntuacion } from "./review/ProductoPuntuacion";
import { ProductoMensaje } from "./sec-derecha/ProductoMensaje";
import { ProductoDescripcion } from "./sec-derecha/ProductoDescripcion";
import { ProductoAcciones } from "./sec-derecha/ProductoAcciones";
import { ProductoEspecificaciones } from "./sec-derecha/ProductoEspecificaciones";
import { PreguntasFrecuentesModal } from "@/components/productos/detallado/sec-derecha/PreguntasModal";
import { GarantiaModal } from "./sec-derecha/GarantiaModal";

import { GuiaCategoriaModal } from "./sec-derecha/GuiaCategoriaModal";

interface ProductoDetallesProps {
  producto: {
    id: string;
    nombre: string;
    slug: string;
    imagen: string;
    categoria: string;
    precio: number;
    precioAntiguo: number | null; // <--- cambia esto
    descuento: number | null;     // <--- y este también
    variantes: string[];
    color: string;
    calificacion?: number;
    stock: number;
    mensaje: string | null;       // <--- y este también
    descripcion: string;
    referencia: string;
  },
  review: {
  }
}

export const ProductoDetalles: React.FC<{ producto: ProductoDetallesProps["producto"] }> = ({ producto }) => {
  const { id, calificacion } = producto;
  return (
    <div
      className="
        flex-1 flex flex-col justify-start
        bg-[var(--color-bg-light)] text-[var(--color-text-primary)]
        p-6
        rounded-xl
        shadow-md
        border border-[var(--color-accent)]
        max-w-xl
        mx-auto
      "
    >
      <div className="mt-2 flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          {producto.referencia && (
            <p className="text-sm text-[var(--color-accent)] italic">Ref: {producto.referencia}</p>
          )}
          <ProductoCategoria categoria={producto.categoria} />
        </div>

        <div className="flex mt-2 sm:mt-0">
          <PreguntasFrecuentesModal />
          <GarantiaModal />
        </div>
      </div>

      <div className="flex flex-col gap-2">
        {/* Fila: Título y Acciones */}
        <div className="flex justify-between items-start">
          <ProductoTituloDetalle nombre={producto.nombre} />
        </div>
        {/* Mensaje debajo del título */}
        {producto.mensaje && (
          <ProductoMensaje mensaje={producto.mensaje} />
        )}
      </div>
      <div className="mt-2">
        <ProductoPuntuacion productoId={id} rating={calificacion} />
      </div>
      <div className="mt-4">
        <ProductoPrecio
          precio={producto.precio}
          precioAntiguo={producto.precioAntiguo ?? undefined}
          descuento={producto.descuento ?? undefined}
        />
      </div>
      <div className="mt-2">
        <ProductoDescripcion descripcion={producto.descripcion} />
      </div>
      <ProductoEspecificaciones />
      <div className="mt-6 flex">
        <ProductoTallas tallas={producto.variantes} />
        <GuiaCategoriaModal categoria={producto.categoria} />
      </div>
      {/* Mostrar guía según la categoría */}

      <div className="mt-6 flex justify-between">
        <div><ProductoColor color={producto.color} /></div>
        <div>{producto && <ProductoAcciones producto={producto} />}</div>
      </div>
    </div>
  );
};
