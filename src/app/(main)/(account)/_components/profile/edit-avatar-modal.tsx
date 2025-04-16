"use client";

import "react-image-crop/dist/ReactCrop.css";

import { useState, useRef } from "react";
import {
  ReactCrop,
  centerCrop,
  Crop,
  makeAspectCrop,
  convertToPixelCrop,
} from "react-image-crop";
import { toast } from "sonner";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import { useIsMobile } from "@/hooks/use-mobile";

import { getCroppedImg } from "../../_lib/utils";

const ASPECT_RATIO = 1 / 1;
const MIN_DIMENSION = 150;

interface EditAvatarModalProps {
  imageSrc: string;
  open: boolean;
  setIsOpen: (open: boolean) => void;
  onCropComplete: (file: File) => void;
}

const EditAvatarModal = ({
  imageSrc,
  open,
  setIsOpen,
  onCropComplete,
}: EditAvatarModalProps) => {
  const isMobile = useIsMobile();
  const [crop, setCrop] = useState<Crop>({
    x: 0,
    y: 0,
    width: 100,
    height: 100,
    unit: "%",
  });
  const imageRef = useRef<HTMLImageElement>(null);

  const handleSave = async () => {
    if (!imageRef.current) return;
    try {
      const blob = await getCroppedImg(
        imageRef.current,
        convertToPixelCrop(
          crop,
          imageRef.current.width,
          imageRef.current.height,
        ),
      );
      const file = new File([blob], "cropped-image.jpg", {
        type: "image/jpeg",
      });

      onCropComplete(file);
      setIsOpen(false);
    } catch {
      toast.error("Ocurrió un error al recortar la imagen");
    }
  };

  const onImageLoad = (e: React.SyntheticEvent<HTMLImageElement>) => {
    const { width, height } = e.currentTarget;

    const crop = makeAspectCrop(
      {
        unit: "%",
        width: 100,
      },
      ASPECT_RATIO,
      width,
      height,
    );
    setCrop(centerCrop(crop, width, height));
  };

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setIsOpen}>
        <DrawerContent className="max-w-md!">
          <DrawerHeader>
            <DrawerTitle>Editar Imagen</DrawerTitle>
          </DrawerHeader>
          <DrawerDescription className="my-4 space-y-1.5 px-4 text-center text-sm">
            Recorta tu nueva imagen de perfil.
          </DrawerDescription>
          <div className="bg-accent flex flex-col items-center">
            <ReactCrop
              crop={crop}
              circularCrop
              keepSelection
              aspect={ASPECT_RATIO}
              minWidth={MIN_DIMENSION}
              onChange={(currentCrop) => setCrop(currentCrop)}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                ref={imageRef}
                src={imageSrc}
                alt="Imagen a recortar"
                onLoad={onImageLoad}
                style={{ maxHeight: "50vh" }}
              />
            </ReactCrop>
          </div>
          <DrawerFooter>
            <Button variant="mobile-primary" fullWidth onClick={handleSave}>
              Guardar nueva imagen de perfil
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setIsOpen}>
      <DialogContent className="max-w-md!">
        <button className="sr-only"></button>
        <DialogHeader>
          <DialogTitle>Editar Imagen</DialogTitle>
          <DialogDescription>
            Recorta tu nueva imagen de perfil.
          </DialogDescription>
        </DialogHeader>
        <div className="bg-accent flex flex-col items-center">
          <ReactCrop
            crop={crop}
            circularCrop
            keepSelection
            aspect={ASPECT_RATIO}
            minWidth={MIN_DIMENSION}
            onChange={(currentCrop) => setCrop(currentCrop)}
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              ref={imageRef}
              src={imageSrc}
              alt="Imagen a recortar"
              onLoad={onImageLoad}
              style={{ maxHeight: "50vh" }}
            />
          </ReactCrop>
        </div>
        <DialogFooter>
          <Button radius="full" fullWidth onClick={handleSave}>
            Guardar nueva imagen de perfil
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default EditAvatarModal;
