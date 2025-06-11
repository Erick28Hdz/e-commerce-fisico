import Head from "next/head";
import VolverAtras from "@/components/ui/VolverAtras";
import { Section } from "@/components/ui/Section";
import { terminosData } from "@/data/terminosData";

export default function Terminos() {
  return (
    <>
      <div>
        <VolverAtras rutaPersonalizada="/nosotros" />
      </div>
      <Head>
        <title>Términos y Condiciones | Tu Sitio</title>
      </Head>
      <Section className="max-w-4xl mx-auto py-16 px-4">
        <h3 className="text-3xl font-bold text-[var(--color-principal)] text-center mb-6">
          Términos y Condiciones
        </h3>

        <div className="space-y-6">
          {terminosData.map((item, index) => (
            <div key={index}>
              {item.titulo && (
                <h4 className="font-semibold text-lg text-[var(--color-principal)] mb-1">
                  {item.titulo}
                </h4>
              )}
              <p>{item.contenido}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
