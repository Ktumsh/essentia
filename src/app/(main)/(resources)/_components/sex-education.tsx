"use client";

import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";

import AerisSection from "./aeris-section";

const SexEducation = () => {
  const defaultPrompt = SUGGESTED_ACTION_DATA[2].action;
  return (
    <AerisSection
      route="Salud y educación sexual"
      title="Infórmate sobre salud sexual"
      hash="informate-salud-sexual"
      description={
        <>
          ¿Tienes dudas sobre salud sexual o quieres aprender de forma segura y
          confiable?{" "}
          <Link
            href="/soporte?q=quien%20es%20aeris"
            target="_blank"
            rel="noopener"
            className="text-secondary hover:underline"
          >
            Aeris
            <LinkIcon className="mb-1 ml-0.5 inline size-2" />
          </Link>{" "}
          puede entregarte información validada y recomendaciones personalizadas
          sobre sexualidad, autocuidado y relaciones sanas.
        </>
      }
      suggestions={[
        "¿Dónde puedo aprender sobre salud sexual de forma confiable?",
        "¿Qué métodos anticonceptivos existen y cómo funcionan?",
        "¿Cómo cuidar mi cuerpo y tomar decisiones informadas?",
        "¿Cómo hablar sobre sexualidad de forma saludable?",
      ]}
      placeholder="Ej: Quiero entender mejor cómo cuidar mi salud sexual y qué recursos confiables existen."
      defaultPrompt={defaultPrompt}
      featureType="sex-education"
      ctaLabel="Aprender sobre salud sexual"
    />
  );
};

export default SexEducation;
