'use client'

import { useCarrito } from "@/contexts/CarritoContext";
import { Button } from "@/components/ui/Button";
import type { Producto } from "@prisma/client";

type Props = {
  producto: Producto;
  cantidad: number;
};

export function BotonesAccion({ producto, cantidad }: Props) {
  const { agregarAlCarrito, comprarAhora } = useCarrito();

  return (
    <div className="mt-10 flex justify-center gap-6">
      <Button variant="default" onClick={() => agregarAlCarrito(producto, cantidad)}>
        Agregar al carrito
      </Button>
      <Button variant="default" onClick={() => comprarAhora(producto, cantidad)}>
        Comprar ahora
      </Button>
    </div>
  );
}
