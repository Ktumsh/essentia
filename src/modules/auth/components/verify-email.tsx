"use client";

import { Loader } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
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
    <div className="flex min-h-dvh w-full items-center justify-center sm:min-h-dvh">
      <div className="relative mb-9 flex max-w-md items-center justify-center rounded-xl border-transparent bg-transparent px-6 text-main dark:border-dark dark:text-main-dark md:border md:bg-white md:p-8 md:dark:bg-full-dark">
        <div className="flex flex-col items-center space-y-8">
          <div className="flex flex-col items-center">
            <Image
              quality={100}
              src="/extras/verify-email.webp"
              width={150}
              height={150}
              alt="Verificación de correo"
              aria-hidden="true"
              className="-mt-5"
            />
            <h1 className="text-2xl font-semibold">¡Confirma tu correo!</h1>
          </div>
          <div className="space-y-4 text-center text-sm text-main-h dark:text-main-dark-h">
            <p>
              Hemos enviado un correo de verificación a {email} para que puedas
              activar tu cuenta.
            </p>
            <p>
              ¿Aún no lo recibes? Mira en tu carpeta de correo no deseado o
              puedes reenviarlo.
            </p>
          </div>
          <div className="flex w-full flex-col items-center space-y-4">
            <Button
              disabled={isSending}
              variant="destructive"
              fullWidth
              onClick={handleResendEmail}
            >
              {isSending ? <Loader className="size-4 animate-spin" /> : null}
              Reenviar correo
            </Button>
            <div className="inline-flex items-center gap-2 text-orient-700">
              <BackIcon className="size-3.5" />
              <Link
                id="login-base-color"
                href="/login"
                aria-label="Inicia sesión"
                className="text-xs font-bold sm:font-medium"
              >
                Volver al inicio de sesión
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyEmail;
