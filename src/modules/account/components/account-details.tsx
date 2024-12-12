"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { UserProfileData } from "@/types/session";
import { formatDate } from "@/utils/format";

import ChangePasswordModal from "./change-password-modal";

interface AccountDetailsProps {
  user: UserProfileData | null;
}

const AccountDetails = ({ user }: AccountDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!user) {
    return null;
  }

  const { email, firstName, lastName, username, createdAt } = user;

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
                  <div className="flex-1 text-xs font-normal text-main-m dark:text-main-dark-m">
                    Fecha de creación
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {formatDate(createdAt, "dd 'de' MMMM, yyyy")}
                  </div>
                </span>
              </div>
            </div>
          </CardContent>
        </Card>
        <Card className="text-main dark:text-white">
          <CardHeader>
            <CardTitle className="text-base">Contraseña</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <span className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-xs">••••••••••••</span>
                </div>
              </span>
            </div>
          </CardContent>
          <CardFooter isSecondary>
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              <Button
                radius="lg"
                variant="outline"
                onClick={() => setIsOpen(true)}
              >
                Cambiar contraseña
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AccountDetails;
