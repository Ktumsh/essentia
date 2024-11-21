import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

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
    <Badge className="h-7 border border-gray-300 bg-white px-1 text-main dark:border-accent-dark dark:bg-full-dark dark:text-white">
      <span className="ml-1 size-2 rounded-full bg-danger" />
      <span className="px-2">{category}</span>
    </Badge>
    <div className="ml-3 flex">
      <Separator orientation="vertical" className={verticalDividerClasses} />
      <div className="flex w-4 flex-col justify-between">
        {innerDividersClasses.map((className, index) => (
          <Separator key={index} className={className} />
        ))}
      </div>
      <ul className="ml-2 mt-2 space-y-2 text-sm">
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
