"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import Image from "next/image";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
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
  <>
    <CardHeader className="prose-sm w-full items-center space-y-0">
      <Image
        src="/extras/verify-email.webp"
        width={100}
        height={100}
        alt="Verificación de correo"
        aria-hidden="true"
        className="-mt-2 mb-0!"
      />
      <CardTitle className="mt-0! text-lg">Revisa tu correo</CardTitle>
      <CardDescription className="text-center">
        <p>
          Hemos enviado un código de verificación a{" "}
          <span className="font-semibold text-blue-500!">{email}</span> para que
          puedas recuperar tu contraseña. Introdúcelo a continuación.
        </p>
      </CardDescription>
    </CardHeader>
    <CardContent className="pb-10">
      {isVerifying ? (
        <div className="inline-flex h-12 w-full items-center justify-center gap-2">
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
    </CardContent>
  </>
);

export default StepVerifyCode;
