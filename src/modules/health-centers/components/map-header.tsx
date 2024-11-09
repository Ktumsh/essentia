import { ReactNode } from "react";

const MapHeader = ({ children }: { children: ReactNode }) => {
  return (
    <div className="pointer-events-none absolute left-0 top-0 z-10 my-2 flex w-full items-center px-2 md:static md:z-0 md:mt-0">
      <div className="flex w-full items-end justify-end md:justify-between">
        <h2 className="ml-3 hidden px-5 text-sm font-bold uppercase text-main dark:text-white md:block lg:px-0">
          Centros de salud o farmacias cercanas
        </h2>
        {children}
      </div>
    </div>
  );
};

export default MapHeader;
