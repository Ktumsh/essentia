"use client";

import { useRouter } from "next/navigation";

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from "@/components/kit/dialog";

interface ProfilePhotoModalProps {
  children: React.ReactNode;
}

const ProfilePhotoModal = ({ children }: ProfilePhotoModalProps) => {
  const router = useRouter();

  const handleClose = () => router.back();

  return (
    <Dialog open={true} onOpenChange={handleClose}>
      <DialogContent
        isBlurred
        closeButtonClass="text-white"
        className="mx-0! max-h-full! max-w-full rounded-none bg-transparent p-0 shadow-none"
      >
        <DialogTitle className="sr-only">Perfil de usuario</DialogTitle>
        <DialogDescription className="sr-only">
          Perfil de usuario
        </DialogDescription>
        {children}
      </DialogContent>
    </Dialog>
  );
};

export default ProfilePhotoModal;
