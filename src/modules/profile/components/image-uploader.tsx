import { FC, useRef, ChangeEvent } from "react";
import { Button } from "@nextui-org/react";
import { AddPhotoIcon } from "@/modules/icons/action";
import TooltipCTN from "@/modules/core/components/ui/tooltip-ctn";

interface ImageUploaderProps {
  onFileChange: (e: ChangeEvent<HTMLInputElement>) => void;
  type: "profile" | "banner";
  tooltip: string;
}

const ImageUploader: FC<ImageUploaderProps> = ({
  onFileChange,
  type,
  tooltip,
}) => {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const selectFile = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  return (
    <>
      <TooltipCTN content={tooltip}>
        <Button
          aria-label={`Agregar ${type}`}
          isIconOnly
          radius="full"
          className="bg-white/30 dark:bg-black/60 backdrop-blur-sm size-11"
          onPress={selectFile}
        >
          <AddPhotoIcon className="size-5 text-white" />
        </Button>
      </TooltipCTN>
      <input
        ref={fileInputRef}
        accept="image/jpeg,image/png,image/webp"
        type="file"
        onChange={onFileChange}
        className="absolute size-[0.1px] opacity-0 pointer-events-auto bg-transparent"
      />
    </>
  );
};

export default ImageUploader;
