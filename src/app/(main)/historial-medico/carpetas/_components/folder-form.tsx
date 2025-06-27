"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { CheckIcon, Loader, Save } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/ui/button";
import {
  Drawer,
  DrawerClose,
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
import { type FolderFormData, folderFormSchema } from "@/lib/form-schemas";
import { cn } from "@/utils";

import {
  folderIconMap,
  folderIconLabelMap,
  folderColorLabelMap,
  getColorClass,
} from "../../_lib/utils";

import type { Folder } from "@/lib/types";

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

interface FolderFormProps {
  isOpen: boolean;
  initialValues: Partial<Folder> | null;
  onOpenChange: (open: boolean) => void;
  onSubmit: (data: FolderFormData) => Promise<void>;
  isEditMode?: boolean;
  isSubmitting: boolean;
}

const FolderForm = ({
  isOpen,
  initialValues,
  onOpenChange,
  onSubmit,
  isEditMode = false,
  isSubmitting,
}: FolderFormProps) => {
  const isMobile = useIsMobile();
  const form = useForm<FolderFormData>({
    resolver: zodResolver(folderFormSchema),
    defaultValues: {
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      color: initialValues?.color || "gray",
      icon: initialValues?.icon || "folder",
    },
  });

  const { control, handleSubmit, reset } = form;

  useEffect(() => {
    if (!isOpen) return;

    if (!initialValues) {
      reset();
      return;
    }
    reset({
      name: initialValues?.name || "",
      description: initialValues?.description || "",
      color: initialValues?.color || "gray",
      icon: initialValues?.icon || "folder",
    });
  }, [isOpen, initialValues, form, reset]);

  const FormContent = (
    <Form {...form}>
      <form className="space-y-6 p-4">
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

  return (
    <Drawer
      open={isOpen}
      onOpenChange={onOpenChange}
      direction={isMobile ? "bottom" : "right"}
      handleOnly={!isMobile}
    >
      <DrawerContent className="md:bg-background data-[vaul-drawer-direction=right]:inset-y-0 data-[vaul-drawer-direction=right]:right-0 data-[vaul-drawer-direction=right]:w-screen data-[vaul-drawer-direction=right]:max-w-md data-[vaul-drawer-direction=right]:rounded-none data-[vaul-drawer-direction=right]:p-0 md:border-l">
        <DrawerHeader className="items-center md:items-start md:p-4">
          <DrawerTitle className="flex items-center gap-2 truncate md:max-w-full md:p-0 md:text-base md:leading-normal">
            {isEditMode ? "Editar Carpeta" : "Nueva Carpeta"}
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground sr-only md:not-sr-only">
            {isEditMode
              ? "Modifica los datos de tu carpeta"
              : "Crea una nueva carpeta médica"}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerDescription className="p-4 md:sr-only">
          {isEditMode
            ? "Modifica los datos de tu carpeta"
            : "Crea una nueva carpeta médica"}
        </DrawerDescription>
        {FormContent}

        <DrawerFooter>
          {isMobile ? (
            <>
              <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
                <DrawerClose asChild>
                  <Button
                    disabled={isSubmitting}
                    type="button"
                    variant="mobile"
                    className="justify-center"
                  >
                    Cancelar
                  </Button>
                </DrawerClose>
              </div>
              <Button
                disabled={isSubmitting}
                type="button"
                variant="mobile-primary"
                onClick={handleSubmit(onSubmit)}
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" />
                    {isEditMode ? "Guardando..." : "Creando..."}
                  </>
                ) : (
                  <>
                    <Save />
                    {isEditMode ? "Guardar" : "Crear"} carpeta
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={isSubmitting}
                onClick={handleSubmit(onSubmit)}
                className="rounded-full"
              >
                {isSubmitting ? (
                  <>
                    <Loader className="animate-spin" />
                    {isEditMode ? "Guardando..." : "Creando..."}
                  </>
                ) : (
                  <>
                    <Save />
                    {isEditMode ? "Guardar" : "Crear"} carpeta
                  </>
                )}
              </Button>
              <DrawerClose asChild>
                <Button
                  disabled={isSubmitting}
                  variant="outline"
                  className="rounded-full"
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default FolderForm;
