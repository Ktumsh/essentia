"use client";

import { getYear } from "date-fns";
import { Tag, EyeOff, X, Check, Save, Loader } from "lucide-react";
import { useForm, SubmitHandler } from "react-hook-form";

// Importamos tanto los componentes de Dialog como de Drawer
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/kit/command";
import DatePicker from "@/components/kit/date-picker";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/kit/popover";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/kit/select";
import { Textarea } from "@/components/kit/textarea";
import {
  MedicalFileType,
  MedicalHistoryWithTags,
} from "@/db/querys/medical-history-querys";
import { MedicalTag } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";

import FileSlot from "./file-slot";
import { getTagColor } from "../_lib/utils";

export type MedicalHistoryFormData = {
  condition: string;
  type: MedicalFileType;
  description: string;
  issuer: string;
  documentDate: Date;
  notes: string;
  visibility: "private" | "shared";
  tags: string[];
  file: File;
};

type MedicalHistoryFormProps = {
  tags: MedicalTag[];
  initialValues?: MedicalHistoryWithTags | null;
  onSubmit: SubmitHandler<MedicalHistoryFormData>;
  onCancel: () => void;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  isEditMode?: boolean;
  isSubmitting?: boolean;
};

export default function MedicalHistoryForm({
  tags,
  initialValues,
  onSubmit,
  onCancel,
  isOpen,
  setIsOpen,
  isEditMode = false,
  isSubmitting = false,
}: MedicalHistoryFormProps) {
  const isMobile = useIsMobile();

  const form = useForm<MedicalHistoryFormData>({
    defaultValues: {
      condition: initialValues?.condition || "",
      type: initialValues?.type || "Examen",
      description: initialValues?.description || "",
      issuer: initialValues?.issuer || "",
      documentDate: initialValues?.documentDate
        ? new Date(initialValues?.documentDate)
        : new Date(),
      notes: initialValues?.notes || "",
      visibility: initialValues?.visibility || "private",
      tags:
        initialValues?.tags
          ?.map((tagName) => {
            const found = tags?.find((tag) => tag.name === tagName);
            return found ? found.id : "";
          })
          .filter(Boolean) || [],
    },
  });

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  // Contenido común del formulario
  const formContent = (
    <div className="overflow-y-auto p-4 md:p-6">
      <Form {...form}>
        <form className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <FormField
              control={control}
              name="condition"
              render={({ field }) => (
                <FormItem>
                  <FormLabel htmlFor="condition">Condición o título</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      id="condition"
                      placeholder="Ej: Examen de sangre"
                      className="dark:border-alternative md:dark:border-border md:border-border"
                    />
                  </FormControl>
                </FormItem>
              )}
            />
            <FormField
              control={control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tipo de documento</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger className="dark:border-alternative md:dark:border-border md:border-border">
                        <SelectValue placeholder="Selecciona un tipo" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Examen">Examen</SelectItem>
                        <SelectItem value="Receta">Receta</SelectItem>
                        <SelectItem value="Informe">Informe</SelectItem>
                        <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
                        <SelectItem value="Imagenología">
                          Imagenología
                        </SelectItem>
                        <SelectItem value="Certificado">Certificado</SelectItem>
                        <SelectItem value="Epicrisis">Epicrisis</SelectItem>
                        <SelectItem value="Consentimiento">
                          Consentimiento
                        </SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                </FormItem>
              )}
            />
          </div>
          <FormField
            control={control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="description">Descripción</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="description"
                    placeholder="Breve descripción del documento"
                    className="dark:border-alternative md:dark:border-border md:border-border resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="issuer"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="issuer">Emisor</FormLabel>
                <FormControl>
                  <Input
                    {...field}
                    id="issuer"
                    placeholder="Ej: Dr. García / Hospital Central"
                    className="dark:border-alternative md:dark:border-border md:border-border"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="documentDate"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="documentDate">
                  Fecha del documento
                </FormLabel>
                <FormControl>
                  <DatePicker
                    startYear={1900}
                    endYear={getYear(new Date())}
                    selected={field.value || new Date()}
                    onSelect={(date) => {
                      field.onChange(date);
                    }}
                    className="dark:border-alternative md:dark:border-border md:border-border"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="file"
            rules={
              !isEditMode ? { required: "Debes seleccionar un archivo" } : {}
            }
            render={({ field }) => (
              <FormItem>
                {isEditMode && initialValues?.file && (
                  <FileSlot
                    label="Archivo actual"
                    currentItem={initialValues}
                  />
                )}
                <FormLabel htmlFor="file">
                  {isEditMode ? "Reemplazar archivo (opcional)" : "Archivo"}
                </FormLabel>
                <FormControl>
                  <Input
                    id="file"
                    type="file"
                    onChange={(e) => {
                      if (e.target.files?.[0]) {
                        field.onChange(e.target.files[0]);
                      }
                    }}
                    className="dark:border-alternative md:dark:border-border md:border-border"
                  />
                </FormControl>
                {errors.file && (
                  <span className="text-sm text-red-500">
                    {errors.file.message}
                  </span>
                )}
                {!isEditMode && (
                  <p className="text-muted-foreground text-xs">
                    Formatos aceptados: PDF, JPG, PNG (máx. 10MB por archivo)
                  </p>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="notes">Notas personales</FormLabel>
                <FormControl>
                  <Textarea
                    {...field}
                    id="notes"
                    placeholder="Notas adicionales para tu referencia"
                    className="dark:border-alternative md:dark:border-border md:border-border resize-none"
                  />
                </FormControl>
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="tags"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="tags">Etiquetas</FormLabel>
                <FormControl>
                  <Popover>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="dark:border-alternative md:dark:border-border md:border-border w-full justify-between rounded-lg hover:opacity-100"
                      >
                        {field.value && field.value.length > 0
                          ? `${field.value.length} etiquetas seleccionadas`
                          : "Seleccionar etiquetas"}
                        <Tag className="ml-2 size-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent className="w-[300px] p-0" align="start">
                      <Command className="bg-transparent">
                        <CommandInput placeholder="Buscar etiqueta..." />
                        <CommandList>
                          <CommandEmpty>
                            No se encontraron etiquetas.
                          </CommandEmpty>
                          <CommandGroup>
                            <ScrollArea className="z-1000 h-[200px]">
                              {tags?.map((tag) => (
                                <CommandItem
                                  key={tag.id}
                                  onSelect={() => {
                                    if (field.value?.includes(tag.id)) {
                                      field.onChange(
                                        field.value.filter((t) => t !== tag.id),
                                      );
                                    } else {
                                      field.onChange([...field.value, tag.id]);
                                    }
                                  }}
                                  className="cursor-pointer"
                                >
                                  <div
                                    className={cn(
                                      "mr-2 flex size-4 items-center justify-center rounded-[6px] border",
                                      field.value?.includes(tag.id)
                                        ? "bg-primary border-primary"
                                        : "opacity-50",
                                    )}
                                  >
                                    {field.value?.includes(tag.id) && (
                                      <Check className="text-primary-foreground size-2.5" />
                                    )}
                                  </div>
                                  {tag.name}
                                </CommandItem>
                              ))}
                            </ScrollArea>
                          </CommandGroup>
                        </CommandList>
                        <div className="border-t">
                          <Button
                            variant="ghost"
                            size="sm"
                            radius="none"
                            className="w-full justify-center"
                            onClick={() => field.onChange([])}
                          >
                            Limpiar selección
                          </Button>
                        </div>
                      </Command>
                    </PopoverContent>
                  </Popover>
                </FormControl>
                {field.value && field.value.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-2">
                    {field.value.map((tagId) => {
                      const tag = tags.find((t) => t.id === tagId);
                      return (
                        <Badge
                          key={tagId}
                          variant="outline"
                          className={cn(
                            "flex items-center gap-1",
                            getTagColor(tag!.name),
                          )}
                        >
                          {tag?.name}
                          <button
                            onClick={() =>
                              field.onChange(
                                field.value.filter((t) => t !== tagId),
                              )
                            }
                            className="ml-1 rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                          >
                            <X className="h-3 w-3" />
                          </button>
                        </Badge>
                      );
                    })}
                  </div>
                )}
              </FormItem>
            )}
          />
          <FormField
            control={control}
            name="visibility"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="visibility">Visibilidad</FormLabel>
                <FormControl>
                  <Select
                    {...field}
                    value={field.value}
                    onValueChange={field.onChange}
                  >
                    <SelectTrigger className="dark:border-alternative md:dark:border-border md:border-border">
                      <SelectValue placeholder="Selecciona la visibilidad" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="private">
                        <div className="flex items-center">
                          <EyeOff className="mr-2 h-4 w-4" />
                          Privado (solo tú)
                        </div>
                      </SelectItem>
                      <SelectItem value="shared">
                        <div className="flex items-center">
                          <EyeOff className="mr-2 h-4 w-4" />
                          Compartido (con profesionales autorizados)
                        </div>
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </FormControl>
              </FormItem>
            )}
          />
        </form>
      </Form>
    </div>
  );

  // Renderizamos condicionalmente según el dispositivo
  return isMobile ? (
    <Drawer open={isOpen} onOpenChange={setIsOpen}>
      <DrawerContent>
        <DrawerHeader>
          <DrawerTitle>
            {isEditMode ? "Editar" : "Añadir"} documento médico
          </DrawerTitle>
        </DrawerHeader>
        <DrawerDescription className="p-4">
          {isEditMode
            ? "Modifica la información del documento médico."
            : "Completa la información del documento médico que deseas añadir."}
        </DrawerDescription>
        {formContent}
        <DrawerFooter>
          <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
            <Button
              disabled={isSubmitting}
              variant="mobile"
              onClick={onCancel}
              className="justify-center"
            >
              Cancelar
            </Button>
          </div>
          <Button
            disabled={isSubmitting}
            variant="mobile-danger"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Save />
                Guardar documento
              </>
            )}
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  ) : (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogContent isSecondary className="sm:max-w-xl">
        <DialogHeader isSecondary className="p-6!">
          <DialogTitle>
            {isEditMode ? "Editar" : "Añadir"} documento médico
          </DialogTitle>
          <DialogDescription>
            {isEditMode
              ? "Modifica la información del documento médico."
              : "Completa la información del documento médico que deseas añadir."}
          </DialogDescription>
        </DialogHeader>
        {formContent}
        <DialogFooter isSecondary>
          <Button
            disabled={isSubmitting}
            variant="outline"
            radius="full"
            onClick={onCancel}
          >
            Cancelar
          </Button>
          <Button
            disabled={isSubmitting}
            radius="full"
            onClick={handleSubmit(onSubmit)}
          >
            {isSubmitting ? (
              <Loader className="animate-spin" />
            ) : (
              <>
                <Save />
                Guardar documento
              </>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
