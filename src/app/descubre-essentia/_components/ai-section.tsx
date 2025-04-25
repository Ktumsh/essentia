"use client";

import { Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";

const AiSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="ai"
      ref={ref}
      className="relative overflow-hidden bg-white py-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-1/3 w-1/3 rounded-full bg-rose-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute right-0 bottom-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-gradient-to-br from-rose-200 to-indigo-200"></div>
              <div className="absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-rose-50 to-indigo-50"></div>
                <div className="relative flex h-full items-center justify-center p-6">
                  <div className="mx-auto w-full max-w-xs rounded-2xl bg-white p-4 shadow-lg">
                    <div className="mb-6 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                        <span className="text-xs font-bold text-white">E</span>
                      </div>
                      <span className="text-sm font-semibold">Essentia AI</span>
                    </div>
                    <div className="mb-4 rounded-lg bg-gray-100 p-3">
                      <p className="text-sm text-gray-700">
                        Quiero organizar un día saludable con ejercicio, comida
                        y manejo del estrés.
                      </p>
                    </div>
                    <div className="mb-4 rounded-lg bg-indigo-100 p-3">
                      <p className="text-sm text-gray-700">
                        <span className="font-medium text-indigo-600">
                          Essentia AI:
                        </span>{" "}
                        Por supuesto, puedo ayudarte a crear un plan
                        personalizado...
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        className="w-full rounded-full border border-gray-200 p-3 pr-10 text-sm focus:ring-2 focus:ring-indigo-500 focus:outline-none"
                      />
                      <button className="absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-indigo-600">
                        <Sparkles className="text-white" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <Badge className="mb-4 bg-rose-100 px-3 py-1 text-sm text-rose-600 hover:bg-rose-200">
              ESSENTIA AI
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Una guía inteligente para tu bienestar
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              ¡Obtén orientación personalizada y confiable sobre salud en
              segundos! Explora temas respaldados por evidencia científica para
              tomar decisiones informadas y mejorar tu bienestar.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Sparkles className="text-indigo-600" size={20} />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Respuestas personalizadas
                  </h3>
                  <p className="text-gray-600">
                    Recibe consejos adaptados a tus necesidades específicas y
                    objetivos de salud.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-rose-600"
                  >
                    <path d="M9 12h.01" />
                    <path d="M15 12h.01" />
                    <path d="M10 16c.5.3 1.2.5 2 .5s1.5-.2 2-.5" />
                    <path d="M19 6.3a9 9 0 0 1 1.8 3.9 2 2 0 0 1 0 3.6 9 9 0 0 1-17.6 0 2 2 0 0 1 0-3.6A9 9 0 0 1 12 3c2 0 3.5 1.1 3.5 2.5s-.9 2.5-2 2.5c-.8 0-1.5-.4-1.5-1" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Información confiable
                  </h3>
                  <p className="text-gray-600">
                    Contenido respaldado por investigación científica y expertos
                    en salud.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="20"
                    height="20"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-green-600"
                  >
                    <path d="M12 22c5.523 0 10-4.477 10-10S17.523 2 12 2 2 6.477 2 12s4.477 10 10 10z" />
                    <path d="m9 12 2 2 4-4" />
                  </svg>
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Disponible 24/7
                  </h3>
                  <p className="text-gray-600">
                    Accede a orientación sobre salud en cualquier momento y
                    lugar.
                  </p>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default AiSection;
