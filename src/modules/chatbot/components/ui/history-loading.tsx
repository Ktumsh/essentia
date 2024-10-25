import { Button } from "@nextui-org/react";

import { NewIcon } from "@/modules/icons/action";

const HistoryLoading = ({ hideHeader }: { hideHeader?: boolean }) => {
  return (
    <div className="flex flex-col h-full text-base-color dark:text-base-color-dark">
      {!hideHeader && (
        <>
          <div className="flex items-center p-4 gap-2">
            <h4 className="text-sm font-medium">Historial de chat</h4>
          </div>
          <div className="mb-2 px-2">
            <div className="inline-flex items-center whitespace-nowrap rounded-md text-sm font-medium font-motivasans focus-visible:outline-none border border-gray-200 dark:border-base-dark hover:text-base-color dark:hover:text-white py-2 h-10 w-full justify-start bg-gray-50 px-4 shadow-none transition-colors hover:bg-gray-100 dark:bg-base-dark-50 dark:hover:bg-base-dark">
              <NewIcon className="size-4 -translate-x-2 stroke-2" />
              Nuevo chat
            </div>
          </div>
        </>
      )}
      <div className="flex flex-1 flex-col overflow-hidden">
        <div className="relative flex-1 overflow-auto custom-scroll v2">
          <div className="px-2 space-y-2">
            {Array.from({ length: 10 }).map((_, i) => (
              <div
                key={i}
                className="w-full h-9 rounded-md shrink-0 animate-pulse bg-gray-100 dark:bg-base-dark"
              />
            ))}
          </div>
        </div>
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center justify-end w-full h-10 mt-4">
            <Button
              variant="light"
              isDisabled
              className="h-10 rounded-xl px-3 font-medium text-sm text-base-color-h dark:text-base-color-dark-h disabled:pointer-events-none disabled:opacity-50 data-[hover=true]:bg-transparent"
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
