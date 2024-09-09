import {
  FC,
  useCallback,
  useEffect,
  memo,
  useTransition,
  useState,
} from "react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Button,
  Textarea,
  DateInput,
} from "@nextui-org/react";
import Link from "next/link";
import {
  CalendarFillIcon,
  CalendarIcon,
  LocationIcon,
} from "@/modules/icons/status";

import { UserProfileData } from "@/types/session";
import { updateUserProfile } from "@/app/(main)/profile/actions";
import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/react";
import Image from "next/image";
import FormInput from "./form-input";
import { useProfileForm } from "../hooks/use-profile-form";
import ProfileImageUploader from "./profile-image-uploader";
import { SpinnerIcon } from "@/modules/icons/common";
import { formatCreatedAt, uploadFile } from "../lib/utils";

interface ProfileInfoProps {
  profileData: UserProfileData | null;
  onProfileUpdate: (newBanner: string | null) => void;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  profileData,
  onProfileUpdate,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const {
    formData,
    handleInputChange,
    handleDateChange,
    handleFileChange,
    handleFilePreview,
    setEditFormData,
    resetForm,
    previewProfileImage,
    previewBannerImage,
  } = useProfileForm(profileData);

  const createdAt = profileData && formatCreatedAt(profileData.created_at);

  useEffect(() => {
    if (isOpen) {
      resetForm();
    }
  }, [isOpen, resetForm, formData]);

  const onSubmit = useCallback(() => {
    startTransition(async () => {
      try {
        if (!formData.user_id) {
          throw new Error("El ID del usuario no está definido.");
        }
        const data: Partial<UserProfileData> = {
          id: formData.user_id,
          first_name: formData.first_name,
          last_name: formData.last_name,
          username: formData.username,
          birthdate: formData.birthdate
            ? formData.birthdate.toString()
            : undefined,
          bio: formData.bio,
          location: formData.location,
        };

        let profileImageUrl = formData.profile_image;
        let bannerImageUrl = formData.banner_image;

        if (formData.profile_image_file) {
          profileImageUrl = await uploadFile(
            formData.profile_image_file,
            "profile",
            formData.user_id
          );
        }

        if (formData.banner_image_file) {
          bannerImageUrl = await uploadFile(
            formData.banner_image_file,
            "banner",
            formData.user_id
          );
          onProfileUpdate(bannerImageUrl);
        }

        data.profile_image = profileImageUrl;
        data.banner_image = bannerImageUrl;

        const updatedProfile = await updateUserProfile(data);
        if (updatedProfile.error) {
          throw new Error(updatedProfile.error);
        }

        toast.success("Tu perfil ha sido actualizado.");
        onOpenChange();
      } catch (error) {
        startTransition(() => {});
        console.error("Error al actualizar el perfil", error);
        toast.error("Error al actualizar el perfil.");
      }
    });
  }, [formData, onProfileUpdate, onOpenChange]);

