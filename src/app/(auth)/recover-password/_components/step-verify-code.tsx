"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import Image from "next/image";

import { CardTitle } from "@/components/kit/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/kit/input-otp";

interface StepVerifyCodeProps {
  email: string;
  isVerifying: boolean;
  code: string;
  onCodeChange: (value: string) => void;
}

const StepVerifyCode = ({
  email,
  isVerifying,
  code,
  onCodeChange,
}: StepVerifyCodeProps) => (
  <div className="flex size-full flex-col items-center justify-center text-center select-none">
    <Image
      aria-hidden="true"
      src="/auth/email-badge.webp"
      width={56}
      height={60}
      alt="Verificación de correo"
      className="mb-6 w-14 object-cover"
    />
    <CardTitle className="font-merriweather mb-1.5 text-xl">
      Revisa tu correo
    </CardTitle>
    <p className="text-foreground/80 mb-5 w-full text-sm">
      Hemos enviado un código de verificación a{" "}
      <span className="font-semibold text-blue-500!">{email}</span> para que
      puedas recuperar tu contraseña. Introdúcelo a continuación.
    </p>
    {isVerifying ? (
      <div className="inline-flex h-12 w-full items-center justify-center gap-2 text-base">
        <span>Verificando</span>
        <Loader className="size-4 animate-spin" />
      </div>
    ) : (
      <InputOTP
        maxLength={6}
        pattern={REGEXP_ONLY_DIGITS}
        value={code}
        onChange={onCodeChange}
        containerClassName="justify-center"
      >
        <InputOTPGroup>
          {[...Array(6)].map((_, index) => (
            <InputOTPSlot
              key={index}
              className="bg-background size-12"
              index={index}
            />
          ))}
        </InputOTPGroup>
      </InputOTP>
    )}
  </div>
);

export default StepVerifyCode;
