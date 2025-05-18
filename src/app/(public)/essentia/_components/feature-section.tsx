"use client";

import { Brain, FileText, MapPin, Shield, Sparkles } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";
import FullLogo from "@/components/ui/layout/full-logo";

const FeatureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section id="metodo" ref={ref} className="bg-background relative py-20">
      <div className="absolute inset-0 z-1">
        <div className="absolute top-0 right-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-indigo-900" />
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-fuchsia-100 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-fuchsia-900" />
      </div>

      <div className="relative z-2 mx-auto max-w-7xl px-6">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="order-2 lg:order-1 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-rose-100 px-3 py-1 text-sm text-rose-600 dark:bg-rose-900/50 dark:text-rose-400">
              NUESTRO MÉTODO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Gestiona tu salud fácilmente, con todo en un solo lugar
            </h2>
            <p className="text-foreground/80 mb-8 text-base leading-relaxed md:text-lg">
              En Essentia creemos que cuidar tu salud no debería ser complejo.
              Por eso te ofrecemos un espacio donde puedes organizar tus
              documentos médicos, recibir orientación inteligente y acceder a
              herramientas que fortalecen tu bienestar día a día.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="hover:shadow-pretty bg-muted rounded-xl p-4 transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                  <Shield className="text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Gestión segura</h3>
                <p className="text-foreground/80 text-base">
                  Centraliza tu historial médico en un solo lugar, de forma
                  segura y confiable
                </p>
              </div>
              <div className="hover:shadow-pretty bg-muted rounded-xl p-4 transition-shadow">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100 dark:bg-rose-900">
                  <Brain className="text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Decisiones informadas
                </h3>
                <p className="text-foreground/80 text-base">
                  Toma decisiones informadas con apoyo de inteligencia
                  artificial personalizada
                </p>
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
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-linear-to-br/shorter from-indigo-200 to-fuchsia-200 dark:from-indigo-800 dark:to-fuchsia-800"></div>
              <div className="bg-background absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl shadow-lg">
                <div className="absolute inset-0 bg-linear-to-br/shorter from-indigo-50 to-fuchsia-50 dark:from-indigo-950 dark:to-fuchsia-950" />
                <div className="relative flex h-full items-center justify-center p-6">
                  <div className="bg-background mx-auto w-full max-w-xs rounded-2xl p-4 shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                      <FullLogo collapsed />
                      <div className="grid flex-1 text-left text-sm leading-tight">
                        <span className="truncate font-semibold">Essentia</span>
                      </div>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-green-50 p-3 dark:bg-green-950">
                        <h4 className="mb-1 text-sm font-medium">
                          Historial médico
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-green-200 dark:bg-green-800">
                            <FileText className="size-3.5 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-foreground/80 text-xs">
                            Visualiza y organiza tus documentos de salud
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-indigo-50 p-3 dark:bg-indigo-950">
                        <h4 className="mb-1 text-sm font-medium">
                          Recomendaciones inteligentes
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-indigo-200 dark:bg-indigo-800">
                            <Sparkles className="size-3.5 text-indigo-600 dark:text-indigo-400" />
                          </div>
                          <span className="text-foreground/80 text-xs">
                            Orientaciones basadas en tu historial médico
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-yellow-50 p-3 dark:bg-yellow-950">
                        <h4 className="mb-1 text-sm font-medium">
                          Centros de salud cercanos
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex size-6 shrink-0 items-center justify-center rounded-full bg-yellow-200 dark:bg-yellow-800">
                            <MapPin className="size-3.5 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <span className="text-foreground/80 text-xs">
                            Ubica clínicas y hospitales rápidamente
                          </span>
                        </div>
                      </div>
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

export default FeatureSection;
