import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetterTooltip } from "@/components/ui/tooltip";
import { QuestionIcon } from "@/modules/icons/miscellaneus";

import { RiskAssessment, RiskValue } from "./health-risk-stock";

const HealthRiskDetails = ({
  riskAssessment,
}: {
  riskAssessment: RiskAssessment;
}) => {
  return (
    <div className="inline-flex justify-center">
      <Popover>
        <PopoverTrigger asChild>
          <div className="ml-1">
            <BetterTooltip
              content="Haz click para obtener más información"
              side="top"
              className="font-normal"
            >
              <button
                aria-label="Ayuda"
                type="button"
                className="flex size-3 items-center justify-center rounded-full bg-bittersweet-300 dark:bg-cerise-red-600"
              >
                <QuestionIcon className="size-2 text-white" />
              </button>
            </BetterTooltip>
          </div>
        </PopoverTrigger>
        <PopoverContent>
          <Tabs aria-label="Alternar entre interpretación y acciones recomendadas">
            <TabsList>
              <TabsTrigger value="interpretation">Interpretación</TabsTrigger>
              <TabsTrigger value="actions">Acciones</TabsTrigger>
            </TabsList>
            <TabsContent value="interpretation" className="space-y-2">
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
            </TabsContent>
            <TabsContent value="actions" className="space-y-2">
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
            </TabsContent>
          </Tabs>
        </PopoverContent>
      </Popover>
    </div>
  );
};

export default HealthRiskDetails;
