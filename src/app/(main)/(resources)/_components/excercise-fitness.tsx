"use client";

import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";

import AerisSection from "./aeris-section";

const ExcerciseFitness = () => {
  const defaultPrompt = SUGGESTED_ACTION_DATA[1].action;

  return (
    <AerisSection
      route="Ejercicios y fitness"
      title="Crea tu rutina personalizada"
      hash="rutina-personalizada"
      description={
        <>
          ¿Quieres una rutina de ejercicios adaptada a ti?{" "}
          <Link
            href="/soporte?q=quien%20es%20aeris"
            target="_blank"
            rel="noopener"
            className="text-secondary hover:underline"
          >
            Aeris
            <LinkIcon className="mb-1 ml-0.5 inline size-2" />
          </Link>{" "}
          puede ayudarte a generar un plan hecho a tu medida según tus
          objetivos, tu nivel actual y tus preferencias.
        </>
      }
      suggestions={[
        "Cuántos días quieres entrenar",
        "Si entrenas en casa o en gimnasio",
        "Qué zona(s) del cuerpo quieres trabajar",
        "Si tienes alguna lesión o condición especial",
      ]}
      placeholder="Ej: Quiero una rutina de 3 días enfocada en tren superior, sin ejercicios de rodilla."
      defaultPrompt={defaultPrompt}
      featureType="routine"
      ctaLabel="Crear rutina personalizada"
    />
  );
};

export default ExcerciseFitness;
