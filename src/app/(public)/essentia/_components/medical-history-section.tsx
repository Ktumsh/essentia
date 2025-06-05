"use client";

import {
  FileText,
  Shield,
  Share2,
  Brain,
  Calendar,
  Activity,
  FileHeart,
  BrainCog,
  Scale,
  HeartPulse,
  Droplet,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { SmilePlusButton } from "@/components/button-kit/smile-plus-button";
import { Badge } from "@/components/ui/badge";

const MedicalHistorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="historial-medico"
      ref={ref}
      className="relative bg-linear-to-tr/shorter from-indigo-50 to-fuchsia-50 py-20 dark:from-indigo-950 dark:to-fuchsia-950"
    >
      <div className="absolute inset-0 z-1">
        <div className="absolute top-0 left-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-indigo-900" />
        <div className="absolute right-0 bottom-0 h-1/3 w-1/3 rounded-full bg-fuchsia-100 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-fuchsia-900" />
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="text-primary mb-4 bg-indigo-100 px-3 py-1 text-sm dark:bg-indigo-900/50">
              HISTORIAL MÉDICO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
              Tu información médica segura y accesible
            </h2>
            <p className="text-foreground/80 text-base md:text-lg">
              Mantén tu historial médico organizado, seguro y disponible cuando
              lo necesites. Accede a tus archivos médicos, recibe evaluaciones
              de riesgo personalizadas y comparte información con tus
              profesionales de salud de forma segura.
            </p>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="order-2 lg:order-1"
          >
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="shadow-little-pretty hover:shadow-pretty bg-background transform rounded-xl p-6 transition duration-300 will-change-transform hover:-translate-y-1 hover:scale-105">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100 dark:bg-indigo-900">
                  <FileText className="text-primary" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Archivos médicos</h3>
                <p className="text-foreground/80 text-base">
                  Accede fácilmente a tus exámenes, recetas y documentos
                  clínicos desde cualquier lugar
                </p>
              </div>

              <div className="shadow-little-pretty hover:shadow-pretty bg-background transform rounded-xl p-6 transition duration-300 will-change-transform hover:-translate-y-1 hover:scale-105">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-fuchsia-100 dark:bg-fuchsia-900">
                  <Brain className="text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Evaluación de riesgo</h3>
                <p className="text-foreground/80 text-base">
                  Identifica posibles riesgos de salud con ayuda de IA, según tu
                  historial
                </p>
              </div>

              <div className="shadow-little-pretty hover:shadow-pretty bg-background transform rounded-xl p-6 transition duration-300 will-change-transform hover:-translate-y-1 hover:scale-105">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100 dark:bg-green-900">
                  <Shield className="text-green-600 dark:text-green-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold">
                  Privacidad garantizada
                </h3>
                <p className="text-foreground/80 text-base">
                  Tu información médica está protegida con los más altos
                  estándares de seguridad y encriptación
                </p>
              </div>

              <div className="shadow-little-pretty hover:shadow-pretty bg-background transform rounded-xl p-6 transition duration-300 will-change-transform hover:-translate-y-1 hover:scale-105">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100 dark:bg-rose-900">
                  <Share2 className="text-rose-600 dark:text-rose-400" />
                </div>
                <h3 className="mb-2 text-lg font-bold">Compartir seguro</h3>
                <p className="text-foreground/80 text-base">
                  Comparte tus archivos con médicos de forma rápida y segura
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 -rotate-2 transform rounded-3xl bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 blur-lg" />
              <div className="bg-background relative z-1 overflow-hidden rounded-3xl border border-indigo-100 shadow-xl dark:border-indigo-900">
                <div className="p-6">
                  {/* Encabezado simplificado */}
                  <div className="mb-6 flex flex-col justify-between gap-4 md:flex-row md:items-center">
                    <h3 className="flex items-center gap-2 text-xl font-bold">
                      <FileHeart className="text-primary" />
                      Historial Médico
                    </h3>
                    <SmilePlusButton size="sm" variant="outline">
                      Añadir documento
                    </SmilePlusButton>
                  </div>

                  {/* Barra de progreso simplificada */}
                  <div className="bg-muted mb-6 rounded-lg p-4">
                    <div className="mb-2 flex items-center justify-between">
                      <h4 className="text-sm font-medium">Almacenamiento</h4>
                      <Badge variant="premium">Premium</Badge>
                    </div>
                    <div className="bg-primary/20 mb-1 h-2 w-full overflow-hidden rounded-full">
                      <div
                        className="bg-primary h-full rounded-full"
                        style={{ width: "10%" }}
                      ></div>
                    </div>
                    <div className="text-muted-foreground flex justify-between text-xs">
                      <span>Documentos utilizados</span>
                      <span>2/24</span>
                    </div>
                  </div>

                  {/* Documentos simplificados */}
                  <div className="space-y-4">
                    {/* Documento 1 */}
                    <div className="bg-muted rounded-lg p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100 dark:bg-indigo-900">
                          <Droplet className="text-primary size-5" />
                        </div>
                        <div>
                          <h4 className="font-medium">Análisis de Sangre</h4>
                          <div className="text-muted-foreground flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>Enero 2024</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/20 h-1 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: "100%" }}
                        />
                      </div>
                    </div>

                    {/* Documento 2 */}
                    <div className="bg-muted rounded-lg p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-fuchsia-100 dark:bg-fuchsia-900">
                          <Activity className="size-5 text-fuchsia-600 dark:text-fuchsia-400" />
                        </div>
                        <div>
                          <h4 className="font-medium">Densitometría</h4>
                          <div className="text-muted-foreground flex items-center text-sm">
                            <Calendar className="mr-1 h-3 w-3" />
                            <span>Marzo 2025</span>
                          </div>
                        </div>
                      </div>
                      <div className="bg-primary/20 h-1 w-full overflow-hidden rounded-full">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    {/* Recomendación simplificada */}
                    <div className="rounded-lg bg-indigo-50 p-4 dark:bg-indigo-950">
                      <h4 className="mb-3 flex items-center gap-2 font-medium">
                        <Shield className="text-primary size-5" />
                        Recomendación IA
                      </h4>
                      <p className="text-foreground/80 mb-3 text-sm">
                        Según tus resultados recientes, te recomendamos mejorar
                        el descanso y mantener actividad cardiovascular regular.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="bg-background rounded-lg p-2 text-center">
                          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100 dark:bg-green-900">
                            <HeartPulse className="size-4 text-green-600 dark:text-green-400" />
                          </div>
                          <span className="text-xs font-medium">Cardio</span>
                        </div>
                        <div className="bg-background rounded-lg p-2 text-center">
                          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100 dark:bg-yellow-900">
                            <Scale className="size-4 text-yellow-600 dark:text-yellow-400" />
                          </div>
                          <span className="text-xs font-medium">Peso</span>
                        </div>
                        <div className="bg-background rounded-lg p-2 text-center">
                          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                            <BrainCog className="size-4 text-blue-600 dark:text-blue-400" />
                          </div>
                          <span className="text-xs font-medium">Estrés</span>
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

export default MedicalHistorySection;
