"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { MailIcon } from "@/modules/icons/miscellaneus";

import { EmailFormData, emailSchema } from "../../../core/lib/form-schemas";

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
        <CardTitle className="text-lg dark:text-white">
          Recuperar contraseña
        </CardTitle>
        <CardDescription className="text-main dark:text-main-dark">
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
            className="flex size-full select-none flex-col items-start justify-center space-y-5"
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
                        required
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
            <Button
              type="submit"
              radius="full"
              variant="alternative"
              disabled={isPending}
              className="!mt-8 h-10 w-full"
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
