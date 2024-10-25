"use client";

import { motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

import { SpinnerIcon } from "@/modules/icons/status";

const LogoutPage = () => {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/login");
    }, 1500);
  }, [router]);
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ ease: "easeInOut", duration: 1 }}
      aria-hidden="true"
      className="flex flex-col items-center justify-center min-h-dvh gap-2"
    >
      <span>
        <SpinnerIcon
          className="size-8 text-base-color-m dark:text-base-color-dark-m"
          aria-hidden="true"
        />
      </span>
      <h1 className="text-2xl font-semibold text-center text-base-color dark:text-base-color-dark">
        Cerrando sesión
      </h1>
    </motion.div>
  );
};

export default LogoutPage;
