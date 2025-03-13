import { Badge } from "@/components/kit/badge";
import { Separator } from "@/components/kit/separator";

import MedicineItem from "./medicine-item";

interface MedicineCategoryProps {
  category: string;
  items: { name: string; description: string }[];
  verticalDividerClasses: string;
  innerDividersClasses: string[];
}

const MedicineCategory = ({
  category,
  items,
  verticalDividerClasses,
  innerDividersClasses,
}: MedicineCategoryProps) => (
  <li>
    <Badge className="text-foreground dark:border-alternative bg-background h-7 border border-slate-300 px-1">
      <span className="bg-primary ml-1 size-2 rounded-full" />
      <span className="px-2">{category}</span>
    </Badge>
    <div className="ml-3 flex">
      <Separator
        orientation="vertical"
        decorative
        className={verticalDividerClasses}
      />
      <div className="flex w-4 flex-col justify-between">
        {innerDividersClasses.map((className, index) => (
          <Separator key={index} decorative className={className} />
        ))}
      </div>
      <ul className="mt-2 ml-2 space-y-2 text-sm">
        {items.map((item, index) => (
          <MedicineItem
            key={index}
            name={item.name}
            description={item.description}
          />
        ))}
      </ul>
    </div>
  </li>
);

export default MedicineCategory;
