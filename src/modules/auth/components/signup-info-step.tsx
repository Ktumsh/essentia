"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import { useState, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

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
import { getUserByUsername } from "@/db/querys/user-querys";
import { getMessageFromCode, ResultCode } from "@/utils/code";

import { SubmitButton } from "./submit-button";
import { InfoFormData, infoSchema } from "../../core/lib/form-schemas";

interface SignupInfoStepProps {
  email: string;
  onBack: () => void;
  onSuccess: (infoData: Omit<InfoFormData, "email">) => void;
}

const SignupInfoStep = ({ email, onBack, onSuccess }: SignupInfoStepProps) => {
  const [isPending, startTransition] = useTransition();
  const [hasMissingFields, setHasMissingFields] = useState(false);

  const form = useForm<InfoFormData>({
    resolver: zodResolver(infoSchema),
    mode: "onSubmit",
    defaultValues: {
      email: email,
      username: "",
      firstName: "",
      lastName: "",
      birthdate: new Date(),
    },
  });

  const { handleSubmit, formState, setError } = form;

  const onError = (errors: FieldErrors<InfoFormData>) => {
    const hasRequiredErrors = Object.values(errors).some((error) => {
      const errorType = String(error?.type);
      return errorType && ["required"].includes(errorType);
    });

    if (hasRequiredErrors) {
      toast.error("Por favor, completa todos los campos");
      setHasMissingFields(true);
    } else {
      setHasMissingFields(false);
      toast.error("Por favor corrige los errores en el formulario.");
    }
  };

  const onSubmit = async (data: InfoFormData) => {
    setHasMissingFields(false);
    startTransition(async () => {
      try {
        const user = await getUserByUsername(data.username);
        if (user.length > 0) {
          setError("username", {
            type: "manual",
            message: getMessageFromCode(ResultCode.USERNAME_EXISTS),
          });
          toast.error("Por favor corrige los errores en el formulario.");
          return;
        }

        onSuccess({
          firstName: data.firstName,
          lastName: data.lastName,
          username: data.username,
          birthdate: data.birthdate,
        });
      } catch (error) {
        console.error("Error al verificar el username:", error);
        toast.error(
          "Error al verificar la disponibilidad del nombre de usuario.",
        );
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
          <ArrowLeft className="!size-5 text-main-h dark:text-main-dark" />
        </Button>
        <div className="w-full text-sm text-main-h dark:text-main-dark">
          <p>
            Parece que no tienes una cuenta. Vamos a crear una cuenta para{" "}
            <span className="font-bold text-blue-600 sm:font-medium">
              {email}
            </span>
          </p>
        </div>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit, onError)}
        className="flex flex-col items-start justify-center space-y-5"
      >
        <div className="flex w-full gap-5">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="firstName">Nombre</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="firstName"
                    name="firstName"
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
            name="lastName"
            render={({ field, fieldState }) => (
              <FormItem>
                <FormLabel htmlFor="lastName">Apellido</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="lastName"
                    name="lastName"
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

        <FormField
          control={form.control}
          name="birthdate"
          render={({ field, fieldState }) => (
            <FormItem>
              <FormLabel className="relative inline-flex items-center gap-2">
                Fecha de nacimiento
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

        <SubmitButton isPending={isPending}>Continuar</SubmitButton>

        <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-inherit">
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

export default SignupInfoStep;
