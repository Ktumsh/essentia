"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { getYear } from "date-fns";
import { Loader, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import { Dispatch, SetStateAction, useCallback, useTransition } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

import { Button } from "@/components/kit/button";
import DatePicker from "@/components/kit/date-picker";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/kit/form";
import { Input, NumberInput } from "@/components/kit/input";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { Textarea } from "@/components/kit/textarea";
import { updateUserProfile } from "@/db/querys/profile-querys";
import { getUserByUsername } from "@/db/querys/user-querys";
import { useIsMobile } from "@/hooks/use-mobile";
import { useUserProfile } from "@/hooks/use-user-profile";
import { ProfileFormData, profileSchema } from "@/lib/form-schemas";
import { UserProfileData } from "@/types/auth";
import { getMessageFromCode, ResultCode } from "@/utils/errors";

import {
  PopoverBioFormat,
  PopoverHeightFormat,
  PopoverLocationFormat,
  PopoverWeightFormat,
} from "./info-popover";

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

  const { setUser } = useUserProfile();

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
    bio: bio ?? "",
    genre: genre ?? "",
    weight: weight ?? null,
    height: height ?? null,
    location: location ?? "",
  });

  const defaultValues = prepareDefaultValues();

  const form = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues,
  });

  const { handleSubmit, control, setError, reset } = form;

  const onError = (errors: FieldErrors<ProfileFormData>) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor corrige los errores en el formulario.");
    }
  };

  const onSubmit = useCallback(
    (data: ProfileFormData) => {
      startTransition(async () => {
        try {
          const user = await getUserByUsername(data.username);
          if (user.length > 0 && user[0].id !== id) {
            setError("username", {
              type: "manual",
              message: getMessageFromCode(ResultCode.USERNAME_EXISTS),
            });
            toast.error("Por favor corrige los errores en el formulario.");
            return;
          }

          const result = await updateUserProfile({
            userId: id,
            ...data,
            bio: data.bio?.trim() === "" ? null : data.bio,
            genre: data.genre?.trim() === "" ? null : data.genre,
            location: data.location?.trim() === "" ? null : data.location,
          });
          if (result.error) {
            throw new Error(result.error);
          }
          toast.success("Tu perfil ha sido actualizado.");
          setUser((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              ...data,
            };
          });
          setDisplayData((prev) => {
            if (!prev) return null;
            return {
              ...prev,
              ...data,
            };
          });

          if (data.username !== profileData?.username) {
            router.replace("/profile");
          }

          setIsOpen(false);
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
      setUser,
      setError,
      id,
      profileData?.username,
      router,
    ],
  );

  const Content = useCallback(() => {
    return (
      <Form {...form}>
        <form className="w-full md:space-y-4">
          <div className="w-full space-y-6 p-4 md:p-6">
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
                  <div className="inline-flex items-center gap-1.5">
                    <FormLabel>Instrucciones personalizadas</FormLabel>
                    <PopoverBioFormat />
                  </div>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Cuéntanos algo sobre ti"
                      maxLength={2000}
                      className="h-20 max-h-20 w-full resize-none text-sm"
                    />
                  </FormControl>
                  <p>
                    <span className="text-foreground/60 text-xs">
                      {field.value?.length}/2000
                    </span>
                  </p>
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
                      <SelectTrigger className="mb-0">
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
                    <div className="inline-flex items-center gap-1.5">
                      <FormLabel>Peso (kg)</FormLabel>
                      <PopoverWeightFormat />
                    </div>
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
                    <div className="inline-flex items-center gap-1.5">
                      <FormLabel>Estatura (cm)</FormLabel>
                      <PopoverHeightFormat />
                    </div>
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
                  <div className="inline-flex items-center gap-1.5">
                    <FormLabel>Ubicación</FormLabel>
                    <PopoverLocationFormat />
                  </div>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Ingresa tu ubicación"
                      maxLength={50}
                    />
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
            <DrawerHeader>
              <DrawerTitle>Editar perfil</DrawerTitle>
            </DrawerHeader>
            <ScrollArea className="overflow-y-auto">
              <Content />
            </ScrollArea>
            <DrawerFooter>
              <Button
                variant="mobile-danger"
                disabled={isPending}
                onClick={handleSubmit(onSubmit, onError)}
              >
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <>
                    <Save />
                    Guardar
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
          <DialogContent isSecondary className="overflow-visible">
            <DialogHeader isSecondary>
              <DialogTitle className="mb-0">Editar perfil</DialogTitle>
              <DialogDescription className="sr-only">
                Editar perfil
              </DialogDescription>
            </DialogHeader>
            <ScrollArea className="overflow-y-auto">
              <Content />
            </ScrollArea>
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button
                  variant="outline"
                  radius="full"
                  onClick={() => reset(defaultValues)}
                >
                  Cancelar
                </Button>
              </DialogClose>
              <Button
                disabled={isPending}
                radius="full"
                onClick={handleSubmit(onSubmit, onError)}
              >
                {isPending ? (
                  <Loader className="size-4 animate-spin" />
                ) : (
                  <>
                    Guardar
                    <Save />
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      );
    }
  }
};

export default EditProfileForm;
