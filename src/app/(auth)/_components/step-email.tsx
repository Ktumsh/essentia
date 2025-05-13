"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import { MailIcon } from "@/components/icons/miscellaneus";
import { Button } from "@/components/kit/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { EmailFormData, emailSchema } from "@/lib/form-schemas";

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
    <>
      <CardHeader className="p-8">
        <CardTitle className="text-lg">Recuperar contraseña</CardTitle>
        <CardDescription>
          <p>
            A continuación introduce tu correo electrónico para recuperar tu
            contraseña.
          </p>
        </CardDescription>
      </CardHeader>
      <CardContent className="p-8 pt-0">
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
            <Button
              type="submit"
              radius="full"
              variant="alternative"
              disabled={isPending}
              className="mt-8! h-10 w-full"
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                "Continuar"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default StepEmail;