  const onCancel = useCallback(() => {
    // Restauramos el estado original si el usuario cancela
    setEditFormData(profileData); // Restauramos el formData original
    resetForm(); // Reseteamos el formulario
    onOpenChange(); // Cerramos el modal
  }, [resetForm, onOpenChange, setEditFormData, profileData]);
  return (
    <>
      <div className="px-4 md:px-8 py-3 space-y-3 md:space-y-6">
        {/* Foto de perfil y botón editar */}
        <div className="relative">
          <div className="absolute -top-9 md:-top-14 left-0 md:left-6">
            <div className="z-0 size-full bg-gray-200 dark:bg-base-dark border-5 border-white dark:border-base-full-dark rounded-full overflow-hidden">
              <Link
                href={`/profile/${formData.username}/photo`}
                className="relative flex shrink-0 overflow-hidden rounded-full size-20 md:size-32"
              >
                <Image
                  width={120}
                  height={120}
                  priority
                  src={formData.profile_image || ""}
                  alt="Abrir foto"
                  className="aspect-square h-full w-full"
                />
              </Link>
            </div>
          </div>
          <div className="ml-24 md:ml-44 flex justify-between items-start">
            <div className="inline-flex flex-col">
              <h2 className="md:text-xl font-bold text-base-color dark:text-base-color-dark">{`${formData.first_name} ${formData.last_name}`}</h2>
              <span className="text-xs md:text-sm text-base-color-m dark:text-base-color-dark-m">
                @{formData.username}
              </span>
            </div>
            <Button
              variant="ghost"
              color="default"
              radius="full"
              onPress={onOpen}
              className="border-gray-200 dark:border-base-dark hover:!bg-gray-200 dark:hover:!bg-base-dark text-base-color dark:text-base-color-dark font-bold"
            >
              Editar perfil
            </Button>
          </div>
        </div>
        {/* Información del perfil */}
        <div className="py-6 space-y-6">
          <div>
            <h3 className="mb-2 font-semibold md:text-lg text-base-color dark:text-base-color-dark">
              Acerca de mí
            </h3>
            <p className="text-sm text-base-color-m dark:text-base-color-dark-m">
              {formData.bio}
            </p>
          </div>
          <div className="grid gap-4 text-base-color-m dark:text-base-color-dark-m">
            <div className="flex items-center space-x-2 text-sm">
              <LocationIcon className="size-4 text-base-color-m dark:text-base-color-dark-m" />
              <span>{formData.location}</span>
            </div>
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="size-4 text-base-color-m dark:text-base-color-dark-m" />
              <span>Te uniste en {createdAt}</span>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de edición */}
      <Modal
        placement="center"
        scrollBehavior="inside"
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="sm"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "bg-white dark:bg-base-full-dark",
          body: "gap-0 px-0 py-0 pb-16 custom-scroll v2",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar perfil</ModalHeader>
              <ModalBody>
                <ProfileImageUploader
                  type="banner"
                  imageUrl={previewBannerImage}
                  onFileChange={(e) => {
                    handleFileChange(e, "banner");
                    if (e.target.files?.[0]) {
                      handleFilePreview(e.target.files[0], "banner");
                    }
                  }}
                />
                <ProfileImageUploader
                  type="profile"
                  imageUrl={previewProfileImage}
                  onFileChange={(e) => {
                    handleFileChange(e, "profile");
                    if (e.target.files?.[0]) {
                      handleFilePreview(e.target.files[0], "profile");
                    }
                  }}
                />
                <FormInput
                  name="first_name"
                  label="Nombre"
                  value={formData.first_name}
                  onChange={handleInputChange}
                />
                <FormInput
                  name="last_name"
                  label="Apellido"
                  value={formData.last_name}
                  onChange={handleInputChange}
                />
                <FormInput
                  name="username"
                  label="Nombre de usuario"
                  value={formData.username}
                  onChange={handleInputChange}
                />
                <Textarea
                  name="bio"
                  label="Biografía"
                  maxLength={160}
                  value={formData.bio ?? ""}
                  onChange={handleInputChange}
                  description="Máximo 160 caracteres"
                  variant="bordered"
                  color="danger"
                  radius="sm"
                  classNames={{
                    base: "px-4 py-3",
                    input: "text-base-color dark:text-base-color-dark",
                    inputWrapper:
                      "border-gray-200 data-[hover=true]:border-gray-200 dark:border-base-dark dark:data-[hover=true]:border-base-dark",
                  }}
                />
                <FormInput
                  name="location"
                  label="Ubicación"
                  maxLength={30}
                  value={formData.location ?? ""}
                  onChange={handleInputChange}
                  description="Máximo 30 caracteres"
                />
                <DateInput
                  id="birthdate"
                  description={"Este es mi cumpleaños"}
                  errorMessage="Por favor, ingresa una fecha válida"
                  label={"Fecha de nacimiento"}
                  value={formData.birthdate}
                  onChange={handleDateChange}
                  color="danger"
                  variant="bordered"
                  startContent={<CalendarFillIcon className="size-4" />}
                  classNames={{
                    base: "px-4 py-3",
                    label:
                      "text-xs text-bittersweet-400 dark:text-cerise-red-600",
                    segment:
                      "data-[editable=true]:text-base-color dark:data-[editable=true]:text-base-color-dark data-[editable=true]:data-[placeholder=true]:text-base-color-m dark:data-[editable=true]:data-[placeholder=true]:text-base-color-dark-m",
                    inputWrapper:
                      "border-gray-200 dark:border-base-dark hover:border-gray-200 dark:hover:border-base-dark",
                    innerWrapper:
                      "text-base-color-m dark:text-base-color-dark-m",
                  }}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  onPress={onCancel}
                  variant="bordered"
                  className="rounded-md border border-gray-200 dark:border-base-dark data-[hover=true]:bg-gray-200 dark:data-[hover=true]:bg-base-dark"
                >
                  Cancelar
                </Button>
                <Button
                  color="danger"
                  onPress={onSubmit}
                  className="rounded-md"
                  isDisabled={isPending}
                  aria-disabled={isPending}
                  startContent={
                    isPending ? (
                      <SpinnerIcon className="size-4 animate-spin" />
                    ) : null
                  }
                >
                  {isPending ? "Guardando..." : "Guardar"}
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default memo(ProfileInfo);
