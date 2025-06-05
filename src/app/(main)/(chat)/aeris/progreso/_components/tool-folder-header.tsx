import { CalendarDays } from "lucide-react";
import Image from "next/image";

import { CardHeader } from "@/components/ui/card";
import { cn, formatDate } from "@/utils";

import {
  TOOL_IMAGE,
  TOOL_NAME_LABELS,
  TOOL_VISUALS,
} from "../../../_lib/tool-helper";

interface ToolFolderHeaderProps {
  toolName: string;
  count: number;
  recentDates: Date[];
}

const ToolFolderHeader = ({
  toolName,
  count,
  recentDates,
}: ToolFolderHeaderProps) => {
  const label = TOOL_NAME_LABELS[toolName] ?? toolName;
  const visual = TOOL_VISUALS[toolName];
  const image = TOOL_IMAGE[toolName];
  return (
    <CardHeader className="group/header relative h-48 w-full overflow-hidden p-0">
      <Image
        src={image}
        alt={`Representación de ${label}`}
        width={602}
        height={192}
        className="h-full w-full object-cover"
        priority
      />
      <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent" />
      <div className="absolute bottom-0 left-0 w-full p-6">
        <div
          className={cn(
            "mb-2 grid size-9 place-content-center rounded-md bg-linear-to-br/shorter",
            visual.gradient,
          )}
        >
          <visual.icon className="size-4 text-white" />
        </div>
        <h2 className="text-lg font-semibold tracking-tight text-balance text-white md:text-2xl">
          {label}
        </h2>
        <div className="flex items-center gap-1.5 text-base text-white/90">
          <CalendarDays className="size-4" />
          <span>
            {count} {count === 1 ? "registro" : "registros"}
          </span>
        </div>
        {recentDates?.length > 0 ? (
          <div className="mt-2 flex flex-wrap gap-1 text-xs text-white">
            {recentDates.slice(0, 5).map((date, i) => (
              <span
                key={i}
                className="flex items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm"
              >
                {formatDate(date, "dd-MM")}
              </span>
            ))}
            {recentDates.length > 5 && (
              <span className="rounded-full bg-white/20 px-2 py-0.5 backdrop-blur-sm">
                ...
              </span>
            )}
          </div>
        ) : (
          <span className="mt-2 flex w-fit items-center gap-1 rounded-full bg-white/20 px-2 py-0.5 text-xs backdrop-blur-sm">
            Sin registros recientes
          </span>
        )}
      </div>
    </CardHeader>
  );
};

export default ToolFolderHeader;
