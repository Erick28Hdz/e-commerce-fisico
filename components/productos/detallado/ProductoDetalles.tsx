import React from "react";
import { ProductoTituloDetalle } from "./sec-derecha/ProductoTituloDetalle";
import { ProductoCategoria } from "./sec-derecha/ProductoCategoria";
import { ProductoPrecio } from "./sec-derecha/ProductoPrecio";
import { ProductoTallas } from "./sec-derecha/ProductoTallas";
import { ProductoColor } from "./sec-derecha/ProductoColor";
import { ProductoPuntuacion } from "./review/ProductoPuntuacion";
import { ProductoStock } from "./sec-derecha/ProductoStock";
import { ProductoMensaje } from "./sec-derecha/ProductoMensaje";
import { ProductoDescripcion } from "./sec-derecha/ProductoDescripcion";
import { ProductoAcciones } from "./sec-derecha/ProductoAcciones";
import { ProductoEspecificaciones } from "./sec-derecha/ProductoEspecificaciones";
import { ProductoCantidad } from "./sec-derecha/ProductoCantidad";

interface ProductoDetallesProps {
  producto: {
    id: string;
    nombre: string;
    categoria: string;
    precio: number;
    precioAntiguo?: number;
    descuento?: number;
    variantes: string[];
    color: string;
    calificacion?: number;
    stock: number;
    mensaje?: string;
    descripcion: string;
    referencia: string;
  };
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
      <div className="mt-2 flex justify-between">
        {producto.referencia && (
          <p className="text-sm text-[var(--color-accent)] mt-1 italic">Ref: {producto.referencia}</p>
        )}
        <ProductoCategoria categoria={producto.categoria} />
      </div>
      <div className="flex flex-col gap-2">
        {/* Fila: Título y Acciones */}
        <div className="flex justify-between items-start">
          <ProductoTituloDetalle nombre={producto.nombre} />
          <ProductoAcciones />
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
          precioAntiguo={producto.precioAntiguo}
          descuento={producto.descuento}
        />
      </div>
      <div className="mt-2">
        <ProductoDescripcion descripcion={producto.descripcion} />
      </div>
      <ProductoEspecificaciones />
      <div className="mt-6">
        <ProductoTallas tallas={producto.variantes} />
      </div>
      <div className="mt-6">
        <ProductoColor color={producto.color} />
      </div>
      <ProductoCantidad />
      <div className="mt-2">
        <ProductoStock stock={producto.stock} />
      </div>
    </div>
  );
};
