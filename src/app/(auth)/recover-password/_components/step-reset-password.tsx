"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { ButtonPassword } from "@/components/ui/button";
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
import { NewPasswordFormData, newPasswordSchema } from "@/lib/form-schemas";

import { SubmitButton } from "../../_components/submit-button";

interface StepResetPasswordProps {
  onSubmit: (data: NewPasswordFormData) => void;
  isPending: boolean;
}

const StepResetPassword = ({ onSubmit, isPending }: StepResetPasswordProps) => {
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const form = useForm({
    resolver: zodResolver(newPasswordSchema),
    defaultValues: { newPassword: "", confirmPassword: "" },
  });

  const { handleSubmit } = form;

  return (
    <Form {...form}>
      <CardTitle className="font-merriweather mb-1.5 text-xl">
        Actualiza tu nueva contraseña
      </CardTitle>
      <p className="text-foreground/80 mb-5 w-full text-sm">
        Actualiza tu nueva contraseña ingresando la información requerida.
        Asegúrate de usar una contraseña segura.
      </p>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="flex size-full flex-col items-start justify-center space-y-5 select-none"
      >
        <FormField
          control={form.control}
          name="newPassword"
          render={({ field, fieldState, formState }) => (
            <FormItem>
              <FormLabel htmlFor="newPassword">Nueva contraseña</FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="newPassword"
                    type={isVisibleNew ? "text" : "password"}
                    autoComplete="new-password"
                    isAuth
                    isPassword
                    {...field}
                  />
                  <ButtonPassword
                    isVisible={isVisibleNew}
                    setIsVisible={setIsVisibleNew}
                  />
                </div>
              </FormControl>
              {(fieldState.isTouched || formState.isSubmitted) && (
                <FormMessage />
              )}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              <FormLabel htmlFor="confirmPassword">
                Confirmar nueva contraseña
              </FormLabel>
              <FormControl>
                <div className="relative">
                  <Input
                    id="confirmPassword"
                    type={isVisibleConfirm ? "text" : "password"}
                    autoComplete="new-password"
                    isAuth
                    isPassword
                    {...field}
                  />
                  <ButtonPassword
                    isVisible={isVisibleConfirm}
                    setIsVisible={setIsVisibleConfirm}
                  />
                </div>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <SubmitButton isPending={isPending}>Cambiar contraseña</SubmitButton>
      </form>
    </Form>
  );
};

export default StepResetPassword;
