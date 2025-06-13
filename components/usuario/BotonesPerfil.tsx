import { useRouter } from "next/router";
import { Button } from "@/components/ui/Button";

type BotonesPerfilProps = {
  onLogout: () => void;
};

export default function BotonesPerfil({ onLogout }: BotonesPerfilProps) {
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row gap-4 mt-6 justify-center">
      <Button
        onClick={() => router.push("/usuarios/editar-perfil")}
        variant="default"
      >
        Actualizar datos
      </Button>

      <Button
        onClick={() => router.push("/usuarios/HistorialPedidos")}
        variant="outline"
      >
        Ver historial de pedidos
      </Button>
      <Button
        onClick={() => router.push("/usuarios/guardados")}
        variant="outline"
      >
        Ver productos guardados
      </Button>
    </div>
  );
}
