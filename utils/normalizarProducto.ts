import type { Producto as ProductoPrisma } from "@prisma/client";

export interface ProductoNormalizado {
  id: string;
  slug: string;
  nombre: string;
  descripcion: string;
  precio: number;
  precioAntiguo: number | null;
  descuento: number | null;
  mensaje: string | null;
  imagen: string;
  imagenesSecundarias: string[];
  categoria: string;
  categoriaSlug: string | null;
  stock: number;
  variantes: string[];
  color: string;
  tiempoEnvioDias: number;
  ubicacion: string;
  referencia: string;
}

export function normalizarProducto(producto: any) {
  return {
    ...producto,
    precioAntiguo: producto.precioAntiguo ?? null,
    descuento: producto.descuento ?? null,
    mensaje: producto.mensaje ?? null,
    variantes: producto.variantes ?? [],
    color: producto.color ?? "",
    ubicacion: producto.ubicacion ?? "bodega principal",
    tiempoEnvioDias: producto.tiempoEnvioDias ?? 3,
    imagenesSecundarias: producto.imagenesSecundarias ?? [],
  };
}