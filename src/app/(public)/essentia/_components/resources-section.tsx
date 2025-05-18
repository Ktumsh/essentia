"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import {
  ExerciseFillIcon,
  ForAllAgesFillIcon,
  HealthFillIcon,
  NutritionFillIcon,
  SexualityFillIcon,
  WellbeingFillIcon,
} from "@/components/icons/interface";
import { Badge } from "@/components/kit/badge";
import { cn } from "@/lib/utils";

const resources = [
  {
    icon: (
      <HealthFillIcon className="size-7 text-green-600 dark:text-green-400" />
    ),
    title: "Salud y Bienestar",
    description:
      "Información y consejos para cuidar tu salud física y mental, prevenir enfermedades y mejorar tu calidad de vida",
    color: "bg-green-100 dark:bg-green-900",
  },
  {
    icon: (
      <ExerciseFillIcon className="size-7 text-fuchsia-600 dark:text-fuchsia-400" />
    ),
    title: "Ejercicios y Fitness",
    description:
      "Rutinas, recomendaciones y tips para mantenerte activo, mejorar tu condición física y alcanzar tus objetivos de ejercicio",
    color: "bg-fuchsia-100 dark:bg-fuchsia-900",
  },
  {
    icon: (
      <NutritionFillIcon className="size-7 text-yellow-600 dark:text-yellow-400" />
    ),
    title: "Nutrición y Alimentación",
    description:
      "Guías, recetas y planes para una alimentación saludable, balanceada y adaptada a tus necesidades",
    color: "bg-yellow-100 dark:bg-yellow-900",
  },
  {
    icon: (
      <WellbeingFillIcon className="size-7 text-blue-600 dark:text-blue-400" />
    ),
    title: "Bienestar Emocional",
    description:
      "Estrategias y recursos para gestionar tus emociones, reducir el estrés y fortalecer tu salud mental",
    color: "bg-blue-100 dark:bg-blue-900",
  },
  {
    icon: (
      <SexualityFillIcon className="size-7 text-rose-600 dark:text-rose-400" />
    ),
    title: "Sexualidad y Relaciones",
    description:
      "Información y recursos para entender y mejorar tu vida sexual y tus relaciones interpersonales",
    color: "bg-rose-100 dark:bg-rose-900",
  },
  {
    icon: (
      <ForAllAgesFillIcon className="size-7 text-lime-600 dark:text-lime-400" />
    ),
    title: "Salud en Todas las Edades",
    description:
      "Recursos y recomendaciones adaptados a cada etapa de la vida, desde la infancia hasta la adultez mayor",
    color: "bg-lime-100 dark:bg-lime-900",
  },
];

const ResourcesSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const container = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
        delayChildren: 0.3,
      },
    },
  };

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="recursos"
      ref={ref}
      className="relative bg-gradient-to-br from-indigo-50 to-fuchsia-50 py-20 dark:from-indigo-950 dark:to-fuchsia-950"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="text-primary mb-4 bg-indigo-100 px-3 py-1 text-sm dark:bg-indigo-900/50">
              NUESTROS RECURSOS
            </Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Explora rutas de aprendizaje sobre salud adaptadas a ti
            </h2>
            <p className="text-foreground/80 text-base md:text-lg">
              Accede a rutas temáticas con guías, lecciones y recursos prácticos
              sobre salud, ejercicio, bienestar emocional, nutrición y más. Todo
              organizado por etapas para acompañarte paso a paso.
            </p>
          </motion.div>
        </div>

        <motion.div
          variants={container}
          initial="hidden"
          animate={isInView ? "show" : "hidden"}
          className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3"
        >
          {resources.map((resource, index) => (
            <motion.div key={index} variants={item}>
              <ResourceCard
                icon={resource.icon}
                title={resource.title}
                description={resource.description}
                color={resource.color}
              />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;

function ResourceCard({
  icon,
  title,
  description,
  color,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <div className="shadow-pretty bg-background h-full transform rounded-2xl p-6 transition-all duration-300 hover:-translate-y-1">
      <div className="relative inline-flex align-middle">
        <div
          className={cn(
            "mask mask-squircle mb-6 grid aspect-square size-14 place-content-center",
            color,
          )}
        >
          {icon}
        </div>
      </div>
      <h3 className="mb-3 text-xl font-bold">{title}</h3>
      <p className="text-muted-foreground text-base">{description}</p>
    </div>
  );
}
