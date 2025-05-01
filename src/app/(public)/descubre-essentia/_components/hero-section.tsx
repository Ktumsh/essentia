"use client";

import {
  ArrowDown,
  Shield,
  Heart,
  Brain,
  Activity,
  Sparkles,
  ArrowRight,
  FileHeart,
  Bell,
} from "lucide-react";
import { motion, useScroll, useTransform } from "motion/react";
import { useRouter } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { Button } from "@/components/kit/button";
import Logo from "@/components/ui/layout/logo";

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

  const scrollToSection = useCallback(
    (sectionId: string) => {
      router.push(`/descubre-essentia${sectionId}`);
    },
    [router],
  );

  return (
    <section
      id="hero"
      ref={ref}
      className="relative flex min-h-screen items-center pt-20"
    >
      {/* Animated background elements */}
      <div className="absolute inset-0 z-1 mask-b-from-0 mask-b-to-100%">
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

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-indigo-500/10 to-pink-500/10 px-4 py-1 backdrop-blur-sm">
              <span className="bg-linear-to-r/shorter from-indigo-600 to-pink-600 bg-clip-text text-sm font-medium text-transparent">
                Tu bienestar, nuestra prioridad
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl lg:leading-20">
              <span className="font-grotesk! block text-slate-800">
                Cuida tu salud{" "}
              </span>
              <span className="font-grotesk! block bg-linear-to-r/shorter from-indigo-600 to-pink-600 bg-clip-text text-transparent">
                de forma inteligente
              </span>
            </h1>

            <p className="mx-auto mb-6 max-w-xl text-lg text-slate-600 md:mb-8 md:text-xl lg:mx-0">
              Centraliza tu historial médico, recibe orientación personalizada
              con IA y accede a rutas de aprendizaje que fortalecen tu bienestar
              integral
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                variant="gradient"
                className="group h-12 transform flex-row-reverse rounded-full px-8 text-base text-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl [&_svg]:size-5!"
                onClick={() => router.push("/signup")}
              >
                Comenzar gratis
              </Button>
              <ArrowLeftButton
                size="lg"
                variant="outline"
                className="group h-12 flex-row-reverse rounded-full border-2 border-indigo-200 px-8 text-base text-indigo-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:shadow-md [&_svg]:size-5! [&_svg]:rotate-180"
                onClick={() => router.push("/pricing")}
              >
                Ver planes premium
              </ArrowLeftButton>
            </div>

            <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4 md:mt-12 lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200">
                  <Shield className="h-5 w-5 text-indigo-600" />
                </div>
                <span className="text-sm text-slate-600">Seguridad médica</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-pink-200">
                  <Heart className="h-5 w-5 text-pink-600" />
                </div>
                <span className="text-sm text-slate-600">
                  Bienestar integral
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200">
                  <Brain className="h-5 w-5 text-yellow-600" />
                </div>
                <span className="text-sm text-slate-600">IA personalizada</span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-200">
                  <Activity className="h-5 w-5 text-green-600" />
                </div>
                <span className="text-sm text-slate-600">
                  Análisis continuo
                </span>
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: isVisible ? 1 : 0, scale: isVisible ? 1 : 0.9 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="relative"
          >
            <div className="absolute -inset-4 rotate-3 transform rounded-3xl bg-linear-to-r/shorter from-indigo-500/20 to-pink-500/20 blur-lg"></div>
            <div className="relative overflow-hidden rounded-3xl bg-white shadow-2xl">
              <div className="bg-premium absolute top-0 right-0 left-0 h-1"></div>
              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="bg-logo flex size-8 shrink-0 items-center justify-center rounded-sm">
                      <Logo />
                    </div>
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Essentia</span>
                      <span className="text-xs text-slate-600">
                        Buenos días!
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="flex h-8 w-8 items-center justify-center rounded-full bg-slate-100">
                      <Bell className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-xl bg-indigo-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                      <Heart className="h-5 w-5 text-indigo-600" />
                      Recomendaciones
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
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 rounded-full bg-indigo-200/50"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Almacenamiento médico */}
                  <div className="rounded-xl bg-pink-50 p-4">
                    <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                      <FileHeart className="h-5 w-5 text-pink-600" />
                      Almacenamiento médico
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-pink-200">
                          <Activity className="size-3.5 text-pink-600" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 rounded-full bg-pink-200/50"></div>
                          <div className="mt-1 h-3 w-1/2 rounded-full bg-pink-200/30"></div>
                        </div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-pink-100">
                        <div className="h-full w-1/6 bg-pink-400"></div>
                      </div>
                      <p className="text-sm text-pink-600/80">10% de uso</p>
                    </div>
                  </div>

                  {/* Essentia AI */}
                  <div className="bg-premium rounded-xl p-4 text-white">
                    <div className="flex items-center justify-between">
                      <h3 className="text-base font-semibold">
                        Orientación personalizada
                      </h3>
                      <Sparkles className="h-5 w-5" />
                    </div>
                    <p className="mt-2 text-sm text-white/80">
                      Essentia AI está lista para ayudarte con tu bienestar
                    </p>
                    <Button
                      onClick={() => scrollToSection("#ai")}
                      className="group mt-3 w-full bg-white text-indigo-600 hover:gap-4! hover:bg-white/90"
                    >
                      Descubre Essentia AI
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -bottom-6 h-24 w-24 rounded-full bg-pink-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
            <div className="animation-delay-2000 absolute -top-6 -left-6 h-24 w-24 rounded-full bg-indigo-300 opacity-70 mix-blend-multiply blur-xl filter"></div>
          </motion.div>
        </div>

        <motion.div
          style={{ opacity }}
          className="absolute -bottom-10 left-1/2 hidden -translate-x-1/2 transform animate-bounce cursor-pointer md:block"
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
