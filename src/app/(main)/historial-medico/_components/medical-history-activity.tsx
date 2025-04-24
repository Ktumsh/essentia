"use client";

import { Activity, Filter, Search, Download } from "lucide-react";
import { useState } from "react";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/kit/card";
import { Checkbox } from "@/components/kit/checkbox";
import { Input } from "@/components/kit/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { ScrollArea } from "@/components/kit/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { MedicalHistoryActivityWithDetails } from "@/db/querys/medical-history-querys";

import ActivityDate from "./activity-date";
import ActivityItem from "./activity-item";
import { useActivityFilter } from "../_hooks/use-activity-filter-options";
import {
  exportActivityAsExcel,
  getActionIcon,
  getActionText,
} from "../_lib/utils";

interface MedicalHistoryActivityProps {
  activities?: MedicalHistoryActivityWithDetails[];
  onViewDocument?: (documentId: string) => void;
  onRestoreDocument?: (documentId: string) => void;
  onViewAll?: () => void;
}

export default function MedicalHistoryActivity({
  activities = [],
  onViewDocument,
  onRestoreDocument,
  onViewAll,
}: MedicalHistoryActivityProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedActions,
    setSelectedActions,
    dateRange,
    setDateRange,
    filteredActivities,
    groupedActivities,
  } = useActivityFilter(activities, {
    defaultDateRange: "all",
    defaultActiveTab: "all",
    defaultSortOrder: "newest",
  });

  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const sortedDates = Object.keys(groupedActivities).sort(
    (a, b) => new Date(b).getTime() - new Date(a).getTime(),
  );

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedActions([]);
    setDateRange("all");
  };

  const toggleActionSelection = (action: string) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action],
    );
  };

  return (
    <Card className="h-full">
      <CardHeader className="px-4 pt-4 pb-2">
        <div className="flex items-center justify-between">
          <CardDescription className="text-xs">
            Historial de cambios en tus documentos médicos
          </CardDescription>
          <div className="flex items-center gap-2">
            <Popover open={isFilterOpen} onOpenChange={setIsFilterOpen}>
              <PopoverTrigger asChild>
                <Button
                  radius="full"
                  variant="outline"
                  size="sm"
                  className="h-8 gap-1"
                >
                  <Filter className="size-3.5!" />
                  Filtrar
                  {(selectedActions.length > 0 ||
                    dateRange !== "all" ||
                    searchTerm) && (
                    <Badge className="dark:bg-alternative/50 text-foreground/80 ml-1 size-5 px-1 text-[11px]">
                      {selectedActions.length +
                        (dateRange !== "all" ? 1 : 0) +
                        (searchTerm ? 1 : 0)}
                    </Badge>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-80 p-4" align="end">
                <div className="space-y-4">
                  <h4 className="text-sm font-medium">Filtrar actividad</h4>

                  <div className="space-y-2">
                    <h5 className="text-muted-foreground text-xs font-medium">
                      Buscar
                    </h5>
                    <div className="relative">
                      <Search className="text-muted-foreground absolute top-2.5 left-2 size-3.5" />
                      <Input
                        placeholder="Buscar en actividad..."
                        className="h-9 rounded-full pl-7 text-sm"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-muted-foreground text-xs font-medium">
                      Tipo de acción
                    </h5>
                    <div className="grid grid-cols-2 gap-2">
                      {["created", "updated", "deleted", "restored"].map(
                        (action) => (
                          <div
                            key={action}
                            className="flex items-center space-x-2"
                          >
                            <Checkbox
                              id={`action-${action}`}
                              checked={selectedActions.includes(action)}
                              onCheckedChange={() =>
                                toggleActionSelection(action)
                              }
                            />
                            <label
                              htmlFor={`action-${action}`}
                              className="flex cursor-pointer items-center gap-1 text-sm"
                            >
                              {getActionIcon(action)}
                              <span className="capitalize">
                                {getActionText(action)}
                              </span>
                            </label>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <h5 className="text-muted-foreground text-xs font-medium">
                      Período
                    </h5>
                    <Select
                      value={dateRange}
                      onValueChange={(value) => setDateRange(value as any)}
                    >
                      <SelectTrigger className="h-9 rounded-full">
                        <SelectValue placeholder="Seleccionar período" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">Todos</SelectItem>
                        <SelectItem value="today">Hoy</SelectItem>
                        <SelectItem value="week">Última semana</SelectItem>
                        <SelectItem value="month">Último mes</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="flex justify-between pt-2">
                    <Button
                      radius="full"
                      variant="outline"
                      size="sm"
                      onClick={clearFilters}
                    >
                      Limpiar filtros
                    </Button>
                    <Button
                      radius="full"
                      size="sm"
                      onClick={() => setIsFilterOpen(false)}
                    >
                      Aplicar
                    </Button>
                  </div>
                </div>
              </PopoverContent>
            </Popover>

            <Button
              radius="full"
              variant="outline"
              size="sm"
              className="h-8"
              onClick={() => exportActivityAsExcel(filteredActivities)}
            >
              <Download className="size-3.5!" />
              Exportar
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent className="px-4 pt-0">
        {filteredActivities.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-8 text-center">
            <Activity className="text-muted-foreground/30 mb-3 size-12" />
            <p className="text-sm font-medium">No hay actividad reciente</p>
            <p className="text-muted-foreground mt-1 text-xs">
              {searchTerm || selectedActions.length > 0 || dateRange !== "all"
                ? "No se encontró actividad con los filtros aplicados"
                : "Cuando realices cambios en tu historial médico, aparecerán aquí"}
            </p>
            {(searchTerm ||
              selectedActions.length > 0 ||
              dateRange !== "all") && (
              <Button
                variant="ghost"
                size="sm"
                radius="full"
                className="mt-2"
                onClick={clearFilters}
              >
                Limpiar filtros
              </Button>
            )}
          </div>
        ) : (
          <ScrollArea className="h-[320px] md:pr-4">
            <div className="space-y-4">
              {sortedDates.map((date) => (
                <div key={date} className="space-y-2">
                  <ActivityDate date={date} />
                  <div className="space-y-2">
                    {groupedActivities[date]
                      .sort(
                        (a, b) =>
                          new Date(b.createdAt).getTime() -
                          new Date(a.createdAt).getTime(),
                      )
                      .map((item) => (
                        <ActivityItem
                          key={item.id}
                          item={item}
                          onViewDocument={onViewDocument}
                          onRestoreDocument={onRestoreDocument}
                        />
                      ))}
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
      <CardFooter className="flex items-center justify-between border-t p-4">
        <p className="text-foreground/80 text-xs">
          Mostrando {filteredActivities.length} de {activities.length}{" "}
          actividades
        </p>
        <Button radius="full" variant="link" size="sm" onClick={onViewAll}>
          Ver todo
        </Button>
      </CardFooter>
    </Card>
  );
}
