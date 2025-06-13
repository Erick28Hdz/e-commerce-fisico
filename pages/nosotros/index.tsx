// pages/nosotros/index.tsx
import Head from "next/head";
import Image from "next/image";
import { Section } from "@/components/ui/Section";
import { Link } from "@/components/ui/Link";

export default function Nosotros() {
  return (
    <>
      <Head>
        <title>Nosotros | SuperTienda</title>
      </Head>
      <Section className="flex flex-col items-center py-10 px-4 text-center">
        <h2 className="text-4xl font-bold text-[var(--color-principal)] mb-6">
          Sobre Nosotros
        </h2>
        <p className="text-lg text-[var(--color-text-primary)] mb-8 max-w-2xl">
          Somos un equipo comprometido con la excelencia, innovación y el desarrollo
          de soluciones digitales centradas en el usuario.
        </p>

        {/* Enlaces informativos */}
        <div className="flex flex-col md:flex-row justify-center gap-4 mb-6">
          <Link href="/nosotros/faq" variant="ghost">
            Preguntas Frecuentes
          </Link>
          <Link href="/nosotros/terminos" variant="ghost">
            Términos y Condiciones
          </Link>
          <Link href="/nosotros/politica" variant="ghost">
            Política de Privacidad
          </Link>
        </div>

        {/* Imagen centrada */}
        <div className="w-full flex justify-center mb-8">
          <Image
            src="/assets/principales/teamwork.webp"
            alt="Nuestro equipo"
            width={600}
            height={400}
            className="rounded-xl shadow-lg"
          />
        </div>
      </Section>
    </>
  );
}
