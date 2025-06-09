export function ProductoCategoria({ categoria }: { categoria: string }) {
  return (
    <p className="mt-2 text-sm italic text-[var(--color-principal)] bg-[var(--color-accent)] px-2 py-1 rounded-md w-fit shadow-sm">
      Categoría: {categoria}
    </p>
  );
}
