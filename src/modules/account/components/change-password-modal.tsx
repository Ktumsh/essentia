"use client";

import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Button,
  Input,
} from "@nextui-org/react";
import { useState, useEffect, useTransition, useCallback } from "react";
import { toast } from "sonner";
import { z } from "zod";

import { changePasswordAction } from "@/app/(main)/account/actions";
import { SpinnerIcon } from "@/modules/icons/common";
import { EyeIcon, EyeOffIcon } from "@/modules/icons/status";
import { getMessageFromCode, ResultCode } from "@/utils/code";

interface ChangePasswordModalProps {
  isOpen: boolean;
  onOpenChange: () => void;
}

const ChangePasswordModal = ({
  isOpen,
  onOpenChange,
}: ChangePasswordModalProps) => {
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [isVisibleCurrent, setIsVisibleCurrent] = useState(false);
  const [isVisibleNew, setIsVisibleNew] = useState(false);
  const [isVisibleConfirm, setIsVisibleConfirm] = useState(false);

  const [isPending, startTransition] = useTransition();
  const [result, setResult] = useState<{
    type: "success" | "error";
    resultCode: ResultCode;
    errors?: z.ZodIssue[];
  } | null>(null);

  const [fieldErrors, setFieldErrors] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    setFieldErrors({
      currentPassword: "",
      newPassword: "",
      confirmPassword: "",
    });

    startTransition(async () => {
      try {
        const response = await changePasswordAction({
          currentPassword,
          newPassword,
          confirmPassword,
        });

        if (response.success) {
          setResult({
            type: "success",
            resultCode: response.message as ResultCode,
          });
        } else if (response.errors) {
          const errors = response.errors;
          const newFieldErrors = {
            currentPassword: "",
            newPassword: "",
            confirmPassword: "",
          };

          errors.forEach((error) => {
            const field = error.path[0] as keyof typeof newFieldErrors;
            const message = error.message;
            if (field in newFieldErrors) {
              newFieldErrors[field] = message;
            }
          });

          setFieldErrors(newFieldErrors);
          setResult({
            type: "error",
            resultCode: response.message as ResultCode,
          });
        } else {
          setResult({
            type: "error",
            resultCode: response.message as ResultCode,
          });
        }
      } catch (error) {
        console.error("Error al cambiar la contraseña:", error);
        setResult({
          type: "error",
          resultCode: ResultCode.UNKNOWN_ERROR,
        });
      }
    });
  };

  const handleOpenChange = useCallback(
    (newIsOpen: boolean) => {
      if (!newIsOpen) {
        setFieldErrors({
          currentPassword: "",
          newPassword: "",
          confirmPassword: "",
        });
        setCurrentPassword("");
        setNewPassword("");
        setConfirmPassword("");
        setResult(null);
        setIsVisibleCurrent(false);
        setIsVisibleNew(false);
        setIsVisibleConfirm(false);
      }
      onOpenChange();
    },
    [onOpenChange]
  );

  useEffect(() => {
    if (result) {
      if (result.type === "error") {
        if (
          result.resultCode === ResultCode.VALIDATION_ERROR &&
          result.errors
        ) {
        } else {
          toast.error(getMessageFromCode(result.resultCode));
        }
      } else {
        toast.success(getMessageFromCode(result.resultCode));
        handleOpenChange(false);
      }
    }
  }, [handleOpenChange, result]);

  const toggleVisibilityCurrent = () => setIsVisibleCurrent(!isVisibleCurrent);
  const toggleVisibilityNew = () => setIsVisibleNew(!isVisibleNew);
  const toggleVisibilityConfirm = () => setIsVisibleConfirm(!isVisibleConfirm);

  return (
    <Modal
      placement="center"
      scrollBehavior="inside"
      size="md"
      isOpen={isOpen}
      onOpenChange={handleOpenChange}
      radius="sm"
      classNames={{
        backdrop: "z-[101] bg-black/80",
        wrapper: "z-[102]",
        base: "bg-white dark:bg-full-dark",
        body: "gap-0 px-0 py-0 pb-4 custom-scroll v2",
        closeButton:
          "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
      }}
    >
      <ModalContent className="text-main-m dark:text-main-dark-m">
        <>
          <ModalHeader>Cambiar contraseña</ModalHeader>
          <form onSubmit={handleSubmit}>
            <ModalBody>
              <Input
                label="Contraseña actual"
                type={isVisibleCurrent ? "text" : "password"}
                value={currentPassword}
                isRequired
                variant="bordered"
                color="danger"
                radius="sm"
                errorMessage={fieldErrors.currentPassword}
                isInvalid={!!fieldErrors.currentPassword}
                onValueChange={(value) => {
                  setCurrentPassword(value);
                  setFieldErrors((prev) => ({ ...prev, currentPassword: "" }));
                }}
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibilityCurrent}
                    aria-label="Alternar visibilidad de la contraseña actual"
                  >
                    {isVisibleCurrent ? (
                      <EyeOffIcon className="size-6" />
                    ) : (
                      <EyeIcon className="size-6" />
                    )}
                  </button>
                }
                classNames={{
                  base: "px-4 py-3",
                  input: "text-main dark:text-main-dark",
                  inputWrapper:
                    "border-gray-200 data-[hover=true]:border-gray-200 dark:border-dark dark:data-[hover=true]:border-dark",
                }}
              />
              <Input
                label="Nueva contraseña"
                type={isVisibleNew ? "text" : "password"}
                value={newPassword}
                isRequired
                variant="bordered"
                color="danger"
                radius="sm"
                errorMessage={fieldErrors.newPassword}
                isInvalid={!!fieldErrors.newPassword}
                onValueChange={(value) => {
                  setNewPassword(value);
                  setFieldErrors((prev) => ({ ...prev, newPassword: "" }));
                }}
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibilityNew}
                    aria-label="Alternar visibilidad de la nueva contraseña"
                  >
                    {isVisibleNew ? (
                      <EyeOffIcon className="size-6" />
                    ) : (
                      <EyeIcon className="size-6" />
                    )}
                  </button>
                }
                classNames={{
                  base: "px-4 py-3",
                  input: "text-main dark:text-main-dark",
                  inputWrapper:
                    "border-gray-200 data-[hover=true]:border-gray-200 dark:border-dark dark:data-[hover=true]:border-dark",
                }}
              />
              <Input
                label="Confirmar nueva contraseña"
                type={isVisibleConfirm ? "text" : "password"}
                value={confirmPassword}
                isRequired
                variant="bordered"
                color="danger"
                radius="sm"
                errorMessage={fieldErrors.confirmPassword}
                isInvalid={!!fieldErrors.confirmPassword}
                endContent={
                  <button
                    type="button"
                    onClick={toggleVisibilityConfirm}
                    aria-label="Alternar visibilidad de la confirmación de la nueva contraseña"
                  >
                    {isVisibleConfirm ? (
                      <EyeOffIcon className="size-6" />
                    ) : (
                      <EyeIcon className="size-6" />
                    )}
                  </button>
                }
                onValueChange={(value) => {
                  setConfirmPassword(value);
                  setFieldErrors((prev) => ({ ...prev, confirmPassword: "" }));
                }}
                classNames={{
                  base: "px-4 py-3",
                  input: "text-main dark:text-main-dark",
                  inputWrapper:
                    "border-gray-200 data-[hover=true]:border-gray-200 dark:border-dark dark:data-[hover=true]:border-dark",
                }}
              />
            </ModalBody>
            <ModalFooter>
              <Button
                variant="bordered"
                disabled={isPending}
                onPress={() => handleOpenChange(false)}
                className="rounded-md border border-gray-200 dark:border-dark data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-dark"
              >
                Cancelar
              </Button>
              <Button
                type="submit"
                color="danger"
                isDisabled={isPending}
                startContent={
                  isPending ? (
                    <SpinnerIcon className="size-4 animate-spin" />
                  ) : null
                }
                className="rounded-md"
              >
                {isPending ? "Guardando..." : "Guardar"}
              </Button>
            </ModalFooter>
          </form>
        </>
      </ModalContent>
    </Modal>
  );
};

export default ChangePasswordModal;
