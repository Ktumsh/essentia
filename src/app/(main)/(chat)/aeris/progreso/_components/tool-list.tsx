"use client";

import { ClipboardList } from "lucide-react";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";

import ToolEmptyState from "./tool-empty-state";
import ToolFolder from "./tool-folder";

interface ToolListProps {
  toolsGroup: {
    toolName: string;
    count: number;
    latest: Date | null;
    recentDates: Date[];
  }[];
}

const ToolList = ({ toolsGroup }: ToolListProps) => {
  const router = useRouter();

  if (toolsGroup.length === 0) {
    return (
      <section className="w-full">
        <ToolEmptyState
          icon={<ClipboardList className="text-muted-foreground size-12" />}
          title="Sin progreso para mostrar"
          description="Parece que aún no has usado ninguna herramienta de seguimiento. Comienza un chat y prueba alguna para verla aquí."
          action={
            <Button
              variant="ghost"
              size="sm"
              onClick={() => router.push("/aeris")}
            >
              Comenzar un chat
            </Button>
          }
        />
      </section>
    );
  }

  return (
    <section className="@container/list w-full">
      <div className="grid grid-cols-1 justify-center gap-6 @3xl/list:grid-cols-2">
        {toolsGroup.map((group) => (
          <ToolFolder key={group.toolName} group={group} />
        ))}
      </div>
    </section>
  );
};

export default ToolList;
