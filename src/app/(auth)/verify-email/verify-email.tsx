"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { verifyCode } from "@/app/(auth)/actions";
import { Button } from "@/components/kit/button";
import { Card, CardContent, CardTitle } from "@/components/kit/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/kit/input-otp";
import { resendEmailSendsCode } from "@/db/querys/email-querys";

interface VerifyEmailProps {
  email: string;
}

const VerifyEmail = ({ email }: VerifyEmailProps) => {
  const router = useRouter();

  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState<string>("");

  const handleResendEmail = async () => {
    setIsSending(true);
    try {
      const res = await resendEmailSendsCode(email, "email_verification");

      if (!res.status) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
    } catch {
      toast.error("Ocurrió un error. Inténtelo nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async (codeToVerify: string) => {
    setIsVerifying(true);
    try {
      const res = await verifyCode(codeToVerify, "email_verification");

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      toast.success(res.message);
      router.push("/login");
    } catch (error) {
      console.error("Error al verificar el código:", error);
      toast.error("Ocurrió un error. Inténtalo nuevamente.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleCodeChange = (value: string) => {
    setCode(value);

    if (value.length === 6) {
      handleVerifyCode(value);
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 px-4">
      <Card className="shadow-pretty bg-background/80 w-full border backdrop-blur-md md:w-[500px]">
        <CardContent className="p-6 md:p-8">
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
              ¡Confirma tu correo!
            </CardTitle>
            <p className="text-foreground/80 mb-5 w-full text-sm">
              Hemos enviado un código de verificación a{" "}
              <span className="text-secondary font-semibold">{email}</span> para
              que puedas activar tu cuenta. Introdúcelo a continuación.
            </p>
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
                onChange={handleCodeChange}
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
        </CardContent>
      </Card>
      <div className="inline-flex items-center gap-2">
        <Button
          disabled={isSending}
          variant="outline"
          onClick={handleResendEmail}
          className="border-none"
        >
          {isSending ? (
            <Loader className="size-4 animate-spin" />
          ) : (
            "Reenviar código"
          )}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
