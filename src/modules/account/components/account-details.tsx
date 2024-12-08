"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { UserProfileData } from "@/types/session";
import { formatDate } from "@/utils/format";

import ChangePasswordModal from "./change-password-modal";

interface AccountDetailsProps {
  profileData: UserProfileData | null;
}

const AccountDetails = ({ profileData }: AccountDetailsProps) => {
  const [isOpen, setIsOpen] = useState(false);

  if (!profileData) {
    return null;
  }

  const { email, firstName, lastName, username, createdAt } = profileData;

  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <div className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark">
          <div className="px-5 py-4 text-main dark:text-white">
            <h3 className="pb-4 text-base font-semibold">
              Información de tu Cuenta
            </h3>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
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
          </div>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white dark:border-dark dark:bg-full-dark">
          <div className="px-5 py-4 text-main dark:text-white">
            <h3 className="pb-4 text-base font-semibold">Contraseña</h3>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <span className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-xs">••••••••••••</span>
                </div>
              </span>
            </div>
          </div>
          <footer className="flex flex-col justify-between gap-4 rounded-none border-t border-gray-200 bg-gray-100 px-4 py-3 dark:border-dark dark:bg-dark/50 sm:flex-row sm:items-center">
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              <Button
                radius="lg"
                variant="outline"
                onClick={() => setIsOpen(true)}
              >
                Cambiar contraseña
              </Button>
            </div>
          </footer>
        </div>
      </div>
      <ChangePasswordModal isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
};

export default AccountDetails;
