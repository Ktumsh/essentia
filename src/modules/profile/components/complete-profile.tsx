import { Badge } from "@/components/ui/badge";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";
import { BetterTooltip } from "@/components/ui/tooltip";
import { CheckCircledIcon } from "@/modules/icons/common";
import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { cn } from "@/utils/common";

interface CompleteProfileProps {
  completeProfileData: {
    profileImage?: string | null;
    bio?: string | null;
    location?: string | null;
  };
}

const CompleteProfile = ({ completeProfileData }: CompleteProfileProps) => {
  const { profileImage, bio, location } = completeProfileData;

  return (
    <>
      <Separator />
      <div className="inline-flex flex-col space-y-3">
        <div className="inline-flex items-center gap-2">
          <h3 className="text-lg font-semibold text-main dark:text-main-dark">
            Completa tu perfil
          </h3>
          <Popover>
            <PopoverTrigger asChild>
              <div>
                <BetterTooltip content="Haz click para obtener más información">
                  <button
                    aria-label="Ayuda"
                    type="button"
                    className="flex size-3 items-center justify-center rounded-full bg-bittersweet-300 dark:bg-cerise-red-600"
                  >
                    <QuestionIcon className="size-2 text-white" />
                  </button>
                </BetterTooltip>
              </div>
            </PopoverTrigger>
            <PopoverContent>
              <div className="text-xs font-bold">
                Cuando proporcionas tu información,
              </div>
              <p className="text-xs">
                nuestra inteligencia artificial la usará para brindarte una
                mejor experiencia para ti. Puedes hacer modificaciones en
                cualquier momento.
              </p>
            </PopoverContent>
          </Popover>
        </div>
        <div className="inline-flex flex-col gap-2 md:flex-row">
          <Badge
            className={cn(
              profileImage
                ? "text-green-500"
                : "text-main opacity-50 dark:text-main-dark",
              "gap-1 !bg-transparent pl-0 hover:!bg-inherit",
            )}
          >
            <CheckCircledIcon className="size-5" />
            Añade una foto de perfil
          </Badge>

          <Badge
            className={cn(
              bio
                ? "text-green-500"
                : "text-main opacity-50 dark:text-main-dark",
              "gap-1 !bg-transparent pl-0 hover:!bg-inherit",
            )}
          >
            <CheckCircledIcon className="size-5" />
            Añade una biografía
          </Badge>
          <Badge
            className={cn(
              location
                ? "text-green-500"
                : "text-main opacity-50 dark:text-main-dark",
              "gap-1 !bg-transparent pl-0 hover:!bg-inherit",
            )}
          >
            <CheckCircledIcon className="size-5" />
            Añade tu ubicación
          </Badge>
        </div>
      </div>
    </>
  );
};

export default CompleteProfile;
