// 📄 CarritoVacio.tsx
import { Alert } from "@/components/ui/Alert";
import { Button } from "@/components/ui/Button";
import { Link } from "@/components/ui/Link";

export const CarritoVacio = () => {
  return (
    <div className="text-center">
      <Alert
        type="info"
        message="Tu carrito está vacío. ¡Explora nuestros productos!"
      />
      <Link href="/productos" className="mt-6 inline-block">
        <Button variant="outline">Ir a la tienda</Button>
      </Link>
    </div>
  );
}
