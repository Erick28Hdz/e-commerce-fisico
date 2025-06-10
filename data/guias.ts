// data/guias.ts
import { CategoriaSlug } from "./categoriasMock";

type GuiaTabla = {
  titulo: string;
  columnas: string[];
  filas: string[][];
};

type GuiaLista = {
  titulo: string;
  lista: string[];
};

export type Guia = GuiaTabla | GuiaLista;

export const guiasPorCategoria: Record<CategoriaSlug, Guia> = {
  Ropa: {
    titulo: "Guía de Tallas para Ropa",
    columnas: ["Talla", "Pecho (cm)", "Cintura (cm)", "Cadera (cm)"],
    filas: [
      ["S", "86-91", "66-71", "91-96"],
      ["M", "92-97", "72-77", "97-102"],
      ["L", "98-104", "78-83", "103-108"],
      ["XL", "105-112", "84-91", "109-116"]
    ]
  },
  Calzado: {
    titulo: "Tabla de Tallas de Calzado",
    columnas: ["Talla EU", "Talla MX", "Longitud del pie (cm)"],
    filas: [
      ["38", "5.5", "24.5"],
      ["39", "6", "25"],
      ["40", "6.5", "25.5"],
      ["41", "7", "26"],
      ["42", "8", "26.5"]
    ]
  },
  Accesorios: {
    titulo: "Guía de Uso de Accesorios",
    lista: [
      "Relojes: Ajusta la correa al tamaño de tu muñeca para mayor comodidad.",
      "Bolsos: Elige según la capacidad (pequeños para diario, grandes para viaje).",
      "Gafas: Usa según la forma de tu rostro para mejor estilo y comodidad."
    ]
  },
  Electrónica: {
    titulo: "Recomendaciones de Uso para Electrónica",
    lista: [
      "Cargar completamente antes del primer uso.",
      "Evitar exposición prolongada al sol o humedad.",
      "Consultar el manual del fabricante para configuraciones iniciales.",
      "Usar fundas o protectores para mayor durabilidad."
    ]
  },
  Belleza: {
    titulo: "Guía de Aplicación de Productos de Belleza",
    lista: [
      "Fragancias: Aplicar sobre zonas de pulso como cuello y muñecas.",
      "Cremas faciales: Usar en rostro limpio, con movimientos circulares suaves.",
      "Maquillaje: Aplicar con brochas limpias y desinfectadas.",
      "Evitar compartir productos de uso personal."
    ]
  }
};
