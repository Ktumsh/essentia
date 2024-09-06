import { CheckIcon, CloseIcon } from "@/modules/icons/common";
import {
  Card,
  CardBody,
  CircularProgress,
  Listbox,
  ListboxItem,
} from "@nextui-org/react";

const ProgressInfo = () => {
  return (
    <div className="relative flex flex-col text-base-color dark:text-base-color-dark bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark rounded-lg shadow-md">
      <div className="flex flex-col gap-2 px-8 py-5">
        <div className="text-center text-sm font-bold">
          <h3>Completa tu perfil</h3>
        </div>
        <Card
          fullWidth
          classNames={{
            base: "select-none bg-white dark:bg-base-full-dark border border-white dark:border-base-full-dark",
          }}
        >
          <CardBody className="justify-center items-center">
            <CircularProgress
              color="danger"
              classNames={{
                svg: "w-28 h-28 drop-shadow-md",
                track:
                  "stroke-bittersweet-400/20 dark:stroke-cerise-red-600/20",
                value:
                  "text-xl font-bold text-base-color dark:text-base-color-dark",
              }}
              value={50}
              strokeWidth={3}
              showValueLabel={true}
              aria-label="Progreso"
            />
            <Listbox
              aria-label="Progreso de tu perfil"
              variant="light"
              disabledKeys={["photo", "banner", "info"]}
              className="select-none"
            >
              <ListboxItem
                key="setup"
                endContent={
                  <span className="text-xs text-base-color-h dark:text-base-color-dark-h group-data-[disabled=true]:text-green-400">
                    {25}%
                  </span>
                }
                startContent={
                  <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                }
                classNames={{
                  base: "opacity-100 cursor-default",
                  title: "group-data-[disabled=true]:opacity-50",
                }}
              >
                Configurar tu cuenta
              </ListboxItem>
              <ListboxItem
                key="photo"
                endContent={
                  <span className="text-xs text-base-color-h dark:text-base-color-dark-h group-data-[disabled=true]:text-green-400">
                    {15}%
                  </span>
                }
                startContent={
                  <CloseIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                }
                classNames={{
                  base: "opacity-100 cursor-default",
                  title: "group-data-[disabled=true]:opacity-50",
                }}
              >
                Sube tu foto
              </ListboxItem>
              <ListboxItem
                key="banner"
                endContent={
                  <span className="text-xs text-base-color-h dark:text-base-color-dark-h group-data-[disabled=true]:text-green-400">
                    {10}%
                  </span>
                }
                startContent={
                  <CloseIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                }
                classNames={{
                  base: "opacity-100 cursor-default",
                  title: "group-data-[disabled=true]:opacity-50",
                }}
              >
                Sube un encabezado
              </ListboxItem>
              <ListboxItem
                key="info"
                endContent={
                  <span className="text-xs text-base-color-h dark:text-base-color-dark-h group-data-[disabled=true]:text-green-400">
                    {25}%
                  </span>
                }
                startContent={
                  <CloseIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                }
                classNames={{
                  base: "opacity-100 cursor-default",
                  title: "group-data-[disabled=true]:opacity-50",
                }}
              >
                Información personal
              </ListboxItem>
              <ListboxItem
                key="bio"
                endContent={
                  <span className="text-xs text-base-color-h dark:text-base-color-dark-h group-data-[disabled=true]:text-green-400">
                    {15}%
                  </span>
                }
                startContent={
                  <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                }
                classNames={{
                  base: "opacity-100 cursor-default",
                  title: "group-data-[disabled=true]:opacity-50",
                }}
              >
                Biografía
              </ListboxItem>
              <ListboxItem
                key="location"
                endContent={
                  <span className="text-xs text-base-color-h dark:text-base-color-dark-h group-data-[disabled=true]:text-green-400">
                    {10}%
                  </span>
                }
                startContent={
                  <CheckIcon className="size-4 group-data-[disabled=true]:opacity-50" />
                }
                classNames={{
                  base: "opacity-100 cursor-default",
                  title: "group-data-[disabled=true]:opacity-50",
                }}
              >
                Ubicación
              </ListboxItem>
            </Listbox>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default ProgressInfo;
