import { Card, CardContent } from "@/components/kit/card";
import {
  MEDICINES_DATA_GROUP_1,
  MEDICINES_DATA_GROUP_2,
} from "@/consts/medicines-data";

import MedicineCategory from "./medicine-category";
import SectionTitleWarning from "./section-title-warning";

const Medicines = () => {
  return (
    <section className="mt-5 flex flex-col">
      <SectionTitleWarning
        title="Medicamentos para un botiquín"
        hash="medicamentos-para-un-botiquin-de-primeros-auxilios"
      />
      <div className="flex w-full">
        <Card className="dark:bg-accent/30 mt-2 flex h-auto flex-col overflow-hidden bg-slate-50">
          <CardContent className="no-scrollbar relative z-10 flex h-auto w-full flex-auto snap-x snap-mandatory flex-row gap-6 overflow-auto p-3 text-left break-words">
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
