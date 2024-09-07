import { Input, InputProps } from "@nextui-org/react";
import { FC, ChangeEvent } from "react";

interface FormInput extends InputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  label: string;
  description?: string;
}

const FormInput: FC<FormInput> = (
  { name, value, onChange, label, description },
  props
) => (
  <Input
    name={name}
    label={label}
    value={value}
    onChange={onChange}
    variant="bordered"
    color="danger"
    radius="sm"
    description={description}
    {...props}
    classNames={{
      base: "px-4 py-3",
      input: "text-base-color dark:text-base-color-dark",
      inputWrapper:
        "border-gray-200 data-[hover=true]:border-gray-200 dark:border-base-dark dark:data-[hover=true]:border-base-dark",
    }}
  />
);

export default FormInput;
