"use client";

import { Trophy } from "lucide-react";
import { motion } from "motion/react";
import { useLayoutEffect, useState } from "react";

const loadingMessages = [
  {
    quote: "El aprendizaje es un tesoro que seguirá a su dueño a todas partes",
    author: "Proverbio chino",
  },
  {
    quote: "El éxito es la suma de pequeños esfuerzos repetidos día tras día",
    author: "Robert Collier",
  },
  {
    quote:
      "Cuanto más leas, más cosas sabrás. Cuanto más aprendas, a más lugares irás",
    author: "Dr. Seuss",
  },
  {
    quote:
      "La educación no cambia el mundo, cambia a las personas que van a cambiar el mundo",
    author: "Paulo Freire",
  },
  {
    quote: "Aprender sin reflexionar es malgastar la energía",
    author: "Confucio",
  },
  {
    quote: "Conocerse a uno mismo es el principio de toda sabiduría",
    author: "Aristóteles",
  },
  {
    quote:
      "El propósito de la educación es reemplazar una mente vacía por una abierta",
    author: "Malcolm Forbes",
  },
  {
    quote: "Estudiar sin pensar es inútil. Pensar sin estudiar, peligroso",
    author: "Confucio",
  },
];

export const InitialLoadingState = () => {
  const [message, setMessage] = useState<{
    quote: string;
    author: string;
  } | null>(null);

  useLayoutEffect(() => {
    const random =
      loadingMessages[Math.floor(Math.random() * loadingMessages.length)];
    setMessage(random);
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-6 pt-52 md:pt-60">
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="flex flex-col items-center"
      >
        <div className="relative mb-6">
          <div className="rounded-full bg-linear-to-br/shorter from-yellow-400 to-pink-400 p-6 text-yellow-100 shadow-lg dark:from-yellow-700 dark:to-pink-700">
            <Trophy className="size-16" />
          </div>
          <motion.div
            className="absolute inset-0 rounded-full"
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.7, 0, 0.7],
            }}
            transition={{
              duration: 2,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
            style={{
              background:
                "radial-gradient(circle, rgba(168, 85, 247, 0.4) 0%, rgba(168, 85, 247, 0) 70%)",
            }}
          />
        </div>

        <h2 className="text-foreground font-merriweather mb-2 text-2xl font-bold">
          Cargando resultados
        </h2>
        <p className="text-muted-foreground mb-4 max-w-xs text-center">
          Preparando el análisis de tu evaluación
        </p>

        <div className="bg-accent relative h-2 w-64 overflow-hidden rounded-full">
          <motion.div
            className="absolute top-0 left-0 h-full bg-gradient-to-r from-indigo-500 to-indigo-600"
            animate={{
              width: ["0%", "100%"],
              x: ["-100%", "0%"],
            }}
            transition={{
              duration: 1.5,
              repeat: Number.POSITIVE_INFINITY,
              repeatType: "loop",
            }}
          />
        </div>

        <div className="mt-8 flex flex-col items-center">
          {message && (
            <div>
              <q className="text-foreground/80 text-sm italic">
                {message.quote}
              </q>
              <p className="text-muted-foreground mt-1 text-right text-xs">
                - {message.author}
              </p>
            </div>
          )}
        </div>
      </motion.div>
    </div>
  );
};
