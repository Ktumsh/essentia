import { Checkbox } from "@/components/kit/checkbox";

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
          className="border-border flex flex-row items-start space-y-0 space-x-2 rounded-md border px-2 py-1.5"
        >
          <Checkbox
            id={reason}
            aria-label={reason}
            value={reason}
            checked={selectedReasons.includes(reason)}
            onCheckedChange={(checked) => onCheckedChange(checked, reason)}
            className="dark:border-alternative dark:data-[state=checked]:border-primary border-slate-300 shadow-none"
          ></Checkbox>
          <label
            htmlFor={reason}
            className="truncate text-sm leading-none text-nowrap peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {reason}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ReasonCheckbox;
