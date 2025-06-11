import Head from "next/head";
import VolverAtras from "@/components/ui/VolverAtras";
import { Section } from "@/components/ui/Section";
import { politicaData } from "@/data/politicaData";

export default function Politica() {
  return (
    <>
      <div>
        <VolverAtras rutaPersonalizada="/nosotros" />
      </div>
      <Head>
        <title>Política de Privacidad | Tu Sitio</title>
      </Head>
      <Section className="py-10 px-14">
        <h3 className="text-3xl font-bold text-[var(--color-principal)] text-center mb-6">
          Política de Privacidad
        </h3>

        <div className="space-y-6">
          {politicaData.map((item, index) => (
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
