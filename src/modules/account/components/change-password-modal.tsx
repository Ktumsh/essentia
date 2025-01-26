"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { changePassword } from "@/app/(main)/(account)/actions";
import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
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
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/modules/core/lib/form-schemas";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { getMessageFromCode, ResultCode } from "@/utils/code";

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

  const isMobile = useIsMobile();

  const form = useForm({
    resolver: zodResolver(changePasswordSchema),
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

  const onSubmit = useCallback(
    async (values: ChangePasswordFormData) => {
      startTransition(() => {
        toast.promise(changePassword(values), {
          loading: "Cambiando contraseña...",
          success: async (response) => {
            if (response.success) {
              handleOpenChange(false);
              return getMessageFromCode(response.message);
            } else {
              throw new Error(response.message);
            }
          },
          error: (error) => {
            if (error instanceof Error && error.message) {
              return getMessageFromCode(error.message as ResultCode);
            }
            return "Error inesperado al cambiar la contraseña.";
          },
        });
      });
    },
    [handleOpenChange, startTransition],
  );

  const Content = useCallback(() => {
    return (
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full md:space-y-4"
        >
          <div className="w-full space-y-6 p-6">
            <FormField
              control={form.control}
              name="currentPassword"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="currentPassword">
                    Contraseña actual
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={isVisibleCurrent ? "text" : "password"}
                        autoComplete="current-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisibleCurrent(!isVisibleCurrent)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:!bg-transparent dark:hover:!bg-transparent"
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
                  <FormLabel htmlFor="newPassword">Nueva contraseña</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="newPassword"
                        type={isVisibleNew ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisibleNew(!isVisibleNew)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:!bg-transparent dark:hover:!bg-transparent"
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
                  <FormLabel htmlFor="confirmPassword">
                    Confirmar nueva contraseña
                  </FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Input
                        id="confirmPassword"
                        type={isVisibleConfirm ? "text" : "password"}
                        autoComplete="new-password"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        onClick={() => setIsVisibleConfirm(!isVisibleConfirm)}
                        className="absolute right-0 top-0 h-full px-3 py-2 hover:!bg-transparent dark:hover:!bg-transparent"
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
          </div>
          {isMobile ? (
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              </DrawerClose>
              <Button type="submit" variant="destructive" disabled={isPending}>
                Guardar
              </Button>
            </DrawerFooter>
          ) : (
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button type="button" variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              </DialogClose>
              <Button type="submit" variant="destructive" disabled={isPending}>
                Guardar
              </Button>
            </DialogFooter>
          )}
        </form>
      </Form>
    );
  }, [
    form,
    isPending,
    isVisibleCurrent,
    isVisibleNew,
    isVisibleConfirm,
    onSubmit,
    isMobile,
  ]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Cambiar contraseña</DrawerTitle>
            <DrawerDescription className="mt-4 px-4">
              Actualiza tu contraseña ingresando la información requerida.
              Asegúrate de usar una contraseña segura.
            </DrawerDescription>
          </DrawerHeader>
          <Content />
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary>
            <DialogTitle>Cambiar contraseña</DialogTitle>
            <DialogDescription>
              Actualiza tu contraseña ingresando la información requerida.
              Asegúrate de usar una contraseña segura.
            </DialogDescription>
          </DialogHeader>
          <Content />
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChangePasswordModal;
