export interface PoliticaSeccion {
  titulo?: string;
  contenido: string;
}

export const politicaData: PoliticaSeccion[] = [
  {
    titulo: "Introducción",
    contenido:
      "Tu privacidad es importante para nosotros. Esta política explica cómo recopilamos, usamos y protegemos tu información personal cuando visitas nuestro sitio web.",
  },
  {
    titulo: "Recopilación de información",
    contenido:
      "Recopilamos información que nos proporcionas directamente y datos que se generan automáticamente al interactuar con el sitio (como cookies o dirección IP).",
  },
  {
    titulo: "Uso de la información",
    contenido:
      "Utilizamos la información para mejorar nuestros servicios, responder a tus consultas y personalizar tu experiencia en el sitio.",
  },
  {
    titulo: "Protección de datos",
    contenido:
      "Implementamos medidas de seguridad para proteger tus datos personales contra accesos no autorizados o divulgación.",
  },
  {
    titulo: "Cambios a esta política",
    contenido:
      "Nos reservamos el derecho de actualizar esta política de privacidad. Notificaremos los cambios significativos mediante nuestro sitio web.",
  },
];
