"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useIsMobile } from "@/hooks/use-mobile";
import { folderFormSchema } from "@/lib/form-schemas";
import { cn } from "@/utils";

import {
  folderIconMap,
  folderIconLabelMap,
  folderColorLabelMap,
} from "../../_lib/utils";

import type { Folder, FolderIconType } from "@/lib/types";

const iconOptions = [
  "folder",
  "health",
  "document",
  "heart",
  "vaccine",
  "prescription",
  "exam",
  "xray",
  "lab",
  "surgery",
  "mental",
  "pregnancy",
  "dentist",
  "file",
] as const;

const colors = [
  "gray",
  "blue",
  "green",
  "pink",
  "red",
  "orange",
  "purple",
] as const;

type FolderFormData = {
  name: string;
  description?: string;
  color: "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple";
  icon: FolderIconType;
};

interface FolderFormProps {
  isOpen: boolean;
  initial?: Partial<Folder>;
  onClose: () => void;
  onSubmit: (data: FolderFormData) => Promise<void>;
  isSubmitting: boolean;
}

const FolderForm = ({
  isOpen,
  initial,
  onClose,
  onSubmit,
  isSubmitting,
}: FolderFormProps) => {
  const isMobile = useIsMobile();
  const form = useForm<FolderFormData>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: initial?.name || "",
      description: initial?.description || "",
      color: initial?.color || "gray",
      icon: initial?.icon || "folder",
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    reset({
      name: initial?.name || "",
      description: initial?.description || "",
      color: initial?.color || "gray",
      icon: initial?.icon || "folder",
    });
  }, [initial, form, reset]);

  const getColorClass = (color: FolderFormData["color"]) => {
    switch (color) {
      case "gray":
        return "bg-gray-500";
      case "blue":
        return "bg-blue-500";
      case "green":
        return "bg-green-500";
      case "pink":
        return "bg-pink-400";
      case "red":
        return "bg-red-500";
      case "orange":
        return "bg-orange-400";
      case "purple":
        return "bg-purple-500";
      default:
        return "bg-muted";
    }
  };

  const FormContent = (
    <Form {...form}>
      <form className="space-y-4 p-4 md:p-6">
        <FormField
          control={control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Nombre</FormLabel>
              <FormControl>
                <Input placeholder="Nombre de la carpeta" {...field} />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="description"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Descripción</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Descripción (opcional)"
                  {...field}
                  className="resize-none"
                />
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="color"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Color</FormLabel>
              <FormControl>
                <div className="grid grid-cols-7 gap-2 rounded-lg border px-2 py-4">
                  {colors.map((c) => (
                    <button
                      key={c}
                      type="button"
                      onClick={() => field.onChange(c)}
                      className={cn(
                        "mx-auto flex size-7 items-center justify-center rounded-full transition-all",
                        getColorClass(c),
                        field.value === c
                          ? "ring-ring/50 ring-2 ring-offset-2"
                          : "opacity-70 hover:opacity-100",
                      )}
                      aria-label={folderColorLabelMap[c]}
                    >
                      {field.value === c && (
                        <CheckIcon className="animate-fade-in size-4 text-white duration-150" />
                      )}
                    </button>
                  ))}
                </div>
              </FormControl>
            </FormItem>
          )}
        />

        <FormField
          control={control}
          name="icon"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Ícono</FormLabel>
              <FormControl>
                <div className="grid grid-cols-4 gap-3">
                  {iconOptions.map((opt) => {
                    const Icon = folderIconMap[opt];
                    const isSelected = field.value === opt;

                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => field.onChange(opt)}
                        className={cn(
                          "bg-muted text-foreground/80 hover:text-foreground flex flex-col items-center justify-center rounded-lg px-3 py-2 text-xs transition-all",
                          isSelected
                            ? "bg-accent text-foreground ring-primary/50 ring-2"
                            : "hover:bg-accent",
                        )}
                        aria-label={folderIconLabelMap[opt]}
                      >
                        <Icon className="mb-1 size-4" />
                        {folderIconLabelMap[opt]}
                      </button>
                    );
                  })}
                </div>
              </FormControl>
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
            <DrawerTitle>
              {initial ? "Editar Carpeta" : "Nueva Carpeta"}
            </DrawerTitle>
            <DrawerDescription>
              {initial
                ? "Modifica los datos de tu carpeta"
                : "Crea una nueva carpeta médica"}
            </DrawerDescription>
          </DrawerHeader>

          {FormContent}

          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <Button
                disabled={isSubmitting}
                type="button"
                variant="mobile"
                onClick={onClose}
                className="justify-center"
              >
                Cancelar
              </Button>
            </div>
            <Button
              disabled={isSubmitting}
              type="button"
              variant="mobile-primary"
              onClick={handleSubmit(onSubmit)}
            >
              {initial ? "Guardar" : "Crear"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle>
            {initial ? "Editar Carpeta" : "Nueva Carpeta"}
          </DialogTitle>
          <DialogDescription>
            {initial
              ? "Modifica los datos de tu carpeta"
              : "Crea una nueva carpeta médica"}
          </DialogDescription>
        </DialogHeader>

        {FormContent}

        <DialogFooter isSecondary>
          <Button
            disabled={isSubmitting}
            variant="outline"
            onClick={onClose}
            className="rounded-full"
          >
            Cancelar
          </Button>
          <Button
            disabled={isSubmitting}
            onClick={handleSubmit(onSubmit)}
            className="rounded-full"
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                {initial ? "Guardando..." : "Creando..."}
              </>
            ) : initial ? (
              "Guardar"
            ) : (
              "Crear"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default FolderForm;
