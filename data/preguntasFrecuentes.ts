export interface Pregunta {
  pregunta: string;
  respuesta: string;
}

export const preguntasFrecuentes: Pregunta[] = [
  {
    pregunta: "¿Cuánto demora el envío?",
    respuesta: "El envío se realiza en un plazo de 2 a 4 días hábiles.",
  },
  {
    pregunta: "¿Puedo cambiar el producto si no me queda?",
    respuesta: "Sí, tienes hasta 7 días para solicitar un cambio.",
  },
  {
    pregunta: "¿Este producto tiene garantía?",
    respuesta: "Todos nuestros productos incluyen garantía de 3 meses.",
  },
  {
    pregunta: "¿Qué métodos de pago aceptan?",
    respuesta: "Aceptamos tarjetas, Yape, Plin y transferencias.",
  },
];
