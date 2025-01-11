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
import { cn } from "@/utils/common";
import {
  formatDate,
  formatDateWithAutoTimezone,
  getPreciseAge,
  getTimeOnPlatform,
} from "@/utils/format";

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

  const accountInfo = [
    { title: "Correo electrónico", value: email, icon: Mail },
    { title: "Fecha de creación", value: createdAt },
    { title: "Tiempo en la plataforma", value: getTimeOnPlatform(createdAt) },
  ];

  const personalInfo = [
    { title: "Nombre", value: firstName },
    { title: "Apellido", value: lastName },
    { title: "Nombre de usuario", value: username },
    { title: "Fecha de cumpleaños", value: birthdate },
    {
      title: "Edad",
      value: getPreciseAge(birthdate!),
    },
    { title: "Biografía", value: bio, icon: ScrollText },
    { title: "Ubicación", value: location, icon: MapPin },
    { title: "Peso", value: weight + " kg", icon: Weight },
    { title: "Altura", value: height + " cm", icon: Ruler },
    { title: "Género", value: genre, icon: PersonStanding },
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
                {accountInfo.map((item, index) => {
                  if (index === 0) {
                    return (
                      <li key={index}>
                        <Button
                          variant="ghost"
                          fullWidth
                          radius="none"
                          className="h-auto min-h-11 justify-between px-6 py-3 text-main-h hover:text-main dark:text-main-dark dark:hover:text-white md:px-4 md:py-2"
                          onClick={() => setIsOpenChangeEmail(true)}
                        >
                          <div className="flex items-center gap-4">
                            <Mail className="size-4" />
                            <div className="flex flex-col items-start">
                              <span>Correo electrónico</span>
                              <p className="text-main-m dark:text-main-dark-m">
                                {email}
                              </p>
                            </div>
                          </div>
                          <ChevronRight className="size-4 shrink-0 text-main-h dark:text-main-dark-h" />
                        </Button>
                      </li>
                    );
                  } else {
                    return (
                      <li
                        key={index}
                        className={cn({
                          "border-t border-gray-200 dark:border-dark":
                            index === 1,
                        })}
                      >
                        <div className="inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium text-main-h dark:text-main-dark md:px-4 md:py-2">
                          <div className="flex items-center gap-4">
                            {item.icon && <item.icon className="size-4" />}
                            <div className="flex flex-col items-start">
                              <span>{item.title}</span>
                              <p className="font-normal text-main-m dark:text-main-dark-m">
                                {index === 1 && item.value instanceof Date
                                  ? formatDateWithAutoTimezone(
                                      createdAt,
                                      "d 'de' MMMM, yyyy 'a las' HH:mm:ss",
                                    )
                                  : String(item.value)}
                              </p>
                            </div>
                          </div>
                        </div>
                      </li>
                    );
                  }
                })}
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
                {personalInfo.map((item, index) => (
                  <li
                    key={index}
                    className={cn({
                      "border-t border-gray-200 dark:border-dark":
                        index === 3 ||
                        index === 5 ||
                        index === 7 ||
                        index === 9,
                    })}
                  >
                    <div className="inline-flex h-auto min-h-11 w-full items-center justify-between px-6 py-3 text-sm font-medium text-main-h dark:text-main-dark md:px-4 md:py-2">
                      <div className="flex items-center gap-4">
                        {index > 2 && item.icon && (
                          <item.icon className="size-4 shrink-0" />
                        )}
                        <div className="flex flex-col items-start">
                          <span>{item.title}</span>
                          <p className="font-normal text-main-m dark:text-main-dark-m">
                            {index === 3 && item.value instanceof Date
                              ? formatDate(item.value, "d 'de' MMMM, yyyy")
                              : String(item.value) || "Sin información"}
                          </p>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
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
