"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

import { MailIcon } from "@/components/icons/miscellaneus";
import { CardTitle } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { EmailFormData, emailSchema } from "@/lib/form-schemas";

import SubmitButton from "../../_components/submit-button";

interface StepEmailProps {
  onSubmit: (data: EmailFormData) => void;
  isPending: boolean;
}

const StepEmail = ({ onSubmit, isPending }: StepEmailProps) => {
  const form = useForm<EmailFormData>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <CardTitle className="font-merriweather mb-1.5 text-xl">
        Recuperar contraseña
      </CardTitle>
      <p className="text-foreground/80 mb-5 w-full text-sm">
        A continuación introduce tu correo electrónico para recuperar tu
        contraseña.
      </p>
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
        <SubmitButton isPending={isPending}>Continuar</SubmitButton>
      </form>
    </Form>
  );
};

export default StepEmail;
