"use client";

import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";

import AerisSection from "./aeris-section";

const HealthWellness = () => {
  const defaultPrompt = SUGGESTED_ACTION_DATA[7].action;
  return (
    <AerisSection
      route="Salud y bienestar"
      title="Cuida tu salud física y mental"
      hash="cuida-salud-fisica-mental"
      description={
        <>
          ¿Quieres llevar una vida más saludable y equilibrada?{" "}
          <Link
            href="/soporte?q=quien%20es%20aeris"
            target="_blank"
            rel="noopener"
            className="text-secondary hover:underline"
          >
            Aeris
            <LinkIcon className="mb-1 ml-0.5 inline size-2" />
          </Link>{" "}
          puede ayudarte a combinar hábitos físicos, mentales y emocionales para
          mejorar tu bienestar integral.
        </>
      }
      suggestions={[
        "¿Qué hábitos saludables podría implementar en mi día a día?",
        "¿Cómo mejorar mi energía, ánimo o estilo de vida?",
        "¿Qué puedo hacer para cuidar tanto mi cuerpo como mi mente?",
        "¿Cómo mantener una buena salud a largo plazo?",
      ]}
      placeholder="Ej: Me siento cansado a menudo, quiero recomendaciones para mejorar mi salud general."
      defaultPrompt={defaultPrompt}
      featureType="health"
      ctaLabel="Mejorar mi salud integral"
    />
  );
  /* return (
    <section className="col-[1/2] lg:col-[1/3]">
      <SectionTitle
        title="Artículos Interesantes"
        hash="articulos-interesantes"
      />
      <CardList type="article" resource="salud-y-bienestar" />
    </section>
  ); */
};

export default HealthWellness;
