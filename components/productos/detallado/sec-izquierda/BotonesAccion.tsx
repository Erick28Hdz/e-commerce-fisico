import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";

export function BotonesAccion() {
  const router = useRouter();
  return (
    <div className="mt-10 flex justify-center gap-6">
      <Button variant="default">Agregar al carrito</Button>
      <Button variant="default">
        Comprar ahora
      </Button>
    </div>
  );
}
