"use client";

import { motion } from "motion/react";
import { useEffect, useState } from "react";

import { useUserProfile } from "@/hooks/use-user-profile";

const GREETINGS = [
  "Estoy lista para ayudarte con lo que necesites.",
  "¿Qué quieres descubrir con Essentia hoy?",
  "Activa el poder del conocimiento ahora mismo.",
  "Tu guía inteligente está atenta, solo pregunta.",
  "Despejemos tus dudas y exploremos soluciones.",
  "La magia de Essentia está lista para ti.",
  "Dime en qué puedo ayudarte hoy.",
  "Explora, pregunta y deja que fluya la magia.",
  "Listos para aprender algo nuevo juntos.",
  "Haz tu consulta y abramos posibilidades.",
];

export const Greeting = () => {
  const { user } = useUserProfile();
  const [greeting, setGreeting] = useState("");

  useEffect(() => {
    const random = GREETINGS[Math.floor(Math.random() * GREETINGS.length)];
    setGreeting(random);
  }, []);

  return (
    <div
      key="overview"
      className="mx-auto mb-0! flex max-w-3xl flex-col items-center justify-center space-y-1.5 px-6 md:items-start md:px-4"
    >
      <motion.h1
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ delay: 0.5 }}
        className="w-fit bg-linear-to-r/shorter from-indigo-500 to-pink-500 bg-clip-text text-3xl font-semibold text-transparent md:text-4xl"
      >
        Hola, {user?.firstName}
      </motion.h1>

      {greeting && (
        <motion.div
          key={greeting}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 10 }}
          transition={{ delay: 0.6 }}
          className="text-muted-foreground text-center text-lg text-balance md:text-start md:text-xl md:text-wrap"
        >
          {greeting}
        </motion.div>
      )}
    </div>
  );
};
