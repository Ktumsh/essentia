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

import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { UserProfileData } from "@/types/auth";
import { formatDate } from "@/utils/format";

import CompleteProfile from "./complete-profile";
import EditProfileForm from "./edit-profile-form";
import {
  PopoverBioReason,
  PopoverBirthdate,
  PopoverGenre,
  PopoverHeightReason,
  PopoverLocationReason,
  PopoverWeightReason,
  PublicInfoPopover,
} from "./info-popover";
import ProfileAvatar from "./profile-avatar";

interface ProfileInfoProps {
  user: UserProfileData | null;
  isOwnProfile: boolean;
}

const ProfileInfo = ({ user, isOwnProfile }: ProfileInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const [displayData, setDisplayData] = useState<UserProfileData | null>(user);

  const isMobile = useIsMobile();

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
      className={cn("w-full", {
        "pt-10": !isOwnProfile,
      })}
    >
      <div className="mb-5 flex w-full flex-col gap-8 md:mb-0">
        <Card className="flex flex-col justify-between md:flex-row">
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
                  {isMobile ? "Presiona" : "Haz clic"} en tu avatar para cargar
                  uno personalizado desde tus archivos.
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

        <Card>
          <CardHeader>
            <CardTitle className="mb-2 inline-flex flex-col justify-between gap-2 text-base md:flex-row md:items-center">
              <span className="font-merriweather">
                {isOwnProfile
                  ? "Información de tu perfil"
                  : "Información de su perfil"}
                {isOwnProfile && <PublicInfoPopover />}
              </span>
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
          <CardContent className="@container space-y-4">
            <div className="border-border rounded-lg border px-4 py-3">
              <div className="grid-cols grid flex-1 gap-4 md:grid-cols-2 @3xl:grid-cols-4">
                <span className="flex flex-col">
                  <div className="text-foreground/80 flex-1 text-xs font-normal text-nowrap">
                    Nombre
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {firstName}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="text-foreground/80 flex-1 text-xs font-normal text-nowrap">
                    Apellido
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {lastName}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="text-foreground/80 flex-1 text-xs font-normal text-nowrap">
                    Nombre de usuario
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {username}
                  </div>
                </span>
                <span className="flex flex-col">
                  <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-nowrap">
                    <span>
                      <Cake className="size-3.5" />
                    </span>
                    <span>Fecha de nacimiento</span>
                    {isOwnProfile && <PopoverBirthdate />}
                  </div>
                  <div className="flex-1 pt-1 text-sm font-medium">
                    {formatDate(birthdate!, "d 'de' MMMM 'de' yyyy")}
                  </div>
                </span>
              </div>
            </div>
            {isOwnProfile && (
              <>
                <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
                  <div className="border-border rounded-lg border px-4 py-3">
                    <div className="grid-cols grid flex-1 gap-4">
                      <span className="flex flex-col">
                        <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-nowrap">
                          <span>
                            <ScrollText className="size-3.5" />
                          </span>
                          <span>Biografía</span>
                          <PopoverBioReason />
                        </div>
                        <div className="flex-1 pt-1 text-sm font-medium">
                          {bio || "---"}
                        </div>
                      </span>
                    </div>
                  </div>
                  <div className="border-border rounded-lg border px-4 py-3">
                    <div className="grid-cols grid flex-1 gap-4">
                      <span className="flex flex-col">
                        <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-nowrap">
                          <span>
                            <MapPin className="size-3.5" />
                          </span>
                          <span>Ubicación</span>
                          <PopoverLocationReason />
                        </div>
                        <div className="flex-1 pt-1 text-sm font-medium">
                          {location || "---"}
                        </div>
                      </span>
                    </div>
                  </div>
                </div>
                <div className="grid-cols !mb-0 grid flex-1 gap-4 md:grid-cols-3">
                  <div className="border-border rounded-lg border px-4 py-3">
                    <span className="flex flex-col">
                      <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-nowrap">
                        <span>
                          <Weight className="size-3.5" />
                        </span>
                        <span>Peso</span>
                        <PopoverWeightReason />
                      </div>
                      <div className="flex-1 pt-1 text-sm font-medium">
                        {(weight && weight + " kg") || "---"}
                      </div>
                    </span>
                  </div>
                  <div className="border-border rounded-lg border px-4 py-3">
                    <span className="flex flex-col">
                      <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-nowrap">
                        <span>
                          <Ruler className="size-3.5" />
                        </span>
                        <span>Estatura</span>
                        <PopoverHeightReason />
                      </div>
                      <div className="flex-1 pt-1 text-sm font-medium">
                        {(height && height + " cm") || "---"}
                      </div>
                    </span>
                  </div>
                  <div className="border-border rounded-lg border px-4 py-3">
                    <span className="flex flex-col">
                      <div className="text-foreground/80 inline-flex flex-1 items-center gap-1.5 text-xs font-normal text-nowrap">
                        <span>
                          <PersonStanding className="size-3.5" />
                        </span>
                        <span>Género</span>
                        <PopoverGenre />
                      </div>
                      <div className="flex-1 pt-1 text-sm font-medium">
                        {genre || "---"}
                      </div>
                    </span>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          {isOwnProfile && (
            <CardFooter isSecondary>
              <div className="flex w-full flex-col gap-2 sm:ml-auto sm:flex-row md:w-fit">
                <Button
                  variant="outline"
                  className="bg-background"
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
