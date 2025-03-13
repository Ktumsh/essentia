import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import React from "react";

import { Button } from "@/components/kit/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/kit/input-otp";

interface StepVerifyCodeProps {
  isMobile: boolean;
  email: string;
  isVerifying: boolean;
  isSending: boolean;
  code: string;
  onCodeChange: (value: string) => void;
  handleResendEmail: () => void;
}

const StepVerifyCode = ({
  isMobile,
  email,
  isVerifying,
  isSending,
  code,
  onCodeChange,
  handleResendEmail,
}: StepVerifyCodeProps) => {
  return (
    <>
      {isMobile ? (
        <>
          <DrawerHeader>
            <DrawerTitle>Revisa tu bandeja de entrada</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="mt-4 px-4 text-center text-xs">
            Hemos enviado un código de verificación a{" "}
            <span className="font-semibold text-blue-500!">{email}</span> para
            que puedas cambiar tu correo. Introdúcelo a continuación.
          </DrawerDescription>
          <div className="mx-4 mt-4">
            <div className="text-main-h dark:text-main-dark rounded-xl bg-amber-100 p-3 dark:bg-yellow-950">
              <p className="text-xs">
                ¿No lo has recibido el correo electrónico? Asegúrate de
                comprobar la carpeta de spam.
              </p>
            </div>
          </div>
        </>
      ) : (
        <>
          <DialogHeader isSecondary>
            <DialogTitle>Revisa tu bandeja de entrada</DialogTitle>
            <DialogDescription asChild>
              <p>
                Hemos enviado un código de verificación a{" "}
                <span className="font-semibold text-blue-500!">{email}</span>{" "}
                para que puedas cambiar tu correo. Introdúcelo a continuación.
              </p>
            </DialogDescription>
          </DialogHeader>
        </>
      )}

      <div className="inline-flex w-full flex-col items-center justify-center gap-2 px-4 py-6 md:flex-row md:p-6">
        {isVerifying ? (
          <div className="inline-flex h-[88px] w-full items-center justify-center gap-2 md:h-12">
            <span>Verificando</span>
            <Loader className="size-4 animate-spin" />
          </div>
        ) : (
          <>
            <InputOTP
              maxLength={6}
              pattern={REGEXP_ONLY_DIGITS}
              value={code}
              onChange={onCodeChange}
              containerClassName="justify-center"
              autoFocus
            >
              <InputOTPGroup>
                {[...Array(6)].map((_, index) => (
                  <InputOTPSlot key={index} className="size-12" index={index} />
                ))}
              </InputOTPGroup>
            </InputOTP>
            <Button
              variant="ghost"
              radius="full"
              size="sm"
              className="font-normal"
              onClick={handleResendEmail}
            >
              {isSending ? "Reenviando..." : "Reenviar código"}
            </Button>
          </>
        )}
      </div>
    </>
  );
};

export default StepVerifyCode;
