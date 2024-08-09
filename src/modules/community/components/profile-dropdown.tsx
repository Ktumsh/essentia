import { signOut } from "next-auth/react";

import {
  Button,
  Dropdown,
  DropdownTrigger,
  DropdownMenu,
  DropdownItem,
  User,
} from "@nextui-org/react";
import { DotsIcon } from "@/modules/icons/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { ThemeToggle } from "@/modules/core/components/theme-toggle";
import { LogoutIcon } from "@/modules/icons/action";

interface Props {
  name: string;
  username: string;
  avatar: string;
}

export default function ProfileDropdown({ name, username, avatar }: Props) {
  return (
    <div className="flex items-center gap-4">
      <Dropdown
        showArrow
        classNames={{
          base: "berfore:bg-white before:dark:bg-base-dark",
          content:
            "p-1 bg-gradient-to-br from-white to-gray-100 dark:from-base-dark dark:to-base-full-dark border border-gray-200 dark:border-base-dark rounded-xl",
        }}
        placement="top"
      >
        <DropdownTrigger>
          <Button
            size="lg"
            radius="full"
            color="danger"
            variant="light"
            endContent={
              <DotsIcon className="hidden lg:block size-5 text-base-color dark:text-base-color-dark" />
            }
            className="min-w-fit lg:min-w-24 w-full h-16 justify-between text-left text-lg p-3 mb-2 font-medium"
          >
            <User
              name={name}
              description={username}
              classNames={{
                wrapper: "hidden lg:inline-flex",
                name: "text-base-color-h dark:text-base-color-dark font-bold",
                description: "text-base-color-d dark:text-base-color-dark-m",
              }}
              avatarProps={{
                classNames: {
                  base: "bg-gray-300 dark:bg-gray-600",
                },
                src: avatar,
                icon: (
                  <AvatarIcon className="text-base-color-m dark:text-base-color-dark-m size-4/5" />
                ),
              }}
            />
          </Button>
        </DropdownTrigger>
        <DropdownMenu aria-label="Acciones del perfil" variant="flat">
          <DropdownItem
            key="profile"
            textValue="Perfil"
            href="/comunidad/perfil"
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
          >
            Mi perfil
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
            key="configurations"
            textValue="Configuración"
          >
            Configuración
          </DropdownItem>
          <DropdownItem
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark !duration-150"
            key="help_and_feedback"
            textValue="Centro de Ayuda"
          >
            Centro de Ayuda
          </DropdownItem>
          <DropdownItem
            isReadOnly
            endContent={<ThemeToggle />}
            className="rounded-xl data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-base-color-h dark:data-[hover=true]:text-base-color-dark"
            textValue="Tema"
          >
            Tema
          </DropdownItem>
          <DropdownItem
            id="avatar_logout"
            key="logout"
            textValue="Logout"
            color="danger"
            className="rounded-xl text-base-color-h dark:text-base-color-dark-m data-[hover=true]:text-bittersweet-400 dark:data-[hover=true]:text-cerise-red-600 !duration-150"
            startContent={<LogoutIcon className="size-4" />}
            onClick={() => signOut({ callbackUrl: "/login" })}
          >
            Cerrar sesión
          </DropdownItem>
        </DropdownMenu>
      </Dropdown>
    </div>
  );
}
