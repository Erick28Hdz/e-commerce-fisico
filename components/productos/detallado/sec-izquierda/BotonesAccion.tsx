'use client'

import { useCarrito } from "@/contexts/CarritoContext";
import { Button } from "@/components/ui/Button";
import { Producto } from "@/data/productosMock";
import { useRouter } from "next/navigation";

type Props = {
  producto: Producto;
  cantidad: number;
};

export function BotonesAccion({ producto, cantidad }: Props) {
  const { agregarAlCarrito } = useCarrito();
  const router = useRouter();

  const handleComprarAhora = () => {
    const compraDirecta = {
      producto,
      cantidad,
    };

    localStorage.setItem('compra_directa', JSON.stringify(compraDirecta));
    router.push('/checkout');
  };

  return (
    <div className="mt-10 flex justify-center gap-6">
      <Button variant="default" onClick={() => agregarAlCarrito(producto, cantidad)}>
        Agregar al carrito
      </Button>
      <Button variant="default" onClick={handleComprarAhora}>
        Comprar ahora
      </Button>
    </div>
  );
}
