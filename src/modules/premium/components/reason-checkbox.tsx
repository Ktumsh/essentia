import { Checkbox } from "@/components/ui/checkbox";

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
  const onCheckedChange = (checked: string | boolean, reason: string) => {
    onChange(
      checked
        ? [...selectedReasons, reason]
        : selectedReasons.filter((r) => r !== reason),
    );
  };

  return (
    <div className="grid w-full grid-cols-2 gap-x-2 gap-y-3">
      {reasons.map((reason, index) => (
        <div
          key={index}
          className="flex flex-row items-start space-x-2 space-y-0 rounded-md border border-gray-200 px-2 py-1.5 dark:border-dark"
        >
          <Checkbox
            id={reason}
            aria-label={reason}
            value={reason}
            checked={selectedReasons.includes(reason)}
            onCheckedChange={(checked) => onCheckedChange(checked, reason)}
            className="shadow-none"
          ></Checkbox>
          <label
            htmlFor={reason}
            className="truncate text-nowrap text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {reason}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ReasonCheckbox;
