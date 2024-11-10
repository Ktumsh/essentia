import { Chip, Divider } from "@nextui-org/react";

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
    <Chip
      variant="dot"
      color="danger"
      className="border border-gray-300 bg-white text-main dark:border-accent-dark dark:bg-full-dark dark:text-white"
    >
      {category}
    </Chip>
    <div className="ml-3 flex">
      <Divider orientation="vertical" className={verticalDividerClasses} />
      <div className="flex w-4 flex-col justify-between">
        {innerDividersClasses.map((className, index) => (
          <Divider key={index} className={className} />
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
