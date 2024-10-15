import { ErrorCircledIcon } from "@/modules/icons/common";
import { Chip } from "@nextui-org/react";

const ErrorMessage = () => {
  return (
    <Chip
      size="lg"
      variant="flat"
      color="danger"
      startContent={<ErrorCircledIcon className="size-5" />}
    >
      Hubo un error al generar la respuesta. Lamento los inconvenientes.
    </Chip>
  );
};

export default ErrorMessage;
