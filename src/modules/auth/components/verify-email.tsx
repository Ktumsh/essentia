"use client";

import { REGEXP_ONLY_DIGITS } from "input-otp";
import { ArrowLeft, Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { verifyCode } from "@/app/(auth)/actions";
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
    <div className="text-main dark:text-main-dark mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 p-6">
      <div className="w-full max-w-md">
        <Card className="border-none dark:text-white">
          <CardHeader className="prose prose-sm w-full items-center space-y-0">
            <Image
              src="/extras/verify-email.webp"
              width={100}
              height={100}
              alt="Verificación de correo"
              aria-hidden="true"
              className="-mt-2 mb-0!"
            />
            <CardTitle className="mt-0! text-lg dark:text-white">
              ¡Confirma tu correo!
            </CardTitle>
            <CardDescription className="text-main dark:text-main-dark text-center">
              <p>
                Hemos enviado un código de verificación a{" "}
                <span className="font-semibold text-blue-600!">{email}</span>{" "}
                para que puedas activar tu cuenta. Introdúcelo a continuación.
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
        </Card>
      </div>

      <div className="inline-flex items-center gap-2">
        <Button
          variant="ghost"
          onClick={() => router.push("/login")}
          className="pl-2 hover:bg-transparent!"
        >
          <ArrowLeft className="size-3.5" />
          Volver
        </Button>
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
