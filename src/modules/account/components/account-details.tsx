import { Card, CardFooter, Button, useDisclosure } from "@nextui-org/react";

import { UserProfileData } from "@/types/session";
import { formatDate } from "@/utils/format";

import ChangePasswordModal from "./change-password-modal";

interface AccountDetailsProps {
  profileData: UserProfileData | null;
}

const AccountDetails = ({ profileData }: AccountDetailsProps) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  if (!profileData) {
    return null;
  }

  const { email, first_name, last_name, username, created_at } = profileData;

  const createdAt = profileData && formatDate(created_at, "dd 'de' MMMM, yyyy");
  return (
    <>
      <div className="flex w-full flex-col gap-4">
        <Card
          shadow="none"
          className="rounded-lg bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark"
        >
          <div className="px-5 py-4 text-base-color dark:text-base-color-dark">
            <h3 className="pb-4 text-base font-semibold">
              Información de tu Cuenta
            </h3>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-base-dark px-4 py-3">
              <div className="grid grid-cols md:grid-cols-4 flex-1 gap-4">
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-base-color-m dark:text-base-color-dark-m">
                    Nombre
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {first_name} {last_name}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-base-color-m dark:text-base-color-dark-m">
                    Correo electrónico
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">{email}</div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-base-color-m dark:text-base-color-dark-m">
                    Nombre de usuario
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {username}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-base-color-m dark:text-base-color-dark-m">
                    Fecha de creación
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {createdAt}
                  </div>
                </span>
              </div>
            </div>
          </div>
        </Card>
        <Card
          shadow="none"
          className="rounded-lg bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark"
        >
          <div className="px-5 py-4 text-base-color dark:text-base-color-dark">
            <h3 className="pb-4 text-base font-semibold">Contraseña</h3>
            <div className="flex items-center justify-between rounded-lg border border-gray-200 dark:border-base-dark px-4 py-3">
              <span className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-1">
                  <span className="text-xs">••••••••••••</span>
                </div>
              </span>
            </div>
          </div>
          <CardFooter className="flex flex-col sm:flex-row sm:items-center justify-between px-4 py-3 gap-4 rounded-none bg-gray-100 dark:bg-base-dark-50 border-t border-gray-200 dark:border-base-dark">
            <div className="flex flex-col w-full md:w-fit gap-2 sm:ml-auto sm:flex-row">
              <Button
                radius="sm"
                size="sm"
                onPress={onOpen}
                className="w-full md:w-fit shadow-sm bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark font-medium text-sm text-base-color dark:text-base-color-dark"
              >
                Cambiar contraseña
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ChangePasswordModal isOpen={isOpen} onOpenChange={onOpenChange} />
    </>
  );
};

export default AccountDetails;
