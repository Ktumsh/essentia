"use client";

import { motion } from "framer-motion";

import SignupForm from "./signup-form";

const SignupWrapper = () => {
  return (
    <div className="relative size-full">
      <div className="z-40 w-100 min-h-dvh sm:min-h-dvh">
        <div className="flex justify-center items-center w-full min-h-dvh sm:min-h-[calc(100dvh-72px)]">
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="z-10 flex flex-col size-full sm:w-auto"
          >
            <SignupForm />
          </motion.div>
        </div>
      </div>
    </div>
  );
};

export default SignupWrapper;
