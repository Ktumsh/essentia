"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
} from "@/components/kit/drawer";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormControl,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  type RenameFolderFormData,
  renameFolderSchema,
} from "@/lib/form-schemas";

interface RenameFolderFormProps {
  isOpen: boolean;
  currentName: string;
  onRename: (name: string) => Promise<void>;
  onClose: () => void;
}

const RenameFolderForm = ({
  isOpen,
  currentName,
  onRename,
  onClose,
}: RenameFolderFormProps) => {
  const isMobile = useIsMobile();

  const form = useForm<RenameFolderFormData>({
    resolver: zodResolver(renameFolderSchema),
    defaultValues: { name: currentName },
  });

  const { handleSubmit, reset, control } = form;

  useEffect(() => {
    reset({ name: currentName });
  }, [currentName, form, reset]);

  const onSubmit = async (data: RenameFolderFormData) => {
    await onRename(data.name);
    onClose();
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
      <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
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
                variant="mobile"
                className="justify-center"
                onClick={onClose}
              >
                Cancelar
              </Button>
            </div>
            <Button onClick={handleSubmit(onSubmit)}>Renombrar</Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle>Renombrar carpeta</DialogTitle>
          <DialogDescription className="sr-only">
            Cambia el nombre de tu carpeta médica
          </DialogDescription>
        </DialogHeader>
        {formFields}
        <DialogFooter isSecondary>
          <Button variant="outline" className="rounded-full" onClick={onClose}>
            Cancelar
          </Button>
          <Button className="rounded-full" onClick={handleSubmit(onSubmit)}>
            Renombrar
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default RenameFolderForm;
