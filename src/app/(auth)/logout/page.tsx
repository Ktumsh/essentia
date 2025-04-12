"use client";

import { motion } from "motion/react";
import { useEffect } from "react";

import { SpinnerIcon } from "@/components/ui/icons/status";

const LogoutPage = () => {
  useEffect(() => {
    setTimeout(() => {
      window.location.href = "/login";
    }, 1000);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      aria-hidden="true"
      className="flex min-h-dvh flex-col items-center justify-center gap-2"
    >
      <span>
        <SpinnerIcon
          className="text-muted-foreground size-8"
          aria-hidden="true"
        />
      </span>
      <h1 className="text-foreground text-center text-2xl font-semibold">
        Cerrando sesión
      </h1>
    </motion.div>
  );
};

export default LogoutPage;
