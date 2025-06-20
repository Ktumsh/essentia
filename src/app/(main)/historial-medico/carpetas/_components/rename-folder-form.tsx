"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/ui/drawer";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  type RenameFolderFormData,
  renameFolderSchema,
} from "@/lib/form-schemas";

interface RenameFolderFormProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  isSubmitting: boolean;
  currentName: string;
  onRename: (name: string) => Promise<void>;
}

const RenameFolderForm = ({
  isOpen,
  onOpenChange,
  isSubmitting,
  currentName,
  onRename,
}: RenameFolderFormProps) => {
  const isMobile = useIsMobile();

  const form = useForm<RenameFolderFormData>({
    resolver: zodResolver(renameFolderSchema),
    defaultValues: { name: currentName },
  });

  const { handleSubmit, reset, control, watch } = form;

  const { name } = watch();

  useEffect(() => {
    reset({ name: currentName });
  }, [currentName, form, reset]);

  const onSubmit = async (data: RenameFolderFormData) => {
    await onRename(data.name);
  };

  const formFields = (
    <Form {...form}>
      <form className="space-y-4 p-4 md:p-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nuevo nombre</FormLabel>
              <FormControl>
                <Input {...field} placeholder="Ej: Documentos 2024" />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onOpenChange}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Renombrar carpeta</DrawerTitle>
            <DrawerDescription className="sr-only">
              Cambia el nombre de tu carpeta médica
            </DrawerDescription>
          </DrawerHeader>
          <div className="p-4">{formFields}</div>
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button
                disabled={isSubmitting}
                variant="mobile"
                className="justify-center"
                onClick={() => onOpenChange(false)}
              >
                Cancelar
              </Button>
            </div>
            <Button
              disabled={currentName === name || isSubmitting}
              variant="mobile-primary"
              onClick={handleSubmit(onSubmit)}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Renombrando...
                </>
              ) : (
                "Renombrar"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle>Renombrar carpeta</DialogTitle>
          <DialogDescription className="sr-only">
            Cambia el nombre de tu carpeta médica
          </DialogDescription>
        </DialogHeader>
        {formFields}
        <DialogFooter isSecondary>
          <Button
            disabled={isSubmitting}
            variant="outline"
            className="rounded-full"
            onClick={() => onOpenChange(false)}
          >
            Cancelar
          </Button>
          <Button
            disabled={currentName === name || isSubmitting}
            className="rounded-full"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Renombrando...
              </>
            ) : (
              "Renombrar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFolderForm;
