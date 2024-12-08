"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import { Loader } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import DatePicker from "@/components/ui/date-picker";
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
  FormMessage,
} from "@/components/ui/form";
import { Input, NumberInput } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/db/querys/profile-querys";
import { UserProfileData } from "@/types/session";

import { ProfileFormData, profileSchema } from "../lib/utils";

interface EditProfileFormProps {
  profileData: UserProfileData | null;
  isOwnProfile: boolean;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  setDisplayData: Dispatch<SetStateAction<UserProfileData | null>>;
}

const EditProfileForm = ({
  profileData,
  isOwnProfile,
  isOpen,
  setIsOpen,
  setDisplayData,
}: EditProfileFormProps) => {
  const router = useRouter();
  const isMobile = useIsMobile();
  const [isPending, startTransition] = useTransition();

  const {
    id,
    username,
    firstName,
    lastName,
    birthdate,
    bio,
    genre,
    weight,
    height,
    location,
  } = profileData || {};

  const prepareDefaultValues = (): ProfileFormData => ({
    firstName: firstName || "",
    lastName: lastName || "",
    username: username || "",
    birthdate: birthdate!,
    bio: bio || "",
    genre: genre || "",
    weight: weight ?? null,
    height: height ?? null,
    location: location || "",
  });

  const defaultValues = prepareDefaultValues();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { handleSubmit, control } = form;

  const onError = (errors: FieldErrors<ProfileFormData>) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor corrige los errores en el formulario.");
    }
  };

  const onSubmit = useCallback(
    (data: ProfileFormData) => {
      startTransition(async () => {
        try {
          const result = await updateUserProfile({ userId: id, ...data });
          if (result.error) {
            throw new Error(result.error);
          }
          toast.success("Tu perfil ha sido actualizado.");

          setIsOpen(false);

          setDisplayData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              ...data,
            };
          });

          if (data.username !== profileData?.username) {
            router.replace(`/profile/${data.username}`);
          }
        } catch (error) {
          console.error("Error al actualizar el perfil:", error);
          toast.error("Error al actualizar el perfil.");
        }
      });
    },
    [
      startTransition,
      setIsOpen,
      setDisplayData,
      id,
      profileData?.username,
      router,
    ],
  );

  const Content = useCallback(() => {
    return (
      <Form {...form}>
        <form className="w-full md:space-y-4">
          <div className="w-full space-y-6 p-6">
            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="firstName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Nombre</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingresa tu nombre" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />

              <FormField
                control={control}
                name="lastName"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Apellido</FormLabel>
                    <FormControl>
                      <Input {...field} placeholder="Ingresa tu apellido" />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="username"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Nombre de usuario</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingresa tu nombre de usuario"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="birthdate"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Fecha de nacimiento</FormLabel>
                  <FormControl>
                    <DatePicker
                      startYear={1900}
                      endYear={getYear(new Date())}
                      selected={field.value}
                      onSelect={(date: Date) => field.onChange(date)}
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="bio"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Biografía</FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Cuéntanos algo sobre ti"
                      maxLength={160}
                      className="min-h-20 w-full resize-none"
                    />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <FormField
              control={control}
              name="genre"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Género</FormLabel>
                  <FormControl>
                    <Select
                      {...field}
                      value={field.value}
                      onValueChange={field.onChange}
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selecciona tu género">
                          {field.value}
                        </SelectValue>
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Masculino">Masculino</SelectItem>
                        <SelectItem value="Femenino">Femenino</SelectItem>
                        <SelectItem value="Otro">Otro</SelectItem>
                      </SelectContent>
                    </Select>
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />

            <div className="grid grid-cols-2 gap-4">
              <FormField
                control={control}
                name="weight"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Peso (kg)</FormLabel>
                    <FormControl>
                      <NumberInput
                        {...field}
                        value={field.value}
                        min={1}
                        max={300}
                        placeholder="Ingresa tu peso"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? null : parseFloat(value),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="height"
                render={({ field, fieldState }) => (
                  <FormItem>
                    <FormLabel>Estatura (cm)</FormLabel>
                    <FormControl>
                      <NumberInput
                        {...field}
                        value={field.value}
                        min={40}
                        max={250}
                        placeholder="Ingresa tu estatura"
                        onChange={(e) => {
                          const value = e.target.value;
                          field.onChange(
                            value === "" ? null : parseFloat(value),
                          );
                        }}
                      />
                    </FormControl>
                    <FormMessage>{fieldState.error?.message}</FormMessage>
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={control}
              name="location"
              render={({ field, fieldState }) => (
                <FormItem>
                  <FormLabel>Ubicación</FormLabel>
                  <FormControl>
                    <Input {...field} placeholder="Ingresa tu ubicación" />
                  </FormControl>
                  <FormMessage>{fieldState.error?.message}</FormMessage>
                </FormItem>
              )}
            />
          </div>
        </form>
      </Form>
    );
  }, [form, control]);

  if (isOwnProfile) {
    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader className="gap-0 border-b border-gray-200 p-0 dark:border-dark">
              <DrawerTitle>Editar perfil</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="overflow-y-auto">
              <Content />
            </ScrollArea>
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DrawerClose>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleSubmit(onSubmit, onError)}
              >
                {isPending && <Loader className="size-4 animate-spin" />}
                {isPending ? "Guardando" : "Guardar"}
              </Button>
            </DrawerFooter>
          </DrawerContent>
        </Drawer>
      );
    } else {
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent isSecondary>
            <ScrollArea className="overflow-y-auto">
              <DialogHeader isSecondary>
                <DialogTitle>Editar perfil</DialogTitle>
                <DialogDescription className="sr-only">
                  Editar perfil
                </DialogDescription>
              </DialogHeader>
              <Content />
            </ScrollArea>
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button
                variant="destructive"
                disabled={isPending}
                onClick={handleSubmit(onSubmit, onError)}
              >
                {isPending && <Loader className="size-4 animate-spin" />}
                {isPending ? "Guardando" : "Guardar"}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
  }
};

export default EditProfileForm;
