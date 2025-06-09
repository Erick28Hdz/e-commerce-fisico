// data/reviewsMock.ts
interface Review {
  productoId: string;
  usuario: string;
  fecha: string;
  calificacion: number; // 1 a 5
  comentario: string;
}

export const reviewsMock: Review[] = [
  {
    productoId: "1",
    usuario: "Ana López",
    fecha: "2025-06-20",
    calificacion: 5,
    comentario: "Excelente calidad y llegó rápido. ¡Lo recomiendo mucho!",
  },
  {
    productoId: "1",
    usuario: "Carlos Pérez",
    fecha: "2025-06-18",
    calificacion: 4,
    comentario: "Buen producto pero el empaque venía algo dañado.",
  },
  {
    productoId: "2",
    usuario: "Lucía Ramírez",
    fecha: "2025-06-15",
    calificacion: 5,
    comentario: "Superó mis expectativas, lo volvería a comprar.",
  },
  {
    productoId: "2",
    usuario: "Olga Ramírez",
    fecha: "2025-06-14",
    calificacion: 1,
    comentario: "No superó mis expectativas, no lo volvería a comprar.",
  },
  {
    productoId: "3",
    usuario: "Raúl Mendoza",
    fecha: "2025-06-10",
    calificacion: 4,
    comentario: "Muy cómoda y abrigadora, aunque un poco grande.",
  },
  {
    productoId: "3",
    usuario: "Paula Díaz",
    fecha: "2025-06-08",
    calificacion: 5,
    comentario: "Perfecta para el invierno, me encantó.",
  },
  {
    productoId: "5",
    usuario: "Mario Suárez",
    fecha: "2025-06-07",
    calificacion: 5,
    comentario: "Excelente reloj, muy resistente y bonito.",
  },
  {
    productoId: "8",
    usuario: "Andrea Rivera",
    fecha: "2025-06-01",
    calificacion: 4,
    comentario: "Buena calidad de sonido, batería duradera.",
  },
  {
    productoId: "10",
    usuario: "Luis Gómez",
    fecha: "2025-05-30",
    calificacion: 5,
    comentario: "Rendimiento excelente, lo uso para todo.",
  },
];
