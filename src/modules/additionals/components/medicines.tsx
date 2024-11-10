import { Button, Card, CardBody, Chip } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

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
        <Button
          as={Link}
          id="medicamentos-para-un-botiquin-de-primeros-auxilios"
          data-id="medicamentos-para-un-botiquin-de-primeros-auxilios"
          data-name="Medicamentos para un botiquín de primeros auxilios"
          href="#medicamentos-para-un-botiquin-de-primeros-auxilios"
          disableRipple
          radius="none"
          variant="flat"
          endContent={
            <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
          }
          className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="ml-2 size-3" />}
          >
            <h3>Medicamentos para un botiquín</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex w-full">
        <Card
          radius="sm"
          shadow="none"
          className="mt-2 border border-gray-200 bg-gray-100 text-main-h dark:border-dark dark:bg-dark/50 dark:text-main-dark"
        >
          <CardBody className="z-10 snap-x snap-mandatory flex-row gap-6 overflow-x-auto scrollbar-hide">
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
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default Medicines;
