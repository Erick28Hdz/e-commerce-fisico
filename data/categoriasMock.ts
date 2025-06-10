// data/categoriasMock.ts
export interface Categoria {
  slug: string;
  nombre: string;
  descripcion?: string;
}

export const categoriasMock: Categoria[] = [
  {
    slug: "Ropa",
    nombre: "Ropa",
    descripcion: "Vestimenta para todos los días, casual y formal."
  },
  {
    slug: "Calzado",
    nombre: "Calzado",
    descripcion: "Zapatos cómodos, deportivos y para ocasiones especiales."
  },
  {
    slug: "Accesorios",
    nombre: "Accesorios",
    descripcion: "Complementos para tu estilo: relojes, bolsos, gafas y más."
  },
  {
    slug: "Electrónica",
    nombre: "Electrónica",
    descripcion: "Dispositivos y gadgets tecnológicos para tu vida diaria."
  },
  {
    slug: "Belleza",
    nombre: "Belleza",
    descripcion: "Productos para el cuidado personal y fragancias."
  }
];

// Derivar tipo de slug
export type CategoriaSlug = (typeof categoriasMock)[number]["slug"];