"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { authenticate } from "@/app/(auth)/login/actions";
import { ButtonPassword } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { Checkbox } from "@/components/kit/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { MailIcon } from "@/components/ui/icons/miscellaneus";
import { getUserProfileByEmail } from "@/db/querys/profile-querys";
import { LoginFormData, loginSchema } from "@/lib/form-schemas";
import { getWelcomeLabel } from "@/lib/utils";
import { getMessageFromCode, ResultCode } from "@/utils/errors";

import { SubmitButton } from "./submit-button";

const LoginForm = () => {
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

  const STORAGE_KEY = "remembered-email";

  useEffect(() => {
    const savedEmail = localStorage.getItem(STORAGE_KEY);
    if (savedEmail) {
      setValue("email", savedEmail);
      setValue("remember", true);
    }
  }, [setValue]);

  const handleSuccess = useCallback(
    async (data: LoginFormData) => {
      if (data.remember) {
        localStorage.setItem(STORAGE_KEY, data.email);
      } else {
        localStorage.removeItem(STORAGE_KEY);
      }

      const [user] = await getUserProfileByEmail(data.email);

      const welcome = getWelcomeLabel(user.profile.genre);

      const firstName = user.profile.firstName;

      if (user) {
        toast.success(`${welcome}, ${firstName}!`);
      } else {
        toast.success("¡Bienvenid@!");
      }
      router.replace(redirectUrl);
    },
    [router, redirectUrl],
  );

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    startTransition(async () => {
      try {
        const result = await authenticate(data);

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
    <Card className="md:bg-background w-full rounded-xl border-none bg-transparent md:min-w-[500px]">
      <CardHeader className="p-8">
        <CardTitle className="font-merriweather text-xl dark:text-white">
          Bienvenid@,
        </CardTitle>
        <CardDescription className="text-muted-foreground">
          <p>Ingresa tus credenciales para acceder a tu cuenta de Essentia.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex size-full flex-col items-start justify-center space-y-5 select-none"
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
                        autoFocus
                        isAuth
                      />
                      <div className="text-muted-foreground absolute top-0 right-0 inline-flex h-full items-center justify-center px-3">
                        <MailIcon className="size-5" />
                      </div>
                    </div>
                  </FormControl>
                  <FormMessage />
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
                        isAuth
                      />
                      <ButtonPassword
                        isVisible={isVisible}
                        setIsVisible={setIsVisible}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Remember Me y Forgot Password */}
            <div className="text-main-h dark:text-main-dark-h mx-0 flex w-full justify-between text-xs">
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
                    <FormLabel htmlFor="remember" className="mt-0!">
                      Recordarme
                    </FormLabel>
                  </FormItem>
                )}
              />
              <Link
                href="/recover-password"
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
        <div className="text-main-h dark:text-main-dark-h mt-5 flex items-center justify-center self-center text-center text-[13px]">
          <p>
            ¿No tienes una cuenta?{" "}
            <Link
              id="register-base-color"
              className="register-base-color font-bold text-blue-500 sm:font-medium"
              href="/signup"
              aria-label="Regístrate"
            >
              Regístrate
            </Link>
          </p>
        </div>
      </CardContent>
    </Card>
  );
};

export default LoginForm;
