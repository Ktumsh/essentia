"use client";

import { motion, useInView } from "framer-motion";
import { Target, BarChart3, Lightbulb } from "lucide-react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";

const VisionSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="vision-proposito"
      ref={ref}
      className="relative overflow-hidden bg-white py-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-1/3 w-1/3 rounded-full bg-rose-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="order-2 lg:order-1 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-indigo-100 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-200">
              VISIÓN Y PROPÓSITO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Imagina cómo Essentia transformará tu bienestar
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Descubre cómo nuestra plataforma está diseñada para ayudarte a
              alcanzar tus objetivos de salud y bienestar a través de soluciones
              personalizadas y basadas en evidencia científica.
            </p>
            <div className="space-y-6">
              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Target className="h-6 w-6 text-indigo-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Objetivos personalizados
                  </h4>
                  <p className="text-gray-600">
                    Essentia te ayudará a establecer metas realistas basadas en
                    tu perfil de salud y te guiará paso a paso para alcanzarlas.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <BarChart3 className="h-6 w-6 text-rose-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Seguimiento inteligente
                  </h4>
                  <p className="text-gray-600">
                    Visualiza tu progreso con análisis detallados y obtén
                    insights que te ayudarán a optimizar tus hábitos de salud.
                  </p>
                </div>
              </div>

              <div className="flex items-start gap-4">
                <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-amber-100">
                  <Lightbulb className="h-6 w-6 text-amber-600" />
                </div>
                <div>
                  <h4 className="mb-2 text-xl font-semibold">
                    Recomendaciones basadas en evidencia
                  </h4>
                  <p className="text-gray-600">
                    Recibe consejos y planes respaldados por investigación
                    científica y adaptados a tus necesidades específicas.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 lg:order-2 lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-gradient-to-br from-indigo-200 to-rose-200"></div>
              <div className="absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="relative h-full">
                  <img
                    src="/placeholder.svg?height=500&width=500"
                    alt="Visión de bienestar integral"
                    className="h-full w-full rounded-3xl object-cover"
                  />
                  <div className="absolute inset-0 flex items-end bg-gradient-to-t from-black/50 to-transparent">
                    <div className="p-6 text-white">
                      <h3 className="mb-2 text-2xl font-bold">
                        El futuro del bienestar
                      </h3>
                      <p>
                        Estamos creando una nueva forma de gestionar tu salud y
                        bienestar con tecnología inteligente y personalizada.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default VisionSection;
