"use client";

import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";

const FeatureSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="metodo"
      ref={ref}
      className="relative overflow-hidden bg-white py-20"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-0 right-0 h-1/3 w-1/3 rounded-full bg-indigo-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
        <div className="absolute bottom-0 left-0 h-1/3 w-1/3 rounded-full bg-pink-100 opacity-30 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="order-2 lg:order-1 lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-rose-100 px-3 py-1 text-sm text-rose-600 hover:bg-rose-200">
              NUESTRO MÉTODO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Promovemos tu salud y bienestar
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Creemos que la salud es invaluable y todos, sin importar la
              situación, merecen disfrutar de una vida plena. Es por eso que nos
              enfocamos en proporcionarte información basándonos en lo
              fundamental, lo relevante y lo esencial.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-gray-50 p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-indigo-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-indigo-600"
                  >
                    <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Protección integral
                </h3>
                <p className="text-gray-600">
                  Cuidamos cada aspecto de tu bienestar con un enfoque
                  holístico.
                </p>
              </div>
              <div className="rounded-xl bg-gray-50 p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-rose-600"
                  >
                    <path d="M2.5 2v6h6M21.5 22v-6h-6" />
                    <path d="M22 8.5c0 7.18-5.82 13-13 13C8.82 8.5 3 2.68 3 9.86c0-7.18 5.82-13 13-13C16.18 9.86 22 15.68 22 8.5z" />
                  </svg>
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Equilibrio perfecto
                </h3>
                <p className="text-gray-600">
                  Armonizamos cuerpo y mente para un bienestar completo.
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
              <div className="absolute inset-0 rotate-3 transform rounded-3xl bg-gradient-to-br from-indigo-200 to-pink-200"></div>
              <div className="absolute inset-0 -rotate-3 transform overflow-hidden rounded-3xl bg-white shadow-lg">
                <div className="absolute inset-0 bg-gradient-to-br from-indigo-50 to-pink-50"></div>
                <div className="relative flex h-full items-center justify-center p-6">
                  <div className="mx-auto w-full max-w-xs rounded-2xl bg-white p-4 shadow-lg">
                    <div className="mb-4 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-indigo-600">
                        <span className="text-xs font-bold text-white">E</span>
                      </div>
                      <span className="text-sm font-semibold">Essentia</span>
                    </div>
                    <div className="space-y-3">
                      <div className="rounded-lg bg-gray-100 p-3">
                        <h4 className="mb-1 text-sm font-medium">
                          Salud y Bienestar
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-green-100">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
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
                          <span className="text-xs text-gray-600">
                            Monitoreo diario
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-indigo-100 p-3">
                        <h4 className="mb-1 text-sm font-medium">
                          Ejercicios y Fitness
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-indigo-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-indigo-600"
                            >
                              <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                              <path d="M6 8h-1a4 4 0 0 0 0 8h1" />
                              <line x1="6" y1="12" x2="18" y2="12" />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">
                            Rutinas personalizadas
                          </span>
                        </div>
                      </div>
                      <div className="rounded-lg bg-yellow-100 p-3">
                        <h4 className="mb-1 text-sm font-medium">
                          Nutrición y Alimentación
                        </h4>
                        <div className="flex items-center gap-2">
                          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-yellow-200">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="14"
                              height="14"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="text-yellow-600"
                            >
                              <path d="M18 8c0 2.5-1 4-2 6-1.5 2.5-3 4-3 6h-2c0-2-.5-3.5-2-6-1.5-2.5-2-3.5-2-6 0-4 3-6 6-6s5 2 5 6z" />
                              <path d="M12 20v2" />
                            </svg>
                          </div>
                          <span className="text-xs text-gray-600">
                            Planes alimenticios
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
