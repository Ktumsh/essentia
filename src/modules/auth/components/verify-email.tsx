"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { resendEmailVerification } from "@/db/querys/email-querys";
import { BackIcon } from "@/modules/icons/navigation";

interface VerifyEmailProps {
  email: string;
  userId: string;
}

const VerifyEmail = ({ email, userId }: VerifyEmailProps) => {
  const router = useRouter();
  const [isSending, setIsSending] = useState(false);

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
                Hemos enviado un correo de verificación a{" "}
                <span className="font-semibold !text-blue-600">{email}</span>{" "}
                para que puedas activar tu cuenta.
              </p>
              <p>
                ¿Aún no lo recibes? Mira en tu carpeta de correo no deseado o
                puedes reenviarlo.
              </p>
            </CardDescription>
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
          {!isSending && "Reenviar correo"}
        </Button>
      </div>
    </div>
  );
};

export default VerifyEmail;
