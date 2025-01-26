import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import React from "react";

import { Button } from "@/components/ui/button";
import {
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";

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
            <DrawerDescription className="mt-4 px-4">
              Hemos enviado un código de verificación a{" "}
              <span className="font-semibold text-blue-600!">{email}</span> para
              que puedas cambiar tu correo. Introdúcelo a continuación.
            </DrawerDescription>
          </DrawerHeader>
        </>
      ) : (
        <>
          <DialogHeader isSecondary>
            <DialogTitle>Revisa tu bandeja de entrada</DialogTitle>
            <DialogDescription asChild>
              <p>
                Hemos enviado un código de verificación a{" "}
                <span className="font-semibold text-blue-600!">{email}</span>{" "}
                para que puedas cambiar tu correo. Introdúcelo a continuación.
              </p>
            </DialogDescription>
          </DialogHeader>
        </>
      )}

      <div className="inline-flex w-full flex-col items-center justify-center gap-2 p-6 md:flex-row">
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
