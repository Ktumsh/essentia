"use client";

import { Sparkles } from "lucide-react";
import { motion, type Variants } from "motion/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";

import { ArrowLeftButton } from "./button-kit/arrow-left-button";
import { HomeFillIcon } from "./icons/interface";

const POPULAR_PAGES = [
  { title: "Inicio", href: "/" },
  { title: "Habla con Aeris", href: "/aeris" },
  { title: "Centros de salud", href: "/centros-de-salud" },
  { title: "Historial médico", href: "/historial-medico" },
  { title: "Herramientas de apoyo", href: "/herramientas" },
];

const NotFoundWrapper = () => {
  const router = useRouter();
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        duration: 0.8,
        staggerChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  const floatingVariants: Variants = {
    animate: {
      y: [-10, 10, -10],
      transition: {
        duration: 4,
        repeat: Number.POSITIVE_INFINITY,
        ease: "easeInOut",
      },
    },
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-50 via-indigo-50/30 to-fuchsia-50/20 dark:from-slate-950 dark:via-indigo-950/30 dark:to-fuchsia-950/20">
      {/* Fondo animado interactivo */}
      <div className="absolute inset-0 overflow-hidden">
        {/* Gradientes principales */}
        <div
          className="absolute -top-40 -right-40 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/30 to-purple-600/30 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * 0.02}px, ${mousePosition.y * 0.02}px)`,
          }}
        />
        <div
          className="absolute -bottom-40 -left-40 h-96 w-96 rounded-full bg-gradient-to-tr from-fuchsia-400/30 to-indigo-600/30 blur-3xl"
          style={{
            transform: `translate(${mousePosition.x * -0.015}px, ${mousePosition.y * -0.015}px)`,
          }}
        />

        {/* Partículas flotantes */}
        {[...Array(6)].map((_, i) => (
          <motion.div
            key={i}
            className="bg-premium absolute h-2 w-2 rounded-full opacity-20"
            style={{
              left: `${20 + i * 15}%`,
              top: `${30 + (i % 3) * 20}%`,
            }}
            animate={{
              y: [-20, 20, -20],
              x: [-10, 10, -10],
              opacity: [0.2, 0.5, 0.2],
            }}
            transition={{
              duration: 3 + i * 0.5,
              repeat: Number.POSITIVE_INFINITY,
              ease: "easeInOut",
              delay: i * 0.3,
            }}
          />
        ))}
      </div>

      {/* Logo flotante como elemento decorativo */}
      <motion.div
        className="absolute top-1/2 right-8 -translate-y-1/2 opacity-10 dark:opacity-5"
        variants={floatingVariants}
        animate="animate"
      >
        <Image
          src="/essentia-logo.webp"
          alt=""
          width={400}
          height={400}
          className="h-80 w-auto select-none"
          aria-hidden="true"
        />
      </motion.div>

      {/* Contenido principal */}
      <motion.div
        className="relative z-10 flex min-h-screen items-center justify-center px-6 py-12"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        <div className="mx-auto max-w-5xl text-center">
          {/* Código 404 animado */}
          <motion.div className="mb-8" variants={itemVariants}>
            <div className="relative inline-block">
              <span className="bg-premium font-grotesk bg-clip-text text-8xl font-black text-transparent md:text-9xl">
                404
              </span>
              <motion.div
                className="absolute -top-4 -right-4"
                animate={{ rotate: [0, 10, -10, 0] }}
                transition={{
                  duration: 2,
                  repeat: Number.POSITIVE_INFINITY,
                  ease: "easeInOut",
                }}
              >
                <Sparkles className="h-8 w-8 text-fuchsia-500" />
              </motion.div>
            </div>
          </motion.div>

          {/* Título principal */}
          <motion.h1
            className="font-grotesk mb-6 text-4xl leading-tight font-bold text-slate-900 md:text-5xl lg:text-6xl dark:text-slate-100"
            variants={itemVariants}
          >
            Esta página ha perdido su{" "}
            <span className="bg-premium font-grotesk bg-clip-text text-transparent">
              esencia
            </span>
          </motion.h1>

          {/* Subtítulo */}
          <motion.p
            className="text-muted-foreground mb-12 text-xl md:text-2xl"
            variants={itemVariants}
          >
            Pero juntos podemos encontrar el camino de vuelta al bienestar
          </motion.p>

          {/* Botones de acción */}
          <motion.div
            className="flex flex-col items-center gap-4 sm:flex-row sm:justify-center sm:gap-6"
            variants={itemVariants}
          >
            <ArrowLeftButton
              onClick={() => router.back()}
              size="lg"
              variant="outline"
              className="bg-background/80 h-12 text-base [&>svg]:size-5!"
            >
              Recuperar mi esencia
            </ArrowLeftButton>

            <Button
              asChild
              size="lg"
              variant="gradient"
              className="h-12 text-base"
            >
              <Link href="/">
                <HomeFillIcon className="size-5!" />
                Volver al inicio
              </Link>
            </Button>
          </motion.div>

          {/* Sugerencias útiles */}
          <motion.div className="mt-16 text-center" variants={itemVariants}>
            <p className="text-muted-foreground mb-4 text-sm font-medium">
              PÁGINAS POPULARES
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              {POPULAR_PAGES.map(({ title, href }) => (
                <Button
                  key={title}
                  asChild
                  variant="ghost"
                  size="sm"
                  className="bg-background/80 hover:bg-primary shadow-little-pretty hover:text-primary-foreground"
                >
                  <Link href={href}>{title}</Link>
                </Button>
              ))}
            </div>
          </motion.div>
        </div>
      </motion.div>

      <div
        className="pointer-events-none fixed z-30 h-8 w-8 rounded-full bg-gradient-to-r from-indigo-500 to-fuchsia-500 opacity-30 blur-xl transition-opacity duration-300"
        style={{
          left: mousePosition.x - 16,
          top: mousePosition.y - 16,
        }}
      />
    </div>
  );
};

export default NotFoundWrapper;
