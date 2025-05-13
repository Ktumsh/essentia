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
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-pink-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-indigo-100 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-200">
              NUESTROS RECURSOS
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Explora rutas de aprendizaje sobre salud adaptadas a ti
            </h2>
            <p className="text-base text-gray-600 md:text-lg">
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
          <motion.div variants={item}>
            <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-100">
                <HealthFillIcon className="size-7 text-green-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Salud y Bienestar
              </h3>
              <p className="text-base text-gray-600">
                Información y consejos para cuidar tu salud física y mental,
                prevenir enfermedades y mejorar tu calidad de vida
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100">
                <ExerciseFillIcon className="size-7 text-indigo-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Ejercicios y Fitness
              </h3>
              <p className="text-base text-gray-600">
                Rutinas, recomendaciones y tips para mantenerte activo, mejorar
                tu condición física y alcanzar tus objetivos de ejercicio
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-yellow-100">
                <NutritionFillIcon className="size-7 text-yellow-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Nutrición y Alimentación
              </h3>
              <p className="text-base text-gray-600">
                Guías, recetas y planes para una alimentación saludable,
                balanceada y adaptada a tus necesidades
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100">
                <WellbeingFillIcon className="size-7 text-blue-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Bienestar Emocional
              </h3>
              <p className="text-base text-gray-600">
                Estrategias y recursos para gestionar tus emociones, reducir el
                estrés y fortalecer tu salud mental
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-red-100">
                <SexualityFillIcon className="size-7 text-red-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Salud y Educación Sexual
              </h3>
              <p className="text-base text-gray-600">
                Información confiable y educativa sobre sexualidad, autocuidado
                y relaciones saludables
              </p>
            </div>
          </motion.div>

          <motion.div variants={item}>
            <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 transition-all duration-300 hover:-translate-y-1">
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-2xl bg-lime-100">
                <ForAllAgesFillIcon className="size-7 text-lime-600" />
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-800">
                Salud en Todas las Edades
              </h3>
              <p className="text-base text-gray-600">
                Recursos y recomendaciones adaptados a cada etapa de la vida,
                desde la infancia hasta la adultez mayor
              </p>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default ResourcesSection;
