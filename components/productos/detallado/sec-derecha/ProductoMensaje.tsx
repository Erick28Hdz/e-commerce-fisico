interface ProductoMensajeProps {
  mensaje: string;
}

export function ProductoMensaje({ mensaje }: ProductoMensajeProps) {
  return (
    <div
      className="inline-block text-xs font-bold px-2 py-1 rounded-md shadow-md select-none"
      style={{
        backgroundColor: "var(--color-principal)", // #102c57
        color: "var(--color-text-secondary)",       // #fffdf6
        boxShadow: "0 2px 6px rgba(16, 44, 87, 0.6)",
        width: "fit-content",
      }}
    >
      {mensaje}
    </div>
  );
}
