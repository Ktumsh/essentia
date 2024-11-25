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
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { updateUserProfile } from "@/db/profile-querys";
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

  const { id } = profileData || {};

  const prepareDefaultValues = (
    profileData: UserProfileData | null,
  ): ProfileFormData => ({
    first_name: profileData?.first_name || "",
    last_name: profileData?.last_name || "",
    username: profileData?.username || "",
    birthdate: profileData?.birthdate
      ? new Date(profileData.birthdate)
      : new Date(),
    bio: profileData?.bio || "",
    location: profileData?.location || "",
  });

  const defaultValues = prepareDefaultValues(profileData);

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
          const result = await updateUserProfile({ id, ...data });
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
        <form
          onSubmit={handleSubmit(onSubmit, onError)}
          className="w-full md:space-y-4"
        >
          <div className="w-full space-y-6 p-6">
            <FormField
              control={control}
              name="first_name"
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
              name="last_name"
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
          </div>
          {isMobile ? (
            <DrawerFooter>
              <DrawerClose asChild>
                <Button variant="secondary">Cancelar</Button>
              </DrawerClose>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending && <Loader className="size-4 animate-spin" />}
                {isPending ? "Guardando" : "Guardar"}
              </Button>
            </DrawerFooter>
          ) : (
            <DialogFooter isSecondary>
              <DialogClose asChild>
                <Button variant="outline">Cancelar</Button>
              </DialogClose>
              <Button type="submit" variant="destructive" disabled={isPending}>
                {isPending && <Loader className="size-4 animate-spin" />}
                {isPending ? "Guardando" : "Guardar"}
              </Button>
            </DialogFooter>
          )}
        </form>
      </Form>
    );
  }, [form, handleSubmit, onSubmit, isPending, control, isMobile]);

  if (isOwnProfile) {
    if (isMobile) {
      return (
        <Drawer open={isOpen} onOpenChange={setIsOpen}>
          <DrawerContent>
            <DrawerHeader className="gap-0 border-b border-gray-200 p-0 dark:border-dark">
              <DrawerTitle>Editar perfil</DrawerTitle>
            </DrawerHeader>
            <Content />
          </DrawerContent>
        </Drawer>
      );
    } else {
      return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
          <DialogContent isSecondary className="overflow-y-auto">
            <DialogHeader isSecondary>
              <DialogTitle>Editar perfil</DialogTitle>
              <DialogDescription className="sr-only">
                Editar perfil
              </DialogDescription>
            </DialogHeader>
            <Content />
          </DialogContent>
        </Dialog>
      );
    }
  }
};

export default EditProfileForm;
