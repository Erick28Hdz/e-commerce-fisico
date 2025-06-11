import Head from "next/head";
import VolverAtras from "@/components/ui/VolverAtras";
import { Section } from "@/components/ui/Section";
import { faqData } from "@/data/faqData";

export default function FAQ() {
  return (
    <>
      <div>
        <VolverAtras rutaPersonalizada="/nosotros" />
      </div>
      <Head>
        <title>Preguntas Frecuentes | Tu Sitio</title>
      </Head>
      <Section>
        <h3 className="text-[var(--color-principal)] text-center mb-6">Preguntas Frecuentes</h3>
        <div className="space-y-6">
          {faqData.map((item, index) => (
            <div key={index}>
              <h4 className="font-semibold text-lg">{item.pregunta}</h4>
              <p>{item.respuesta}</p>
            </div>
          ))}
        </div>
      </Section>
    </>
  );
}
