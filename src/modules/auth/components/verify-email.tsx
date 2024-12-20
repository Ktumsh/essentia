"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import {
  getVerificationCode,
  resendEmailVerification,
} from "@/db/querys/email-querys";
import { BackIcon } from "@/modules/icons/navigation";

interface VerifyEmailProps {
  email: string;
  userId: string;
}

const VerifyEmail = ({ email, userId }: VerifyEmailProps) => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [code, setCode] = useState<string>("");

  const handleResendEmail = async () => {
    setIsSending(true);
    try {
      const response = await resendEmailVerification(userId, email);

      if (response?.status === "success") {
        toast.success(response.message);
      } else {
        toast.error(response?.message);
      }
    } catch {
      toast.error("Ocurrió un error. Inténtelo nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  const handleVerifyCode = async (codeToVerify: string) => {
    setIsVerifying(true);
    try {
      const response = await getVerificationCode(codeToVerify);

      if (response.success) {
        toast.success("¡Tu correo se ha verificado!");
        router.push("/login");
      } else {
        toast.error(response.error || "Código incorrecto.");
      }
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
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6 text-main dark:text-main-dark">
      <div className="w-full max-w-md">
        <Card className="dark:bg-dark/30 dark:text-white">
          <CardHeader className="prose prose-sm w-full items-center space-y-0">
            <Image
              src="/extras/verify-email.webp"
              width={100}
              height={100}
              alt="Verificación de correo"
              aria-hidden="true"
              className="!mb-0 -mt-2"
            />
            <CardTitle className="!mt-0 text-lg dark:text-white">
              ¡Confirma tu correo!
            </CardTitle>
            <CardDescription className="text-center text-main dark:text-main-dark">
              <p>
                Hemos enviado un código de verificación a{" "}
                <span className="font-semibold !text-blue-600">{email}</span>{" "}
                para que puedas activar tu cuenta. Introdúcelo a continuación.
              </p>
            </CardDescription>
            <CardContent className="pt-3">
              {isVerifying ? (
                <div className="inline-flex h-12 items-center justify-center gap-2">
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
                        className="size-12"
                        index={index}
                      />
                    ))}
                  </InputOTPGroup>
                </InputOTP>
              )}
            </CardContent>
          </CardHeader>
        </Card>
      </div>

      <div className="inline-flex items-center gap-2">
        <Button
          variant="ghost"
          className="pl-2"
          onClick={() => router.push("/login")}
        >
          <BackIcon className="size-3.5" />
          Volver
        </Button>
        <Button
          disabled={isSending}
          variant="outline"
          onClick={handleResendEmail}
        >
          {isSending ? <Loader className="size-4 animate-spin" /> : null}
          {!isSending && "Reenviar código"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
