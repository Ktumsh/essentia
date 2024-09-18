import { ReactNode } from "react";

const MapHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="absolute top-0 left-0 md:static px-2 mb-2 mt-2 md:mt-0 flex items-center w-full z-10 md:z-0">
      <div className="flex items-end justify-end md:justify-between w-full">
        <h2 className="hidden md:block text-sm uppercase font-bold px-5 lg:px-0 ml-3 text-base-color-h dark:text-base-color-dark">
          Centros de salud o farmacias cercanas
        </h2>
        {children}
      </div>
    </div>
  );
};

export default MapHeader;
