import { Ban, CheckCheck, Loader } from "lucide-react";
import { nanoid } from "nanoid";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";

import { sendEmailAction } from "@/app/(auth)/_lib/email-action";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { deleteUser } from "@/db/querys/user-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { getSureLabel } from "@/lib/utils";
import { type ResultCode, resultMessages } from "@/utils/errors";

interface DeleteAccountModalProps {
  userId: string;
  email: string;
  isOpen: boolean;
  genre: string | null;
  setIsOpen: (value: boolean) => void;
}
const DeleteAccountModal = ({
  userId,
  email,
  isOpen,
  genre,
  setIsOpen,
}: DeleteAccountModalProps) => {
  const isMobile = useIsMobile();
  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = async () => {
    try {
      startTransition(async () => {
        await deleteUser(userId);

        const token = nanoid();
        await sendEmailAction("account_deleted", { email, token });
        await signOut({ callbackUrl: "/account-deleted" });
      });
    } catch (error) {
      const key = (error as Error).message;
      toast.error(resultMessages[key as ResultCode]);
    }
  };

  const sureLabel = getSureLabel(genre);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent className="min-h-[60%]">
          <DrawerHeader>
            <DrawerTitle>Eliminar Cuenta</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription
            asChild
            className="mt-4 space-y-1.5 px-4 text-center text-sm"
          >
            <div>
              <p>
                Elimina permanentemente tu cuenta y todo su contenido de
                Essentia.
              </p>
              <p className="font-semibold text-amber-500">
                ¿Estás absolutamente {sureLabel}?
              </p>
            </div>
          </DrawerDescription>
          <div className="mx-4 mt-4">
            <div className="rounded-md bg-red-100 p-3 dark:bg-red-950">
              <p className="text-sm font-medium text-red-500">
                Esta acción <strong>NO</strong> es reversible. Por favor, debes
                estar {sureLabel}.
              </p>
            </div>
          </div>
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button
                  variant="mobile"
                  disabled={isPending}
                  className="justify-center"
                >
                  <Ban />
                  No, cancelar
                </Button>
              </DrawerClose>
            </div>
            <Button
              variant="mobile-primary"
              disabled={isPending}
              onClick={handleDeleteUser}
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  <CheckCheck />
                  Sí, confirmar
                </>
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary>
            <BadgeAlert variant="warning" />
            <DialogTitle>Eliminar cuenta</DialogTitle>
            <DialogDescription asChild>
              <div className="space-y-1.5">
                <p>
                  Elimina permanentemente tu cuenta y todo su contenido de
                  Essentia.
                </p>
                <p className="font-semibold text-amber-500">
                  ¿Estás absolutamente {sureLabel}?
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <div className="rounded-md bg-red-100 px-3 py-2 dark:bg-red-950">
              <p className="text-sm font-medium text-red-500">
                Esta acción <strong>NO</strong> es reversible. Por favor, debes
                estar {sureLabel}.
              </p>
            </div>
          </div>
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" radius="full" disabled={isPending}>
                No, cancelar
              </Button>
            </DialogClose>
            <Button
              radius="full"
              disabled={isPending}
              onClick={handleDeleteUser}
            >
              {isPending ? (
                <Loader className="size-4 animate-spin" />
              ) : (
                <>
                  Sí, confirmar
                  <CheckCheck />
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default DeleteAccountModal;
