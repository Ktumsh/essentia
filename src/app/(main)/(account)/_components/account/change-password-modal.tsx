"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { KeyRound, Loader } from "lucide-react";
import { useState, useCallback, useTransition } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

import { changePassword } from "@/app/(main)/(account)/actions";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button, ButtonPassword } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  ChangePasswordFormData,
  changePasswordSchema,
} from "@/lib/form-schemas";
import { getMessageFromCode, ResultCode } from "@/utils/errors";

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

  const { handleSubmit, control } = form;

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
        <form className="w-full md:space-y-4">
          <div className="w-full space-y-6 px-4 py-6 md:p-6">
            <input type="text" hidden name="username" autoComplete="username" />
            <FormField
              control={control}
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
                      <ButtonPassword
                        isVisible={isVisibleCurrent}
                        setIsVisible={setIsVisibleCurrent}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
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
                      <ButtonPassword
                        isVisible={isVisibleNew}
                        setIsVisible={setIsVisibleNew}
                      />
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={control}
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
          </div>
        </form>
      </Form>
    );
  }, [form, isVisibleCurrent, isVisibleNew, isVisibleConfirm, control]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={handleOpenChange}>
        <DrawerContent className="min-h-[60%]">
          <DrawerHeader>
            <DrawerTitle>Cambiar contraseña</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription
            asChild
            className="mt-4 space-y-1.5 px-4 text-center text-sm"
          >
            <div>
              <p>Introduce tu contraseña actual y tu contraseña nueva.</p>
              <p>Asegúrate de usar una contraseña segura.</p>
            </div>
          </DrawerDescription>
          <Content />
          <DrawerFooter>
            <Button
              type="button"
              variant="mobile-danger"
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {isPending ? (
                <Loader className="animate-spin" />
              ) : (
                <>
                  Cambiar contraseña
                  <KeyRound />
                </>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={handleOpenChange}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary>
            <BadgeAlert variant="info" />
            <DialogTitle>Cambiar contraseña</DialogTitle>
            <DialogDescription asChild className="space-y-1.5">
              <div>
                <p>Introduce tu contraseña actual y tu contraseña nueva.</p>
                <p>Asegúrate de usar una contraseña segura.</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <Content />
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button
                type="button"
                variant="outline"
                radius="full"
                disabled={isPending}
              >
                Cancelar
              </Button>
            </DialogClose>
            <Button
              type="button"
              radius="full"
              disabled={isPending}
              onClick={handleSubmit(onSubmit)}
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  Cambiar contraseña
                  <KeyRound />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default ChangePasswordModal;
