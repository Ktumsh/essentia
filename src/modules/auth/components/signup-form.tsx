"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

import SignupEmailStep from "./signup-email-step";
import SignupInfoStep from "./signup-info-step";
import SignupPassStep from "./signup-pass-step";

const SignupForm = () => {
  const [step, setStep] = useState(1);

  // Datos acumulados a través de los pasos
  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    birthdate: Date;
  } | null>(null);

  const variants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const handleStep1Success = (emailValue: string) => {
    setEmail(emailValue);
    setStep(2);
  };

  const handleStep2Success = (infoData: {
    firstName: string;
    lastName: string;
    username: string;
    birthdate: Date;
  }) => {
    setUserInfo(infoData);
    setStep(3);
  };

  const handleBack = () => {
    if (step === 2) {
      setStep(1);
    } else if (step === 3) {
      setStep(2);
    }
  };

  return (
    <motion.div
      layout
      style={{ height: "auto" }}
      transition={{ ease: "easeInOut", duration: 0.5 }}
      className="relative mb-9 flex items-center justify-center overflow-hidden rounded-xl bg-transparent px-6 text-left font-normal sm:w-[500px] sm:bg-white sm:dark:bg-full-dark md:p-8"
    >
      <AnimatePresence mode="popLayout">
        {step === 1 && (
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
            <SignupEmailStep onSuccess={handleStep1Success} />
          </motion.div>
        )}
        {step === 2 && (
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
            <SignupInfoStep
              email={email}
              onBack={handleBack}
              onSuccess={handleStep2Success}
            />
          </motion.div>
        )}
        {step === 3 && userInfo && (
          <motion.div
            key="step3"
            layout
            initial="hidden"
            animate="visible"
            exit="exit"
            variants={variants}
            transition={{ ease: "easeInOut", duration: 0.5 }}
            className="w-full"
          >
            <SignupPassStep
              email={email}
              userInfo={userInfo}
              onBack={handleBack}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default SignupForm;
