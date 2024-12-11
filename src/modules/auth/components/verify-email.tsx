"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
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
      <Card className="flex max-w-md flex-col items-center text-center dark:bg-dark/30">
        <CardHeader className="prose w-full items-center">
          <Image
            src="/extras/verify-email.webp"
            width={100}
            height={100}
            alt="Verificación de correo"
            aria-hidden="true"
            className="!mb-0 -mt-2"
          />
          <CardTitle className="dark:text-white">
            ¡Confirma tu correo!
          </CardTitle>
        </CardHeader>
        <CardContent className="prose-sm text-main dark:text-main-dark">
          <p>
            Hemos enviado un correo de verificación a{" "}
            <span className="dark:text-white">{email}</span> para que puedas
            activar tu cuenta.
          </p>
          <p>
            ¿Aún no lo recibes? Mira en tu carpeta de correo no deseado o puedes
            reenviarlo.
          </p>
        </CardContent>
        <CardFooter isSecondary className="w-full">
          <Button variant="ghost" className="pl-2">
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
        </CardFooter>
      </Card>
    </div>
  );
};

export default VerifyEmail;
