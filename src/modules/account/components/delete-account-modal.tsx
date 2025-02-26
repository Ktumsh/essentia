import { Ban, CheckCheck, Loader } from "lucide-react";
import { nanoid } from "nanoid";
import { signOut } from "next-auth/react";
import { useTransition } from "react";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { deleteUser } from "@/db/querys/user-querys";
import { sendEmailAction } from "@/modules/auth/lib/email-action";
import { getSureLabel } from "@/modules/core/lib/utils";

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
        const res = await deleteUser(userId);

        if (!res.success) {
          toast.error(res.error);
          return;
        }

        const token = nanoid();
        await sendEmailAction("account_deleted", { email, token });
        await signOut({ callbackUrl: "/account-deleted" });
      });
    } catch (error) {
      console.error("Error eliminando el usuario:", error);
      toast.error("No se pudo eliminar la cuenta.");
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
            className="mt-4 space-y-1.5 px-4 text-center text-xs"
          >
            <div>
              <p>
                Elimina permanentemente tu cuenta y todo su contenido de
                Essentia.
              </p>
              <p className="font-semibold">¿Estás absolutamente {sureLabel}?</p>
            </div>
          </DrawerDescription>
          <div className="mx-4 mt-4">
            <div className="rounded-md bg-red-100 p-3 dark:bg-red-950">
              <p className="text-xs font-medium text-red-500">
                Esta acción NO es reversible. Por favor, debes estar {sureLabel}
                .
              </p>
            </div>
          </div>
          <DrawerFooter>
            <div className="dark:bg-dark flex flex-col overflow-hidden rounded-xl bg-gray-100">
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
              variant="mobile-danger"
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
            <DialogTitle>Eliminar cuenta</DialogTitle>
            <DialogDescription asChild>
              <div>
                <p>
                  Elimina permanentemente tu cuenta y todo su contenido de
                  Essentia.
                </p>
                <p className="font-semibold">
                  ¿Estás absolutamente {sureLabel}?
                </p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <div className="rounded-md bg-red-100 px-3 py-2 dark:bg-red-950">
              <p className="text-sm font-medium text-red-500">
                Esta acción NO es reversible. Por favor, debes estar {sureLabel}
                .
              </p>
            </div>
          </div>
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                No, cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
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
