import AnalysisMethodSelector from "./analysis-method-selector";

import type { AnalysisMethod } from "@/lib/types";

interface MethodSelectionStepProps {
  analysisMethod: AnalysisMethod;
  documentCount: number;
  categoryCount: number;
  onMethodSelect: (method: AnalysisMethod) => void;
}

const MethodSelectionStep = ({
  analysisMethod,
  documentCount,
  categoryCount,
  onMethodSelect,
}: MethodSelectionStepProps) => (
  <div className="space-y-6">
    <AnalysisMethodSelector
      selectedMethod={analysisMethod}
      onMethodSelect={onMethodSelect}
      documentCount={documentCount}
      categoryCount={categoryCount}
    />
  </div>
);

export default MethodSelectionStep;
