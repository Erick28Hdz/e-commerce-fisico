// pages/contacto/index.tsx
import Head from "next/head";
import { Section } from "@/components/ui/Section";
import { SocialIcons } from "@/components/ui/SocialIcons";
import FormularioContacto from "@/components/especiales/FormContacto";

export default function Contacto() {
  return (
    <>
      <Head>
        <title>Contacto | SuperTienda</title>
      </Head>
      <Section>
        {/* Título principal */}
        <h2 className="text-4xl font-bold text-[var(--color-principal)] mb-6 text-center">
          Contáctanos
        </h2>

        {/* Descripción */}
        <p className="text-lg text-[var(--color-text-primary)] mb-10 text-center">
          ¿Tienes preguntas, sugerencias o deseas colaborar con nosotros? Rellena el siguiente formulario
          y nos pondremos en contacto contigo lo antes posible.
        </p>

        {/* Formulario reutilizable */}
        <div className="bg-[var(--color-accent)] rounded-2xl shadow-lg p-8">
          <FormularioContacto>
          </FormularioContacto>
        </div>
        {/* Redes sociales */}
        <div className="mt-12 text-center">
          <h3 className="text-xl font-semibold text-[var(--color-principal)] mb-4">
            También puedes encontrarnos en:
          </h3>
          <SocialIcons className="justify-center gap-6" />
        </div>
      </Section>
    </>
  );
}
