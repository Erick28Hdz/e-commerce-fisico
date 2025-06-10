import { Truck, AlertTriangle } from "lucide-react";

interface Props {
  stock: number;
  tiempoEnvioDias?: number;
  ubicacion?: string;
  limiteStockVisible?: number;
}

export function ProductoStock({
  stock,
  tiempoEnvioDias = 3,
  ubicacion = "bodega principal",
  limiteStockVisible = 5,
}: Props) {
  const hayStock = stock > 0;
  const bajoStock = hayStock && stock <= limiteStockVisible;

  return (
    <div className="text-sm space-y-2 mt-4 px-4 py-3">
      {/* Estado de inventario */}
      <p
        className={`font-semibold ${
          hayStock ? "text-[var(--color-principal)]" : "text-red-600"
        }`}
      >
        {hayStock ? `Disponible: ${stock} unidades` : "Sin stock disponible"}
      </p>

      {/* Estimado de envío */}
      {hayStock && (
        <div className="flex items-center text-[var(--color-text-primary)] gap-2">
          <Truck className="w-4 h-4 text-[var(--color-principal)]" />
          <span className="text-[13px]">
            Envío estimado: <strong>{tiempoEnvioDias} días</strong> desde{" "}
            <span className="capitalize">{ubicacion}</span>
          </span>
        </div>
      )}

      {/* Alerta de bajo stock */}
      {bajoStock && (
        <div className="flex items-center gap-2 text-yellow-700 font-medium">
          <AlertTriangle className="w-4 h-4 text-yellow-600" />
          <span>¡Quedan solo {stock} en stock!</span>
        </div>
      )}
    </div>
  );
}
