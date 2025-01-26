"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { signup } from "@/app/(auth)/signup/actions";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { ResultCode, getMessageFromCode } from "@/utils/code";

import { SubmitButton } from "./submit-button";
import { passwordSchema, PasswordFormData } from "../../core/lib/form-schemas";

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
        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", data.password);
        formData.append("username", userInfo.username);
        formData.append("firstName", userInfo.firstName);
        formData.append("lastName", userInfo.lastName);
        formData.append("birthdate", userInfo.birthdate.toISOString());

        const result = await signup(undefined, formData);
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
      <div className="mb-5 flex gap-5">
        <Button
          size="icon"
          radius="lg"
          onClick={onBack}
          className="bg-transparent px-2 shadow-none dark:bg-transparent sm:bg-gray-100 sm:dark:bg-dark"
        >
          <ArrowLeft className="size-5! text-main-h dark:text-main-dark" />
        </Button>
        <div className="w-full text-sm text-main-h dark:text-main-dark">
          <p>
            Elige una contraseña segura para tu cuenta{" "}
            <span className="font-bold text-blue-600 sm:font-medium">
              {email}
            </span>
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

        {/* Contraseña */}
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    className="absolute right-0 top-0 h-full px-3 text-main-m hover:bg-transparent! dark:text-main-dark-m dark:hover:bg-transparent!"
                  >
                    {isVisiblePassword ? (
                      <EyeOffIcon className="size-6" />
                    ) : (
                      <EyeIcon className="size-6" />
                    )}
                    <span className="sr-only">
                      {isVisiblePassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              {(fieldState.isTouched || formState.isSubmitted) && (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        {/* Confirmar Contraseña */}
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
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() =>
                      setIsVisibleConfirmPassword(!isVisibleConfirmPassword)
                    }
                    className="absolute right-0 top-0 h-full px-3 text-main-m hover:bg-transparent! dark:text-main-dark-m dark:hover:bg-transparent!"
                  >
                    {isVisibleConfirmPassword ? (
                      <EyeOffIcon className="size-6" />
                    ) : (
                      <EyeIcon className="size-6" />
                    )}
                    <span className="sr-only">
                      {isVisibleConfirmPassword
                        ? "Ocultar contraseña"
                        : "Mostrar contraseña"}
                    </span>
                  </Button>
                </div>
              </FormControl>
              {(fieldState.isTouched || formState.isSubmitted) && (
                <FormMessage />
              )}
            </FormItem>
          )}
        />

        {/* Términos y Condiciones */}
        <div className="relative mb-6 flex w-full select-text text-[13px] leading-snug text-main-h dark:text-main-dark-h">
          <p className="text-center md:text-start">
            Al continuar, estás aceptando los{" "}
            <Link
              href="#"
              className="font-bold text-blue-600 underline-offset-2 hover:underline sm:font-medium"
              aria-label="Términos y condiciones de uso"
            >
              Términos y condiciones de uso{" "}
            </Link>
            y la{" "}
            <Link
              href="#"
              className="font-bold text-blue-600 underline-offset-2 hover:underline sm:font-medium"
              aria-label="Política de privacidad"
            >
              Política de privacidad
            </Link>
          </p>
        </div>

        <SubmitButton isPending={isPending}>Crear cuenta</SubmitButton>

        <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-main-h dark:text-main-dark-h">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link
              href="/login"
              className="font-bold text-blue-600 underline-offset-2 hover:underline sm:font-medium"
              aria-label="Inicia sesión"
            >
              Inicia sesión
            </Link>
          </p>
        </div>
      </form>
    </Form>
  );
};

export default SignupPassStep;
