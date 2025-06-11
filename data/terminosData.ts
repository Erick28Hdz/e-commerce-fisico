export interface TerminoSeccion {
  titulo?: string;
  contenido: string;
}

export const terminosData: TerminoSeccion[] = [
  {
    titulo: "Aceptación de los términos",
    contenido:
      "Al acceder y utilizar este sitio web, aceptas cumplir con estos términos y condiciones. Si no estás de acuerdo con alguna parte, por favor no utilices el sitio.",
  },
  {
    titulo: "Uso del sitio",
    contenido:
      "Te comprometes a utilizar el sitio solo para fines legales y de manera que no infrinja los derechos de otros usuarios ni restrinja su uso del sitio.",
  },
  {
    titulo: "Propiedad intelectual",
    contenido:
      "Todo el contenido del sitio, incluyendo textos, gráficos y logotipos, está protegido por derechos de autor y pertenece a sus respectivos propietarios.",
  },
  {
    titulo: "Modificaciones",
    contenido:
      "Nos reservamos el derecho de modificar estos términos en cualquier momento. Te recomendamos revisar esta página periódicamente.",
  },
  {
    titulo: "Limitación de responsabilidad",
    contenido:
      "No somos responsables por daños indirectos o incidentales derivados del uso o la imposibilidad de uso del sitio.",
  },
];
