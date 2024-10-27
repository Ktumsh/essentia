import { Checkbox, CheckboxGroup } from "@nextui-org/react";

const reasons = [
  "Solo quería 1 mes",
  "Demasiado caro",
  "No cumple mis necesidades",
  "Complicado de usar",
  "El resultado no fue bueno",
  "Otro",
];

interface ReasonCheckboxProps {
  selectedReasons: string[];
  onChange: (selected: string[]) => void;
}

const ReasonCheckbox = ({ selectedReasons, onChange }: ReasonCheckboxProps) => {
  return (
    <CheckboxGroup
      value={selectedReasons}
      onChange={onChange}
      size="sm"
      classNames={{
        base: "w-full",
        wrapper: "grid grid-cols-2",
      }}
    >
      {reasons.map((reason, index) => (
        <Checkbox
          key={index}
          aria-label={reason}
          size="sm"
          color="danger"
          value={reason}
          classNames={{
            base: "m-0 max-w-full inline-flex items-center py-1.5 gap-0 border border-gray-200 dark:border-dark rounded-md",
            label: "w-full text-sm md:text-sm text-main dark:text-main-dark",
          }}
        >
          {reason}
        </Checkbox>
      ))}
    </CheckboxGroup>
  );
};

export default ReasonCheckbox;
