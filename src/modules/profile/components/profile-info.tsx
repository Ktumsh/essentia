"use client";

import { MapPin } from "lucide-react";
import { FC, ReactNode, memo, useState } from "react";

import { Button } from "@/components/ui/button";
import { BetterTooltip } from "@/components/ui/tooltip";
import { StarsIcon } from "@/modules/icons/common";
import { CalendarIcon } from "@/modules/icons/status";
import { UserProfileData } from "@/types/session";

import CompleteProfile from "./complete-profile";
import EditProfileForm from "./edit-profile-form";
import { formatCreatedAt } from "../lib/utils";

interface ProfileInfoProps {
  profileData: UserProfileData | null;
  children: ReactNode;
  isOwnProfile: boolean;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  profileData,
  children,
  isOwnProfile,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  const [displayData, setDisplayData] = useState(profileData);

  const { is_premium, created_at } = profileData ?? {};

  const createdAt = formatCreatedAt(created_at as Date);

  const completeProfileData = {
    profile_image: displayData?.profile_image,
    banner_image: displayData?.banner_image,
    bio: displayData?.bio,
    location: displayData?.location,
  };

  return (
    <>
      <div className="space-y-3 px-4 pb-8 pt-3 md:space-y-6 md:px-8">
        {/* Nombre y botón editar */}
        <div className="relative">
          {children}
          <div className="ml-24 flex items-start justify-between md:ml-44">
            <div className="inline-flex flex-col">
              <div className="inline-flex items-center gap-2">
                <h2 className="font-bold text-main dark:text-main-dark md:text-xl">{`${displayData?.first_name} ${displayData?.last_name}`}</h2>
                {is_premium && (
                  <BetterTooltip content="Cuenta Premium">
                    <div className="relative inline-flex shrink-0 items-center justify-center gap-1 rounded bg-light-gradient-v2 p-1 text-xs text-main-h dark:bg-dark-gradient dark:text-main-dark">
                      <StarsIcon className="size-3.5 [&_*]:fill-white" />
                      <span className="sr-only">Cuenta Premium</span>
                    </div>
                  </BetterTooltip>
                )}
              </div>
              <span className="text-xs text-main-m dark:text-main-dark-m md:text-sm">
                @{displayData?.username}
              </span>
            </div>
            {isOwnProfile && (
              <Button variant="outline" onClick={() => setIsOpen(true)}>
                Editar perfil
              </Button>
            )}
          </div>
        </div>

        {/* Información del perfil */}
        <div className="space-y-6 pt-6">
          {displayData?.bio && (
            <div>
              <h3 className="mb-2 font-semibold text-main dark:text-main-dark md:text-lg">
                {isOwnProfile ? "Acerca de mi" : "Biografía"}
              </h3>
              <p className="text-sm text-main-m dark:text-main-dark-m">
                {displayData?.bio}
              </p>
            </div>
          )}

          <div className="grid gap-4 text-main-m dark:text-main-dark-m">
            {displayData?.location && (
              <div className="flex items-center space-x-2 text-sm">
                <MapPin className="size-4 text-main-m dark:text-main-dark-m" />
                <span>{displayData?.location}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="size-4 text-main-m dark:text-main-dark-m" />
              <span>
                {isOwnProfile ? "Te uniste en" : "Se unió en"} {createdAt}
              </span>
            </div>
          </div>
        </div>

        {/* Completar perfil */}
        {isOwnProfile &&
          (!displayData?.bio ||
            !displayData?.location ||
            !displayData?.profile_image ||
            !displayData?.banner_image) && (
            <CompleteProfile completeProfileData={completeProfileData} />
          )}
      </div>

      <EditProfileForm
        profileData={displayData}
        isOwnProfile={isOwnProfile}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
        setDisplayData={setDisplayData}
      />
    </>
  );
};

export default memo(ProfileInfo);
