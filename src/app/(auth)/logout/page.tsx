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
    }, 1000);
  }, [router]);
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
          className="size-8 text-main-m dark:text-main-dark-m"
          aria-hidden="true"
        />
      </span>
      <h1 className="text-center text-2xl font-semibold text-main dark:text-white">
        Cerrando sesión
      </h1>
    </motion.div>
  );
};

export default LogoutPage;
