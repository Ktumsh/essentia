"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import {
  ArrowDown,
  Shield,
  Heart,
  Brain,
  Activity,
  Sparkles,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef } from "react";

import { Button } from "@/components/kit/button";

const HeroSection = () => {
  const router = useRouter();
  const [isVisible, setIsVisible] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const y = useTransform(scrollYProgress, [0, 1], [0, 200]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  useEffect(() => {
    setIsVisible(true);
  }, []);

  const scrollToSection = (sectionId: string) => {
    router.push(`/descubre-essentia${sectionId}`);
  };

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center overflow-hidden pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-1 mask-b-from-0 mask-b-to-100%">
        <div className="absolute inset-0 bg-gradient-to-br from-indigo-100/40 via-pink-100/40 to-rose-100/40"></div>
        <motion.div
          style={{ y }}
          className="animate-blob absolute top-1/4 -left-10 h-72 w-72 rounded-full bg-indigo-300 opacity-30 mix-blend-multiply blur-3xl filter"
        ></motion.div>
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="animate-blob animation-delay-2000 absolute top-1/3 right-0 h-72 w-72 rounded-full bg-pink-300 opacity-30 mix-blend-multiply blur-3xl filter"
        ></motion.div>
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 160]) }}
          className="animate-blob animation-delay-4000 absolute bottom-0 left-1/4 h-72 w-72 rounded-full bg-rose-300 opacity-30 mix-blend-multiply blur-3xl filter"
        ></motion.div>
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-4">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 px-4 py-1 backdrop-blur-sm">
              <span className="bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-sm font-medium text-transparent">
                Tu bienestar, nuestra prioridad
              </span>
            </div>

            <h1 className="mb-6 text-5xl leading-tight font-bold md:text-6xl lg:text-7xl">
              <span className="block text-gray-800">Cuida tu salud </span>
              <span className="block bg-gradient-to-r from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                de forma inteligente
              </span>
            </h1>

            <p className="mx-auto mb-8 max-w-xl text-xl text-gray-600 lg:mx-0">
              Gestiona tu historial médico, recibe recomendaciones
              personalizadas y mejora tu bienestar con nuestra plataforma
              integral de salud.
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                onClick={() => scrollToSection("#recursos")}
                className="group transform rounded-full bg-gradient-to-r from-indigo-600 to-pink-600 px-8 py-6 text-lg text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:from-indigo-700 hover:to-pink-700 hover:shadow-xl"
                size="lg"
              >
                Comenzar gratis
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
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
              <Button
                onClick={() => scrollToSection("#premium")}
                variant="outline"
                className="group rounded-full border-2 border-indigo-200 px-8 py-6 text-lg text-indigo-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:shadow-md"
                size="lg"
              >
                Ver planes premium
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
                  className="ml-2 h-5 w-5 transition-transform duration-300 group-hover:translate-x-1"
                >
                  <path d="M5 12h14" />
                  <path d="m12 5 7 7-7 7" />
                </svg>
              </Button>
            </div>

            <div className="mx-auto mt-12 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4 lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-100">
                  <Shield className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm text-gray-600">Seguridad médica</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-pink-100">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <span className="text-sm text-gray-600">
                  Bienestar integral
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-blue-100">
                  <Brain className="h-5 w-5 text-blue-600" />
                </div>
                <span className="text-sm text-gray-600">IA personalizada</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-100">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm text-gray-600">Seguimiento 24/7</span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-3 transform rounded-3xl bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-lg"></div>
            <div className="relative overflow-hidden rounded-3xl border border-indigo-100 bg-white shadow-2xl">
              <div className="absolute top-0 right-0 left-0 h-1 bg-gradient-to-r from-indigo-500 to-pink-500"></div>
              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-600">
                      <span className="font-bold text-white">E</span>
                    </div>
                    <span className="text-lg font-semibold">Essentia</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
                      <Sparkles className="h-4 w-4 text-indigo-600" />
                    </div>
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-100">
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
                  <div className="rounded-xl bg-indigo-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold">
                      <Heart className="h-5 w-5 text-indigo-600" />
                      Historial médico
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-3/4 rounded-full bg-indigo-200/50"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-1/2 rounded-full bg-indigo-200/50"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-blue-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 rounded-full bg-indigo-200/50"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-pink-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 font-semibold">
                      <Activity className="h-5 w-5 text-pink-600" />
                      Actividad reciente
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-200">
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
                            className="text-pink-600"
                          >
                            <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 rounded-full bg-pink-200/50"></div>
                          <div className="mt-1 h-3 w-1/2 rounded-full bg-pink-200/30"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-200">
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
                            className="text-pink-600"
                          >
                            <path d="M18 8h1a4 4 0 0 1 0 8h-1" />
                            <path d="M6 8h-1a4 4 0 0 0 0 8h1" />
                            <line x1="6" y1="12" x2="18" y2="12" />
                          </svg>
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-4/6 rounded-full bg-pink-200/50"></div>
                          <div className="mt-1 h-3 w-2/3 rounded-full bg-pink-200/30"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="font-semibold">Tu asistente IA</h3>
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="mt-2 text-sm text-white/80">
                      Essentia AI está lista para ayudarte con tu bienestar
                    </p>
                    <Button
                      onClick={() => scrollToSection("#ai")}
                      className="group mt-3 w-full bg-white text-indigo-600 hover:bg-white/90"
                    >
                      Comenzar chat
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
                        className="ml-2 h-4 w-4 transition-transform duration-300 group-hover:translate-x-1"
                      >
                        <path d="M5 12h14" />
                        <path d="m12 5 7 7-7 7" />
                      </svg>
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -bottom-6 h-24 w-24 animate-pulse rounded-full bg-yellow-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-2000 absolute -top-6 -left-6 h-24 w-24 animate-pulse rounded-full bg-indigo-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 transform animate-bounce cursor-pointer"
          onClick={() => scrollToSection("#metodo")}
        >
          <ArrowDown className="text-indigo-400" size={32} />
        </motion.div>
      </div>

      <div className="absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t from-white to-transparent"></div>
    </section>
  );
};

export default HeroSection;
