export function ProductoColor({ color }: { color: string }) {
  return (
    <div>
      <h4 className="font-semibold mb-3 text-[var(--color-principal)] text-xl border-b border-[var(--color-accent)] pb-1">
        Color
      </h4>

      <div className="flex items-center gap-3 mt-2">
        <div
          className="w-9 h-9 rounded-full border-2 shadow-md transition-transform duration-200 hover:scale-110"
          style={{
            backgroundColor: color,
            borderColor: 'var(--color-principal)',
          }}
          title={color}
        />
        <span className="text-sm italic text-[var(--color-text-primary)]">
          Código: {color}
        </span>
      </div>
    </div>
  );
}
