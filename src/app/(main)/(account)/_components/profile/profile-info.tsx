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
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn } from "@/lib/utils";
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
import InfoFieldItem from "../info-field-item";
import BioModal from "./bio-modal";

import type { UserProfileData } from "@/lib/types";

interface ProfileInfoProps {
  isOwnProfile: boolean;
}

const ProfileInfo = ({ isOwnProfile }: ProfileInfoProps) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenBio, setIsOpenBio] = useState(false);

  const { user } = useUserProfile();

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
  } = displayData || {};

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

  const isProfileComplete =
    profileImage && bio && location && weight && height && genre;

  return (
    <div
      className={cn("w-full", {
        "pt-10": !isOwnProfile,
      })}
    >
      <div className="mb-5 flex w-full flex-col gap-8 md:mb-0">
        <Card className="bg-muted flex flex-col justify-between md:flex-row">
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
            animate={isProfileComplete ? "hide" : "show"}
            variants={{
              show: { opacity: 1, display: "block" },
              hide: { opacity: 0, transitionEnd: { display: "none" } },
            }}
            transition={{ duration: 1 }}
          >
            <CompleteProfile completeProfileData={completeProfileData} />
          </motion.div>
        )}

        <Card className="bg-muted">
          <CardHeader>
            <CardTitle className="mb-2 inline-flex flex-col justify-between gap-2 text-base md:flex-row md:items-center">
              <span className="inline-flex items-center gap-2">
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
            <div className="bg-background rounded-xl border px-4 py-3">
              <div className="grid-cols grid flex-1 gap-4 md:grid-cols-2 @3xl:grid-cols-4">
                <InfoFieldItem field="Nombre" value={firstName!} />
                <InfoFieldItem field="Apellido" value={lastName!} />
                <InfoFieldItem field="Nombre de usuario" value={username!} />
                <InfoFieldItem
                  field="Fecha de nacimiento"
                  value={formatDate(birthdate!, "d 'de' MMMM 'de' yyyy")}
                  icon={Cake}
                >
                  {isOwnProfile && <PopoverBirthdate />}
                </InfoFieldItem>
              </div>
            </div>
            {isOwnProfile && (
              <>
                <div className="grid grid-cols-1 gap-4 @2xl:grid-cols-2">
                  <div
                    className="bg-background cursor-pointer rounded-xl border px-4 py-3"
                    onClick={() => setIsOpenBio(true)}
                  >
                    <div className="grid-cols grid flex-1 gap-4">
                      <InfoFieldItem
                        field="Instrucciones personalizadas"
                        value={bio || "---"}
                        icon={ScrollText}
                      >
                        <PopoverBioReason />
                      </InfoFieldItem>
                    </div>
                  </div>
                  <div className="bg-background rounded-xl border px-4 py-3">
                    <div className="grid-cols grid flex-1 gap-4">
                      <InfoFieldItem
                        field="Ubicación"
                        value={location || "---"}
                        icon={MapPin}
                      >
                        <PopoverLocationReason />
                      </InfoFieldItem>
                    </div>
                  </div>
                </div>
                <div className="grid-cols !mb-0 grid flex-1 gap-4 md:grid-cols-3">
                  <div className="bg-background rounded-xl border px-4 py-3">
                    <InfoFieldItem
                      field="Peso"
                      value={(weight && weight + " kg") || "---"}
                      icon={Weight}
                    >
                      <PopoverWeightReason />
                    </InfoFieldItem>
                  </div>
                  <div className="bg-background rounded-xl border px-4 py-3">
                    <InfoFieldItem
                      field="Estatura"
                      value={(height && height + " cm") || "---"}
                      icon={Ruler}
                    >
                      <PopoverHeightReason />
                    </InfoFieldItem>
                  </div>
                  <div className="bg-background rounded-xl border px-4 py-3">
                    <InfoFieldItem
                      field="Género"
                      value={genre || "---"}
                      icon={PersonStanding}
                    >
                      <PopoverGenre />
                    </InfoFieldItem>
                  </div>
                </div>
              </>
            )}
          </CardContent>
          {isOwnProfile && (
            <CardFooter>
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

      <BioModal isOpen={isOpenBio} setIsOpen={setIsOpenBio} bio={bio!} />

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
