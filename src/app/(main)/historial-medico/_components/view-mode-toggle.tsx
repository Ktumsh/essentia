import { LayoutGrid, List } from "lucide-react";

import { Button } from "@/components/kit/button";
import { BetterTooltip } from "@/components/kit/tooltip";
import { cn } from "@/utils";

import type { ViewMode } from "../_hooks/use-view-mode";

interface ViewModeToggleProps {
  viewMode: ViewMode;
  setViewMode: (mode: ViewMode) => void;
}

const ViewModeToggle = ({ viewMode, setViewMode }: ViewModeToggleProps) => {
  return (
    <div className="bg-background flex h-9 items-center space-x-1 rounded-full border p-1">
      <BetterTooltip content="Diseño de cuadrícula">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setViewMode("grid")}
          className={cn("size-7", viewMode === "grid" && "bg-accent")}
        >
          <LayoutGrid className="size-3.5!" />
        </Button>
      </BetterTooltip>
      <BetterTooltip content="Diseño de lista">
        <Button
          size="icon"
          variant="ghost"
          onClick={() => setViewMode("list")}
          className={cn("size-7", viewMode === "list" && "bg-accent")}
        >
          <List className="size-3.5!" />
        </Button>
      </BetterTooltip>
    </div>
  );
};

export default ViewModeToggle;
