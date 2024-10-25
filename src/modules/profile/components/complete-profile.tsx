import {
  Chip,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
  Tooltip,
} from "@nextui-org/react";

import { CheckCircledIcon } from "@/modules/icons/common";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { cn } from "@/utils/common";

const CompleteProfile = ({ formData }: { formData: any }) => {
  return (
    <>
      <Divider className="bg-gray-200 dark:bg-base-dark" />
      <div className="inline-flex flex-col space-y-3">
        <div className="inline-flex items-center gap-2">
          <h3 className="text-lg font-semibold text-base-color dark:text-base-color-dark">
            Completa tu perfil
          </h3>
          <Popover
            showArrow
            classNames={{
              base: ["max-w-80", tooltipStyles.arrow],
              content: ["items-start", tooltipStyles.content],
            }}
          >
            <PopoverTrigger>
              <div>
                <Tooltip
                  content="Haz click para obtener más información"
                  placement="top"
                  delay={500}
                  closeDelay={0}
                  classNames={{
                    content: tooltipStyles.content,
                  }}
                >
                  <button
                    aria-label="Ayuda"
                    type="button"
                    className="flex items-center justify-center size-3 bg-bittersweet-300 dark:bg-cerise-red-600 rounded-full"
                  >
                    <QuestionIcon className="size-2 text-white" />
                  </button>
                </Tooltip>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="px-1 py-2">
                <div className="text-xs font-bold">
                  Cuando proporcionas tu información,
                </div>
                <p className="text-xs">
                  nuestra inteligencia artificial la usará para brindarte una
                  mejor experiencia para ti. Puedes hacer modificaciones en
                  cualquier momento.
                </p>
              </div>
            </PopoverContent>
          </Popover>
        </div>
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
