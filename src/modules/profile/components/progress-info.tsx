import { FC, useEffect, useState } from "react";
import { CheckIcon, CloseIcon } from "@/modules/icons/common";
import {
  Card,
  CardBody,
  CircularProgress,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";
import { UserProfileData } from "@/types/session";
import { motion } from "framer-motion";
import {
  deleteReusableCookie,
  getReusableCookie,
  setReusableCookie,
} from "@/app/actions";
import { isPersonalInfoComplete, isProfileComplete } from "../lib/utils";
import useWindowSize from "@/modules/core/hooks/use-window-size";
import ConfettiComponent from "@/modules/core/components/ui/confetti";
import { cn } from "@/utils/common";

interface ProgressInfoProps {
  progress: number;
  profileData: UserProfileData;
}

const ProgressInfo: FC<ProgressInfoProps> = ({ progress, profileData }) => {
  const windowSize = useWindowSize();
  const [hideProgress, setHideProgress] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isCheckingCookie, setIsCheckingCookie] = useState(true);

  const cookieName = "x1yz_complete";

  useEffect(() => {
    const checkCookie = async () => {
      const cookieData = await getReusableCookie(cookieName);
      if (cookieData?.progress === 100) {
        setHideProgress(true);
      }
      setIsCheckingCookie(false);
    };

    checkCookie();
  }, []);

  useEffect(() => {
    if (progress === 100) {
      setReusableCookie(cookieName, { progress: 100 });

      setTimeout(() => {
        setIsVisible(false);
      }, 3000);
    } else if (progress < 100 && hideProgress) {
      deleteReusableCookie(cookieName);
      setHideProgress(false);
      setIsVisible(true);
    }
  }, [progress, hideProgress, cookieName]);

  const disabledKeys = () => {
    const keys: string[] = [];

    if (!isProfileComplete(profileData)) keys.push("setup");
    if (!isPersonalInfoComplete(profileData)) keys.push("personal-info");
    if (!profileData.profile_image) keys.push("photo");
    if (!profileData.banner_image) keys.push("banner");
    if (!profileData.bio) keys.push("bio");
    if (!profileData.location) keys.push("location");

    return keys;
  };

  if (isCheckingCookie) return null;

  if (hideProgress) return null;

  return (
    <>
      {/* Mostrar confetis si el progreso llega a 100% */}
      {progress === 100 && <ConfettiComponent windowSize={windowSize} />}

      <motion.div
        initial={{ opacity: 1 }}
        animate={{ opacity: isVisible ? 1 : 0 }}
        transition={{ duration: 1 }}
        onAnimationComplete={() => {
          if (!isVisible) setHideProgress(true);
        }}
        style={{ display: hideProgress ? "none" : "block" }}
      >
        <div className="relative flex flex-col text-base-color dark:text-base-color-dark bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark rounded-lg shadow-md">
          <div className="flex flex-col gap-2 px-8 py-5">
            <div className="text-center text-sm font-bold">
              <h3>Completa tu perfil</h3>
            </div>
            <Card
              fullWidth
              classNames={{
                base: "select-none bg-white dark:bg-base-full-dark border border-white dark:border-base-full-dark",
              }}
            >
              <CardBody className="justify-center items-center">
                {/* Progreso circular */}
                <CircularProgress
                  color="danger"
                  classNames={{
                    svg: "w-28 h-28 drop-shadow-md",
                    track:
                      "stroke-bittersweet-400/20 dark:stroke-cerise-red-600/20",
                    value:
                      "text-xl font-bold text-base-color dark:text-base-color-dark",
                  }}
                  value={progress}
                  strokeWidth={3}
                  showValueLabel={true}
                  aria-label="Progreso"
                />

                {/* Lista del progreso de las tareas del perfil */}
                <Listbox
                  aria-label="Progreso de tu perfil"
                  variant="light"
                  className="select-none"
                  disabledKeys={disabledKeys()}
                >
                  {/* Configuración de la cuenta */}
                  <ListboxItem
                    key="setup"
                    endContent={
                      <span
                        className={cn(
                          "text-xs",
                          isProfileComplete(profileData)
                            ? "text-base-color-h dark:text-base-color-dark-h"
                            : " text-green-400"
                        )}
                      >
                        {30}%
                      </span>
                    }
                    startContent={
                      isProfileComplete(profileData) ? (
                        <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                      ) : (
                        <CloseIcon className="size-4" />
                      )
                    }
                    classNames={{
                      base: "opacity-100 cursor-default",
                      title: "group-data-[disabled=true]:opacity-50",
                    }}
                  >
                    Configurar tu cuenta
                  </ListboxItem>

                  {/* Información personal */}
                  <ListboxItem
                    key="personal-info"
                    endContent={
                      <span
                        className={cn(
                          "text-xs",
                          isPersonalInfoComplete(profileData)
                            ? "text-base-color-h dark:text-base-color-dark-h"
                            : "text-green-400"
                        )}
                      >
                        {20}%
                      </span>
                    }
                    startContent={
                      isPersonalInfoComplete(profileData) ? (
                        <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                      ) : (
                        <CloseIcon className="size-4" />
                      )
                    }
                    classNames={{
                      base: "opacity-100 cursor-default",
                      title: "group-data-[disabled=true]:opacity-50",
                    }}
                  >
                    Información personal
                  </ListboxItem>

                  {/* Foto de perfil */}
                  <ListboxItem
                    key="photo"
                    endContent={
                      <span
                        className={cn(
                          "text-xs",
                          profileData.profile_image
                            ? "text-base-color-h dark:text-base-color-dark-h"
                            : "text-green-400"
                        )}
                      >
                        {15}%
                      </span>
                    }
                    startContent={
                      profileData.profile_image ? (
                        <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                      ) : (
                        <CloseIcon className="size-4" />
                      )
                    }
                    classNames={{
                      base: "opacity-100 cursor-default",
                      title: "group-data-[disabled=true]:opacity-50",
                    }}
                  >
                    Sube tu foto
                  </ListboxItem>

                  {/* Banner */}
                  <ListboxItem
                    key="banner"
                    endContent={
                      <span
                        className={cn(
                          "text-xs",
                          profileData.banner_image
                            ? "text-base-color-h dark:text-base-color-dark-h"
                            : "text-green-400"
                        )}
                      >
                        {15}%
                      </span>
                    }
                    startContent={
                      profileData.banner_image ? (
                        <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                      ) : (
                        <CloseIcon className="size-4" />
                      )
                    }
                    classNames={{
                      base: "opacity-100 cursor-default",
                      title: "group-data-[disabled=true]:opacity-50",
                    }}
                  >
                    Sube un encabezado
                  </ListboxItem>

                  {/* Biografía */}
                  <ListboxItem
                    key="bio"
                    endContent={
                      <span
                        className={cn(
                          "text-xs",
                          profileData.bio
                            ? "text-base-color-h dark:text-base-color-dark-h"
                            : "text-green-400"
                        )}
                      >
                        {10}%
                      </span>
                    }
                    startContent={
                      profileData.bio ? (
                        <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                      ) : (
                        <CloseIcon className="size-4" />
                      )
                    }
                    classNames={{
                      base: "opacity-100 cursor-default",
                      title: "group-data-[disabled=true]:opacity-50",
                    }}
                  >
                    Biografía
                  </ListboxItem>

                  {/* Ubicación */}
                  <ListboxItem
                    key="location"
                    endContent={
                      <span
                        className={cn(
                          "text-xs",
                          profileData.location
                            ? "text-base-color-h dark:text-base-color-dark-h"
                            : "text-green-400"
                        )}
                      >
                        {10}%
                      </span>
                    }
                    startContent={
                      profileData.location ? (
                        <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                      ) : (
                        <CloseIcon className="size-4" />
                      )
                    }
                    classNames={{
                      base: "opacity-100 cursor-default",
                      title: "group-data-[disabled=true]:opacity-50",
                    }}
                  >
                    Ubicación
                  </ListboxItem>
                </Listbox>
              </CardBody>
            </Card>
          </div>
        </div>
      </motion.div>
    </>
  );
};

export default ProgressInfo;
