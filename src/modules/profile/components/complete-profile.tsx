import { CheckCircledIcon } from "@/modules/icons/common";
import { cn } from "@/utils/common";
import { Chip, Divider } from "@nextui-org/react";

const CompleteProfile = ({ formData }: { formData: any }) => {
  return (
    <>
      <Divider className="bg-gray-200 dark:bg-base-dark" />
      <div className="inline-flex flex-col space-y-3">
        <h3 className="text-lg font-semibold text-base-color dark:text-base-color-dark">
          Completa tu perfil
        </h3>
        <div className="inline-flex flex-wrap gap-2">
          <Chip
            variant="light"
            color={formData.profile_image ? "success" : "default"}
            isDisabled={!formData.profile_image}
            startContent={<CheckCircledIcon className="size-5" />}
            className={cn(
              !formData.profile_image &&
                "text-base-color dark:text-base-color-dark",
              "px-0"
            )}
          >
            Añade una foto de perfil
          </Chip>

          <Chip
            variant="light"
            color={formData.banner_image ? "success" : "default"}
            isDisabled={!formData.banner_image}
            startContent={<CheckCircledIcon className="size-5" />}
            className={cn(
              !formData.banner_image &&
                "text-base-color dark:text-base-color-dark",
              "px-0"
            )}
          >
            Añade una foto de portada
          </Chip>

          <Chip
            variant="light"
            color={formData.bio ? "success" : "default"}
            isDisabled={!formData.bio}
            startContent={<CheckCircledIcon className="size-5" />}
            className={cn(
              !formData.bio && "text-base-color dark:text-base-color-dark",
              "px-0"
            )}
          >
            Añade una biografía
          </Chip>
          <Chip
            variant="light"
            color={formData.location ? "success" : "default"}
            isDisabled={!formData.location}
            startContent={<CheckCircledIcon className="size-5" />}
            className={cn(
              !formData.location && "text-base-color dark:text-base-color-dark",
              "px-0"
            )}
          >
            Añade tu ubicación
          </Chip>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
