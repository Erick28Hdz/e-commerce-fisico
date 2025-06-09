import { AiOutlineTag } from "react-icons/ai";

interface ProductoPrecioProps {
  precio: number;
  precioAntiguo?: number;
  descuento?: number;
}

export function ProductoPrecio({ precio, precioAntiguo, descuento }: ProductoPrecioProps) {
  const tieneDescuento = precioAntiguo !== undefined && precioAntiguo > precio;

  return (
    <div className="flex items-center gap-3 mt-2">
      {tieneDescuento ? (
        <>
          <span
            style={{ color: "var(--color-text-primary)" }}
            className="line-through"
          >
            ${precioAntiguo!.toFixed(2)}
          </span>
          <span
            style={{ color: "var(--color-principal)" }}
            className="text-xl font-semibold"
          >
            ${precio.toFixed(2)}
          </span>
          {descuento && (
            <span
              className="flex items-center gap-1 text-xs font-bold px-2 py-0.5 rounded select-none"
              style={{
                backgroundColor: "var(--color-bg-secondary)",
                color: "var(--color-text-primary)",
              }}
            >
              <AiOutlineTag />
              -{descuento}%
            </span>
          )}
        </>
      ) : (
        <span
          style={{ color: "var(--color-principal)" }}
          className="text-xl font-semibold"
        >
          ${precio.toFixed(2)}
        </span>
      )}
    </div>
  );
}
