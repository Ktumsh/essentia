"use client";

import { Sparkles, HeartPulse, ShieldCheck } from "lucide-react";
import { motion, useInView } from "motion/react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { useRef } from "react";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { LoginButton } from "@/components/button-kit/login-button";
import Logo from "@/components/layout/logo";
import { Button } from "@/components/ui/button";

const CtaSection = () => {
  const router = useRouter();
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const { data: session } = useSession();

  return (
    <section
      id="cta"
      ref={ref}
      className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-fuchsia-50 to-indigo-50 py-20 dark:from-indigo-950 dark:via-fuchsia-950 dark:to-indigo-950"
    >
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 left-1/4 h-1/2 w-1/2 rounded-full bg-gradient-to-br from-indigo-300/20 to-fuchsia-300/20 mix-blend-multiply blur-3xl filter"></div>
      </div>

      <div className="mx-auto max-w-7xl px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
          transition={{ duration: 0.8 }}
          className="mx-auto max-w-4xl text-center"
        >
          <h2 className="mb-6 text-3xl font-bold md:text-4xl lg:text-5xl">
            Comienza tu viaje hacia una{" "}
            <span className="bg-premium bg-clip-text text-transparent">
              vida más saludable
            </span>
          </h2>
          <p className="text-foreground/80 mx-auto mb-10 max-w-3xl text-base md:text-lg">
            Da el primer paso hacia una vida más saludable. Essentia ha sido
            creada para acompañarte en tu bienestar físico y mental con
            herramientas claras, orientación confiable y un enfoque realmente
            personalizado.
          </p>

          <div className="mb-12 grid grid-cols-1 gap-8 md:grid-cols-3">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="shadow-little-pretty hover:shadow-pretty bg-background rounded-2xl p-6 text-start transition duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-indigo-100 dark:bg-indigo-900">
                <ShieldCheck className="text-primary" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">
                Seguridad garantizada
              </h3>
              <p className="text-foreground/80 text-base">
                Tu información médica se protege con encriptación avanzada y
                altos estándares de seguridad para garantizar tu privacidad.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="shadow-little-pretty hover:shadow-pretty bg-background rounded-2xl p-6 text-start transition duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-fuchsia-100 dark:bg-fuchsia-900">
                <HeartPulse className="text-fuchsia-600 dark:text-fuchsia-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">Bienestar integral</h3>
              <p className="text-foreground/80 text-base">
                Aborda tu salud física, mental, emocional y nutricional desde un
                solo lugar con un enfoque completo y equilibrado.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
              transition={{ duration: 0.6, delay: 0.3 }}
              className="shadow-little-pretty hover:shadow-pretty bg-background rounded-2xl p-6 text-start transition duration-300 hover:-translate-y-1"
            >
              <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-100 dark:bg-blue-900">
                <Sparkles className="text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="mb-2 text-lg font-semibold">IA personalizada</h3>
              <p className="text-foreground/80 text-base">
                Recibe recomendaciones ajustadas a tu perfil médico y objetivos
                de salud mediante nuestra inteligencia artificial especializada.
              </p>
            </motion.div>
          </div>

          <div className="flex flex-col justify-center gap-4 sm:flex-row">
            {!session?.user && (
              <Button
                size="lg"
                variant="gradient"
                className="group h-12 rounded-full px-8 text-base shadow-lg transition duration-300 hover:-translate-y-1 hover:shadow-xl [&_svg]:size-5!"
                onClick={() => router.push("/signup")}
              >
                Comenzar gratis
              </Button>
            )}
            <ArrowLeftButton
              size="lg"
              variant="outline"
              className="group h-12 flex-row-reverse rounded-full border-2 border-indigo-200 px-8 text-base text-indigo-700 shadow-sm transition duration-300 hover:border-indigo-300 hover:bg-indigo-50 hover:text-indigo-700 hover:opacity-100 hover:shadow-md dark:border-indigo-800 dark:bg-indigo-950 dark:text-indigo-300 dark:hover:bg-indigo-950 dark:hover:text-indigo-300 [&_svg]:size-5! [&_svg]:rotate-180"
              onClick={() => router.push("/planes")}
            >
              Ver planes premium
            </ArrowLeftButton>
          </div>

          {!session?.user && (
            <div className="shadow-little-pretty hover:shadow-pretty bg-background mx-auto mt-16 max-w-3xl rounded-2xl p-8">
              <div className="flex flex-col items-center gap-6 md:flex-row">
                <div className="md:w-1/3">
                  <div className="relative">
                    <div className="absolute -inset-2 rounded-full bg-gradient-to-r from-indigo-500/20 to-pink-500/20 blur-md"></div>
                    <Logo height={96} width={96} className="mx-auto h-24" />
                  </div>
                </div>
                <div className="text-left md:w-2/3">
                  <h3 className="mb-2 text-xl font-bold md:text-2xl">
                    ¿Ya eres usuario?
                  </h3>
                  <p className="text-foreground/80 mb-4 text-base">
                    Inicia sesión para continuar tu viaje hacia una vida más
                    saludable y acceder a todas tus herramientas personalizadas.
                  </p>
                  <LoginButton variant="secondary" size="sm">
                    Iniciar sesión
                  </LoginButton>
                </div>
              </div>
            </div>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default CtaSection;
