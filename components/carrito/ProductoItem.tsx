import Image from "next/image";
import { Button } from "@/components/ui/Button";
import type { Producto } from '@prisma/client'; // 👈 Aquí cambiaste esto

type ProductoConCantidad = Producto & { cantidad: number };

interface ProductoItemProps {
  producto: ProductoConCantidad;
  aumentarCantidad: (id: string) => void;
  disminuirCantidad: (id: string) => void;
  eliminarProducto: (id: string) => void;
}

export default function ProductoItem({
  producto,
  aumentarCantidad,
  disminuirCantidad,
  eliminarProducto,
}: ProductoItemProps) {
  return (
    <div className="flex gap-4 items-center border p-4 rounded-xl shadow-md bg-white">
      <Image
        src={producto.imagen}
        alt={producto.nombre}
        width={100}
        height={100}
        className="rounded-md"
      />
      <div className="flex-1">
        <h4>{producto.nombre}</h4>
        <p>Precio: ${producto.precio}</p>
        <div className="flex items-center gap-2 mt-2">
          <Button variant="ghost" onClick={() => disminuirCantidad(producto.id)}>-</Button>
          <span className="px-2">{producto.cantidad}</span>
          <Button variant="ghost" onClick={() => aumentarCantidad(producto.id)}>+</Button>
        </div>
      </div>
      <div className="text-right">
        <p>Subtotal: ${(producto.precio * producto.cantidad).toFixed(2)}</p>
        <Button
          onClick={() => eliminarProducto(producto.id)}
          variant="default"
          className="mt-2 text-sm"
        >
          Eliminar
        </Button>
      </div>
    </div>
  );
}
