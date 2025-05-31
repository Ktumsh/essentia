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
      className="bg-background relative overflow-hidden py-20"
    >
      <div className="absolute inset-0 z-1">
        <div className="absolute top-0 left-0 h-1/3 w-1/3 rounded-full bg-rose-100 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-rose-900" />
        <div className="absolute right-0 bottom-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-indigo-900" />
      </div>

      <div className="relative z-2 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="order-2 w-full lg:order-1 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <div className="relative mx-auto aspect-square w-full max-w-md">
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-linear-to-br/shorter from-rose-200 to-indigo-200 dark:from-rose-800 dark:to-indigo-800" />
              <div className="bg-background absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl shadow-lg">
                <div className="absolute inset-0 bg-linear-to-br/shorter from-rose-50 to-indigo-50 dark:from-rose-950 dark:to-indigo-950" />
                <div className="relative flex h-full items-center justify-center p-6">
                  <div className="bg-background mx-auto w-full max-w-xs rounded-2xl p-4 shadow-lg">
                    <div className="mb-6 flex items-center gap-2">
                      <Logo className="h-6" height={24} width={24} />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Aeris</span>
                      </div>
                    </div>
                    <div className="mb-4 rounded-lg bg-linear-to-r/shorter from-indigo-500 to-indigo-600 p-3">
                      <p className="text-sm text-white">
                        Quiero organizar un día saludable con ejercicio, comida
                        y manejo del estrés.
                      </p>
                    </div>
                    <div className="bg-primary/10 mb-4 rounded-lg p-3">
                      <p className="text-sm">
                        <span className="text-primary font-medium">Aeris:</span>{" "}
                        Por supuesto, puedo ayudarte a crear un plan
                        personalizado...
                      </p>
                    </div>
                    <div className="relative">
                      <input
                        type="text"
                        placeholder="Escribe tu mensaje..."
                        className="border-alternative placeholder:text-muted-foreground pointer-events-none w-full rounded-full border p-3 pr-10 text-sm"
                      />
                      <button className="bg-premium pointer-events-none absolute top-1/2 right-3 flex h-6 w-6 -translate-y-1/2 transform items-center justify-center rounded-full">
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
            <Badge className="mb-4 bg-rose-100 px-3 py-1 text-sm text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
              AERIS
            </Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Una guía inteligente para tu bienestar
            </h2>
            <p className="text-foreground/80 mb-8 text-base leading-relaxed md:text-lg">
              Accede a orientación inteligente basada en IA para cuidar tu
              salud. Con Aeris puedes explorar hábitos saludables, resolver
              dudas y tomar decisiones informadas en segundos. Disponible en
              planes <span className="text-primary font-medium">Premium</span>.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4">
                <div className="mt-1 flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <Sparkles className="text-primary size-5" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Respuestas personalizadas
                  </h3>
                  <p className="text-foreground/80 text-base">
                    Recibe consejos adaptados a tus necesidades específicas y
                    objetivos de salud.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900">
                  <BadgeCheck className="size-5 text-rose-600 dark:text-rose-400" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Información confiable
                  </h3>
                  <p className="text-foreground/80 text-base">
                    Contenido respaldado por investigación científica y expertos
                    en salud.
                  </p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="mt-1 flex size-10 flex-shrink-0 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                  <AlarmClock className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="mb-1 text-lg font-semibold">
                    Disponible 24/7
                  </h3>
                  <p className="text-foreground/80 text-base">
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
