"use client";

import { motion } from "motion/react";
import { memo } from "react";

import StatusIcon from "./status-icon";

const LoadingState = () => {
  const containerVariants = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <div className="from-accent to-background flex min-h-screen items-center justify-center bg-linear-to-br/shorter p-6">
      <motion.div
        variants={containerVariants}
        initial="initial"
        animate="animate"
        className="space-y-6 text-center"
      >
        <StatusIcon status="loading" />
        <div className="space-y-2">
          <h2 className="text-foreground text-xl font-semibold">
            Verificando el estado del pago
          </h2>
          <p className="loading-shimmer">
            Por favor, espera mientras procesamos tu información...
          </p>
        </div>
      </motion.div>
    </div>
  );
};

export default memo(LoadingState);
