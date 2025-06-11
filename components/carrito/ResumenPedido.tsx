// 📄 components/carrito/ResumenPedido.tsx
import { Button } from "../ui/Button";
import { Link } from "../ui/Link";

type ResumenPedidoProps = {
  total: number;
  cantidad: number;
};

export default function ResumenPedido({ total, cantidad }: ResumenPedidoProps) {
  return (
    <div className="p-8 border rounded-xl bg-white shadow-lg h-fit">
      <h3 className="mb-4 text-[var(--color-principal)]">Resumen del Pedido</h3>
      <p>Productos: {cantidad}</p>
      <p className="text-xl font-bold mb-4">Total: ${total.toFixed(2)}</p>
      <Button className="w-full py-2 rounded-md">
        Proceder al Pago
      </Button>
      <Link
        href="/productos"
        variant="ghost"
        className="block mt-4 text-center"
      >
        Seguir Comprando
      </Link>
    </div>
  );
}
