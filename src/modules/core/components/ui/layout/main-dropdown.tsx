"use client";

import { FC } from "react";

import {
  Avatar,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  DropdownSection,
  Button,
  useDisclosure,
  Badge,
} from "@nextui-org/react";

import { ThemeToggle } from "../buttons/theme-toggle";

import Image from "next/image";

import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { LogoutIcon } from "@/modules/icons/action";

import { signOut } from "next-auth/react";
import { UserProfileData } from "@/types/session";
import { InfoCircledIcon, MenuIcon, StarsIcon } from "@/modules/icons/common";
import PaymentModal from "@/modules/payment/components/payment-modal";
import TooltipCTN from "../utils/tooltip-ctn";
import {
  AccountIcon,
  BillingIcon,
  PricingIcon,
} from "@/modules/icons/interface";
import { cn } from "@/utils/common";
import { Chevron } from "@/modules/icons/navigation";

interface AvatarDropdownProps {
  profileData: UserProfileData | null;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ profileData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { is_premium } = profileData || {};

  const itemClass =
    "rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-h data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark";

  const renderPremiumMenu = () => {
    return (
      profileData && (
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
              href={`/profile/${profileData.username}`}
              className={cn("h-14 gap-2", itemClass)}
            >
              <p className="inline-flex gap-2 font-medium dark:text-base-color-dark">
                {`${profileData.first_name} ${profileData.last_name}`}
              </p>
              <p className="text-xs">@{profileData.username}</p>
              <TooltipCTN content="Cuenta Premium">
                <div className="absolute top-1/2 -translate-y-1/2 right-0 p-1 mr-2">
                  <StarsIcon
                    aria-hidden="true"
                    className="size-6 stars-icon v2 focus:outline-none"
                  />
                </div>
              </TooltipCTN>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Detalles de la cuenta"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
          >
            <DropdownItem
              key="account"
              textValue="Cuenta"
              href="/account"
              startContent={<AccountIcon className="size-4" />}
              className={itemClass}
            >
              Cuenta
            </DropdownItem>
            <DropdownItem
              key="premium"
              textValue="Premium"
              href="/premium"
              startContent={<PricingIcon className="size-4" />}
              className={itemClass}
            >
              Premium
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Preferences"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
          >
            <DropdownItem
              key="configurations"
              textValue="Configuración"
              className={itemClass}
            >
              Configuración
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              textValue="Help and Feedback"
              className={itemClass}
            >
              Centro de ayuda
            </DropdownItem>
            <DropdownItem
              isReadOnly
              textValue="Tema"
              className="cursor-default select-none rounded-md text-base-color-h dark:text-base-color-dark-h"
              endContent={<ThemeToggle />}
            >
              Tema
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            id="avatar_logout"
            key="logout"
            textValue="Logout"
            color="danger"
            onPress={() => signOut({ callbackUrl: "/logout" })}
            startContent={<LogoutIcon className="size-4" />}
            className={itemClass}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      )
    );
  };

  const renderNonPremiumMenu = () => {
    return (
      profileData && (
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
              href={`/profile/${profileData.username}`}
              className={cn("h-14 gap-2", itemClass)}
            >
              <p className="font-medium dark:text-base-color-dark">
                {`${profileData.first_name} ${profileData.last_name}`}
              </p>
              <p className="text-xs">@{profileData.username}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Actualiza tu cuenta"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
          >
            <DropdownItem
              key="upgrade"
              closeOnSelect
              onPress={() => {
                setTimeout(() => {
                  onOpen();
                }, 150);
              }}
              startContent={
                <StarsIcon
                  aria-hidden="true"
                  className="size-4 [&_*]:fill-white focus:outline-none"
                />
              }
              classNames={{
                title: "flex-none",
              }}
              className="justify-center rounded-md text-sm bg-light-gradient-v2 dark:bg-dark-gradient text-white data-[hover=true]:opacity-hover data-[hover=true]:text-white data-[hover=true]:transition"
            >
              Hazte premium
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Detalles de la cuenta"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
          >
            <DropdownItem
              key="account"
              textValue="Cuenta"
              href="/account"
              startContent={<BillingIcon className="size-4" />}
              className={itemClass}
            >
              Cuenta
            </DropdownItem>
            <DropdownItem
              key="premium"
              textValue="Premium"
              href="/premium"
              startContent={<PricingIcon className="size-4" />}
              className={itemClass}
            >
              Premium
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Configuración y preferencias"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
          >
            <DropdownItem
              key="configuration"
              textValue="Configuración"
              className={itemClass}
            >
              Configuración
            </DropdownItem>
            <DropdownItem
              key="help_and_feedback"
              textValue="Help and Feedback"
              className={itemClass}
            >
              Centro de ayuda
            </DropdownItem>
            <DropdownItem
              isReadOnly
              textValue="Tema"
              className="cursor-default select-none rounded-md text-base-color-h dark:text-base-color-dark-h"
              endContent={<ThemeToggle />}
            >
              Tema
            </DropdownItem>
          </DropdownSection>
          <DropdownItem
            id="avatar_logout"
            key="logout"
            textValue="Logout"
            color="danger"
            onPress={() => signOut({ callbackUrl: "/logout" })}
            startContent={<LogoutIcon className="size-4" />}
            className={itemClass}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      )
    );
  };

