import { Input, InputProps } from "@nextui-org/react";
import { FC, ChangeEvent } from "react";

interface FormInput extends InputProps {
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
}

const FormInput: FC<FormInput> = ({ onChange, ...props }) => (
  <Input
    onChange={onChange}
    variant="bordered"
    color="danger"
    radius="sm"
    {...props}
    classNames={{
      base: "px-4 py-3",
      input: "text-main dark:text-main-dark",
      inputWrapper:
        "border-gray-200 data-[hover=true]:border-gray-200 dark:border-dark dark:data-[hover=true]:border-dark",
    }}
  />
);

export default FormInput;
