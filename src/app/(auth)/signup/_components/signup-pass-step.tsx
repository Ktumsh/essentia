"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signup } from "@/app/(auth)/signup/actions";
import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import { ButtonPassword } from "@/components/kit/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { PasswordFormData, passwordSchema } from "@/lib/form-schemas";
import { getMessageFromCode, ResultCode } from "@/utils/errors";

import { AuthRedirectMessage } from "../../_components/auth-redirect-message";
import { SubmitButton } from "../../_components/submit-button";

interface SignupPassStepProps {
  email: string;
  userInfo: {
    firstName: string;
    lastName: string;
    username: string;
    birthdate: Date;
  };
  onBack: () => void;
}

const SignupPassStep = ({ email, userInfo, onBack }: SignupPassStepProps) => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isVisibleConfirmPassword, setIsVisibleConfirmPassword] =
    useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<PasswordFormData>({
    resolver: zodResolver(passwordSchema),
    mode: "onSubmit",
    defaultValues: {
      password: "",
      confirmPassword: "",
    },
  });

  const { handleSubmit, setError, formState } = form;

  const onSubmit = async (data: PasswordFormData) => {
    startTransition(async () => {
      try {
        const dataToSend = {
          ...userInfo,
          email,
          password: data.password,
        };

        const result = await signup(dataToSend);
        if (result) {
          if (result.type === "error" && result.errors) {
            const serverErrors = result.errors as
              | Record<string, string>
              | undefined;
            if (serverErrors) {
              Object.entries(serverErrors).forEach(([field, message]) => {
                setError(field as keyof PasswordFormData, {
                  type: "manual",
                  message,
                });
              });
            }
          } else if (result.type === "error") {
            toast.error(getMessageFromCode(result.resultCode));
          } else if (result.type === "success" && result.redirectUrl) {
            toast.success(getMessageFromCode(result.resultCode));
            router.push(result.redirectUrl);
          }
        }
      } catch {
        toast.error(getMessageFromCode(ResultCode.ACCOUNT_CREATED_ERROR));
      }
    });
  };

  return (
    <Form {...form}>
      <div className="mb-5 flex gap-2">
        <ArrowLeftButton
          size="icon"
          variant="ghost"
          onClick={onBack}
          className="-ms-2"
        >
          <span className="sr-only">Volver atrás</span>
        </ArrowLeftButton>
        <div className="text-foreground/80 w-full text-sm">
          <p>
            Elige una contraseña segura para tu cuenta{" "}
            <span className="text-secondary font-medium">{email}</span>
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-center space-y-5"
      >
        <input
          type="text"
          name="email"
          value={email}
          aria-hidden="true"
          readOnly
          autoComplete="username"
          hidden
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="password">Contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="password"
                    type={isVisiblePassword ? "text" : "password"}
                    {...field}
                    placeholder="Ingresa tu contraseña"
                    autoComplete="new-password"
                    isAuth
                  />
                  <ButtonPassword
                    isVisible={isVisiblePassword}
                    setIsVisible={setIsVisiblePassword}
                  />
                </div>
              </FormControl>
              {(fieldState.isTouched || formState.isSubmitted) && (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">
                Confirmar contraseña
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isVisibleConfirmPassword ? "text" : "password"}
                    {...field}
                    placeholder="Confirma tu contraseña"
                    autoComplete="new-password"
                    isAuth
                  />
                  <ButtonPassword
                    isVisible={isVisibleConfirmPassword}
                    setIsVisible={setIsVisibleConfirmPassword}
                  />
                </div>
              </FormControl>
              {(fieldState.isTouched || formState.isSubmitted) && (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
        <div className="text-foreground/80-h relative mb-6 flex w-full text-[13px] leading-snug select-text">
          <p className="text-center md:text-start">
            Al continuar, estás aceptando los{" "}
            <Link
              href="/terminos"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-medium underline-offset-2 hover:underline"
            >
              Términos de servicio{" "}
            </Link>
            y la{" "}
            <Link
              href="/privacidad"
              target="_blank"
              rel="noopener noreferrer"
              className="text-secondary font-medium underline-offset-2 hover:underline"
            >
              Política de privacidad
            </Link>
          </p>
        </div>
        <SubmitButton isPending={isPending}>Crear cuenta</SubmitButton>
        <AuthRedirectMessage />
      </form>
    </Form>
  );
};

export default SignupPassStep;
