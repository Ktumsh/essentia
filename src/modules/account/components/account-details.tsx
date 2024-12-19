"use client";

import { Calendar } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProfileData } from "@/types/session";
import { formatDate } from "@/utils/format";

import ChangePasswordModal from "./change-password-modal";
import DeleteAccountModal from "./delete-account-modal";

interface AccountDetailsProps {
  user: UserProfileData | null;
}

const AccountDetails = ({ user }: AccountDetailsProps) => {
  const [isOpenChange, setIsOpenChange] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  if (!user) {
    return null;
  }

  const { id, email, firstName, lastName, username, createdAt } = user;

  return (
    <>
      <div className="mb-5 flex w-full flex-col gap-4">
        <Card className="text-main dark:text-white">
          <CardHeader>
            <CardTitle className="text-base">
              Información de tu Cuenta
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <div className="grid-cols grid flex-1 gap-4 md:grid-cols-4">
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Nombre
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {firstName} {lastName}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Correo electrónico
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">{email}</div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Nombre de usuario
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {username}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-m dark:text-main-dark-m">
                    <span>
                      <Calendar
                        strokeWidth={1.5}
                        className="size-3 text-main-m dark:text-main-dark-m"
                      />
                    </span>
                    <span>Fecha de creación</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {formatDate(createdAt, "dd 'de' MMMM, yyyy")}
                  </div>
                </span>
              </div>
            </div>
          </CardContent>
          <CardFooter isSecondary>
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              <Button
                radius="lg"
                variant="outline"
                onClick={() => setIsOpenChange(true)}
              >
                Cambiar contraseña
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Card className="border-red-200 text-main dark:border-red-900 dark:text-white">
          <CardHeader>
            <CardTitle className="mb-2 text-base">Elimina tu Cuenta</CardTitle>
            <CardDescription className="space-y-1">
              <p>
                Elimina permanentemente tu cuenta y todo su contenido de
                Essentia.
              </p>
              <p>
                Esta acción no es reversible, por lo que debes proceder con
                precaución.
              </p>
            </CardDescription>
          </CardHeader>
          <CardFooter
            isSecondary
            className="!border-t-red-200 !bg-red-50 dark:!border-t-red-900 dark:!bg-red-950"
          >
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              <Button
                radius="lg"
                variant="outline"
                onClick={() => setIsOpenDelete(true)}
                className="border-none !bg-red-500 text-white"
              >
                Eliminar cuenta
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ChangePasswordModal isOpen={isOpenChange} setIsOpen={setIsOpenChange} />
      <DeleteAccountModal
        userId={id}
        email={email}
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
      />
    </>
  );
};

export default AccountDetails;
