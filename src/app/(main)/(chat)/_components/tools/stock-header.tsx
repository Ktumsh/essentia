import Image from "next/image";
import { ReactNode } from "react";

import { Badge } from "@/components/kit/badge";

interface InfoItem {
  icon: ReactNode;
  text: string;
}

interface StockHeaderProps {
  imageSrc: string;
  title: string;
  label: string;
  infoItems: InfoItem[];
}

const StockHeader = ({
  imageSrc,
  title,
  label,
  infoItems,
}: StockHeaderProps) => {
  return (
    <header className="group/header relative h-48 w-full overflow-hidden">
      <Image
        src={imageSrc}
        alt={`Representación de ${title}`}
        width={1000}
        height={667}
        className="h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-6">
        <Badge className="text-foreground bg-background/80 mb-2 rounded-full px-3 py-1 text-xs font-medium backdrop-blur">
          {label}
        </Badge>
        <h2 className="text-lg font-semibold tracking-tight text-balance text-white md:text-2xl">
          {title.replace(".", " ")}
        </h2>
        <div className="mt-2 flex items-center gap-4">
          {infoItems.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-1.5 text-sm text-white/90"
            >
              {item.icon}
              <span className="text-nowrap">{item.text}</span>
            </div>
          ))}
        </div>
      </div>
      {/* <BetterTooltip content="Descargar como imagen">
        <DownloadButton
          size="icon"
          onClick={onDownload}
          className="remove absolute top-6 right-6 z-10 size-7 bg-transparent text-white shadow-none group-hover/header:opacity-100 hover:bg-transparent md:opacity-0 [&_svg]:size-4!"
        >
          <span className="sr-only">Descargar como Imagen</span>
        </DownloadButton>
      </BetterTooltip> */}
    </header>
  );
};

export default StockHeader;
