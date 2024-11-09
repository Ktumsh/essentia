import {
  Popover,
  PopoverTrigger,
  Tooltip,
  PopoverContent,
  Tabs,
  Tab,
} from "@nextui-org/react";

import { QuestionIcon } from "@/modules/icons/miscellaneus";
import { tooltipStyles } from "@/styles/tooltip-styles";

import { RiskAssessment, RiskValue } from "./health-risk-stock";

const HealthRiskDetails = ({
  riskAssessment,
}: {
  riskAssessment: RiskAssessment;
}) => {
  return (
    <div className="inline-flex justify-center">
      <Popover
        showArrow
        placement="right"
        classNames={{
          base: ["max-w-80", tooltipStyles.arrow],
          content: ["items-start", tooltipStyles.content],
        }}
      >
        <PopoverTrigger>
          <div className="ml-1">
            <Tooltip
              content="Haz click para obtener más información"
              placement="top"
              delay={500}
              closeDelay={0}
              classNames={{
                content: tooltipStyles.content,
              }}
            >
              <button
                aria-label="Ayuda"
                type="button"
                className="flex size-3 items-center justify-center rounded-full bg-bittersweet-300 dark:bg-cerise-red-600"
              >
                <QuestionIcon className="size-2 text-white" />
              </button>
            </Tooltip>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Tabs
            aria-label="Alternar entre interpretación y acciones recomendadas"
            variant="light"
            classNames={{
              wrapper: "gap-2 md:gap-4",
              cursor: "rounded-md bg-gray-100 dark:bg-full-dark shadow-none",
              tabList: "px-0 rounded-none",
              tabContent:
                "text-main-m dark:text-main-dark-m group-data-[selected=true]:text-main-h dark:group-data-[selected=true]:text-main-dark",
              panel: "px-0 space-y-3",
            }}
          >
            <Tab key="interpretation" title="Interpretación">
              {[
                { key: "diabetes", label: "Diabetes" },
                { key: "heartDisease", label: "Enfermedad Cardíaca" },
                { key: "lungDisease", label: "Enfermedad Pulmonar" },
                { key: "kidneyDisease", label: "Enfermedad Renal" },
                { key: "hypertension", label: "Hipertensión" },
              ].map(({ key, label }) => {
                const risk = riskAssessment[
                  key as keyof RiskAssessment
                ] as RiskValue;
                return (
                  <div key={key} className="text-xs">
                    <h4 className="text-sm font-semibold">{label}</h4>
                    {risk.interpretation && <p>{risk.interpretation}</p>}
                  </div>
                );
              })}
            </Tab>
            <Tab key="actions" title="Acciones recomendadas">
              {[
                { key: "diabetes", label: "Diabetes" },
                { key: "heartDisease", label: "Enfermedad Cardíaca" },
                { key: "lungDisease", label: "Enfermedad Pulmonar" },
                { key: "kidneyDisease", label: "Enfermedad Renal" },
                { key: "hypertension", label: "Hipertensión" },
              ].map(({ key, label }) => {
                const risk = riskAssessment[
                  key as keyof RiskAssessment
                ] as RiskValue;
                return (
                  <div key={key} className="text-xs">
                    <h4 className="text-sm font-semibold">{label}</h4>
                    {risk.recommendedActions && (
                      <p>{risk.recommendedActions}</p>
                    )}
                  </div>
                );
              })}
            </Tab>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HealthRiskDetails;
