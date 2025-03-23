"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { getUserByEmail } from "@/db/querys/user-querys";
import { emailSchema } from "@/lib/form-schemas";
import { getMessageFromCode, ResultCode } from "@/utils/errors";

import { SubmitButton } from "./submit-button";

interface SignupEmailStepProps {
  onSuccess: (email: string) => void;
}

const SignupEmailStep = ({ onSuccess }: SignupEmailStepProps) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    defaultValues: { email: "" },
  });

  const { handleSubmit } = form;

  const onSubmit = async (data: z.infer<typeof emailSchema>) => {
    startTransition(async () => {
      try {
        const existingUser = await getUserByEmail(data.email);
        if (existingUser.length > 0) {
          toast.error(getMessageFromCode(ResultCode.EMAIL_EXISTS));
        } else {
          onSuccess(data.email);
        }
      } catch {
        toast.error(getMessageFromCode(ResultCode.EMAIL_VERIFICATION_ERROR));
      }
    });
  };

  return (
    <Form {...form}>
      <div className="text-foreground/80 mb-5 w-full text-sm">
        <p>Continúa con tu correo para comenzar a crear tu cuenta.</p>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex flex-col items-start justify-center space-y-5"
      >
        <FormField
          control={form.control}
          name="email"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="email">Correo electrónico</FormLabel>
              <FormControl>
                <Input
                  {...field}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Ingresa tu correo electrónico"
                  isAuth
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}>Continuar</SubmitButton>
        <div className="mt-2 flex items-center justify-center self-center text-center text-[13px] text-inherit">
          <p>
            ¿Ya tienes una cuenta?{" "}
            <Link
              className="font-bold text-blue-500 sm:font-medium"
              href="/login"
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

export default SignupEmailStep;
