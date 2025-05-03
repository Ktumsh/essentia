"use client";

import { FileStack, Brain, BookOpenCheck, Database } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";

const ProgressSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
  };

  return (
    <section
      id="progreso"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-pink-100 px-3 py-1 text-sm text-pink-600 hover:bg-pink-200">
              PROGRESO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Tu evolución, paso a paso
            </h2>
            <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
              Monitorea tu evolución médica, accede a recomendaciones
              inteligentes y avanza en rutas de aprendizaje temáticas para
              fortalecer tu bienestar. Con Essentia, cada paso que das está
              respaldado por información clara y herramientas personalizadas.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <motion.div variants={item}>
                <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 text-start transition duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                    <FileStack className="text-blue-600" size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Seguimiento de tu historial
                  </h3>
                  <p className="text-base text-gray-600">
                    Visualiza tus documentos organizados por fecha, tipo y área
                    de salud
                  </p>
                </div>
              </motion.div>
              <motion.div variants={item}>
                <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 text-start transition duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                    <Brain className="text-purple-600" size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Recomendaciones con IA
                  </h3>
                  <p className="text-base text-gray-600">
                    Recibe orientación basada en tus archivos médicos,
                    disponible en el plan Premium
                  </p>
                </div>
              </motion.div>
              <motion.div variants={item}>
                <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 text-start transition duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                    <BookOpenCheck className="text-green-600" size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Avance en rutas de aprendizaje
                  </h3>
                  <p className="text-base text-gray-600">
                    Explora contenidos sobre salud física, emocional y
                    nutricional, y ve tu avance en cada ruta
                  </p>
                </div>
              </motion.div>
              <motion.div variants={item}>
                <div className="shadow-pretty h-full transform rounded-2xl bg-white p-6 text-start transition duration-300 hover:-translate-y-1">
                  <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                    <Database className="text-rose-600" size={24} />
                  </div>
                  <h3 className="mb-2 text-lg font-semibold">
                    Monitoreo de carga
                  </h3>
                  <p className="text-base text-gray-600">
                    Revisa cuántos archivos médicos has subido y cuánto espacio
                    tienes disponible según tu plan actual
                  </p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default ProgressSection;
