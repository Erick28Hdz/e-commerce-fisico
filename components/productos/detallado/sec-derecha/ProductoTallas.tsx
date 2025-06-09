export function ProductoTallas({ tallas }: { tallas: string[] }) {
  return (
    <div>
      <h4 className="font-semibold mb-3 text-[var(--color-principal)] text-xl border-b border-[var(--color-accent)] pb-1">
        Tallas disponibles
      </h4>
      <div className="flex flex-wrap gap-3 mt-2">
        {tallas.map((talla) => (
          <span
            key={talla}
            className="px-4 py-1 border-2 border-[var(--color-principal)] rounded-full text-sm cursor-pointer
              text-[var(--color-principal)] hover:bg-[var(--color-principal)] hover:text-[var(--color-text-secondary)] transition"
            role="button"
            tabIndex={0}
          >
            {talla}
          </span>
        ))}
      </div>
    </div>
  );
}
