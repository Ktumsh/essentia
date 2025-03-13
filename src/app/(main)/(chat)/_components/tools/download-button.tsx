import { ArrowDownToLine } from "lucide-react";
import React from "react";

import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";

interface DownloadButtonProps {
  downloadImage: () => void;
}

const DownloadButton = ({ downloadImage }: DownloadButtonProps) => {
  return (
    <BetterTooltip content="Descargar como imagen">
      <Button
        size="icon"
        onClick={downloadImage}
        className="remove absolute top-6 right-6 z-10 size-8 bg-black/20! text-white shadow-none group-hover/card:opacity-100 hover:bg-black/30! active:bg-black/30 md:opacity-0"
      >
        <ArrowDownToLine className="size-3.5!" />
        <span className="sr-only">Descargar como Imagen</span>
      </Button>
    </BetterTooltip>
  );
};

export default DownloadButton;
