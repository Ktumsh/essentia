import { FC, ChangeEvent } from "react";
import Image from "next/image";
import { Avatar } from "@nextui-org/react";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import ImageUploader from "./image-uploader";

interface ProfileImageUploaderProps {
  type: "banner" | "profile";
  imageUrl: string | null;
  onFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    type: "banner" | "profile"
  ) => void;
}

const ProfileImageUploader: FC<ProfileImageUploaderProps> = ({
  type,
  imageUrl,
  onFileChange,
}) => {
  if (type === "banner") {
    return (
      <div className="relative flex min-h-56 overflow-hidden">
        <div className="absolute inset-0 size-full bg-black/30 z-0">
          {imageUrl ? (
            <div
              aria-hidden="true"
              className="relative flex h-72 bg-black/30 transition-colors"
            >
              <Image
                width={984}
                height={288}
                quality={100}
                alt="Banner de perfil"
                src={imageUrl}
                draggable={true}
                className="absolute inset-0 object-cover object-center size-full"
              />
            </div>
          ) : (
            <div
              aria-hidden="true"
              className="relative flex h-full bg-black/30 transition-colors"
            ></div>
          )}
        </div>
        <div className="absolute top-0 size-full bg-black/50"></div>
        <div className="flex items-center justify-center absolute inset-0 size-full opacity-75">
          <div className="relative flex items-center justify-center">
            <ImageUploader
              onFileChange={(e) => onFileChange(e, type)}
              type={type}
              tooltip="Agregar foto"
            />
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="relative ml-4 -mt-12 min-h-24 md:min-h-32 size-24 max-w-24 md:size-32 md:max-w-32 rounded-full overflow-hidden">
      <div className="flex flex-col">
        <div className="z-0 absolute top-0 left-0 size-full bg-gray-200 dark:bg-base-dark border-5 border-white dark:border-base-full-dark rounded-full overflow-hidden">
          {imageUrl ? (
            <Image
              width={183}
              height={183}
              src={imageUrl}
              alt="Abrir foto"
              className="size-full object-cover object-center -z-10"
            />
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

          <div className="absolute top-0 size-full rounded-full bg-black/50"></div>
          <div className="flex items-center justify-center absolute top-0 size-full opacity-75">
            <div className="relative flex items-center justify-center">
              <ImageUploader
                onFileChange={(e) => onFileChange(e, type)}
                type={type}
                tooltip="Agregar foto"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileImageUploader;
