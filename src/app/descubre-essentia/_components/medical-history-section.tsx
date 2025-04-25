"use client";

import { FileText, Shield, Lock, Clock, BarChart, Share2 } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";

const MedicalHistorySection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="historial-medico"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 to-purple-50 py-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 left-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute right-0 bottom-0 h-1/3 w-1/3 rounded-full bg-purple-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
          >
            <Badge className="mb-4 bg-indigo-100 px-3 py-1 text-sm text-indigo-600 hover:bg-indigo-200">
              HISTORIAL MÉDICO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Tu información médica segura y accesible
            </h2>
            <p className="text-lg text-gray-600">
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
              <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-indigo-100">
                  <FileText className="text-indigo-600" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">Archivos médicos</h3>
                <p className="text-gray-600">
                  Almacena y organiza tus archivos médicos en un solo lugar, con
                  hasta 60 documentos en planes premium.
                </p>
              </div>

              <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-purple-100">
                  <Shield className="text-purple-600" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">Evaluación de riesgo</h3>
                <p className="text-gray-600">
                  Recibe evaluaciones de riesgo de salud personalizadas basadas
                  en tu historial médico.
                </p>
              </div>

              <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-green-100">
                  <Lock className="text-green-600" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">
                  Privacidad garantizada
                </h3>
                <p className="text-gray-600">
                  Tu información médica está protegida con los más altos
                  estándares de seguridad y encriptación.
                </p>
              </div>

              <div className="transform rounded-xl bg-white p-6 shadow-md transition duration-300 hover:-translate-y-1 hover:scale-[1.02] hover:shadow-lg">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-rose-100">
                  <Share2 className="text-rose-600" size={24} />
                </div>
                <h3 className="mb-2 text-xl font-bold">Compartir seguro</h3>
                <p className="text-gray-600">
                  Comparte información específica con tus médicos de forma
                  segura y controlada.
                </p>
              </div>
            </div>

            <div className="mt-8 flex justify-center lg:justify-start">
              <Button className="rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 px-6 py-2 text-white shadow-md transition-all duration-300 hover:from-indigo-700 hover:to-purple-700 hover:shadow-lg">
                Explorar planes premium
              </Button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="order-1 lg:order-2"
          >
            <div className="relative">
              <div className="absolute -inset-4 -rotate-2 transform rounded-3xl bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-lg"></div>
              <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-xl">
                <div className="p-6">
                  <div className="mb-6 flex items-center justify-between">
                    <h3 className="flex items-center gap-2 text-xl font-bold">
                      <FileText className="text-indigo-600" size={20} />
                      Historial médico
                    </h3>
                    <Badge
                      variant="outline"
                      className="border-indigo-200 text-indigo-600"
                    >
                      Premium
                    </Badge>
                  </div>

                  <div className="space-y-4">
                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-indigo-100">
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
                            className="text-indigo-600"
                          >
                            <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Examen cardiovascular</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Hace 2 semanas</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </Button>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100">
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
                            className="text-purple-600"
                          >
                            <path d="M4.8 2.3A.3.3 0 1 0 5 2H4a2 2 0 0 0-2 2v5a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6V4a2 2 0 0 0-2-2h-1a.2.2 0 1 0 .3.3" />
                            <path d="M8 15v1a6 6 0 0 0 6 6v0a6 6 0 0 0 6-6v-4" />
                            <circle cx="20" cy="10" r="2" />
                          </svg>
                        </div>
                        <div>
                          <h4 className="font-medium">Análisis de sangre</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Hace 1 mes</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </Button>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-green-500"
                          style={{ width: "100%" }}
                        ></div>
                      </div>
                    </div>

                    <div className="rounded-lg bg-gray-50 p-4">
                      <div className="mb-2 flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100">
                          <BarChart className="h-5 w-5 text-blue-600" />
                        </div>
                        <div>
                          <h4 className="font-medium">Evaluación de riesgo</h4>
                          <div className="flex items-center text-sm text-gray-500">
                            <Clock className="mr-1 h-3 w-3" />
                            <span>Actualizado hoy</span>
                          </div>
                        </div>
                        <Button variant="ghost" size="sm" className="ml-auto">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="16"
                            height="16"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            className="text-gray-500"
                          >
                            <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" />
                            <polyline points="7 10 12 15 17 10" />
                            <line x1="12" y1="15" x2="12" y2="3" />
                          </svg>
                        </Button>
                      </div>
                      <div className="h-1 w-full overflow-hidden rounded-full bg-gray-200">
                        <div
                          className="h-full rounded-full bg-yellow-500"
                          style={{ width: "70%" }}
                        ></div>
                      </div>
                    </div>
                  </div>

                  <div className="mt-6">
                    <div className="rounded-lg bg-indigo-50 p-4">
                      <h4 className="mb-3 flex items-center gap-2 font-medium">
                        <Shield className="h-5 w-5 text-indigo-600" />
                        Evaluación de riesgo personalizada
                      </h4>
                      <p className="mb-3 text-sm text-gray-600">
                        Basado en tu historial médico, hemos identificado áreas
                        de atención para mejorar tu salud.
                      </p>
                      <div className="grid grid-cols-3 gap-2">
                        <div className="rounded bg-white p-2 text-center">
                          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-green-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-green-600"
                            >
                              <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium">Cardio</span>
                        </div>
                        <div className="rounded bg-white p-2 text-center">
                          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-yellow-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-yellow-600"
                            >
                              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                              <path d="M6 8h-1a4 4 0 0 0 0 8h1" />
                              <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                          </div>
                          <span className="text-xs font-medium">Peso</span>
                        </div>
                        <div className="rounded bg-white p-2 text-center">
                          <div className="mx-auto mb-1 flex h-8 w-8 items-center justify-center rounded-full bg-blue-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-blue-600"
                            >
                              <path d="M18 8a5 5 0 0 0-10 0v7h10V8z" />
                              <path d="M13 15v4" />
                              <path d="M18 8c0-1.5-.5-4-2.5-6" />
                              <path d="M8.5 2C7 4 6 6.5 6 8" />
                              <path d="M9 15v2" />
                              <path d="M17 15v2" />
                            </svg>
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
