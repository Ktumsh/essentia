"use client";

import { Modal, ModalContent } from "@nextui-org/react";
import { useRouter } from "next/navigation";
import { FC } from "react";

interface ProfilePhotoModalProps {
  children: React.ReactNode;
}

const ProfilePhotoModal: FC<ProfilePhotoModalProps> = ({ children }) => {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Modal
      backdrop="blur"
      placement="center"
      scrollBehavior="inside"
      size="full"
      isOpen={true}
      onClose={handleClose}
      radius="none"
      motionProps={{
        transition: {
          duration: 0,
        },
      }}
      classNames={{
        backdrop: "z-[101] bg-black/80",
        wrapper: "z-[102]",
        base: "bg-transparent",
        body: "gap-0 px-0 py-0 pb-16 custom-scroll",
        closeButton:
          "z-10 pointer-events-auto text-white m-5 bg-white/5 hover:bg-white/10 active:bg-white/20 transition-colors duration-150",
      }}
    >
      <ModalContent className="pointer-events-none max-h-full shadow-none">
        {children}
      </ModalContent>
    </Modal>
  );
};

export default ProfilePhotoModal;
