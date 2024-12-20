"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { sendRecoveryEmail, verifyCode } from "@/app/(auth)/actions";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { resendEmailVerification } from "@/db/querys/email-querys";
import { getUserByEmail, updateUserPassword } from "@/db/querys/user-querys";
import { BackIcon } from "@/modules/icons/navigation";

import StepEmail from "./step-email";
import StepResetPassword from "./step-reset-password";
import StepVerifyCode from "./step-verify-code";
import { EmailFormData, NewPasswordFormData } from "../../lib/form";

const RecoverPass = () => {
  const router = useRouter();

  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const handleSendEmail: SubmitHandler<EmailFormData> = async (data) => {
    try {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("email", data.email);

        const res = await sendRecoveryEmail(data.email);

        if (res.status === "success") {
          setEmail(data.email);
          setStep(2);
        } else {
          toast.error(res.message);
        }

        setEmail(data.email);
        setStep(2);
      });
    } catch {
      toast.error("Ocurrió un error. Inténtelo nuevamente.");
    }
  };

  const handleResendEmail = async () => {
    setIsSending(true);
    try {
      const response = await resendEmailVerification(
        email,
        "password_recovery",
      );

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
      const response = await verifyCode(codeToVerify, "password_recovery");

      if (response.success) {
        setStep(3);
      } else {
        toast.error(response.message);
      }
    } catch (error) {
      console.error("Error al verificar el código:", error);
      toast.error("Ocurrió un error. Inténtalo nuevamente.");
    } finally {
      setIsVerifying(false);
    }
  };

  const handleResetPassword: SubmitHandler<NewPasswordFormData> = async (
    data,
  ) => {
    try {
      startTransition(async () => {
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", data.newPassword);
        formData.append("password_confirmation", data.confirmPassword);

        const [user] = await getUserByEmail(email);

        if (!user) {
          toast.error("No se pudo cambiar tu contraseña.");
          return;
        }

        const userId = user?.id;

        const res = await updateUserPassword(userId, data.newPassword);

        if (res) {
          toast.success("¡Tu contraseña ha sido cambiada exitosamente!");
          router.push("/login");
        } else {
          toast.error("No se pudo cambiar tu contraseña.");
        }
      });
    } catch {
      toast.error("Ocurrió un error. Inténtalo nuevamente.");
    }
  };

  const onCodeChange = (value: string) => {
    setCode(value);

    if (value.length === 6) {
      handleVerifyCode(value);
    }
  };

  return (
    <div className="mx-auto flex min-h-screen flex-col items-center justify-center space-y-6 text-main dark:text-main-dark">
      <Card className="w-full min-w-full max-w-[500px] rounded-xl border-none bg-transparent dark:bg-transparent md:bg-white md:dark:bg-full-dark">
        {step === 1 && (
          <StepEmail onSubmit={handleSendEmail} isPending={isPending} />
        )}
        {step === 2 && (
          <StepVerifyCode
            email={email}
            onVerifyCode={handleVerifyCode}
            isVerifying={isVerifying}
            code={code}
            onCodeChange={onCodeChange}
          />
        )}
        {step === 3 && (
          <StepResetPassword
            onSubmit={handleResetPassword}
            isPending={isPending}
          />
        )}
      </Card>

      <div className="inline-flex items-center gap-2">
        {step === 1 && (
          <Button
            variant="ghost"
            className="pl-2 hover:!bg-transparent"
            onClick={() => router.back()}
          >
            <BackIcon className="size-3.5" />
            Volver
          </Button>
        )}
        {step === 2 && (
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
        )}
      </div>
    </div>
  );
};

export default RecoverPass;
