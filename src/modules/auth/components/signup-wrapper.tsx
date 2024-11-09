"use client";

import { motion } from "framer-motion";

import SignupForm from "./signup-form";

const SignupWrapper = () => {
  return (
    <div className="relative size-full">
      <div className="w-100 z-40 min-h-dvh sm:min-h-dvh">
        <div className="flex min-h-dvh w-full items-center justify-center sm:min-h-[calc(100dvh-72px)]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="z-10 flex size-full flex-col sm:w-auto"
          >
            <SignupForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupWrapper;
