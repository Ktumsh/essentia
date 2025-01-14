"use client";

import {
  ArrowLeft,
  BadgeCheck,
  ChevronRight,
  LockKeyhole,
  Mail,
  MapPin,
  PersonStanding,
  Ruler,
  ScrollText,
  User,
  Weight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import ChangeEmailModal from "@/modules/account/components/change-email/change-email-modal";
import ChangePasswordModal from "@/modules/account/components/change-password-modal";
import EditProfileForm from "@/modules/profile/components/edit-profile-form";
import { UserProfileData } from "@/types/session";
import {
  formatDate,
  formatDateWithAutoTimezone,
  getPreciseAge,
  getTimeOnPlatform,
} from "@/utils/format";

import InfoField from "./info-field";
import SettingsOptsHeader from "./settings-opts-header";

interface AccountSettingsProps {
  user: UserProfileData | null;
  isMobile?: boolean;
}

type Section = "accountInfo" | "personalInfo" | "options";

const AccountSettings = ({ user, isMobile = false }: AccountSettingsProps) => {
  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [displayData, setDisplayData] = useState<UserProfileData | null>(user);

  const [section, setSection] = useState<Section>("options");

  const router = useRouter();

  if (!user) {
    return null;
  }

  const {
    email,
    createdAt,
    firstName,
    lastName,
    username,
    birthdate,
    bio,
    location,
    weight,
    height,
    genre,
  } = displayData as UserProfileData;

  const sections = [
    {
      title: "Información de tu cuenta",
      value: "accountInfo",
      icon: BadgeCheck,
    },
    { title: "Información personal", value: "personalInfo", icon: User },
    { title: "Cambiar contraseña", value: "changePassword", icon: LockKeyhole },
  ];

  const handleSection = (section: Section) => {
    setSection(section);
  };

  return (
    <div className="mb-5 pb-16 md:mb-0 md:pb-0">
      {section === "options" ? (
        isMobile ? (
          <div className="relative px-6">
            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className="absolute inset-y-0 left-4 mb-2 mt-auto md:left-0"
              onClick={() => router.push("/settings")}
            >
              <ArrowLeft className="!size-5 text-main-h dark:text-main-dark" />
            </Button>
            <div className="ml-12">
              <SettingsOptsHeader title="Cuenta y perfil" />
            </div>
          </div>
        ) : (
          <SettingsOptsHeader title="Cuenta y perfil" />
        )
      ) : (
        <div className="relative px-6 md:px-0">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="absolute inset-y-0 left-4 mb-2 mt-auto md:left-0"
            onClick={() => handleSection("options")}
          >
            <ArrowLeft className="!size-5 text-main-h dark:text-main-dark" />
          </Button>
          <div className="ml-12">
            <SettingsOptsHeader title="Cuenta y perfil" />
          </div>
        </div>
      )}
      <div className="mt-1 flex flex-1 flex-col">
        {section === "options" && (
          <>
            <div className="flex flex-col gap-1">
              <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
                {sections.map((section, index) => (
                  <li key={index}>
                    <Button
                      variant="ghost"
                      fullWidth
                      radius="none"
                      className="h-12 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:h-11 md:px-4 md:py-2"
                      onClick={() => {
                        if (index !== 2 && section.value) {
                          handleSection(section.value as Section);
                        } else {
                          setIsOpenChangePass(true);
                        }
                      }}
                    >
                      <div className="flex items-center gap-4">
                        <section.icon />
                        <span>{section.title}</span>
                      </div>
                      <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
                    </Button>
                  </li>
                ))}
              </ul>
            </div>

            <ChangePasswordModal
              isOpen={isOpenChangePass}
              setIsOpen={setIsOpenChangePass}
            />
          </>
        )}
        {section === "accountInfo" && (
          <>
            <div className="flex flex-col">
              <h4 className="mb-2 pl-6 text-xs font-medium text-main-h dark:text-main-dark-h md:pl-4">
                Información de tu cuenta
              </h4>
              <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
                <InfoField
                  title="Correo electrónico"
                  value={email}
                  icon={Mail}
                  isButton
                  buttonAction={() => setIsOpenChangeEmail(true)}
                />
                <InfoField
                  title="Fecha de creación"
                  value={formatDateWithAutoTimezone(
                    createdAt,
                    "d 'de' MMMM, yyyy 'a las' HH:mm:ss",
                  )}
                  hasBorder
                />
                <InfoField
                  title="Tiempo en la plataforma"
                  value={getTimeOnPlatform(createdAt)}
                />
              </ul>
            </div>
            <ChangeEmailModal
              currentEmail={email}
              isOpen={isOpenChangeEmail}
              setIsOpen={setIsOpenChangeEmail}
            />
          </>
        )}
        {section === "personalInfo" && (
          <>
            <div className="flex flex-col">
              <h4 className="mb-2 pl-6 text-xs font-medium text-main-h dark:text-main-dark-h md:pl-4">
                Información personal
              </h4>
              <ul className="flex flex-col overflow-hidden border-y border-gray-200 dark:border-dark md:rounded-lg md:border">
                <InfoField title="Nombre" value={firstName} />
                <InfoField title="Apellido" value={lastName} />
                <InfoField title="Nombre de usuario" value={username} />
                <InfoField
                  title="Fecha de nacimiento"
                  value={formatDate(birthdate!, "d 'de' MMMM, yyyy")}
                  hasBorder
                />
                <InfoField title="Edad" value={getPreciseAge(birthdate!)} />
                <InfoField
                  title="Biografía"
                  value={bio}
                  icon={ScrollText}
                  hasBorder
                />
                <InfoField title="Ubicación" value={location} icon={MapPin} />
                <InfoField
                  title="Peso"
                  value={weight}
                  icon={Weight}
                  suffix="kg"
                  hasBorder
                />
                <InfoField
                  title="Altura"
                  value={height}
                  icon={Ruler}
                  suffix="cm"
                />
                <InfoField
                  title="Género"
                  value={genre}
                  icon={PersonStanding}
                  hasBorder
                />
              </ul>
              <div className="mt-4 w-full self-end px-6 md:px-0">
                <Button
                  variant="outline"
                  className="w-full md:w-fit"
                  onClick={() => setIsOpenEditProfile(true)}
                >
                  Editar información
                </Button>
              </div>
            </div>
            <EditProfileForm
              profileData={displayData}
              isOwnProfile={true}
              isOpen={isOpenEditProfile}
              setIsOpen={setIsOpenEditProfile}
              setDisplayData={setDisplayData}
            />
          </>
        )}
      </div>
    </div>
  );
};

export default AccountSettings;
