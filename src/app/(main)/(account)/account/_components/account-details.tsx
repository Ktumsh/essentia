"use client";

import { Calendar, Mail } from "lucide-react";
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
import { useUserProfile } from "@/hooks/use-user-profile";
import { formatDate } from "@/utils";

import ChangeEmailModal from "./change-email-modal";
import ChangePasswordModal from "./change-password-modal";
import DeleteAccountModal from "./delete-account-modal";
import RouteProgressTable from "./route-progress-table";
import InfoFieldItem from "../../_components/info-field-item";

import type { LearningRoutes } from "@/lib/types";

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
        <Card className="bg-muted">
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
            <div className="bg-background rounded-xl border px-4 py-3">
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
          <CardFooter>
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
        <Card className="bg-muted">
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
            <RouteProgressTable userId={id} routes={routes} />
          </CardContent>
        </Card>
        <Card className="flex items-center justify-between gap-4 border border-dashed border-red-200 bg-red-50 p-6 dark:border-red-900 dark:bg-red-950">
          <CardHeader className="p-0">
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
          <Button variant="destructive" onClick={() => setIsOpenDelete(true)}>
            Eliminar cuenta
          </Button>
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
