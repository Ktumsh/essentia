"use client";

import LoginForm from "./login-form";
import { motion } from "framer-motion";

const LoginWrapper = () => {
  return (
    <main className="relative size-full">
      <div className="z-40 w-full min-h-dvh sm:min-h-dvh">
        <div className="flex justify-center items-center w-full min-h-dvh sm:min-h-[calc(100dvh-72px)]">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="z-20 flex flex-col size-full sm:w-auto"
          >
            <LoginForm />
          </motion.div>
        </div>
      </div>
    </main>
  );
};

export default LoginWrapper;
