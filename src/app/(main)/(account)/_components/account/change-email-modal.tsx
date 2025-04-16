"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft, Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { onSendEmail, verifyCode } from "@/app/(auth)/actions";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
} from "@/components/kit/dialog";
import { Drawer, DrawerContent, DrawerFooter } from "@/components/kit/drawer";
import { updateCustomerEmail } from "@/components/ui/payment/actions";
import { resendEmailSendsCode } from "@/db/querys/email-querys";
import { getUserByEmail, updateUserEmail } from "@/db/querys/user-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import useSubscription from "@/hooks/use-subscription";
import { EmailFormData, emailSchema } from "@/lib/form-schemas";

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

  const { subscription } = useSubscription();

  const isMobile = useIsMobile();

  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit } = form;

  const handleSendEmail = useCallback(
    async (data: EmailFormData) => {
      try {
        startTransition(async () => {
          const [user] = await getUserByEmail(currentEmail);

          if (!user) {
            toast.error("El correo actual no existe.");
            return;
          }

          if (user.email === data.email) {
            toast.error("El correo nuevo no puede ser igual al actual.");
            return;
          }

          const [existingUser] = await getUserByEmail(data.email);

          if (existingUser) {
            toast.error("Este correo ya está en uso. Inténtalo con otro");
            return;
          }

          setEmail(data.email);

          const res = await onSendEmail("email_change", {
            currentEmail,
            newEmail: data.email,
          });

          if (!res.status) {
            toast.error(res.message);
            return;
          }

          setUserId(user.id);
          setStep(2);
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
      const res = await resendEmailSendsCode(
        currentEmail,
        "email_change",
        email,
      );

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
  }, [currentEmail, email]);

  const handleVerifyCode = useCallback(
    async (codeToVerify: string) => {
      setIsVerifying(true);
      try {
        const res = await verifyCode(codeToVerify, "email_change");

        if (!res.success) {
          toast.error(res.message);
          return;
        }

        await updateUserEmail(userId, email);

        await updateCustomerEmail(subscription!.clientId, email);

        toast.success(res.message);
        setIsOpen(false);
        router.refresh();
      } catch (error) {
        console.error("Error al verificar el código:", error);
        toast.error("Ocurrió un error. Inténtalo nuevamente.");
      } finally {
        setIsVerifying(false);
      }
    },
    [userId, email, subscription, setIsOpen, router],
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
          {step !== 1 && (
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button
                variant="mobile"
                disabled={isVerifying}
                onClick={() => setStep(1)}
                className="justify-center"
              >
                <ArrowLeft />
                Atrás
              </Button>
            </div>
          )}
          <Button
            variant="mobile-primary"
            className="justify-center"
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
              <>Continuar</>
            ) : (
              <>Verificar</>
            )}
          </Button>
        </DrawerFooter>
      );
    } else {
      return (
        <DialogFooter isSecondary>
          {step === 1 ? (
            <DialogClose asChild>
              <Button variant="outline" radius="full" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
          ) : (
            <Button
              variant="outline"
              radius="full"
              disabled={isVerifying}
              onClick={() => {
                setStep(1);
                setCode("");
              }}
            >
              Atrás
            </Button>
          )}
          <Button
            radius="full"
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
        <DrawerContent autoFocus={false} className="min-h-[60%]">
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
