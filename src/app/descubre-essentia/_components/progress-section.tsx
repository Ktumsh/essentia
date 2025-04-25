"use client";

import {
  LineChart,
  Activity,
  Target,
  Calendar,
  TrendingUp,
} from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRef } from "react";

import { Badge } from "@/components/kit/badge";

const ProgressSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });

  return (
    <section
      id="progreso"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-purple-50 py-20"
    >
      <div className="mx-auto max-w-7xl px-4">
        <div className="flex flex-col items-center gap-12 lg:flex-row lg:gap-20">
          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: -50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -50 }}
            transition={{ duration: 0.8, delay: 0.2 }}
          >
            <Badge className="mb-4 bg-pink-100 px-3 py-1 text-sm text-pink-600 hover:bg-pink-200">
              PROGRESO
            </Badge>
            <h2 className="mb-6 text-3xl font-bold text-gray-800 md:text-4xl lg:text-5xl">
              Toma el control de tu salud
            </h2>
            <p className="mb-8 text-lg leading-relaxed text-gray-600">
              Registra tu progreso, establece metas personalizadas y accede a
              reportes claros sobre tu salud y bienestar. Con Essentia, llevar
              el control de tus hábitos nunca fue tan fácil.
            </p>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-blue-100">
                  <Target className="text-blue-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Metas personalizadas
                </h3>
                <p className="text-gray-600">
                  Define objetivos realistas y alcanzables para tu bienestar.
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-purple-100">
                  <Calendar className="text-purple-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Seguimiento diario
                </h3>
                <p className="text-gray-600">
                  Registra tus actividades y hábitos para mantener la
                  consistencia.
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-green-100">
                  <LineChart className="text-green-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">
                  Análisis detallado
                </h3>
                <p className="text-gray-600">
                  Visualiza tu progreso con gráficos intuitivos y comprensibles.
                </p>
              </div>
              <div className="rounded-xl bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-rose-100">
                  <TrendingUp className="text-rose-600" size={24} />
                </div>
                <h3 className="mb-2 text-lg font-semibold">Mejora continua</h3>
                <p className="text-gray-600">
                  Recibe recomendaciones basadas en tus datos para optimizar
                  resultados.
                </p>
              </div>
            </div>
          </motion.div>

          <motion.div
            className="lg:w-1/2"
            initial={{ opacity: 0, x: 50 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 50 }}
            transition={{ duration: 0.8, delay: 0.4 }}
          >
            <div className="rounded-2xl bg-white p-6 shadow-xl md:p-8">
              <div className="mb-8 flex items-center justify-between">
                <h3 className="text-xl font-bold">Tu progreso semanal</h3>
                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Últimos 7 días</span>
                  <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="text-gray-600"
                    >
                      <circle cx="12" cy="12" r="1" />
                      <circle cx="19" cy="12" r="1" />
                      <circle cx="5" cy="12" r="1" />
                    </svg>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Activity className="text-purple-600" size={20} />
                      <span className="font-medium">Actividad física</span>
                    </div>
                    <span className="font-medium text-green-600">+12%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-purple-600"
                      style={{ width: "75%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                        className="text-blue-600"
                      >
                        <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                        <path d="M6 8h-1a4 4 0 0 0 0 8h1" />
                        <line x1="6" y1="12" x2="18" y2="12" />
                      </svg>
                      <span className="font-medium">Hidratación</span>
                    </div>
                    <span className="font-medium text-green-600">+8%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-blue-600"
                      style={{ width: "65%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                        <path d="M18 8c0 2.5-1 4-2 6-1.5 2.5-3 4-3 6h-2c0-2-.5-3.5-2-6-1.5-2.5-2-3.5-2-6 0-4 3-6 6-6s5 2 5 6z" />
                        <path d="M12 20v2" />
                      </svg>
                      <span className="font-medium">Nutrición</span>
                    </div>
                    <span className="font-medium text-yellow-600">+3%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-rose-600"
                      style={{ width: "55%" }}
                    ></div>
                  </div>
                </div>

                <div>
                  <div className="mb-2 flex items-center justify-between">
                    <div className="flex items-center gap-2">
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
                        <path d="M18 16.8a7.14 7.14 0 0 0 2.24-3.22 8.34 8.34 0 0 0 .25-2.08c.04-3.2-2.43-5.99-5.65-6.56a8.14 8.14 0 0 0-1.93-.22 7.93 7.93 0 0 0-5.71 2.36A8.07 8.07 0 0 0 5.08 9.3a8.12 8.12 0 0 0 .14 4.02c.5 1.94 1.76 3.55 3.14 4.63" />
                        <path d="M7.7 19.34a3.06 3.06 0 0 0 3.22-.25 3.12 3.12 0 0 0 1.26-2.47 3.12 3.12 0 0 0-1.26-2.47 3.06 3.06 0 0 0-3.22-.25 3.12 3.12 0 0 0-1.65 2.72c0 1.18.67 2.25 1.65 2.72Z" />
                        <path d="M15.7 19.34a3.06 3.06 0 0 0 3.22-.25 3.12 3.12 0 0 0 1.26-2.47 3.12 3.12 0 0 0-1.26-2.47 3.06 3.06 0 0 0-3.22-.25 3.12 3.12 0 0 0-1.65 2.72c0 1.18.67 2.25 1.65 2.72Z" />
                      </svg>
                      <span className="font-medium">Sueño</span>
                    </div>
                    <span className="font-medium text-red-600">-5%</span>
                  </div>
                  <div className="h-3 overflow-hidden rounded-full bg-gray-100">
                    <div
                      className="h-full rounded-full bg-green-600"
                      style={{ width: "45%" }}
                    ></div>
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

export default ProgressSection;
