"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import { Tag, X, Check, Save, Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandInput,
  CommandList,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/components/ui/command";
import DatePicker from "@/components/ui/date-picker";
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
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { MedicalHistory } from "@/db/querys/medical-history-querys";
import { MedicalTag } from "@/db/schema";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  medicalHistoryAddSchema,
  medicalHistoryEditSchema,
  type MedicalHistoryAddSchema,
  type MedicalHistoryEditSchema,
} from "@/lib/form-schemas";
import { Folder } from "@/lib/types";
import { cn } from "@/utils";

import FileSlot from "./file-slot";
import FileUploader from "./file-uploader";
import { getTagColor } from "../_lib/utils";

export type DocumentFormSchema =
  | MedicalHistoryAddSchema
  | MedicalHistoryEditSchema;

type DocumentFormProps = {
  tags: MedicalTag[];
  folders: Folder[];
  initialValues?: MedicalHistory | null;
  onSubmit: SubmitHandler<DocumentFormSchema>;
  onCancel: () => void;
  isOpen: boolean;
  onOpenChange: (isOpen: boolean) => void;
  isEditMode?: boolean;
  isSubmitting?: boolean;
};

const DocumentForm = ({
  tags,
  folders,
  initialValues,
  onSubmit,
  onCancel,
  isOpen,
  onOpenChange,
  isEditMode = false,
  isSubmitting = false,
}: DocumentFormProps) => {
  const isMobile = useIsMobile();

  const form = useForm<DocumentFormSchema>({
    resolver: zodResolver(
      isEditMode ? medicalHistoryEditSchema : medicalHistoryAddSchema,
    ),
    defaultValues: {
      condition: "",
      type: "Examen",
      description: "",
      issuer: "",
      documentDate: new Date(),
      notes: "",
      visibility: "private",
      tags: [],
      folderId: null,
      file: undefined,
    },
  });

  const {
    handleSubmit,
    control,
    reset,
    formState: { errors },
  } = form;

  useEffect(() => {
    if (!isOpen) return;

    if (isEditMode && initialValues) {
      reset({
        condition: initialValues?.condition ?? "",
        type: initialValues?.type ?? "Examen",
        description: initialValues?.description ?? "",
        issuer: initialValues?.issuer ?? "",
        documentDate: initialValues?.documentDate
          ? new Date(initialValues.documentDate)
          : new Date(),
        notes: initialValues?.notes ?? "",
        visibility: initialValues?.visibility ?? "private",
        tags:
          initialValues?.tags
            .map((tagName) => {
              const found = tags.find((t) => t.name === tagName);
              return found ? found.id : "";
            })
            .filter(Boolean) || [],
        folderId: initialValues?.folderId ?? null,
        file: undefined,
      });
    } else {
      reset();
    }
  }, [isOpen, isEditMode, initialValues, reset, tags]);

  const formContent = (
    <div className="overflow-y-auto p-4">
      <Form {...form}>
        <form className="space-y-6">
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
                    className="mb-6"
                  />
                )}
                <FormLabel>
                  {isEditMode
                    ? "Reemplazar archivo actual (opcional)"
                    : "Archivo"}
                </FormLabel>
                <FormControl>
                  <FormControl>
                    <FileUploader
                      onFileSelect={(file) => field.onChange(file)}
                    />
                  </FormControl>
                </FormControl>
                {errors.file && (
                  <span className="text-sm text-red-500">
                    {errors.file.message}
                  </span>
                )}
                {!isEditMode && (
                  <p className="text-muted-foreground text-xs">
                    Formatos aceptados: PDF, JPEG, JPG, PNG o WEBP (máx. 10 MB
                    por archivo)
                  </p>
                )}
              </FormItem>
            )}
          />
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
                    <SelectContent disablePortal>
                      <SelectItem value="Examen">Examen</SelectItem>
                      <SelectItem value="Receta">Receta</SelectItem>
                      <SelectItem value="Informe">Informe</SelectItem>
                      <SelectItem value="Diagnóstico">Diagnóstico</SelectItem>
                      <SelectItem value="Imagenología">Imagenología</SelectItem>
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
            name="folderId"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Carpeta</FormLabel>
                <FormControl>
                  <Select
                    value={field.value || "none"}
                    onValueChange={(val) =>
                      field.onChange(val === "none" ? null : val)
                    }
                  >
                    <SelectTrigger className="dark:border-alternative md:dark:border-border md:border-border">
                      <SelectValue placeholder="Sin carpeta asignada" />
                    </SelectTrigger>
                    <SelectContent disablePortal>
                      <SelectItem value="none">Sin carpeta</SelectItem>
                      {folders.map((f) => (
                        <SelectItem key={f.id} value={f.id}>
                          {f.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
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
                    disablePortal
                    className="dark:border-alternative md:dark:border-border md:border-border"
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
                <FormLabel htmlFor="tags">Etiquetas (opcional)</FormLabel>
                <FormControl>
                  <Popover modal={false}>
                    <PopoverTrigger asChild>
                      <Button
                        variant="outline"
                        className="dark:border-alternative md:dark:border-border md:border-border w-full justify-between rounded-lg hover:opacity-100"
                      >
                        {field.value && field.value.length > 0
                          ? `${field.value.length} etiquetas seleccionadas`
                          : "Seleccionar etiquetas"}
                        <Tag className="size-4 shrink-0 opacity-50" />
                      </Button>
                    </PopoverTrigger>
                    <PopoverContent
                      className="w-[300px] p-0"
                      align="start"
                      disablePortal
                    >
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
                                      field.onChange([
                                        ...(field.value || []),
                                        tag.id,
                                      ]);
                                    }
                                  }}
                                  className="cursor-pointer"
                                >
                                  <div
                                    className={cn(
                                      "border-alternative mr-2 flex size-4 items-center justify-center rounded-[6px] border",
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
                          className={cn(
                            "pr-1 font-normal text-white",
                            getTagColor(tag!.name),
                          )}
                        >
                          {tag?.name}
                          <button
                            onClick={() =>
                              field.onChange(
                                field.value?.filter((t) => t !== tagId),
                              )
                            }
                            className="rounded-full p-0.5 hover:bg-black/10 dark:hover:bg-white/10"
                          >
                            <X className="size-3" />
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
            name="notes"
            render={({ field }) => (
              <FormItem>
                <FormLabel htmlFor="notes">
                  Notas personales (opcional)
                </FormLabel>
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
        </form>
      </Form>
    </div>
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
            {isEditMode ? "Editar" : "Crear"} Documento
          </DrawerTitle>
          <DrawerDescription className="text-muted-foreground sr-only md:not-sr-only">
            {isEditMode
              ? "Modifica la información del documento."
              : "Completa la información del documento que deseas crear."}
          </DrawerDescription>
        </DrawerHeader>
        <DrawerDescription className="p-4 md:sr-only">
          {isEditMode
            ? "Modifica la información del documento."
            : "Completa la información del documento que deseas crear."}
        </DrawerDescription>
        {formContent}
        <DrawerFooter className="md:gap-2">
          {isMobile ? (
            <>
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
                    {isEditMode ? "Guardar" : "Crear"} documento
                  </>
                )}
              </Button>
            </>
          ) : (
            <>
              <Button
                disabled={isSubmitting}
                radius="full"
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
                    {isEditMode ? "Guardar" : "Crear"} documento
                  </>
                )}
              </Button>
              <Button
                disabled={isSubmitting}
                variant="outline"
                radius="full"
                onClick={onCancel}
              >
                Cancelar
              </Button>
            </>
          )}
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  );
};

export default DocumentForm;
