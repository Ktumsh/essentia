import { Button, Tooltip , Image as ImageUI } from "@nextui-org/react";
import Image from "next/image";
import { FC, ChangeEvent, useRef } from "react";

import { AddPhotoIcon } from "@/modules/icons/action";

interface BannerImageUploaderProps {
  bannerImage: string | null;
  onFileChange: (
    e: ChangeEvent<HTMLInputElement>,
    type: "photo" | "banner"
  ) => void;
}

const BannerImageUploader: FC<BannerImageUploaderProps> = ({
  bannerImage,
  onFileChange,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFile = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="relative flex min-h-56 overflow-hidden">
      <div className="absolute inset-0 size-full bg-black/30 z-0">
        {bannerImage ? (
          <div
            aria-hidden="true"
            className="relative flex h-72 bg-black/30 transition-colors"
          >
            <ImageUI
              removeWrapper
              as={Image}
              width={984}
              height={288}
              quality={100}
              alt="Banner de perfil"
              radius="none"
              src={bannerImage}
              draggable={true}
              classNames={{
                img: "absolute inset-0 object-cover object-center size-full",
              }}
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
          <Tooltip
            offset={2}
            placement="bottom"
            content="Agregar foto"
            delay={800}
            closeDelay={0}
          >
            <Button
              aria-label="Agregar foto de banner"
              isIconOnly
              radius="full"
              className="bg-white/30 dark:bg-black/60 backdrop-blur-sm size-11"
              onPress={selectFile}
            >
              <AddPhotoIcon className="size-5 text-white" />
            </Button>
          </Tooltip>
          <input
            ref={fileInputRef}
            accept="image/jpeg,image/png,image/webp"
            type="file"
            onChange={(e) => onFileChange(e, "banner")}
            className="absolute size-[0.1px] opacity-0 pointer-events-auto bg-transparent"
          />
        </div>
      </div>
    </div>
  );
};

export default BannerImageUploader;
