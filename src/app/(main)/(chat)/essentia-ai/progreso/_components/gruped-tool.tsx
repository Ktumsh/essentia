"use client";

import { Calendar, Search } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { useDebounceCallback } from "usehooks-ts";

import { ArrowLeftButton } from "@/components/button-kit/arrow-left-button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/kit/accordion";
import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import PageWrapper from "@/components/ui/layout/page-wrapper";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import ToolEmptyState from "./tool-empty-state";
import ToolFilter from "./tool-filter";
import { ToolPreview } from "./tool-preview";
import { TOOL_NAME_LABELS, TOOL_VISUALS } from "../../../_lib/tool-helper";
import { getResultTitle } from "../../../_lib/utils";

import type { ChatTool } from "@/db/schema";

interface GroupedToolProps {
  invocations: ChatTool[];
  toolName: string;
}

const GroupedTool = ({ invocations, toolName }: GroupedToolProps) => {
  const router = useRouter();
  const [inputTerm, setInputTerm] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("desc");

  const debouncedSetSearch = useDebounceCallback((term: string) => {
    setSearchTerm(term);
  }, 300);

  useEffect(() => {
    debouncedSetSearch(inputTerm);
  }, [inputTerm, debouncedSetSearch]);

  const filtered = useMemo(() => {
    const term = searchTerm.trim().toLowerCase();
    const matched = invocations.filter((inv) => {
      if (!term) return true;
      const argsString = JSON.stringify(inv.args).toLowerCase();
      const resultString = JSON.stringify(inv.result).toLowerCase();
      return argsString.includes(term) || resultString.includes(term);
    });
    return matched.sort((a, b) =>
      sortOrder === "asc"
        ? a.createdAt.getTime() - b.createdAt.getTime()
        : b.createdAt.getTime() - a.createdAt.getTime(),
    );
  }, [invocations, searchTerm, sortOrder]);

  const handleReset = () => {
    setInputTerm("");
    setSearchTerm("");
    setSortOrder("desc");
  };

  const visual = TOOL_VISUALS[toolName];

  return (
    <PageWrapper classNameContainer="w-full max-w-4xl">
      <div className="py-4 md:pt-11">
        <ArrowLeftButton
          variant="ghost"
          size="sm"
          className="mb-4 -translate-x-3 rounded-full"
          onClick={() => router.push("/essentia-ai/progreso")}
        >
          Volver a hábitos y progreso
        </ArrowLeftButton>
        <div className={cn("mb-6 border-l-4 pl-3", visual.border)}>
          <h1 className="font-merriweather text-2xl font-semibold sm:text-3xl">
            {TOOL_NAME_LABELS[toolName]}
          </h1>
        </div>
      </div>

      <ToolFilter
        searchValue={inputTerm}
        sortValue={sortOrder}
        onSearchChange={setInputTerm}
        onSortChange={setSortOrder}
      />
      {invocations.length === 0 ? (
        <ToolEmptyState
          icon={<Calendar className="text-muted-foreground h-12 w-12" />}
          title="Aún no tienes registros"
          description="Cuando ejecutes esta herramienta, aquí verás tu historial de resultados."
        />
      ) : filtered.length === 0 ? (
        <ToolEmptyState
          icon={<Search className="text-muted-foreground h-12 w-12" />}
          title="Sin resultados"
          description="Intenta con otro término o restablece los filtros."
          action={
            <Button variant="ghost" size="sm" onClick={handleReset}>
              Restablecer filtros
            </Button>
          }
        />
      ) : (
        <Accordion type="single" collapsible className="grid gap-6">
          {filtered.map((inv) => {
            const title = getResultTitle(inv.toolName, inv.result as any);
            return (
              <AccordionItem
                key={inv.toolCallId}
                value={inv.toolCallId}
                className="rounded-3xl border border-dashed p-2"
              >
                <AccordionTrigger className="dark:bg-accent/50 rounded-xl border-0 bg-slate-50 px-6 hover:no-underline">
                  <div className="flex flex-1 items-center justify-between gap-2">
                    {title && (
                      <h3 className="text-foreground text-base font-medium">
                        {title}
                      </h3>
                    )}
                    <Badge
                      variant="outline"
                      className={cn(
                        "bg-background h-7 rounded-sm border-dashed px-2 text-xs font-normal",
                        visual.borderMuted,
                      )}
                    >
                      <Calendar className="text-muted-foreground size-3.5" />
                      {formatDate(inv.createdAt, "dd 'de' MMMM, yyyy")}
                    </Badge>
                  </div>
                </AccordionTrigger>
                <AccordionContent className="dark:bg-accent/50 mt-2 flex flex-col items-center justify-center rounded-xl border-0 bg-slate-50 p-6">
                  <div className="w-full max-w-lg">
                    <ToolPreview toolName={inv.toolName} result={inv.result} />
                  </div>
                </AccordionContent>
              </AccordionItem>
            );
          })}
        </Accordion>
      )}
    </PageWrapper>
  );
};

export default GroupedTool;
