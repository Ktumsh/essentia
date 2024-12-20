import { Loader } from "lucide-react";
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
import { sendEmailAccountDeleted } from "@/modules/auth/lib/email-acc-del";

interface DeleteAccountModalProps {
  userId: string;
  email: string;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
}
const DeleteAccountModal = ({
  userId,
  email,
  isOpen,
  setIsOpen,
}: DeleteAccountModalProps) => {
  const isMobile = useIsMobile();
  const [isPending, startTransition] = useTransition();

  const handleDeleteUser = async () => {
    try {
      startTransition(async () => {
        await deleteUser(userId);
        const token = nanoid();
        await sendEmailAccountDeleted(email, token);
        signOut({ callbackUrl: "/account-deleted" });
      });
    } catch (error) {
      console.error("Error deleting user:", error);
      toast.error("No se pudo eliminar la cuenta.");
    }
  };

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Eliminar Cuenta</DrawerTitle>
            <DrawerDescription asChild className="mt-4 px-4">
              <div>
                <p>
                  Elimina permanentemente tu cuenta y todo su contenido de
                  Essentia.
                </p>
                <p className="font-semibold">¿Estás absolutamente seguro?</p>
              </div>
            </DrawerDescription>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="outline" disabled={isPending}>
                  Cancelar
                </Button>
              </DrawerClose>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleDeleteUser}
              >
                {isPending && <Loader className="size-4 animate-spin" />}
                {isPending ? null : "Confirmar"}
              </Button>
            </DrawerFooter>
          </DrawerHeader>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent isSecondary>
          <DialogHeader isSecondary>
            <DialogTitle>Eliminar Cuenta</DialogTitle>
            <DialogDescription asChild>
              <div>
                <p>
                  Elimina permanentemente tu cuenta y todo su contenido de
                  Essentia.
                </p>
                <p className="font-semibold">¿Estás absolutamente seguro?</p>
              </div>
            </DialogDescription>
          </DialogHeader>
          <div className="p-6">
            <div className="rounded-md bg-red-100 px-3 py-2 dark:bg-red-950">
              <p className="text-sm font-medium text-red-500">
                Esta acción NO es reversible. Por favor, debes estar segur@.
              </p>
            </div>
          </div>
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" disabled={isPending}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              variant="destructive"
              disabled={isPending}
              onClick={handleDeleteUser}
            >
              {isPending && <Loader className="size-4 animate-spin" />}
              {isPending ? null : "Confirmar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default DeleteAccountModal;
