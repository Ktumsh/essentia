import { TriangleAlert } from "lucide-react";
import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import {
  MEDICINES_DATA_GROUP_1,
  MEDICINES_DATA_GROUP_2,
} from "@/consts/medicines-data";
import { HashIcon } from "@/modules/icons/common";

import MedicineCategory from "./medicine-category";

const Medicines = () => {
  return (
    <section className="mt-5 flex flex-col text-main-h dark:text-main-dark">
      <div className="mb-2 self-start">
        <Link
          id="medicamentos-para-un-botiquin-de-primeros-auxilios"
          data-id="medicamentos-para-un-botiquin-de-primeros-auxilios"
          data-name="Medicamentos para un botiquín de primeros auxilios"
          href="#medicamentos-para-un-botiquin-de-primeros-auxilios"
          className="group flex h-auto w-fit items-center p-0 text-xl font-semibold transition active:scale-100"
        >
          <Badge variant="primary" className="gap-1 py-1">
            <TriangleAlert className="size-3.5" />
            <h3>Medicamentos para un botiquín</h3>
          </Badge>
          <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
        </Link>
      </div>
      <div className="flex w-full">
        <Card className="mt-2 flex h-auto flex-col overflow-hidden bg-gray-50 dark:bg-dark/30">
          <CardContent className="scrollbar-hide relative z-10 flex h-auto w-full flex-auto snap-x snap-mandatory flex-row gap-6 overflow-auto break-words p-3 text-left">
            <ul className="min-w-[90%] snap-center space-y-2 md:min-w-0">
              {MEDICINES_DATA_GROUP_1.map((category, index) => (
                <MedicineCategory
                  key={index}
                  category={category.category}
                  items={category.items}
                  verticalDividerClasses={category.verticalDividerClasses}
                  innerDividersClasses={category.innerDividersClasses}
                />
              ))}
            </ul>

            <ul className="min-w-[90%] snap-center space-y-2 md:min-w-0">
              {MEDICINES_DATA_GROUP_2.map((category, index) => (
                <MedicineCategory
                  key={index}
                  category={category.category}
                  items={category.items}
                  verticalDividerClasses={category.verticalDividerClasses}
                  innerDividersClasses={category.innerDividersClasses}
                />
              ))}
            </ul>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};

export default Medicines;
