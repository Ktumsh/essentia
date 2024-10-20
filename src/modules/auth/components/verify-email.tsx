"use client";

import { resendEmailVerification } from "@/db/email-querys";
import { SpinnerIcon } from "@/modules/icons/common";
import { BackIcon } from "@/modules/icons/navigation";
import { Button } from "@nextui-org/react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";

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
    } catch (error) {
      toast.error("Ocurrió un error. Inténtelo nuevamente.");
    } finally {
      setIsSending(false);
    }
  };

  return (
    <main className="relative size-full">
      <div className="flex items-center justify-center w-full min-h-dvh sm:min-h-dvh">
        <div className="max-w-2xl">
          <div className="flex relative justify-center items-center md:p-8 px-6 mb-9 rounded-xl bg-transparent md:bg-white md:dark:bg-base-full-dark text-base-color dark:text-base-color-dark">
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
              <div className="max-w-lg space-y-4 text-center text-base-color-h dark:text-base-color-dark-h">
                <p>
                  Hemos enviado un correo de verificación a {email} para que
                  puedas activar tu cuenta.
                </p>
                <p className="text-sm">
                  ¿Aún no lo recibes? Mira en tu carpeta de correo no deseado o
                  puedes reenviarlo.
                </p>
              </div>
              <div className="flex flex-col items-center w-full space-y-4">
                <Button
                  radius="sm"
                  variant="light"
                  fullWidth
                  onPress={handleResendEmail}
                  startContent={
                    isSending ? (
                      <SpinnerIcon className="size-4 animate-spin" />
                    ) : null
                  }
                  className="md:border border-bittersweet-400 dark:border-cerise-red-600 bg-bittersweet-400 dark:bg-cerise-red-600 md:bg-transparent dark:md:bg-transparent data-[hover=true]:bg-bittersweet-400 data-[hover=true]:dark:bg-cerise-red-600 data-[hover=true]:text-white"
                >
                  {!isSending ? "Reenviar correo" : "Reenviando..."}
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
      </div>
    </main>
  );
};

export default VerifyEmail;
