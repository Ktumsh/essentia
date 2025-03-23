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
import { UserProfileData } from "@/types/auth";
import { Courses } from "@/types/resource";
import { formatDate } from "@/utils/format";

import ChangeEmailModal from "./change-email-modal";
import ChangePasswordModal from "./change-password-modal";
import CourseProgressTable from "./course-progress-table";
import DeleteAccountModal from "./delete-account-modal";

interface AccountDetailsProps {
  user: UserProfileData | null;
  courses: Courses;
}

const AccountDetails = ({ user, courses }: AccountDetailsProps) => {
  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  if (!user) {
    return null;
  }

  const { id, email, createdAt, genre, isPremium } = user;

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
                <span className="flex flex-col">
                  <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal">
                    <span>
                      <Mail className="size-3.5" />
                    </span>
                    <span>Correo electrónico</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">{email}</div>
                </span>
                <span className="flex flex-col">
                  <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal">
                    <span>
                      <Calendar className="size-3.5" />
                    </span>
                    <span>Fecha de creación</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {formatDate(createdAt, "d 'de' MMMM, yyyy")}
                  </div>
                </span>
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
            <CardTitle className="text-base">Progreso de tus cursos</CardTitle>
            <CardDescription className="space-y-1">
              <p>
                Estos son los cursos en los que te has inscrito. Revisa tu
                progreso y continúa donde lo dejaste.
              </p>
              <p>
                ¡Sigue avanzando para completar tus objetivos de aprendizaje!
              </p>
            </CardDescription>
          </CardHeader>
          <CardContent>
            <CourseProgressTable
              userId={id}
              courses={courses}
              isPremium={isPremium}
            />
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
