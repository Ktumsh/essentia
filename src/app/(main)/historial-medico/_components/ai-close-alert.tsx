import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/kit/alert-dialog";
import { BadgeAlert } from "@/components/kit/badge-alert";
import { Button } from "@/components/kit/button";

interface AICloseAlertProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onClose: () => void;
}

const AICloseAlert = ({ open, onOpenChange, onClose }: AICloseAlertProps) => {
  return (
    <AlertDialog open={open} onOpenChange={onOpenChange}>
      <AlertDialogContent isSecondary>
        <AlertDialogHeader isSecondary className="p-4 md:p-6">
          <BadgeAlert variant="warning" />
          <AlertDialogTitle>Confirmar cierre</AlertDialogTitle>
          <AlertDialogDescription asChild>
            <div className="space-y-1.5">
              <p>
                Aún no has guardado ninguna recomendación. Si cierras, perderás
                la actual y deberás generar una nueva 😅
              </p>
              <p className="font-semibold text-amber-500">
                ¿Estás seguro de que deseas cerrar?
              </p>
            </div>
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter isSecondary className="justify-end!">
          <AlertDialogCancel asChild>
            <Button
              variant="outline"
              onClick={() => onOpenChange(false)}
              className="rounded-full"
            >
              Cancelar
            </Button>
          </AlertDialogCancel>
          <AlertDialogAction asChild>
            <Button onClick={onClose} className="rounded-full">
              Confirmar
            </Button>
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
};

export default AICloseAlert;
