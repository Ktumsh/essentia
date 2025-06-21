"use client";

import Link from "next/link";

import { LinkIcon } from "@/components/icons/action";
import { SUGGESTED_ACTION_DATA } from "@/db/data/suggested-action-data";
import { useUserProfile } from "@/hooks/use-user-profile";
import { getPreciseAge } from "@/utils";

import AerisSection from "./aeris-section";

const ForAllAges = () => {
  const { user } = useUserProfile();
  const { birthdate } = user ?? {};
  const age = birthdate ? getPreciseAge(birthdate) : "30 años";

  return (
    <AerisSection
      route="Salud en todas las edades"
      title="Cuida tu salud según tu etapa de vida"
      hash="cuida-salud-por-etapa"
      description={
        <>
          ¿Te gustaría saber cómo cuidar mejor tu salud en esta etapa de tu
          vida?{" "}
          <Link
            href="/soporte?q=quien%20es%20aeris"
            target="_blank"
            rel="noopener"
            className="text-secondary hover:underline"
          >
            Aeris
            <LinkIcon className="mb-1 ml-0.5 inline size-2" />
          </Link>{" "}
          puede darte recomendaciones específicas para tu edad, ya sea que estés
          en la adolescencia, adultez o vejez.
        </>
      }
      suggestions={[
        "¿Qué cuidados son importantes a mi edad?",
        "¿Qué chequeos médicos debería realizarme según mi etapa de vida?",
        "¿Cómo mantenerme activo o saludable en esta edad?",
        "¿Qué debo evitar para prevenir enfermedades comunes según mi grupo etario?",
      ]}
      placeholder={`Ej: Tengo ${age} y quiero saber qué chequeos médicos debería hacerme.`}
      defaultPrompt={SUGGESTED_ACTION_DATA[8].action}
      featureType="health-all-ages"
      ctaLabel="Cuidar mi salud según mi edad"
    />
  );
};

export default ForAllAges;
