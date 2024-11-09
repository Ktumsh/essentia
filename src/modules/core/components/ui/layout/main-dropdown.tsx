"use client";

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
import Image from "next/image";
import { signOut } from "next-auth/react";
import { FC } from "react";

import { LogoutIcon } from "@/modules/icons/action";
import { InfoCircledIcon, MenuIcon, StarsIcon } from "@/modules/icons/common";
import {
  AccountIcon,
  BillingIcon,
  PricingIcon,
} from "@/modules/icons/interface";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { Chevron } from "@/modules/icons/navigation";
import PaymentModal from "@/modules/payment/components/payment-modal";
import { UserProfileData } from "@/types/session";
import { cn } from "@/utils/common";

import { ThemeToggle } from "../buttons/theme-toggle";
import TooltipCTN from "../utils/tooltip-ctn";

interface AvatarDropdownProps {
  profileData: UserProfileData | null;
}

const AvatarDropdown: FC<AvatarDropdownProps> = ({ profileData }) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();

  const { is_premium } = profileData || {};

  const itemClass =
    "rounded-md data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-dark text-main-h dark:text-main-dark-h data-[hover=true]:text-main-h dark:data-[hover=true]:text-main-dark";

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
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
          >
            <DropdownItem
              key="profile"
              textValue="Perfil"
              href={`/profile/${profileData.username}`}
              className={cn("h-14 gap-2", itemClass)}
            >
              <p className="inline-flex gap-2 font-medium dark:text-main-dark">
                {`${profileData.first_name} ${profileData.last_name}`}
              </p>
              <p className="text-xs">@{profileData.username}</p>
              <TooltipCTN content="Cuenta Premium">
                <div className="absolute right-0 top-1/2 mr-2 -translate-y-1/2 p-1">
                  <StarsIcon
                    aria-hidden="true"
                    className="stars-icon v2 size-6 focus:outline-none"
                  />
                </div>
              </TooltipCTN>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Detalles de la cuenta"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
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
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
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
              className="cursor-default select-none rounded-md text-main-h dark:text-main-dark-h"
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
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
          >
            <DropdownItem
              key="profile"
              textValue="Perfil"
              href={`/profile/${profileData.username}`}
              className={cn("h-14 gap-2", itemClass)}
            >
              <p className="font-medium dark:text-main-dark">
                {`${profileData.first_name} ${profileData.last_name}`}
              </p>
              <p className="text-xs">@{profileData.username}</p>
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Actualiza tu cuenta"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
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
                  className="size-4 focus:outline-none [&_*]:fill-white"
                />
              }
              classNames={{
                title: "flex-none",
              }}
              className="justify-center rounded-md bg-light-gradient-v2 text-sm text-white data-[hover=true]:text-white data-[hover=true]:opacity-hover data-[hover=true]:transition dark:bg-dark-gradient"
            >
              Hazte premium
            </DropdownItem>
          </DropdownSection>
          <DropdownSection
            aria-label="Detalles de la cuenta"
            showDivider
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
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
            classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
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
              className="cursor-default select-none rounded-md text-main-h dark:text-main-dark-h"
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
          classNames={{ divider: "bg-gray-200 dark:bg-dark" }}
        >
          <DropdownItem
            key="about"
            textValue="Acerca de Essentia"
            href="/about-essentia"
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
          className="cursor-default select-none rounded-md text-main-h dark:text-main-dark-h"
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
              "p-1 bg-white dark:bg-full-dark border border-gray-200 dark:border-dark rounded-lg",
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
                        "bg-gray-200 dark:bg-dark border-white dark:border-full-dark/80",
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
                        icon: "text-main-m dark:text-main-dark-m size-[80%]",
                        base: "bg-gray-300 dark:bg-gray-600 ring-gray-200 dark:ring-dark",
                        name: "font-medium text-main-h dark:text-main-dark-h",
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
                        "bg-gray-200 dark:bg-dark border-white dark:border-full-dark/80",
                    }}
                  >
                    <Avatar
                      isBordered
                      showFallback
                      size="sm"
                      icon={<AvatarIcon />}
                      classNames={{
                        icon: "text-main-m dark:text-main-dark-m size-[80%]",
                        base: "bg-gray-300 dark:bg-gray-600 ring-gray-200 dark:ring-dark",
                        name: "font-medium text-main-h dark:text-main-dark-h",
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
                className="text-main dark:text-main-dark dark:data-[hover=true]:bg-white/5"
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
