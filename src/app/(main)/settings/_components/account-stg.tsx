"use client";

import {
  ArrowLeft,
  BadgeCheck,
  LockKeyhole,
  Mail,
  MapPin,
  Pencil,
  PersonStanding,
  Ruler,
  ScrollText,
  User,
  Weight,
} from "lucide-react";
import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/kit/button";
import {
  formatDate,
  formatDateWithAutoTimezone,
  getPreciseAge,
  getTimeOnPlatform,
} from "@/utils/format";

import InfoField from "./info-field";
import SettingsOptsHeader from "./settings-opts-header";
import ChangeEmailModal from "../../(account)/_components/account/change-email-modal";
import ChangePasswordModal from "../../(account)/_components/account/change-password-modal";
import DeleteAccountModal from "../../(account)/_components/account/delete-account-modal";
import EditProfileForm from "../../(account)/_components/profile/edit-profile-form";

import type { UserProfileData } from "@/lib/types";

interface AccountStgProps {
  user: UserProfileData | null;
  isMobile?: boolean;
}

type Section = "accountInfo" | "personalInfo" | "options";

const AccountStg = ({ user, isMobile = false }: AccountStgProps) => {
  const [isOpenChangeEmail, setIsOpenChangeEmail] = useState(false);
  const [isOpenChangePass, setIsOpenChangePass] = useState(false);
  const [isOpenEditProfile, setIsOpenEditProfile] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [displayData, setDisplayData] = useState<UserProfileData | null>(user);

  const [section, setSection] = useState<Section>("options");

  const router = useRouter();

  if (!user) {
    return null;
  }

  const {
    id,
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

  const handleSection = (section: Section) => {
    setSection(section);
  };

  return (
    <div className="-mx-6 md:mx-0">
      {section === "options" ? (
        isMobile ? (
          <div className="relative px-6">
            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className="absolute top-7 left-4 md:left-0"
              onClick={() => router.push("/settings")}
            >
              <ArrowLeft className="text-foreground/80 size-5!" />
            </Button>
            <div className="ml-12">
              <SettingsOptsHeader title="Cuenta y perfil" />
            </div>
          </div>
        ) : (
          <SettingsOptsHeader
            title="Cuenta y perfil"
            description="Actualiza la configuración de tu cuenta y de tu perfil."
          />
        )
      ) : (
        <div className="relative px-6 md:px-0">
          <Button
            variant="ghost"
            size="icon"
            radius="full"
            className="absolute top-7 left-4 md:left-0"
            onClick={() => handleSection("options")}
          >
            <ArrowLeft className="text-foreground/80 size-5!" />
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
              <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
                <InfoField
                  title="Información de tu cuenta"
                  hasValue={false}
                  icon={BadgeCheck}
                  isButton
                  buttonAction={() => handleSection("accountInfo")}
                />
                <InfoField
                  title="Información personal"
                  hasValue={false}
                  icon={User}
                  isButton
                  buttonAction={() => handleSection("personalInfo")}
                />
              </ul>
            </div>
          </>
        )}
        {section === "accountInfo" && (
          <>
            <div className="flex flex-col">
              <h4 className="text-foreground/80-h mb-2 pl-6 text-xs font-medium md:pl-4">
                Información de tu cuenta
              </h4>
              <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
                <InfoField
                  title="Correo electrónico"
                  value={email}
                  icon={Mail}
                  isButton
                  buttonAction={() => setIsOpenChangeEmail(true)}
                />
                <InfoField
                  title="Cambiar contraseña"
                  hasValue={false}
                  icon={LockKeyhole}
                  isButton
                  buttonAction={() => setIsOpenChangePass(true)}
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
                <InfoField
                  title="Eliminar cuenta"
                  value="Elimina permanentemente tu cuenta y todo su contenido de Essentia"
                  hasBorder
                  isButton
                  isDanger
                  buttonAction={() => setIsOpenDelete(true)}
                />
              </ul>
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
        )}
        {section === "personalInfo" && (
          <>
            <div className="relative flex flex-col">
              <h4 className="text-foreground/80-h mb-2 pl-6 text-xs font-medium md:pl-4">
                Información personal
              </h4>
              <div className="static -top-7 right-0 m-4 mt-2 flex justify-start md:absolute md:mx-0 md:justify-end">
                <div className="w-full">
                  <Button
                    fullWidth
                    radius="full"
                    onClick={() => setIsOpenEditProfile(true)}
                  >
                    <Pencil />
                    Editar información
                  </Button>
                </div>
              </div>
              <ul className="border-border flex flex-col overflow-hidden border-y md:rounded-lg md:border">
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

export default AccountStg;
