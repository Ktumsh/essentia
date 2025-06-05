"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect, useTransition, useCallback } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "sonner";

import { authenticate } from "@/app/(auth)/login/actions";
import { MailIcon } from "@/components/icons/miscellaneus";
import { ButtonPassword } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { getUserProfileByEmail } from "@/db/querys/profile-querys";
import { LoginFormData, loginSchema } from "@/lib/form-schemas";
import { getWelcomeLabel } from "@/utils";
import { resultMessages } from "@/utils/errors";

import { AuthRedirectMessage } from "../_components/auth-redirect-message";
import { SubmitButton } from "../_components/submit-button";

const LoginForm = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const redirectUrl = searchParams.get("next") || "/";

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
      setTimeout(() => {
        window.location.href = redirectUrl;
      }, 500);
    },
    [redirectUrl],
  );

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    startTransition(async () => {
      try {
        const result = await authenticate(data);

        if (result?.type === "success") {
          handleSuccess(data);
        } else if (result?.type === "error") {
          const code = result.resultCode;
          const message = resultMessages[code];

          toast.error(message);

          if (code === "EMAIL_NOT_VERIFIED" && result.redirectUrl) {
            router.push(result.redirectUrl);
          }
        }
      } catch {
        toast.error(resultMessages["VALIDATION_ERROR"]);
      }
    });
  };

  return (
    <Card className="shadow-pretty bg-background/80 w-full border backdrop-blur-md md:min-w-[500px]">
      <CardHeader className="p-6 md:p-8">
        <CardTitle className="font-merriweather text-xl">Bienvenid@,</CardTitle>
        <CardDescription className="text-muted-foreground">
          <p>Ingresa tus credenciales para acceder a tu cuenta de Essentia.</p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-6 pt-0! md:p-8">
        <Form {...form}>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex size-full flex-col items-start justify-center space-y-5 select-none"
          >
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
            <div className="text-foreground/80 mx-0 flex w-full justify-between text-sm">
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
                        className="border-alternative shadow-none"
                      />
                    </FormControl>
                    <FormLabel htmlFor="remember" className="mt-0! text-sm">
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
            <SubmitButton isPending={isPending}>Iniciar sesión</SubmitButton>
          </form>
        </Form>
        <AuthRedirectMessage />
      </CardContent>
    </Card>
  );
};

export default LoginForm;
