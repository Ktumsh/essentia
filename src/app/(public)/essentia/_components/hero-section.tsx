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
import FullLogo from "@/components/layout/full-logo";
import { Button } from "@/components/ui/button";

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
      router.push(`/essentia${sectionId}`);
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
          className="animate-blob absolute top-1/4 -left-10 size-72 rounded-full bg-indigo-300 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-indigo-700"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 100]) }}
          className="animate-blob animation-delay-2000 absolute top-1/3 right-0 size-72 rounded-full bg-fuchsia-300 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-fuchsia-700"
        />
        <motion.div
          style={{ y: useTransform(scrollYProgress, [0, 1], [0, 160]) }}
          className="animate-blob animation-delay-4000 absolute bottom-0 left-1/4 size-72 rounded-full bg-rose-300 opacity-30 mix-blend-multiply blur-3xl filter dark:bg-rose-700"
        />
      </div>

      <div className="relative z-10 mx-auto max-w-7xl px-6">
        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: isVisible ? 1 : 0, y: isVisible ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-center lg:text-left"
          >
            <div className="mb-6 inline-block rounded-full bg-gradient-to-r from-indigo-500/10 to-fuchsia-500/10 px-4 py-1 backdrop-blur-sm">
              <span className="bg-premium bg-clip-text text-sm font-medium text-transparent">
                Tu bienestar, nuestra prioridad
              </span>
            </div>

            <h1 className="mb-6 text-5xl font-bold md:text-6xl lg:text-7xl lg:leading-20">
              <span className="font-grotesk! text-foreground block">
                Cuida tu salud{" "}
              </span>
              <span className="font-grotesk! bg-premium block bg-clip-text text-transparent">
                de forma inteligente
              </span>
            </h1>

            <p className="text-foreground/80 mx-auto mb-6 max-w-xl text-base sm:text-lg md:mb-8 md:text-xl lg:mx-0">
              Centraliza tu historial médico, recibe orientación personalizada
              con IA y accede a rutas de aprendizaje que fortalecen tu bienestar
              integral
            </p>

            <div className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start">
              <Button
                size="lg"
                variant="gradient"
                className="group h-12 transform rounded-full px-8 text-base shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl [&_svg]:size-5!"
                onClick={() => router.push("/signup")}
              >
                Comenzar gratis
              </Button>
              <ArrowLeftButton
                size="lg"
                variant="outline"
                className="group h-12 flex-row-reverse rounded-full border-2 border-indigo-200 px-8 text-base text-indigo-700 shadow-sm transition-all duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:opacity-100 hover:shadow-md dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 [&_svg]:size-5! [&_svg]:rotate-180"
                onClick={() => router.push("/planes")}
              >
                Ver planes premium
              </ArrowLeftButton>
            </div>

            <div className="mx-auto mt-6 grid max-w-xl grid-cols-2 gap-4 sm:grid-cols-4 md:mt-12 lg:mx-0">
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-indigo-200 dark:bg-indigo-800">
                  <Shield className="text-primary size-5" />
                </div>
                <span className="text-foreground/80 text-sm">
                  Seguridad médica
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-fuchsia-200 dark:bg-fuchsia-800">
                  <Heart className="size-5 text-fuchsia-600 dark:text-fuchsia-400" />
                </div>
                <span className="text-foreground/80 text-sm">
                  Bienestar integral
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-yellow-200 dark:bg-yellow-800">
                  <Brain className="size-5 text-yellow-600 dark:text-yellow-400" />
                </div>
                <span className="text-foreground/80 text-sm">
                  IA personalizada
                </span>
              </div>
              <div className="flex flex-col items-center lg:items-start">
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-green-200 dark:bg-green-800">
                  <Activity className="size-5 text-green-600 dark:text-green-400" />
                </div>
                <span className="text-foreground/80 text-sm">
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
            <div className="absolute -inset-4 rotate-3 transform rounded-3xl bg-linear-to-r/shorter from-indigo-500/20 to-fuchsia-500/20 blur-lg" />
            <div className="bg-background relative overflow-hidden rounded-3xl shadow-2xl">
              <div className="bg-premium absolute top-0 right-0 left-0 h-1"></div>
              <div className="p-6 md:p-8">
                <div className="mb-6 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <FullLogo collapsed />
                    <div className="grid flex-1 text-left text-sm leading-tight">
                      <span className="truncate font-semibold">Essentia</span>
                      <span className="text-foreground/80 text-xs">
                        Buenos días!
                      </span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <div className="bg-accent flex size-8 items-center justify-center rounded-full">
                      <Bell className="size-4" />
                    </div>
                  </div>
                </div>

                <div className="space-y-6">
                  <div className="rounded-xl bg-indigo-50 p-4 dark:bg-indigo-950">
                    <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                      <Heart className="text-primary size-5" />
                      Recomendaciones
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-green-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-3/4 rounded-full bg-indigo-200/50 dark:bg-indigo-800"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-yellow-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-1/2 rounded-full bg-indigo-200/50 dark:bg-indigo-800"></div>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="h-3 w-3 rounded-full bg-red-500"></div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 rounded-full bg-indigo-200/50 dark:bg-indigo-800"></div>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Almacenamiento médico */}
                  <div className="rounded-xl bg-fuchsia-50 p-4 dark:bg-fuchsia-950">
                    <h3 className="mb-2 flex items-center gap-2 text-base font-semibold">
                      <FileHeart className="text-secondary size-5" />
                      Almacenamiento médico
                    </h3>
                    <div className="space-y-3">
                      <div className="flex items-center gap-2">
                        <div className="flex size-8 flex-shrink-0 items-center justify-center rounded-full bg-fuchsia-200 dark:bg-fuchsia-800">
                          <Activity className="text-secondary size-3.5" />
                        </div>
                        <div className="flex-1">
                          <div className="h-4 w-5/6 rounded-full bg-fuchsia-200/50 dark:bg-fuchsia-800"></div>
                          <div className="mt-1 h-3 w-1/2 rounded-full bg-fuchsia-200/30 dark:bg-fuchsia-800/50"></div>
                        </div>
                      </div>
                      <div className="h-2 w-full overflow-hidden rounded-full bg-fuchsia-100 dark:bg-fuchsia-900">
                        <div className="h-full w-1/6 rounded-full bg-fuchsia-400"></div>
                      </div>
                      <p className="text-secondary/80 text-sm">10% de uso</p>
                    </div>
                  </div>

                  {/* Habla con Aeris */}
                  <div className="bg-premium rounded-xl p-4">
                    <div className="flex items-center justify-between text-white">
                      <h3 className="text-base font-semibold">
                        Orientación personalizada
                      </h3>
                      <Sparkles className="size-5" />
                    </div>
                    <p className="mt-2 text-sm text-white/80">
                      Aeris está lista para ayudarte con tu bienestar
                    </p>
                    <Button
                      onClick={() => scrollToSection("#ai")}
                      className="group bg-background text-primary hover:bg-background/90 mt-3 w-full hover:gap-4!"
                    >
                      Habla con Aeris
                      <ArrowRight />
                    </Button>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute -right-6 -bottom-6 size-24 rounded-full bg-fuchsia-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-fuchsia-700"></div>
            <div className="animation-delay-2000 absolute -top-6 -left-6 size-24 rounded-full bg-indigo-300 opacity-70 mix-blend-multiply blur-xl filter dark:bg-indigo-700"></div>
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

      <div
        aria-hidden="true"
        className="from-background absolute right-0 bottom-0 left-0 h-32 bg-gradient-to-t to-transparent"
      />
    </section>
  );
};

export default HeroSection;