  const renderNonProfileMenu = () => {
    return (
      <DropdownMenu aria-label="Acciones del perfil" variant="flat">
        <DropdownSection
          aria-label="Acerca de Essentia"
          showDivider
          classNames={{ divider: "bg-gray-200 dark:bg-base-dark" }}
        >
          <DropdownItem
            key="about"
            textValue="Acerca de Essentia"
            href="/premium"
            startContent={<InfoCircledIcon className="size-4" />}
            className={itemClass}
          >
            Acerca de
          </DropdownItem>
          <DropdownItem
            key="premium"
            textValue="Premium"
            href="/premium"
            startContent={<PricingIcon className="size-4" />}
            className={itemClass}
          >
            Premium
          </DropdownItem>
        </DropdownSection>
        <DropdownItem
          className={itemClass}
          key="configurations"
          textValue="Configuración"
        >
          Configuración
        </DropdownItem>
        <DropdownItem
          className={itemClass}
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
    );
  };

  return (
    <>
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
              {profileData.profile_image ? (
                <button
                  type="button"
                  aria-label="Abrir menú"
                  className="relative flex appearance-none rounded-full"
                >
                  <Badge
                    isOneChar
                    content={<Chevron className="size-3 -rotate-90" />}
                    placement="bottom-right"
                    size="sm"
                    classNames={{
                      badge:
                        "bg-gray-200 dark:bg-base-dark border-white dark:border-base-full-dark-80",
                    }}
                  >
                    <Avatar
                      isBordered
                      src={profileData.profile_image}
                      alt={"Avatar de " + profileData.username}
                      ImgComponent={Image}
                      imgProps={{
                        width: 32,
                        height: 32,
                      }}
                      size="sm"
                      icon={<AvatarIcon />}
                      classNames={{
                        icon: "text-base-color-m dark:text-base-color-dark-m size-[80%]",
                        base: "bg-gray-300 dark:bg-gray-600 ring-gray-200 dark:ring-base-dark",
                        name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                      }}
                    />
                  </Badge>
                </button>
              ) : (
                <button
                  type="button"
                  aria-label="Abrir menú"
                  className="relative flex appearance-none rounded-full"
                >
                  <Badge
                    isOneChar
                    content={<Chevron className="size-3 -rotate-90" />}
                    placement="bottom-right"
                    size="sm"
                    classNames={{
                      badge:
                        "bg-gray-200 dark:bg-base-dark border-white dark:border-base-full-dark-80",
                    }}
                  >
                    <Avatar
                      isBordered
                      showFallback
                      size="sm"
                      icon={<AvatarIcon />}
                      classNames={{
                        icon: "text-base-color-m dark:text-base-color-dark-m size-[80%]",
                        base: "bg-gray-300 dark:bg-gray-600 ring-gray-200 dark:ring-base-dark",
                        name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                      }}
                    />
                  </Badge>
                </button>
              )}
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

          {profileData && is_premium && renderPremiumMenu()}
          {profileData && !is_premium && renderNonPremiumMenu()}
          {!profileData && renderNonProfileMenu()}
        </Dropdown>
      </div>
      {/* Payment Modal */}
      {!is_premium && profileData && (
        <PaymentModal isOpen={isOpen} onOpenChange={onOpenChange} />
      )}
    </>
  );
};

export default AvatarDropdown;
