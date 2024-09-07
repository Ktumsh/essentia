import { FC } from "react";

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
} from "@nextui-org/react";

import { ThemeToggle } from "../theme-toggle";

import Image from "next/image";

import { AvatarIcon, SettingsIcon } from "@/modules/icons/miscellaneus";
import { LogoutIcon } from "@/modules/icons/action";

import { signOut } from "next-auth/react";
import { UserProfileData } from "@/types/session";
import { MenuIcon } from "@/modules/icons/common";

interface AvatarDropdownProps {
  profileData: UserProfileData | null;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ profileData }) => {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        shouldBlockScroll={false}
        classNames={{
          content:
            "p-1 bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark rounded-lg",
        }}
        placement="bottom-end"
      >
        {profileData ? (
          <DropdownTrigger>
            <button
              className="size-8 focus:outline-none ring-2 ring-offset-2 ring-offset-white dark:ring-offset-[rgb(6,_27,_55)] ring-gray-200 dark:ring-midnight-900/30 rounded-full overflow-hidden"
              aria-label="Perfil de usuario"
            >
              {profileData?.profile_image ? (
                <Image
                  width={96}
                  height={96}
                  src={profileData?.profile_image}
                  alt="Avatar del usuario"
                />
              ) : (
                <Avatar
                  showFallback
                  src="https://images.unsplash.com/broken"
                  size="sm"
                  icon={<AvatarIcon />}
                  classNames={{
                    icon: "text-base-color-m dark:text-base-color-dark-m size-[80%]",
                    base: "bg-gray-300 dark:bg-gray-600",
                    name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                  }}
                />
              )}
            </button>
          </DropdownTrigger>
        ) : (
          <DropdownTrigger>
            <Button
              isIconOnly
              disableRipple
              variant="light"
              className="dark:data-[hover=true]:bg-white/5 text-base-color dark:text-base-color-dark"
            >
              <MenuIcon className="size-6" />
            </Button>
          </DropdownTrigger>
        )}

        {profileData ? (
          <DropdownMenu
            closeOnSelect={false}
            aria-label="Acciones del perfil"
            variant="flat"
          >
            <DropdownSection
              aria-label="Preferences"
              showDivider
              classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
            >
              <DropdownItem
                key="profile"
                textValue="Perfil"
                href={`/profile/${profileData?.username}`}
                className="h-14 gap-2 rounded-md data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
              >
                <p className="font-medium dark:text-base-color-dark">
                  {`${profileData?.first_name} ${profileData?.last_name}`}
                </p>
                <p className="text-xs">@{profileData?.username}</p>
              </DropdownItem>
            </DropdownSection>
            <DropdownSection
              aria-label="Preferences"
              showDivider
              classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
            >
              <DropdownItem
                className="rounded-md data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
                key="configurations"
                textValue="Configuración"
              >
                Configuración
              </DropdownItem>
              <DropdownItem
                className="rounded-md data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
                key="help_and_feedback"
                textValue="Help and Feedback"
              >
                Centro de ayuda
              </DropdownItem>
              <DropdownItem
                isReadOnly
                endContent={<ThemeToggle />}
                className="cursor-default select-none rounded-md text-base-color-h dark:text-base-color-dark-h"
                textValue="Tema"
              >
                Tema
              </DropdownItem>
            </DropdownSection>
            <DropdownItem
              id="avatar_logout"
              className="rounded-md text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-bittersweet-400 dark:data-[hover=true]:text-cerise-red-600 !duration-150"
              key="logout"
              textValue="Logout"
              color="danger"
              startContent={<LogoutIcon className="size-4" />}
              onClick={() => signOut({ callbackUrl: "/login" })}
            >
              Cerrar sesión
            </DropdownItem>
          </DropdownMenu>
        ) : (
          <DropdownMenu aria-label="Acciones del perfil" variant="flat">
            <DropdownItem
              className="rounded-md dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
              key="configurations"
              textValue="Configuración"
            >
              Configuración
            </DropdownItem>
            <DropdownItem
              className="rounded-md dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
              key="help_and_feedback"
              textValue="Help and Feedback"
            >
              Centro de ayuda
            </DropdownItem>
            <DropdownItem
              isReadOnly
              endContent={<ThemeToggle />}
              className="cursor-default select-none rounded-md text-base-color-h dark:text-base-color-dark-h"
              textValue="Tema"
            >
              Tema
            </DropdownItem>
          </DropdownMenu>
        )}
      </Dropdown>
    </div>
  );
};

export default AvatarDropdown;
