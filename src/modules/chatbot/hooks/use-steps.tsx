import { useState } from "react";

export const useSteps = (initialStep: number = 0) => {
  const [currentStep, setCurrentStep] = useState(initialStep);

  const nextStep = () => setCurrentStep((prev) => prev + 1);
  const prevStep = () => setCurrentStep((prev) => prev - 1);

  return { currentStep, nextStep, prevStep };
};
