"use client";

import {
  BookOpenText,
  Calendar,
  CalendarCheck2,
  CalendarClock,
  CircleDashed,
  GraduationCap,
  Mail,
  TrendingUp,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { getLastCompletedLesson } from "@/db/querys/progress-query";
import { getProgressColor } from "@/modules/resources/lib/utils";
import { Courses } from "@/types/resource";
import { UserProfileData } from "@/types/session";
import { formatDate } from "@/utils/format";

import ChangeEmailModal from "./change-email/change-email-modal";
import ChangePasswordModal from "./change-password-modal";
import DeleteAccountModal from "./delete-account-modal";

interface AccountDetailsProps {
  user: UserProfileData | null;
  courses: Courses;
}

const AccountDetails = ({ user, courses }: AccountDetailsProps) => {
  const router = useRouter();

  const isMobile = useIsMobile();

  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);

  if (!user) {
    return null;
  }

  const { id, email, createdAt } = user;

  const continueCourse = async ({
    resourceId,
    resourceSlug,
  }: {
    resourceId: string;
    resourceSlug: string;
  }) => {
    try {
      if (!user.id || !resourceId) return;

      const lastLesson = await getLastCompletedLesson(user.id, resourceId);

      if (lastLesson) {
        router.push(
          `/${resourceSlug}/${lastLesson.moduleSlug}/${lastLesson.lessonSlug}`,
        );
      } else {
        router.push(`/${resourceSlug}#aprende-sobre-${resourceSlug}`);
      }
    } catch (error) {
      console.error("Error al continuar el curso:", error);
    }
  };

  return (
    <>
      <div className="mb-5 flex w-full flex-col gap-8">
        <Card className="text-main dark:text-white">
          <CardHeader>
            <CardTitle className="text-base">
              Información de tu Cuenta
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
            <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <div className="grid-cols grid flex-1 gap-4 md:grid-cols-2">
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <Mail strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>Correo electrónico</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">{email}</div>
                </span>
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <Calendar strokeWidth={1.5} className="size-3" />
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
                onClick={() => setIsOpenChangeEmail(true)}
              >
                Cambiar correo electrónico
              </Button>
              <Button
                radius="lg"
                variant="outline"
                onClick={() => setIsOpenChangePass(true)}
              >
                Cambiar contraseña
              </Button>
            </div>
          </CardFooter>
        </Card>
        <Card className="text-main dark:text-white">
          <CardHeader>
            <CardTitle className="text-base">Progreso de tus Cursos</CardTitle>
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
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="text-main-h dark:text-main-dark-h">
                    <div className="flex items-center gap-1.5">
                      <GraduationCap strokeWidth={1.5} className="size-3" />
                      <span className="text-nowrap">Nombre del curso</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-main-h dark:text-main-dark-h">
                    <div className="flex items-center gap-1.5">
                      <CircleDashed strokeWidth={1.5} className="size-3" />
                      <span className="text-nowrap">Progreso (%)</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-main-h dark:text-main-dark-h">
                    <div className="flex items-center gap-1.5">
                      <TrendingUp strokeWidth={1.5} className="size-3" />
                      <span className="text-nowrap">Estado actual</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-main-h dark:text-main-dark-h">
                    <div className="flex items-center gap-1.5">
                      <CalendarClock strokeWidth={1.5} className="size-3" />
                      <span className="text-nowrap">Fecha de inicio</span>
                    </div>
                  </TableHead>
                  <TableHead className="text-main-h dark:text-main-dark-h">
                    <div className="flex items-center gap-1.5">
                      <CalendarCheck2 strokeWidth={1.5} className="size-3" />
                      <span className="text-nowrap">Fecha de finalización</span>
                    </div>
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {courses.map((course) => (
                  <TableRow key={course.courseId}>
                    <TableCell>
                      <button
                        aria-label={`Continuar curso ${course.courseName}`}
                        className="text-nowrap hover:underline"
                        onClick={() =>
                          continueCourse({
                            resourceId: course.courseId,
                            resourceSlug: course.courseSlug,
                          })
                        }
                      >
                        {course.courseName}
                      </button>
                    </TableCell>
                    <TableCell>
                      <Progress
                        value={course.progress}
                        className="h-1.5 w-2/3"
                        indicatorColor={getProgressColor(course.progress)}
                      />
                      <span>{course.progress}</span>
                      <span className="ml-1 text-xxs text-main-h dark:text-main-dark-h">
                        %
                      </span>
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {course.completed ? "Finalizado" : "En progreso"}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {course.startedAt
                        ? formatDate(course.startedAt, "dd/MM/yyyy")
                        : "No iniciado"}
                    </TableCell>
                    <TableCell className="text-nowrap">
                      {course.completedAt
                        ? formatDate(course.completedAt, "dd/MM/yyyy")
                        : "No finalizado"}
                    </TableCell>
                  </TableRow>
                ))}
                {courses.length === 0 && (
                  <TableRow>
                    <TableCell
                      colSpan={isMobile ? 2 : 5}
                      className="py-10 text-center"
                    >
                      <div className="flex flex-col items-center justify-center gap-4 text-main-m dark:text-main-dark-m">
                        <BookOpenText strokeWidth={1.5} className="size-8" />
                        <p className="text-xs md:text-sm">
                          Aún no te has inscrito en ningún curso. ¡Es un buen
                          momento para empezar a aprender algo nuevo!
                        </p>
                        <Link
                          href="/salud-y-bienestar#aprende-sobre-salud-y-bienestar"
                          className="text-sm font-medium text-blue-600 hover:underline"
                        >
                          Empieza a aprender
                        </Link>
                      </div>
                    </TableCell>
                  </TableRow>
                )}
              </TableBody>
            </Table>
          </CardContent>
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
      />
    </>
  );
};

export default AccountDetails;
