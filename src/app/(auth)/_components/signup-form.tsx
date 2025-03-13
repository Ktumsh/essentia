"use client";

import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";

import SignupEmailStep from "./signup-email-step";
import SignupInfoStep from "./signup-info-step";
import SignupPassStep from "./signup-pass-step";

const SignupForm = () => {
  const [step, setStep] = useState(1);

  const [email, setEmail] = useState("");
  const [userInfo, setUserInfo] = useState<{
    firstName: string;
    lastName: string;
    username: string;
    birthdate: Date;
  } | null>(null);

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
    setStep((prev) => Math.max(1, prev - 1));
  };

  const contentVariants = {
    initial: { opacity: 0, x: 10 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -10 },
  };

  return (
    <motion.div
      layout
      transition={{ layout: { type: "spring", bounce: 0.2, duration: 0.4 } }}
      className="sm:bg-background relative mb-9 flex items-center justify-center overflow-hidden rounded-xl bg-transparent px-6 text-left font-normal sm:w-[500px] md:p-8"
    >
      <AnimatePresence mode="popLayout">
        {step === 1 && (
          <motion.div
            key={1}
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{ type: "spring", duration: 0.3 }}
            className="w-full"
          >
            <SignupEmailStep onSuccess={handleStep1Success} />
          </motion.div>
        )}
        {step === 2 && (
          <motion.div
            key={2}
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{ type: "spring", duration: 0.3 }}
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
            key={3}
            layout
            initial="initial"
            animate="animate"
            exit="exit"
            variants={contentVariants}
            transition={{ type: "spring", duration: 0.3 }}
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
