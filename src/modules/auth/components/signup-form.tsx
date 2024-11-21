"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import SignupFormStep1 from "./signup-form-step1";
import SignupFormStep2 from "./signup-form-step2";

const SignupForm = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleStep1Success = (email: string) => {
    setEmail(email);
    setStep(2);
  };

  const handleBack = () => {
    setStep(1);
  };

  return (
    <motion.div
      layout
      style={{ height: "auto" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="relative mb-9 flex items-center justify-center overflow-hidden rounded-xl bg-transparent px-6 text-left font-normal sm:w-[500px] sm:bg-white sm:dark:bg-full-dark md:p-8"
    >
      <AnimatePresence mode="popLayout">
        {step === 1 ? (
          <motion.div
            key="step1"
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="w-full"
          >
            <SignupFormStep1 onSuccess={handleStep1Success} />
          </motion.div>
        ) : (
          <motion.div
            key="step2"
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="w-full"
          >
            <SignupFormStep2 email={email} onBack={handleBack} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignupForm;
