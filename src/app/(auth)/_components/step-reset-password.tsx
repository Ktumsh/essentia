"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button, ButtonPassword } from "@/components/kit/button";
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
import { NewPasswordFormData, newPasswordSchema } from "@/lib/form-schemas";

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
    <>
      <CardHeader className="p-8">
        <CardTitle className="text-lg">Actualiza tu nueva contraseña</CardTitle>
        <CardDescription>
          <p>
            Actualiza tu nueva contraseña ingresando la información requerida.
            Asegúrate de usar una contraseña segura.
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
            <Button
              type="submit"
              radius="full"
              variant="alternative"
              disabled={isPending}
              className="mt-8! h-10 w-full"
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                "Cambiar contraseña"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </>
  );
};

export default StepResetPassword;
