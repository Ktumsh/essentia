import { memo, ReactNode } from "react";

const MapHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pointer-events-none absolute top-0 left-1/2 z-10 my-2 flex w-full -translate-x-1/2 items-end justify-end px-2 md:items-center">
      <div className="md:bg-background flex items-center justify-between gap-4 rounded-full md:h-10 md:px-4 md:py-2 md:shadow-md">
        <h2 className="text-foreground hidden px-5 text-sm md:block lg:px-0">
          Centros de salud o farmacias cercanas
        </h2>
        {children}
      </div>
    </div>
  );
};

export default memo(MapHeader);
