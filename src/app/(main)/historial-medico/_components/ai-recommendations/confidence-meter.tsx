import { Progress } from "@/components/ui/progress";
import { cn } from "@/utils";

import { getConfidenceColor } from "../../_lib/utils";

interface ConfidenceMeterProps {
  confidence: number;
  showLabel?: boolean;
}

const ConfidenceMeter = ({
  confidence,
  showLabel = true,
}: ConfidenceMeterProps) => {
  const formattedConfidence = confidence * 100;
  return (
    <div className="flex items-center gap-2">
      <Progress
        value={formattedConfidence}
        className="h-1.5 w-16 shrink-0"
        indicatorColor={
          formattedConfidence >= 90
            ? "bg-green-500"
            : formattedConfidence >= 70
              ? "bg-yellow-500"
              : "bg-red-500"
        }
      />
      {showLabel && (
        <span
          className={cn(
            "font-medium",
            getConfidenceColor(formattedConfidence),
            "text-xs",
          )}
        >
          {formattedConfidence}%
        </span>
      )}
    </div>
  );
};

export default ConfidenceMeter;
