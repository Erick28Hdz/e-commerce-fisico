// components/sidebar/CategoriasList.tsx

import { Link } from "@/components/ui/Link"; // tu Link personalizado

type Categoria = {
  slug: string;
  nombre: string;
};

type CategoryListProps = {
  categorias: Categoria[];
};

export default function CategoryList({ categorias }: CategoryListProps) {
  return (
    <ul
      className="
        flex flex-col gap-3 mb-3 
        bg-[var(--color-bg-light)] 
        p-4 rounded-md 
        border border-accent
      "
    >
      {/* Opción "Todos" */}
      <li key="Todos">
        <Link
          href="/productos?categoria=Todos"
          variant="default"
          className="block px-4 py-2 rounded"
        >
          Todos
        </Link>
      </li>

      {/* Otras categorías */}
      {categorias.map((categoria) => (
        <li key={categoria.slug}>
          <Link
            href={`/productos?categoria=${categoria.slug}`}
            variant="default"
            className="block px-4 py-2 rounded"
          >
            {categoria.nombre}
          </Link>
        </li>
      ))}
    </ul>
  );
}