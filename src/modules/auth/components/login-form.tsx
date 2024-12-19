"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { authenticate } from "@/app/(auth)/login/actions";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getProfileNameByEmail } from "@/db/querys/profile-querys";
import { MailIcon } from "@/modules/icons/miscellaneus";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { getMessageFromCode, ResultCode } from "@/utils/code";

import { SubmitButton } from "./submit-button";
import { LoginFormData, loginSchema } from "../lib/form";

const LoginForm: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("redirect") || "/";

  const [isVisible, setIsVisible] = useState(false);
  const [isPending, startTransition] = useTransition();

  const form = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: "",
      password: "",
      remember: false,
    },
  });

  const { handleSubmit, setValue } = form;

  useEffect(() => {
    const savedEmail = localStorage.getItem("rememberedEmail");
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("remember", true);
    }
  }, [setValue]);

  const handleSuccess = useCallback(
    async (data: LoginFormData) => {
      if (data.remember) {
        localStorage.setItem("rememberedEmail", data.email);
      } else {
        localStorage.removeItem("rememberedEmail");
      }

      const [userName] = await getProfileNameByEmail(data.email);
      if (userName) {
        toast.success(`¡Bienvenid@, ${userName.firstName}!`);
      } else {
        toast.success(`¡Bienvenid@!`);
      }
      router.replace(redirectUrl);
    },
    [router, redirectUrl],
  );

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);

        const result = await authenticate(undefined, formData);

        if (result?.type === "success") {
          handleSuccess(data);
        } else if (result?.type === "error") {
          switch (result.resultCode) {
            case ResultCode.EMAIL_NOT_VERIFIED:
              toast.error(getMessageFromCode(result.resultCode));
              if (result.redirectUrl) {
                router.push(result.redirectUrl);
              }
              break;
            case ResultCode.INVALID_CREDENTIALS:
              toast.error(getMessageFromCode(result.resultCode));
              break;
            default:
              toast.error(getMessageFromCode(result.resultCode));
              break;
          }
        }
      } catch {
        toast.error(getMessageFromCode(ResultCode.VALIDATION_ERROR));
      }
    });
  };

  return (
    <div className="relative flex size-full flex-col items-center justify-center overflow-hidden rounded-xl bg-transparent px-6 text-left font-normal sm:min-w-[500px] sm:bg-white sm:dark:bg-full-dark md:p-8">
      <div className="mb-5 flex w-full flex-col">
        <h2 className="font-sans text-xl font-extrabold text-main dark:text-white sm:text-2xl">
          Bienvenid@,
        </h2>
        <div className="w-full text-sm text-main-h dark:text-main-dark">
          <p>Ingresa tus credenciales para acceder a tu cuenta de Essentia.</p>
        </div>
      </div>
      <Form {...form}>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="mb-4 flex size-full select-none flex-col items-start justify-center space-y-5"
        >
          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="email">Correo electrónico</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="email"
                      type="email"
                      placeholder="Ingresa tu correo electrónico"
                      autoComplete="email"
                      required
                      autoFocus
                      isAuth
                    />
                    <div className="absolute right-0 top-0 inline-flex h-full items-center justify-center px-3 text-main-m dark:text-main-dark-m">
                      <MailIcon className="size-5" />
                    </div>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Password */}
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="password">Contraseña</FormLabel>
                <FormControl>
                  <div className="relative">
                    <Input
                      {...field}
                      id="password"
                      type={isVisible ? "text" : "password"}
                      placeholder="Ingresa tu contraseña"
                      autoComplete="current-password"
                      required
                      isAuth
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      onClick={() => setIsVisible(!isVisible)}
                      className="absolute right-0 top-0 h-full px-3 text-main-m hover:!bg-transparent dark:text-main-dark-m dark:hover:!bg-transparent"
                    >
                      {isVisible ? (
                        <EyeOffIcon className="!size-5" />
                      ) : (
                        <EyeIcon className="!size-5" />
                      )}
                      <span className="sr-only">
                        {isVisible
                          ? "Ocultar contraseña"
                          : "Mostrar contraseña"}
                      </span>
                    </Button>
                  </div>
                </FormControl>
              </FormItem>
            )}
          />

          {/* Remember Me y Forgot Password */}
          <div className="mx-0 flex w-full justify-between text-xs text-main-h dark:text-main-dark-h">
            <FormField
              control={form.control}
              name="remember"
              render={({ field }) => (
                <FormItem className="inline-flex w-auto flex-row items-center gap-2">
                  <FormControl>
                    <Checkbox
                      id="remember"
                      checked={field.value}
                      onCheckedChange={(checked: boolean) =>
                        field.onChange(checked)
                      }
                      className="shadow-none"
                    />
                  </FormControl>
                  <FormLabel htmlFor="remember" className="!mt-0">
                    Recordarme
                  </FormLabel>
                </FormItem>
              )}
            />
            <Link
              href="#"
              className="underline-offset-2 hover:underline"
              aria-label="¿Olvidaste tu contraseña?"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>

          {/* Submit Button */}
          <SubmitButton isPending={isPending}>Iniciar sesión</SubmitButton>
        </form>
      </Form>

      {/* Link a Registro */}
      <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-main-h dark:text-main-dark-h">
        <p>
          ¿No tienes una cuenta?{" "}
          <Link
            id="register-base-color"
            className="register-base-color font-bold text-blue-600 sm:font-medium"
            href="/signup"
            aria-label="Regístrate"
          >
            Regístrate
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginForm;
