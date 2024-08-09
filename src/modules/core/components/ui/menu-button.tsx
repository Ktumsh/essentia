"use client";

import { Avatar, AvatarIcon, Button } from "@nextui-org/react";
import Image from "next/image";

interface Props {
  sessionImage?: string;
  isOpen: boolean;
  toggleMenu: () => void;
}

const MenuButton: React.FC<Props> = (props) => {
  return (
    <>
      <Button
        aria-expanded={props.isOpen}
        aria-controls="mobile-menu"
        aria-label="Abrir menú"
        onClick={props.toggleMenu}
        isIconOnly
        disableRipple
        className="!size-8 min-w-8 rounded-full overflow-hidden"
      >
        {props.sessionImage ? (
          <Image
            width={32}
            height={32}
            src={props.sessionImage}
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
              base: "bg-gray-300 dark:bg-gray-800",
              name: "font-medium text-base-color-h dark:text-base-color-dark-h",
            }}
          />
        )}
      </Button>
    </>
  );
};

export default MenuButton;
