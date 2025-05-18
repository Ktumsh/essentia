"use client";

import { useState } from "react";

import { Card, CardContent } from "@/components/kit/card";

import SignupEmailStep from "./signup-email-step";
import SignupInfoStep from "./signup-info-step";
import SignupPassStep from "./signup-pass-step";
import StepContainer from "./step-container";

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

  return (
    <Card className="shadow-pretty bg-background/80 w-full border backdrop-blur-md md:w-[500px]">
      <CardContent className="p-6 md:p-8">
        <StepContainer step={step} current={1}>
          <SignupEmailStep onSuccess={handleStep1Success} />
        </StepContainer>
        <StepContainer step={step} current={2}>
          <SignupInfoStep
            email={email}
            onBack={handleBack}
            onSuccess={handleStep2Success}
          />
        </StepContainer>
        {userInfo && (
          <StepContainer step={step} current={3}>
            <SignupPassStep
              email={email}
              userInfo={userInfo}
              onBack={handleBack}
            />
          </StepContainer>
        )}
      </CardContent>
    </Card>
  );
};

export default SignupForm;
