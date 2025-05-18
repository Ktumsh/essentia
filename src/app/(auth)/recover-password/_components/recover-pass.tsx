"use client";

import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { onSendEmail, verifyCode } from "@/app/(auth)/actions";
import { Button } from "@/components/kit/button";
import { Card, CardContent } from "@/components/kit/card";
import { resendEmailSendsCode } from "@/db/querys/email-querys";
import {
  getUserByEmail,
  updateUserPassword,
  verifySamePassword,
} from "@/db/querys/user-querys";
import { EmailFormData, NewPasswordFormData } from "@/lib/form-schemas";

import StepEmail from "./step-email";
import StepResetPassword from "./step-reset-password";
import StepVerifyCode from "./step-verify-code";
import { AuthRedirectMessage } from "../../_components/auth-redirect-message";
import StepContainer from "../../signup/_components/step-container";

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
        const res = await onSendEmail("password_recovery", {
          email: data.email,
        });

        if (!res.status) {
          toast.error(res.message);
          return;
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
      const res = await resendEmailSendsCode(email, "password_recovery");

      if (!res.status) {
        toast.error(res?.message);
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
      const res = await verifyCode(codeToVerify, "password_recovery");

      if (!res.success) {
        toast.error(res.message);
        return;
      }

      setStep(3);
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
        const [user] = await getUserByEmail(email);

        if (!user) {
          toast.error("No se pudo cambiar tu contraseña.");
          return;
        }

        const userId = user?.id;

        const isSamePassword = await verifySamePassword(
          userId,
          data.newPassword,
        );
        if (isSamePassword) {
          toast.error(
            "Haz utilizado esta contraseña anteriormente. Intenta una diferente.",
          );
          return;
        }

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
    <div className="flex flex-col items-center gap-6 px-4">
      <Card className="shadow-pretty bg-background/80 w-full border backdrop-blur-md md:w-[500px]">
        <CardContent className="p-6 md:p-8">
          <StepContainer step={step} current={1}>
            <StepEmail onSubmit={handleSendEmail} isPending={isPending} />
          </StepContainer>
          <StepContainer step={step} current={2}>
            <StepVerifyCode
              email={email}
              isVerifying={isVerifying}
              code={code}
              onCodeChange={onCodeChange}
            />
          </StepContainer>
          <StepContainer step={step} current={3}>
            <StepResetPassword
              onSubmit={handleResetPassword}
              isPending={isPending}
            />
          </StepContainer>
          {step === 1 && <AuthRedirectMessage />}
        </CardContent>
      </Card>
      <div className="inline-flex items-center gap-2">
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
