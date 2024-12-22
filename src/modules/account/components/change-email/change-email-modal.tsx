"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { sendChangeEmail, verifyCode } from "@/app/(auth)/actions";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerFooter,
} from "@/components/ui/drawer";
import { resendEmailSendsCode } from "@/db/querys/email-querys";
import { getUserByEmail, updateUserEmail } from "@/db/querys/user-querys";
import { EmailFormData, emailSchema } from "@/modules/core/lib/form-schemas";

import StepEmail from "./step-email";
import StepVerifyCode from "./step-verify-code";

interface ChangeEmailModalProps {
  currentEmail: string;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChangeEmailModal = ({
  currentEmail,
  isOpen,
  setIsOpen,
}: ChangeEmailModalProps) => {
  const router = useRouter();

  const [isSending, setIsSending] = useState(false);
  const [isVerifying, setIsVerifying] = useState(false);
  const [step, setStep] = useState(1);
  const [code, setCode] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [userId, setUserId] = useState<string>("");
  const [isPending, startTransition] = useTransition();

  const isMobile = useIsMobile();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit } = form;

  const handleSendEmail = useCallback(
    async (data: EmailFormData) => {
      try {
        console.log("handleSendEmail | data.email:", data.email);

        startTransition(async () => {
          const [user] = await getUserByEmail(currentEmail);

          if (!user) {
            toast.error("No se encontró el usuario.");
            return;
          }

          if (user.email === data.email) {
            toast.error(
              "La nueva dirección de correo debe ser diferente a la actual.",
            );
            return;
          }

          setEmail(data.email);

          const res = await sendChangeEmail(currentEmail, data.email);

          if (res.status === "success") {
            setUserId(user.id);
            setStep(2);
          } else {
            toast.error(res.message);
          }
        });
      } catch (error) {
        console.error("Error al enviar el correo:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      }
    },
    [currentEmail],
  );

  const handleResendEmail = useCallback(async () => {
    setIsSending(true);
    try {
      const response = await resendEmailSendsCode(
        currentEmail,
        "email_change",
        email,
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
  }, [currentEmail, email]);

  const handleVerifyCode = useCallback(
    async (codeToVerify: string) => {
      setIsVerifying(true);
      try {
        const response = await verifyCode(codeToVerify, "email_change");

        if (response.success) {
          await updateUserEmail(userId, email);
          toast.success(response.message);
          setIsOpen(false);
          router.refresh();
        } else {
          toast.error(response.message);
        }
      } catch (error) {
        console.error("Error al verificar el código:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      } finally {
        setIsVerifying(false);
      }
    },
    [userId, email, setIsOpen, router],
  );

  const onCodeChange = (value: string) => {
    setCode(value);
  };

  const Content = useCallback(() => {
    return (
      <>
        {step === 1 ? (
          <StepEmail
            isMobile={isMobile}
            currentEmail={currentEmail}
            form={form}
          />
        ) : (
          <StepVerifyCode
            isMobile={isMobile}
            email={email}
            isVerifying={isVerifying}
            isSending={isSending}
            code={code}
            onCodeChange={onCodeChange}
            handleResendEmail={handleResendEmail}
          />
        )}
      </>
    );
  }, [
    step,
    isMobile,
    currentEmail,
    form,
    email,
    isVerifying,
    isSending,
    code,
    handleResendEmail,
  ]);

  const Footer = useCallback(() => {
    if (isMobile) {
      return (
        <DrawerFooter>
          {step === 1 ? (
            <DrawerClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DrawerClose>
          ) : (
            <Button
              variant="outline"
              disabled={isVerifying}
              onClick={() => setStep(1)}
            >
              Atrás
            </Button>
          )}
          <Button
            variant="destructive"
            disabled={
              isPending || isVerifying || (step === 2 && code.length < 6)
            }
            onClick={() => {
              if (step === 1) {
                handleSubmit(handleSendEmail)();
              } else {
                handleVerifyCode(code);
              }
            }}
          >
            {isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : step === 1 ? (
              "Continuar"
            ) : (
              "Verificar"
            )}
          </Button>
        </DrawerFooter>
      );
    } else {
      return (
        <DialogFooter isSecondary>
          {step === 1 ? (
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
          ) : (
            <Button
              variant="outline"
              disabled={isVerifying}
              onClick={() => setStep(1)}
            >
              Atrás
            </Button>
          )}
          <Button
            variant="destructive"
            disabled={
              isPending || isVerifying || (step === 2 && code.length < 6)
            }
            onClick={() => {
              if (step === 1) {
                handleSubmit(handleSendEmail)();
              } else {
                handleVerifyCode(code);
              }
            }}
          >
            {isPending ? (
              <Loader className="size-4 animate-spin" />
            ) : step === 1 ? (
              "Continuar"
            ) : (
              "Verificar"
            )}
          </Button>
        </DialogFooter>
      );
    }
  }, [
    step,
    isMobile,
    isPending,
    isVerifying,
    code,
    handleSubmit,
    handleSendEmail,
    handleVerifyCode,
  ]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent autoFocus={false}>
          <Content />
          <Footer />
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <Content />
          <Footer />
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChangeEmailModal;
