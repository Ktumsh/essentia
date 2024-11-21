"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useTransition, useCallback } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

import { changePassword } from "@/app/(main)/account/actions";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { SpinnerIcon } from "@/modules/icons/common";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";

const formSchema = z
  .object({
    currentPassword: z
      .string()
      .min(6, { message: "Este campo es obligatorio." }),
    newPassword: z
      .string()
      .min(8, { message: "Debe tener al menos 8 caracteres." })
      .regex(/[a-z]/, { message: "Debe incluir al menos una letra minúscula." })
      .regex(/[A-Z]/, { message: "Debe incluir al menos una letra mayúscula." })
      .regex(/\d/, { message: "Debe incluir al menos un número." })
      .regex(/[\W_]/, {
        message: "Debe incluir al menos un carácter especial.",
      }),
    confirmPassword: z
      .string()
      .min(6, { message: "Este campo es obligatorio." }),
  })
  .superRefine(({ confirmPassword, newPassword }, ctx) => {
    if (confirmPassword !== newPassword) {
      ctx.addIssue({
        code: "custom",
        message: "Las contraseñas no coinciden.",
        path: ["confirmPassword"],
      });
    }
  });

interface ChangePasswordModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const ChangePasswordModal = ({
  isOpen,
  setIsOpen,
}: ChangePasswordModalProps) => {
  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const [isPending, startTransition] = useTransition();

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const handleOpenChange = useCallback(
    (newIsOpen: boolean) => {
      if (!newIsOpen) {
        form.reset();
        setIsVisibleCurrent(false);
        setIsVisibleNew(false);
        setIsVisibleConfirm(false);
      }
      setIsOpen(newIsOpen);
    },
    [setIsOpen, form],
  );

  const onSubmit = (values: z.infer<typeof formSchema>) => {
    startTransition(async () => {
      try {
        const response = await changePassword(values);

        if (response.success) {
          toast.success("Contraseña cambiada exitosamente.");
          handleOpenChange(false);
        } else {
          toast.error(response.message || "Error al cambiar la contraseña.");
        }
      } catch {
        toast.error("Error inesperado al cambiar la contraseña.");
      }
    });
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleOpenChange}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Cambiar contraseña</DialogTitle>
          <DialogDescription className="sr-only">
            Cambiar contraseña
          </DialogDescription>
        </DialogHeader>
        <Form {...form}>
          <form
            onSubmit={form.handleSubmit(onSubmit)}
            className="w-full space-y-8 p-6 md:p-0 md:pt-6"
          >
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Contraseña actual</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisibleCurrent ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisibleCurrent(!isVisibleCurrent)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {isVisibleCurrent ? <EyeOffIcon /> : <EyeIcon />}
                        <span className="sr-only">
                          {isVisibleCurrent
                            ? "Ocultar contraseña"
                            : "Mostrar contraseña"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="newPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisibleNew ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisibleNew(!isVisibleNew)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {isVisibleNew ? <EyeOffIcon /> : <EyeIcon />}
                        <span className="sr-only">
                          {isVisibleNew ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="confirmPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Confirmar nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        type={isVisibleConfirm ? "text" : "password"}
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      >
                        {isVisibleConfirm ? <EyeOffIcon /> : <EyeIcon />}
                        <span className="sr-only">
                          {isVisibleConfirm ? "Hide password" : "Show password"}
                        </span>
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <DialogFooter>
              <Button
                type="button"
                variant="ghost"
                onClick={() => handleOpenChange(false)}
                disabled={isPending}
              >
                Cancelar
              </Button>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending ? (
                  <SpinnerIcon className="animate-spin" />
                ) : (
                  "Guardar"
                )}
              </Button>
            </DialogFooter>
          </form>
        </Form>
      </DialogContent>
    </Dialog>
  );
};

export default ChangePasswordModal;
