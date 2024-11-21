import { Badge } from "@/components/ui/badge";
import { ErrorCircledIcon } from "@/modules/icons/common";

const ErrorMessage = () => {
  return (
    <Badge variant="destructive">
      <ErrorCircledIcon className="size-5" />
      Hubo un error al generar la respuesta. Lamento los inconvenientes.
    </Badge>
  );
};

export default ErrorMessage;
