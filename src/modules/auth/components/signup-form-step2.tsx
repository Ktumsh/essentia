"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

import { signup } from "@/app/(auth)/signup/actions";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BetterTooltip } from "@/components/ui/tooltip";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { ArrowRightV2Icon } from "@/modules/icons/navigation";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { ResultCode, getMessageFromCode } from "@/utils/code";

import { SubmitButton } from "./submit-button";
import { RegisterFormData, registerSchema } from "../lib/form";

interface Step2Props {
  email: string;
  onBack: () => void;
}

const SignupFormStep2: React.FC<Step2Props> = ({ email, onBack }) => {
  const router = useRouter();
  const [isVisiblePassword, setIsVisiblePassword] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [hasMissingFields, setHasMissingFields] = useState(false);

  const form = useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    mode: "onSubmit",
    defaultValues: {
      email: email,
      password: "",
      username: "",
      name: "",
      lastname: "",
      birthdate: new Date(),
    },
  });

  const { handleSubmit, formState, setError } = form;

  const onError = (errors: FieldErrors<RegisterFormData>) => {
    const hasRequiredErrors = Object.values(errors).some((error) => {
      const errorType = String(error.type);
      return error.type && ["required", "too_small"].includes(errorType);
    });

    if (hasRequiredErrors) {
      toast.error("Por favor, completa todos los campos");
      setHasMissingFields(true);
    } else {
      setHasMissingFields(false);
    }
  };

  const onSubmit = async (data: RegisterFormData) => {
    setHasMissingFields(false);
    startTransition(async () => {
      try {
        const formData = new FormData();
        formData.append("email", data.email);
        formData.append("password", data.password);
        formData.append("username", data.username);
        formData.append("name", data.name);
        formData.append("lastname", data.lastname);
        formData.append("birthdate", data.birthdate.toISOString());

        const result = await signup(undefined, formData);
        if (result) {
          if (result.type === "error" && result.errors) {
            const serverErrors = result.errors as
              | Record<string, string>
              | undefined;
            if (serverErrors) {
              Object.entries(serverErrors).forEach(([field, message]) => {
                setError(field as keyof RegisterFormData, {
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
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-start justify-center space-y-4"
      >
        <div className="flex gap-5">
          <Button
            size="icon"
            radius="lg"
            onClick={onBack}
            className="bg-transparent px-2 shadow-none dark:bg-transparent sm:bg-gray-100 sm:dark:bg-dark"
          >
            <ArrowRightV2Icon className="!size-6 rotate-180 text-main-h dark:text-main-dark-h" />
          </Button>
          <div className="w-full text-sm text-main-h dark:text-main-dark-h">
            <p>
              Parece que no tienes una cuenta. Vamos a crear una nueva cuenta
              para{" "}
              <span className="font-bold text-orient-700 sm:font-medium">
                {email}
              </span>
            </p>
          </div>
        </div>

        {/* Nombre y Apellido */}
        <div className="flex w-full gap-5">
          <FormField
            control={form.control}
            name="name"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="name">Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="name"
                    name="name"
                    type="text"
                    placeholder="Ingresa tu nombre"
                    isAuth
                  />
                </FormControl>
                {!hasMissingFields &&
                  (fieldState.isTouched || formState.isSubmitted) && (
                    <FormMessage />
                  )}
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastname"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="lastname">Apellido</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="lastname"
                    name="lastname"
                    type="text"
                    placeholder="Ingresa tu apellido"
                    isAuth
                  />
                </FormControl>
                {!hasMissingFields &&
                  (fieldState.isTouched || formState.isSubmitted) && (
                    <FormMessage />
                  )}
              </FormItem>
            )}
          />
        </div>

        {/* Nombre de Usuario */}
        <FormField
          control={form.control}
          name="username"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel htmlFor="username">Nombre de usuario</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="username"
                  name="username"
                  type="text"
                  placeholder="Ingresa tu nombre de usuario"
                  autoComplete="off"
                  isAuth
                />
              </FormControl>
              {!hasMissingFields &&
                (fieldState.isTouched || formState.isSubmitted) && (
                  <FormMessage />
                )}
            </FormItem>
          )}
        />

        {/* Fecha de Nacimiento con Popover de Ayuda */}
        <FormField
          control={form.control}
          name="birthdate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="relative inline-flex items-center gap-2 text-xs">
                Fecha de nacimiento
                <Popover>
                  <PopoverTrigger asChild>
                    <div>
                      <BetterTooltip content="Haz click para obtener más información">
                        <button
                          aria-label="Ayuda"
                          type="button"
                          className="flex size-3 items-center justify-center rounded-full bg-bittersweet-300 dark:bg-cerise-red-600"
                        >
                          <QuestionIcon className="size-2 text-white" />
                        </button>
                      </BetterTooltip>
                    </div>
                  </PopoverTrigger>
                  <PopoverContent align="end">
                    <div className="text-xs font-bold">
                      Cuando proporcionas tu fecha de nacimiento,
                    </div>
                    <p>
                      obtendrás una experiencia en Essentia adecuada para tu
                      edad. Si quieres cambiar quién ve tu fecha de nacimiento,
                      puedes ir a la configuración de tu perfil.
                    </p>
                  </PopoverContent>
                </Popover>
              </FormLabel>
              <FormControl>
                <DatePicker
                  startYear={1900}
                  endYear={getYear(new Date())}
                  selected={field.value}
                  onSelect={(date: Date) => {
                    field.onChange(date);
                  }}
                  className="border-none bg-white shadow-none dark:bg-full-dark md:bg-gray-100 dark:md:bg-dark/50"
                />
              </FormControl>
              {!hasMissingFields &&
                (fieldState.isTouched || formState.isSubmitted) && (
                  <FormMessage />
                )}
            </FormItem>
          )}
        />

        {/* Contraseña con Toggle de Visibilidad */}
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
                    autoComplete="current-password"
                    isAuth
                  />
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsVisiblePassword(!isVisiblePassword)}
                    className="absolute right-0 top-0 h-full px-3 text-main-m hover:!bg-transparent dark:text-main-dark-m dark:hover:!bg-transparent"
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
              {!hasMissingFields &&
                (fieldState.isTouched || formState.isSubmitted) && (
                  <FormMessage />
                )}
            </FormItem>
          )}
        />

        {/* Términos y Condiciones */}
        <div className="relative mb-6 flex w-full select-text text-[13px] leading-snug text-main-h dark:text-main-dark-h">
          <p className="text-center md:text-start">
            Al registrarte, estás aceptando los{" "}
            <Link
              href="#"
              className="font-bold text-orient-700 underline-offset-2 hover:underline sm:font-medium"
              aria-label="Términos y condiciones de uso"
            >
              Términos y condiciones de uso{" "}
            </Link>
            y la{" "}
            <Link
              href="#"
              className="font-bold text-orient-700 underline-offset-2 hover:underline sm:font-medium"
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
              className="font-bold text-orient-700 underline-offset-2 hover:underline sm:font-medium"
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

export default SignupFormStep2;
