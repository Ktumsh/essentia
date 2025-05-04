"use client";

import { Calendar, Mail } from "lucide-react";
import { useState } from "react";

import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { useUserProfile } from "@/hooks/use-user-profile";
import { LearningRoutes } from "@/types/resource";
import { formatDate } from "@/utils/format";

import ChangeEmailModal from "./change-email-modal";
import ChangePasswordModal from "./change-password-modal";
import DeleteAccountModal from "./delete-account-modal";
import RouuteProgressTable from "./route-progress-table";
import InfoFieldItem from "../info-field-item";

interface AccountDetailsProps {
  routes: LearningRoutes;
}

const AccountDetails = ({ routes }: AccountDetailsProps) => {
  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  const { user } = useUserProfile();

  if (!user) {
    return null;
  }

  const { id, email, createdAt, genre } = user;

  return (
    <>
      <div className="flex w-full flex-col gap-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-base">
              Información de tu cuenta
            </CardTitle>
            <CardDescription className="space-y-1">
              <p>Esta es la información de tu cuenta.</p>
              <p>
                Puedes cambiar la dirección de tu correo electrónico y
                actualizar tu contraseña.
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="border-border rounded-lg border px-4 py-3">
              <div className="grid-cols grid flex-1 gap-4 md:grid-cols-2">
                <InfoFieldItem
                  field="Correo electrónico"
                  value={email}
                  icon={Mail}
                />
                <InfoFieldItem
                  field="Fecha de creación"
                  value={formatDate(createdAt, "d 'de' MMMM, yyyy")}
                  icon={Calendar}
                />
              </div>
            </div>
          </CardContent>
          <CardFooter isSecondary>
            <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
              <Button
                variant="outline"
                className="bg-background"
                onClick={() => setIsOpenChangeEmail(true)}
              >
                Cambiar correo electrónico
              </Button>
              <Button
                variant="outline"
                className="bg-background"
                onClick={() => setIsOpenChangePass(true)}
              >
                Cambiar contraseña
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Card>
          <CardHeader>
            <CardTitle className="text-base">Progreso de tus rutas</CardTitle>
            <CardDescription className="space-y-1">
              <p>
                Estas son las rutas de aprendizaje en las que estás
                participando. Revisa tu progreso y continúa donde lo dejaste.
              </p>
              <p>
                ¡Sigue avanzando para completar tus etapas y mejorar tu
                bienestar!
              </p>
            </CardDescription>
          </CardHeader>

          <CardContent>
            <RouuteProgressTable userId={id} routes={routes} />
          </CardContent>
        </Card>
        <Card className="border-red-200 dark:border-red-900">
          <CardHeader>
            <CardTitle className="mb-2 text-base">Elimina tu cuenta</CardTitle>
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
                variant="outline"
                onClick={() => setIsOpenDelete(true)}
                className="border-none bg-red-500! text-white"
              >
                Eliminar cuenta
              </Button>
            </div>
          </CardFooter>
        </Card>
      </div>
      <ChangeEmailModal
        currentEmail={email}
        isOpen={isOpenChangeEmail}
        setIsOpen={setIsOpenChangeEmail}
      />
      <ChangePasswordModal
        isOpen={isOpenChangePass}
        setIsOpen={setIsOpenChangePass}
      />
      <DeleteAccountModal
        userId={id}
        email={email}
        isOpen={isOpenDelete}
        setIsOpen={setIsOpenDelete}
        genre={genre}
      />
    </>
  );
};

export default AccountDetails;
