import { memo, ReactNode } from "react";

const MapHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pointer-events-none absolute left-1/2 top-0 z-10 my-2 flex w-full -translate-x-1/2 items-end justify-end px-2 md:items-center md:justify-center">
      <div className="flex items-center justify-between gap-4 rounded-full md:h-10 md:bg-white md:px-4 md:py-2 md:shadow-md dark:md:bg-full-dark">
        <h2 className="hidden px-5 text-sm text-main dark:text-white md:block lg:px-0">
          Centros de salud o farmacias cercanas
        </h2>
        {children}
      </div>
    </div>
  );
};

export default memo(MapHeader);
