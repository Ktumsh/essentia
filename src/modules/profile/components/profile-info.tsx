import {
  FC,
  useCallback,
  useTransition,
  ReactNode,
  memo,
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
import {
  CalendarFillIcon,
  CalendarIcon,
  LocationIcon,
} from "@/modules/icons/status";

import { UserProfileData } from "@/types/session";

import { toast } from "sonner";
import { useDisclosure } from "@nextui-org/react";
import FormInput from "./form-input";
import { useProfileForm } from "../hooks/use-profile-form";
import { SpinnerIcon } from "@/modules/icons/common";
import { formatCreatedAt, validateProfileForm } from "../lib/utils";
import { updateUserProfile } from "@/db/actions";
import CompleteProfile from "./complete-profile";
import AchievementsPanel from "./achievements-panel";

interface ProfileInfoProps {
  profileData: UserProfileData | null;
  children: ReactNode;
  isOwnProfile: boolean;
}

const ProfileInfo: FC<ProfileInfoProps> = ({
  profileData,
  children,
  isOwnProfile,
}) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const [isPending, startTransition] = useTransition();
  const [errors, setErrors] = useState<{ [key: string]: string | null }>({
    first_name: null,
    last_name: null,
    username: null,
  });
  const {
    formData,
    tempFormData,
    handleInputChange,
    handleDateChange,
    saveFormData,
    resetTempData,
  } = useProfileForm(profileData);

  const createdAt = profileData && formatCreatedAt(profileData.created_at);

  const onSubmit = useCallback(async () => {
    startTransition(async () => {
      const isValid = await validateProfileForm(tempFormData, setErrors);
      if (!isValid) return;

      try {
        if (!tempFormData.user_id) {
          throw new Error("El ID del usuario no está definido.");
        }
        const data: Partial<UserProfileData> = {
          id: tempFormData.user_id,
          first_name: tempFormData.first_name,
          last_name: tempFormData.last_name,
          username: tempFormData.username,
          birthdate: tempFormData.birthdate
            ? tempFormData.birthdate.toString()
            : undefined,
          bio: tempFormData.bio,
          location: tempFormData.location,
        };

        const updatedProfile = await updateUserProfile(data);
        if (updatedProfile.error) {
          throw new Error(updatedProfile.error);
        }

        toast.success("Tu perfil ha sido actualizado.");
        saveFormData();
        onOpenChange();
      } catch (error) {
        console.error("Error al actualizar el perfil", error);
        toast.error("Error al actualizar el perfil.");
      }
    });
  }, [tempFormData, saveFormData, onOpenChange]);

  const onCancel = useCallback(() => {
    resetTempData();
    onOpenChange();
  }, [onOpenChange, resetTempData]);

  return (
    <>
      <div className="px-4 md:px-8 pb-8 pt-3 space-y-3 md:space-y-6">
        {/* Foto de perfil y botón editar */}
        <div className="relative">
          {children}
          <div className="ml-24 md:ml-44 flex justify-between items-start">
            <div className="inline-flex flex-col">
              <h2 className="md:text-xl font-bold text-base-color dark:text-base-color-dark">{`${formData.first_name} ${formData.last_name}`}</h2>
              <span className="text-xs md:text-sm text-base-color-m dark:text-base-color-dark-m">
                @{formData.username}
              </span>
            </div>
            {isOwnProfile && (
              <Button
                variant="ghost"
                color="default"
                radius="sm"
                onPress={onOpen}
                className="border-gray-200 dark:border-base-dark hover:!bg-gray-200 dark:hover:!bg-base-dark text-base-color dark:text-base-color-dark font-bold"
              >
                Editar perfil
              </Button>
            )}
          </div>
        </div>
        {/* Información del perfil */}
        <div className="pt-6 space-y-6">
          {formData.bio && (
            <div>
              <h3 className="mb-2 font-semibold md:text-lg text-base-color dark:text-base-color-dark">
                {isOwnProfile ? "Acerca de mi" : "Biografía"}
              </h3>
              <p className="text-sm text-base-color-m dark:text-base-color-dark-m">
                {formData.bio}
              </p>
            </div>
          )}

          <div className="grid gap-4 text-base-color-m dark:text-base-color-dark-m">
            {formData.location && (
              <div className="flex items-center space-x-2 text-sm">
                <LocationIcon className="size-4 text-base-color-m dark:text-base-color-dark-m" />
                <span>{formData.location}</span>
              </div>
            )}
            <div className="flex items-center space-x-2 text-sm">
              <CalendarIcon className="size-4 text-base-color-m dark:text-base-color-dark-m" />
              <span>
                {isOwnProfile ? "Te uniste en" : "Se unió en"} {createdAt}
              </span>
            </div>
          </div>
        </div>

        {/* Completar perfil */}
        {isOwnProfile &&
          (!formData.bio ||
            !formData.location ||
            !formData.profile_image ||
            !formData.banner_image) && <CompleteProfile formData={formData} />}

        {/* Panel de logros en Essentia */}

        <AchievementsPanel isOwnProfile={isOwnProfile} />
      </div>

      {/* Modal de edición */}
      {isOwnProfile && (
        <Modal
          placement="center"
          scrollBehavior="inside"
          size="xl"
          isOpen={isOpen}
          onOpenChange={onCancel}
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
            <>
              <ModalHeader>Editar perfil</ModalHeader>
              <ModalBody>
                <FormInput
                  name="first_name"
                  label="Nombre"
                  value={tempFormData.first_name}
                  onChange={handleInputChange}
                  errorMessage={errors.first_name}
                  isInvalid={!!errors.first_name}
                />
                <FormInput
                  name="last_name"
                  label="Apellido"
                  value={tempFormData.last_name}
                  onChange={handleInputChange}
                  errorMessage={errors.last_name}
                  isInvalid={!!errors.last_name}
                />
                <FormInput
                  name="username"
                  label="Nombre de usuario"
                  value={tempFormData.username}
                  onChange={handleInputChange}
                  errorMessage={errors.username}
                  isInvalid={!!errors.username}
                />
                <Textarea
                  name="bio"
                  label="Biografía"
                  maxLength={160}
                  value={tempFormData.bio ?? ""}
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
                  value={tempFormData.location ?? ""}
                  onChange={handleInputChange}
                  description="Máximo 30 caracteres"
                />
                <DateInput
                  id="birthdate"
                  description={"Este es mi cumpleaños"}
                  errorMessage="Por favor, ingresa una fecha válida"
                  label={"Fecha de nacimiento"}
                  value={tempFormData.birthdate}
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
          </ModalContent>
        </Modal>
      )}
    </>
  );
};

export default memo(ProfileInfo);
