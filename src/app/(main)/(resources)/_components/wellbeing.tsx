"use client";

import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";

import AerisSection from "./aeris-section";

const Wellbeing = () => {
  const defaultPrompt = SUGGESTED_ACTION_DATA[0].action;
  return (
    <AerisSection
      route="Bienestar emocional"
      title="Mejora tu bienestar emocional"
      hash="mejora-bienestar-emocional"
      description={
        <>
          ¿Te gustaría sentirte mejor contigo mismo/a o manejar mejor tus
          emociones?{" "}
          <Link
            href="/soporte?q=quien%20es%20aeris"
            target="_blank"
            rel="noopener"
            className="text-secondary hover:underline"
          >
            Aeris
            <LinkIcon className="mb-1 ml-0.5 inline size-2" />
          </Link>{" "}
          puede sugerirte actividades y estrategias para mejorar tu bienestar
          emocional de forma personalizada.
        </>
      }
      suggestions={[
        "¿Sientes estrés, ansiedad o desánimo últimamente?",
        "¿Te gustaría mejorar tu autoestima o motivación?",
        "¿Quieres establecer rutinas de autocuidado o mindfulness?",
        "¿Buscas equilibrio emocional o manejo del estrés?",
      ]}
      placeholder="Ej: Me he sentido ansioso últimamente, quiero actividades que me ayuden a relajarme y dormir mejor."
      defaultPrompt={defaultPrompt}
      featureType="wellbeing"
      ctaLabel="Mejorar mi bienestar emocional"
    />
  );
};

export default Wellbeing;
