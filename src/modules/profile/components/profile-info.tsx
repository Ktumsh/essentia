"use client";

import {
  Avatar,
  Button,
  DateInput,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Textarea,
  Tooltip,
  Image as UIImage,
  useDisclosure,
} from "@nextui-org/react";
import Image from "next/image";

import Link from "next/link";
import { useRef } from "react";
import { tooltipStyles } from "@/styles/tooltip-styles";
import { usernameOrEmail } from "@/utils/common";
import { CalendarIcon, LocationIcon } from "@/modules/icons/status";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { AddPhotoIcon } from "@/modules/icons/action";

const getProfileImageUrl = (url: string, provider: string) => {
  if (!url) {
    return "";
  }

  if (provider === "credentials") {
    return url;
  } else if (url.includes("googleusercontent")) {
    return url.replace("=s96-c", "=s200-c");
  } else if (url.includes("facebook")) {
    return `${url}?width=200&height=200`;
  } else if (url.includes("twimg")) {
    return url.replace("_normal", "_200x200");
  }
  return url;
};

const ProfileInfo = ({ session }: any) => {
  const { isOpen, onOpen, onOpenChange } = useDisclosure();
  const fileInputRefs = {
    banner: useRef<HTMLInputElement>(null),
    photo: useRef<HTMLInputElement>(null),
  };

  const selectFile = (inputKey: keyof typeof fileInputRefs) => {
    const inputRef = fileInputRefs[inputKey];
    if (inputRef.current) {
      inputRef.current.click();
    }
  };

  const profileImageUrl = getProfileImageUrl(
    session?.user?.image,
    session?.provider
  );

  const name = session?.user?.name || "";
  const lastname = session?.user?.lastname || "";

  const hasUsernameOrEmail = usernameOrEmail(session);

  return (
    <>
      <div className="relative flex flex-col px-8 py-3 z-10">
        {/*Foto de perfil y botón editar*/}
        <div className="relative flex flex-wrap justify-between mb-5">
          <div className="relative size-1/5 md:size-[15%] min-w-12 mt-[-15%] mb-3">
            <div className="w-full pb-[100%]"></div>
            <div className="absolute top-[5%] sm:top-[15%] md:top-[40%] left-0 size-full">
              <div className="size-[calc(100%+4px)] absolute top-[-2px] left-[-2px] rounded-full">
                <Link
                  href=""
                  className="group flex size-full transition-colors"
                >
                  <div className="size-[calc(100%-4px)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                    <div className="size-full bg-white dark:bg-base-full-dark"></div>
                  </div>
                  <div className="size-[calc(100%-12px)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden group-hover:brightness-90 transition">
                    <div className="absolute inset-0 overflow-hidden">
                      {profileImageUrl ? (
                        <>
                          <div
                            className="absolute inset-0 bg-center bg-no-repeat bg-cover size-full"
                            style={{
                              backgroundImage: `url(${profileImageUrl})`,
                            }}
                          ></div>
                          <UIImage
                            as={Image}
                            width={183}
                            height={183}
                            src={profileImageUrl}
                            alt="Abrir foto"
                            classNames={{
                              wrapper: "w-full h-full",
                              img: "absolute inset-0 size-full object-cover -z-10",
                            }}
                          />
                        </>
                      ) : (
                        <Avatar
                          showFallback
                          src="https://images.unsplash.com/broken"
                          icon={<AvatarIcon className="size-16" />}
                          classNames={{
                            icon: "text-base-color-m dark:text-base-color-dark-m size-4/5",
                            base: "bg-gray-300 dark:bg-gray-600 absolute inset-0 bg-center bg-no-repeat bg-cover w-full h-full",
                            name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                          }}
                        />
                      )}
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
          <Button
            variant="ghost"
            color="default"
            radius="full"
            onPress={onOpen}
            className="border-white dark:border-base-full-dark hover:!bg-white dark:hover:!bg-base-full-dark text-base-color dark:text-base-color-dark font-bold"
          >
            Editar perfil
          </Button>
        </div>
        {/*Información del perfil*/}
        <div className="flex flex-wrap mb-3 mt-1">
          <div className="flex flex-col mr-2">
            <div className="flex flex-col shrink">
              <span className="text-xl font-bold">{`${name} ${lastname}`}</span>
              <span className="text-[15px] text-base-color-m dark:text-base-color-dark-m">
                {hasUsernameOrEmail}
              </span>
            </div>
          </div>
        </div>
        <div className="mb-3">
          <div className="flex items-stretch text-sm text-base-color-h dark:text-base-color-dark-h">
            <span>
              briografia dslakdjnlawijdclaijdlacs dlkcajlkcsjdalijwliajlasnm
            </span>
          </div>
        </div>
        <div className="flex w-full mb-3 text-base-color-h dark:text-base-color-dark-h">
          <span className="flex items-center justify-center gap-1">
            <LocationIcon className="size-5 text-base-color-m dark:text-base-color-dark-m" />
            <span className="inline">De Santiago de Chile</span>
          </span>
        </div>
      </div>
      <Modal
        placement="center"
        scrollBehavior="inside"
        size="xl"
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        radius="lg"
        classNames={{
          backdrop: "z-[101]",
          wrapper: "z-[102]",
          base: "overflow-hidden bg-white dark:bg-base-dark",
          body: "gap-0 px-0 py-0 pb-16 bg-gray-50 dark:bg-base-full-dark custom-scroll",
          header: "flex flex-col gap-1",
          closeButton:
            "hover:bg-black/5 active:bg-black/10 dark:hover:bg-white/5 dark:active:bg-white/10 transition-colors duration-150",
        }}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader>Editar perfil</ModalHeader>
              <ModalBody>
                {/*Banner*/}
                <div className="relative flex min-h-56 overflow-hidden">
                  <div className="flex flex-col border-2 border-transparent">
                    <div className="flex grow">
                      <div className="flex relative overflow-hidden">
                        <div className="flex pb-[33.333%] w-full"></div>
                        <div className="absolute inset-0 size-full"></div>
                      </div>
                      <div className="absolute inset-0 size-full bg-black/30"></div>
                      <div className="flex items-center justify-center absolute inset-0 size-full opacity-75">
                        <div className="relative flex items-center justify-center">
                          <Tooltip
                            offset={2}
                            placement="bottom"
                            content="Agregar foto"
                            delay={800}
                            closeDelay={0}
                            classNames={{
                              content: tooltipStyles.content,
                            }}
                          >
                            <Button
                              aria-label="Agregar foto de banner"
                              isIconOnly
                              radius="full"
                              className="bg-black/60 backdrop-blur-sm size-11"
                              onPress={() => selectFile("banner")}
                            >
                              <AddPhotoIcon className="size-5 text-white" />
                            </Button>
                          </Tooltip>
                          <input
                            ref={fileInputRefs.banner}
                            accept="image/jpeg,image/png,image/webp"
                            type="file"
                            className="absolute size-[0.1px] opacity-0 pointer-events-auto bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Foto de perfil*/}
                <div className="relative ml-4 -mt-12 min-h-32 w-1/4 max-w-32 bg-white dark:bg-base-full-dark border-2 border-white dark:border-base-full-dark rounded-full overflow-hidden">
                  <div className="flex flex-col border-2 border-transparent">
                    <div className="relative flex grow">
                      <div className="size-full overflow-hidden">
                        <div className="w-full pb-[100%]"></div>
                        <div className="absolute top-0 left-0 size-full">
                          <div className="size-[calc(100%+4px)] absolute top-[-2px] left-[-2px] rounded-full">
                            <div
                              aria-hidden="true"
                              role="presentation"
                              className="flex size-full bg-transparent"
                            >
                              <div className="size-[calc(100%-4px)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                                <div className="size-full bg-white dark:bg-base-dark"></div>
                              </div>
                              <div className="size-[calc(100%-4px)] absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full overflow-hidden">
                                <div className="absolute inset-0 overflow-hidden">
                                  {profileImageUrl ? (
                                    <>
                                      <div
                                        className="absolute inset-0 bg-center bg-no-repeat bg-cover size-full"
                                        style={{
                                          backgroundImage: `url(${profileImageUrl})`,
                                        }}
                                      ></div>
                                      <UIImage
                                        as={Image}
                                        width={183}
                                        height={183}
                                        src={profileImageUrl}
                                        alt="Abrir foto"
                                        classNames={{
                                          wrapper: "w-full h-full",
                                          img: "absolute inset-0 size-full object-cover -z-10",
                                        }}
                                      />
                                    </>
                                  ) : (
                                    <Avatar
                                      showFallback
                                      src="https://images.unsplash.com/broken"
                                      icon={<AvatarIcon className="size-14" />}
                                      classNames={{
                                        icon: "text-base-color-m dark:text-base-color-dark-m size-4/5",
                                        base: "bg-gray-300 dark:bg-gray-600 absolute inset-0 bg-center bg-no-repeat bg-cover w-full h-full",
                                        name: "font-medium text-base-color-h dark:text-base-color-dark-h",
                                      }}
                                    />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="absolute top-0 size-full rounded-full bg-black/30"></div>
                      <div className="flex items-center justify-center absolute top-0 size-full opacity-75">
                        <div className="relative flex items-center justify-center">
                          <Tooltip
                            offset={2}
                            placement="bottom"
                            content="Agregar foto"
                            delay={800}
                            closeDelay={0}
                            classNames={{
                              content: tooltipStyles.content,
                            }}
                          >
                            <Button
                              isIconOnly
                              radius="full"
                              className="bg-black/60 backdrop-blur-sm size-11"
                              onPress={() => selectFile("photo")}
                            >
                              <AddPhotoIcon className="size-5 text-white" />
                            </Button>
                          </Tooltip>
                          <input
                            ref={fileInputRefs.photo}
                            accept="image/jpeg,image/png,image/webp"
                            type="file"
                            className="absolute size-[0.1px] opacity-0 pointer-events-auto bg-transparent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/*Editar información*/}
                <Input
                  type="text"
                  autoCapitalize="sentences"
                  autoComplete="off"
                  autoCorrect="on"
                  maxLength={50}
                  name="name"
                  spellCheck={true}
                  label="Nombre"
                  defaultValue={session?.user?.name}
                  variant="bordered"
                  color="danger"
                  classNames={{
                    base: "px-4 py-3",
                    input: "text-base-color dark:text-base-color-dark",
                    inputWrapper:
                      "border-gray-200 data-[hover=true]:border-gray-200 dark:border-base-dark dark:data-[hover=true]:border-base-dark",
                  }}
                />
                <Input
                  type="text"
                  autoCapitalize="sentences"
                  autoComplete="off"
                  autoCorrect="on"
                  maxLength={50}
                  name="username"
                  spellCheck={true}
                  label="Nombre de usuario"
                  defaultValue={session?.user?.username}
                  variant="bordered"
                  color="danger"
                  classNames={{
                    base: "px-4 py-3",
                    input: "text-base-color dark:text-base-color-dark",
                    inputWrapper:
                      "border-gray-200 data-[hover=true]:border-gray-200 dark:border-base-dark dark:data-[hover=true]:border-base-dark",
                  }}
                />
                <Textarea
                  autoCapitalize="sentences"
                  autoComplete="on"
                  autoCorrect="off"
                  maxLength={160}
                  name="description"
                  spellCheck={true}
                  label="Biografía"
                  variant="bordered"
                  color="danger"
                  classNames={{
                    base: "px-4 py-3",
                    input: "text-base-color dark:text-base-color-dark",
                    inputWrapper:
                      "border-gray-200 data-[hover=true]:border-gray-200 dark:border-base-dark dark:data-[hover=true]:border-base-dark",
                  }}
                />
                <Input
                  type="text"
                  autoCapitalize="sentences"
                  autoComplete="on"
                  autoCorrect="on"
                  maxLength={30}
                  name="location"
                  spellCheck={true}
                  label="Ubicación"
                  variant="bordered"
                  color="danger"
                  classNames={{
                    base: "px-4 py-3",
                    input: "text-base-color dark:text-base-color-dark",
                    inputWrapper:
                      "border-gray-200 data-[hover=true]:border-gray-200 dark:border-base-dark dark:data-[hover=true]:border-base-dark",
                  }}
                />
                <DateInput
                  id="birthdate"
                  description={"Este es mi cumpleaños."}
                  errorMessage="Por favor, ingresa una fecha válida."
                  label={"Fecha de nacimiento"}
                  color="danger"
                  variant="bordered"
                  startContent={<CalendarIcon />}
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
                <Button variant="shadow" color="danger" onPress={onClose}>
                  Guardar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ProfileInfo;
