import { Button } from "@nextui-org/react";

import { NewIcon } from "@/modules/icons/action";

const HistoryLoading = ({ hideHeader }: { hideHeader?: boolean }) => {
  return (
    <div className="flex h-full flex-col text-main dark:text-main-dark">
      {!hideHeader && (
        <>
          <div className="flex items-center gap-2 p-4">
            <h4 className="text-sm font-medium">Historial de chat</h4>
          </div>
          <div className="mb-2 px-2">
            <div className="inline-flex h-10 w-full items-center justify-start whitespace-nowrap rounded-md border border-gray-200 bg-gray-50 px-4 py-2 font-motivasans text-sm font-medium shadow-none transition-colors hover:bg-gray-100 hover:text-main focus-visible:outline-none dark:border-dark dark:bg-dark/50 dark:hover:bg-dark dark:hover:text-white">
              <NewIcon className="size-4 -translate-x-2 stroke-2" />
              Nuevo chat
            </div>
          </div>
        </>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="custom-scroll v2 relative flex-1 overflow-auto">
          <div className="space-y-2 px-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="h-9 w-full shrink-0 animate-pulse rounded-md bg-gray-100 dark:bg-dark"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="mt-4 flex h-10 w-full items-center justify-end">
            <Button
              variant="light"
              isDisabled
              className="h-10 rounded-xl px-3 text-sm font-medium text-main-h disabled:pointer-events-none disabled:opacity-50 data-[hover=true]:bg-transparent dark:text-main-dark-h"
            >
              Limpiar historial
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HistoryLoading;
