import { useCarrito } from "@/contexts/CarritoContext";
import { Button } from "@/components/ui/Button";
import { Producto } from "@/data/productosMock";

type Props = {
  producto: Producto;
  cantidad: number; // <- recibes cantidad desde el padre
};

export function BotonesAccion({ producto, cantidad }: Props) {
  const { agregarAlCarrito } = useCarrito();

  return (
    <div className="mt-10 flex justify-center gap-6">
      <Button variant="default" onClick={() => agregarAlCarrito(producto, cantidad)}>
        Agregar al carrito
      </Button>
      <Button variant="default">
        Comprar ahora
      </Button>
    </div>
  );
}
