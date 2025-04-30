"use client";

import { AlarmClock, BadgeCheck, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";
import Logo from "@/components/ui/layout/logo";

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

      <div className="mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="order-2 w-full lg:order-1 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-linear-to-br/shorter from-rose-200 to-indigo-200"></div>
              <div className="absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="absolute inset-0 bg-linear-to-br/shorter from-rose-50 to-indigo-50"></div>
                <div className="relative flex h-full items-center justify-center p-6">
                  <div className="mx-auto w-full max-w-xs rounded-2xl bg-white p-4 shadow-lg">
                    <div className="mb-6 flex items-center gap-2">
                      <Logo className="h-6" height={24} width={24} />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">
                          Essentia AI
                        </span>
                      </div>
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
                        className="pointer-events-none w-full rounded-full border border-gray-200 p-3 pr-10 text-sm"
                      />
                      <button className="pointer-events-none absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full bg-indigo-600">
                        <Sparkles className="text-white" size={12} />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="order-1 w-full lg:order-2 lg:w-1/2"
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
            <p className="mb-8 text-base leading-relaxed text-gray-600 md:text-lg">
              Accede a orientación inteligente basada en IA para cuidar tu
              salud. Con Essentia AI puedes explorar hábitos saludables,
              resolver dudas y tomar decisiones informadas en segundos.
              Disponible en planes{" "}
              <span className="font-medium text-indigo-600">Premium</span>.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100">
                  <Sparkles className="size-5 text-indigo-600" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Respuestas personalizadas
                  </h3>
                  <p className="text-base text-gray-600">
                    Recibe consejos adaptados a tus necesidades específicas y
                    objetivos de salud.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-100">
                  <BadgeCheck className="size-5 text-rose-600" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Información confiable
                  </h3>
                  <p className="text-base text-gray-600">
                    Contenido respaldado por investigación científica y expertos
                    en salud.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100">
                  <AlarmClock className="size-5 text-green-600" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Disponible 24/7
                  </h3>
                  <p className="text-base text-gray-600">
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
