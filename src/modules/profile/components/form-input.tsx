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
      input: "text-main dark:text-main-dark",
      inputWrapper:
        "border-gray-200 data-[hover=true]:border-gray-200 dark:border-full-dark dark:data-[hover=true]:border-full-dark",
    }}
  />
);

export default FormInput;
