"use client";

import {
  Cake,
  MapPin,
  PersonStanding,
  Ruler,
  ScrollText,
  Weight,
} from "lucide-react";
import { motion } from "motion/react";
import { memo, useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { BetterTooltip } from "@/components/ui/tooltip";
import { StarsIcon } from "@/modules/icons/common";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import CompleteProfile from "./complete-profile";
import EditProfileForm from "./edit-profile-form";
import ProfileAvatar from "./profile-avatar";
import { formatFullDate } from "../lib/utils";

interface ProfileInfoProps {
  user: UserProfileData | null;
  isOwnProfile: boolean;
}

const ProfileInfo = ({ user, isOwnProfile }: ProfileInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [displayData, setDisplayData] = useState<UserProfileData | null>(user);

  const {
    firstName,
    lastName,
    username,
    birthdate,
    bio,
    location,
    genre,
    weight,
    height,
    profileImage,
  } = displayData ?? {};

  const { isPremium } = user ?? {};

  const completeProfileData = [
    {
      profileImage,
      bio,
      location,
      weight,
      height,
      genre,
    },
  ];

  const isProfileComplete = () => {
    return profileImage && bio && location && weight && height && genre;
  };

  return (
    <div
      className={cn("w-full bg-white dark:bg-full-dark", {
        "px-6 py-10": !isOwnProfile,
      })}
    >
      <div className="mb-5 flex w-full flex-col gap-8 md:mb-0">
        <Card className="flex flex-col justify-between text-main dark:text-white md:flex-row">
          <CardHeader>
            <CardTitle className="mb-2 text-base">Avatar</CardTitle>
            <CardDescription className="space-y-1">
              <p>
                {isOwnProfile
                  ? "Este es tu avatar de perfil."
                  : "Este es el avatar de " + username + "."}
              </p>
              {isOwnProfile && (
                <p>
                  Presiona en tu avatar para cargar uno personalizado desde tus
                  archivos.
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="md:pt-6">
            <ProfileAvatar user={user} isOwnProfile={isOwnProfile} />
          </CardContent>
        </Card>

        {isOwnProfile && (
          <motion.div
            initial={false}
            animate={isProfileComplete() ? "hide" : "show"}
            variants={{
              show: { opacity: 1, display: "block" },
              hide: { opacity: 0, transitionEnd: { display: "none" } },
            }}
            transition={{ duration: 1 }}
          >
            <CompleteProfile completeProfileData={completeProfileData} />
          </motion.div>
        )}

        <Card className="text-main dark:text-white">
          <CardHeader>
            <CardTitle className="mb-2 text-base">
              {isOwnProfile
                ? "Información de tu Perfil"
                : "Información de su perfil"}
            </CardTitle>
            <CardDescription className="space-y-1">
              <p>
                {isOwnProfile
                  ? "Esta es tu información personal de tu perfil."
                  : "Esta es la información personal de " + username + "."}
              </p>
              {isOwnProfile && (
                <p>
                  Puedes editar tu información para que nuestra IA pueda
                  brindarte una mejor experiencia para ti.
                </p>
              )}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
              <div className="grid-cols grid flex-1 gap-4 md:grid-cols-4">
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-h dark:text-main-dark-h">
                    Nombre
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {firstName}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-h dark:text-main-dark-h">
                    Apellido
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {lastName}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="flex-1 text-xs font-normal text-main-h dark:text-main-dark-h">
                    Nombre de usuario
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {username}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <Cake strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>Fecha de cumpleaños</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {formatFullDate(birthdate!)}
                  </div>
                </span>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
                <div className="grid-cols grid flex-1 gap-4">
                  <span className="flex flex-col">
                    <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                      <span>
                        <ScrollText strokeWidth={1.5} className="size-3" />
                      </span>
                      <span>Biografía</span>
                    </div>
                    <div className="flex-1 pt-1 text-sm font-medium">
                      {bio || "---"}
                    </div>
                  </span>
                </div>
              </div>
              <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
                <div className="grid-cols grid flex-1 gap-4">
                  <span className="flex flex-col">
                    <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                      <span>
                        <MapPin strokeWidth={1.5} className="size-3" />
                      </span>
                      <span>Ubicación</span>
                    </div>
                    <div className="flex-1 pt-1 text-sm font-medium">
                      {location || "---"}
                    </div>
                  </span>
                </div>
              </div>
            </div>
            <div className="grid-cols grid flex-1 gap-4 md:grid-cols-3">
              <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <Weight strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>Peso</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {(weight && weight + "kg") || "---"}
                  </div>
                </span>
              </div>
              <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <Ruler strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>Estatura</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {(height && height + "cm") || "---"}
                  </div>
                </span>
              </div>
              <div className="rounded-lg border border-gray-200 px-4 py-3 dark:border-dark">
                <span className="flex flex-col">
                  <div className="inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-main-h dark:text-main-dark-h">
                    <span>
                      <PersonStanding strokeWidth={1.5} className="size-3" />
                    </span>
                    <span>Género</span>
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {genre || "---"}
                  </div>
                </span>
              </div>
            </div>
            {isPremium && (
              <BetterTooltip
                content={isOwnProfile ? "Cuenta Premium" : "Usuario Premium"}
              >
                <div className="absolute right-0 top-0 m-6 !mt-6 inline-flex shrink-0 items-center justify-center gap-1 rounded bg-light-gradient-v2 p-1 text-xs text-main-h dark:bg-dark-gradient dark:text-main-dark">
                  <StarsIcon className="size-3.5 [&_*]:fill-white" />
                  <span className="sr-only">
                    {isOwnProfile ? "Cuenta Premium" : "Usuario Premium"}
                  </span>
                </div>
              </BetterTooltip>
            )}
          </CardContent>
          {isOwnProfile && (
            <CardFooter isSecondary>
              <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
                <Button
                  radius="lg"
                  variant="outline"
                  onClick={() => setIsOpen(true)}
                >
                  Editar perfil
                </Button>
              </div>
            </CardFooter>
          )}
        </Card>
      </div>

      <EditProfileForm
        profileData={displayData}
        isOwnProfile={isOwnProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setDisplayData={setDisplayData}
      />
    </div>
  );
};

export default memo(ProfileInfo);
