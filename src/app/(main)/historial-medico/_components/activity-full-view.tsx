"use client";

import { Activity, Filter, Search, Download } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { useIsMobile } from "@/hooks/use-mobile";

import ActivityDate from "./activity-date";
import ActivityItem from "./activity-item";
import { useActivityFilter } from "../_hooks/use-activity-filter-options";
import {
  exportActivityAsExcel,
  getActionIcon,
  getActionText,
} from "../_lib/utils";

import type { MedicalHistoryActivity } from "@/lib/types";

interface ActivityFullViewProps {
  isOpen: boolean;
  onClose: () => void;
  activities: Array<MedicalHistoryActivity>;
  onViewDocument: (documentId: string) => void;
  onRestoreDocument?: (documentId: string) => void;
}

export default function ActivityFullView({
  isOpen,
  onClose,
  activities,
  onViewDocument,
  onRestoreDocument,
}: ActivityFullViewProps) {
  const {
    searchTerm,
    setSearchTerm,
    selectedActions,
    setSelectedActions,
    dateRange,
    setDateRange,
    startDate,
    setStartDate,
    endDate,
    setEndDate,
    activeTab,
    setActiveTab,
    sortOrder,
    setSortOrder,
    filteredActivities,
    groupedActivities,
  } = useActivityFilter(activities, {
    defaultDateRange: "all",
    defaultActiveTab: "all",
    defaultSortOrder: "newest",
  });

  const isMobile = useIsMobile();

  const sortedDates = Object.keys(groupedActivities).sort((a, b) => {
    const dateA = new Date(a).getTime();
    const dateB = new Date(b).getTime();
    return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
  });

  const clearFilters = () => {
    setSearchTerm("");
    setSelectedActions([]);
    setDateRange("all");
    setStartDate("");
    setEndDate("");
    setActiveTab("all");
  };

  const toggleActionSelection = (action: string) => {
    setSelectedActions((prev) =>
      prev.includes(action)
        ? prev.filter((a) => a !== action)
        : [...prev, action],
    );
  };

  const content = (
    <div className="flex h-full flex-col">
      <div className="border-b p-4 md:p-6 md:pt-0">
        <div className="flex flex-col gap-2 md:flex-row md:gap-3">
          <div className="relative flex-1">
            <Search className="text-muted-foreground absolute top-2.5 left-2.5 size-4" />
            <Input
              placeholder="Buscar en actividad..."
              className="h-9 rounded-full pl-8 text-sm placeholder:text-sm"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex flex-col gap-2 md:flex-row">
            <Select
              value={dateRange}
              onValueChange={(value) => setDateRange(value as any)}
            >
              <SelectTrigger className="bg-background h-9 w-full rounded-full md:w-40">
                <SelectValue placeholder="Período" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todo el tiempo</SelectItem>
                <SelectItem value="today">Hoy</SelectItem>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
                <SelectItem value="custom">Personalizado</SelectItem>
              </SelectContent>
            </Select>

            <Select
              value={sortOrder}
              onValueChange={(value) => setSortOrder(value as any)}
            >
              <SelectTrigger className="bg-background h-9 w-full rounded-full md:w-40">
                <SelectValue placeholder="Ordenar por" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="newest">Más recientes</SelectItem>
                <SelectItem value="oldest">Más antiguos</SelectItem>
              </SelectContent>
            </Select>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-1">
              {isMobile && (
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => exportActivityAsExcel(activities)}
                  className="bg-background h-9 rounded-full"
                >
                  <Download className="size-3.5!" />
                  Exportar como Excel
                </Button>
              )}
              <Popover>
                <PopoverTrigger asChild>
                  <Button
                    variant="outline"
                    className="bg-background h-9 rounded-full"
                  >
                    <Filter className="size-3.5!" />
                    Filtros
                    {selectedActions.length > 0 && (
                      <Badge className="dark:bg-alternative/50 text-foreground/80 ml-1 size-5 px-1 text-[11px]">
                        {selectedActions.length}
                      </Badge>
                    )}
                  </Button>
                </PopoverTrigger>
                <PopoverContent className="w-80 p-4" align="end">
                  <div className="space-y-4">
                    <h4 className="text-sm font-medium">Filtros avanzados</h4>

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
                                id={`action-filter-${action}`}
                                checked={selectedActions.includes(action)}
                                onCheckedChange={() =>
                                  toggleActionSelection(action)
                                }
                                className="border-alternative"
                              />
                              <label
                                htmlFor={`action-filter-${action}`}
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
                    {dateRange === "custom" && (
                      <div className="space-y-2">
                        <h5 className="text-muted-foreground text-xs font-medium">
                          Rango de fechas
                        </h5>
                        <div className="grid grid-cols-2 gap-2">
                          <div className="space-y-1">
                            <label htmlFor="start-date" className="text-xs">
                              Desde
                            </label>
                            <Input
                              id="start-date"
                              type="date"
                              value={startDate}
                              onChange={(e) => setStartDate(e.target.value)}
                              className="h-9"
                            />
                          </div>
                          <div className="space-y-1">
                            <label htmlFor="end-date" className="text-xs">
                              Hasta
                            </label>
                            <Input
                              id="end-date"
                              type="date"
                              value={endDate}
                              onChange={(e) => setEndDate(e.target.value)}
                              className="h-9"
                            />
                          </div>
                        </div>
                      </div>
                    )}
                    <Button
                      variant="accent"
                      size="sm"
                      onClick={clearFilters}
                      className="w-full"
                    >
                      Limpiar filtros
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </div>
          </div>
        </div>

        {dateRange === "custom" && (
          <div className="mt-3 flex gap-2">
            <div className="flex-1 space-y-1">
              <label htmlFor="start-date-inline" className="text-xs">
                Desde
              </label>
              <Input
                id="start-date-inline"
                type="date"
                value={startDate}
                onChange={(e) => setStartDate(e.target.value)}
                className="h-9"
              />
            </div>
            <div className="flex-1 space-y-1">
              <label htmlFor="end-date-inline" className="text-xs">
                Hasta
              </label>
              <Input
                id="end-date-inline"
                type="date"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                className="h-9"
              />
            </div>
          </div>
        )}
      </div>

      <Tabs
        value={activeTab}
        onValueChange={(value) => setActiveTab(value as any)}
        className="flex flex-1 flex-col"
      >
        <div className="px-4 pt-4 md:px-6 md:pt-6">
          <TabsList className="bg-muted grid h-auto w-full grid-cols-2 md:h-9 md:w-fit md:grid-cols-4 md:rounded-full">
            <TabsTrigger
              value="all"
              className="h-6 text-xs! md:h-full md:text-sm!"
            >
              Todas
            </TabsTrigger>
            <TabsTrigger
              value="created"
              className="h-6 text-xs! text-green-600 data-[state=active]:text-green-600 md:h-full md:text-sm! dark:text-green-400"
            >
              Añadidas
            </TabsTrigger>
            <TabsTrigger
              value="updated"
              className="h-6 text-xs! text-blue-600 data-[state=active]:text-blue-600 md:h-full md:text-sm! dark:text-blue-400"
            >
              Actualizadas
            </TabsTrigger>
            <TabsTrigger
              value="deleted"
              className="h-6 text-xs! text-red-600 data-[state=active]:text-red-600 md:h-full md:text-sm! dark:text-red-400"
            >
              Eliminadas
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value={activeTab} className="flex-1 overflow-hidden p-4">
          {filteredActivities.length === 0 ? (
            <Card className="border border-dashed">
              <CardContent className="flex flex-col items-center justify-center py-10">
                <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
                  <Activity className="size-12 opacity-50" />
                  <div className="space-y-1.5 text-center">
                    <p className="text-foreground text-sm font-medium">
                      No hay actividad
                    </p>
                    <p className="text-xs md:text-sm">
                      {searchTerm ||
                      selectedActions.length > 0 ||
                      dateRange !== "all" ||
                      activeTab !== "all"
                        ? "No se encontró actividad con los filtros aplicados"
                        : "No hay registros de actividad en tu historial médico"}
                    </p>
                  </div>
                  {(searchTerm ||
                    selectedActions.length > 0 ||
                    dateRange !== "all" ||
                    activeTab !== "all") && (
                    <Button variant="ghost" size="sm" onClick={clearFilters}>
                      Limpiar filtros
                    </Button>
                  )}
                </div>
              </CardContent>
            </Card>
          ) : (
            <ScrollArea className="h-[338px] rounded-lg md:h-[444px] md:pr-4">
              <div className="dark:bg-background md:bg-background space-y-4 bg-slate-50 p-2">
                {sortedDates.map((date) => (
                  <div key={date} className="space-y-2">
                    <ActivityDate date={date} />
                    <div className="space-y-2">
                      {groupedActivities[date]
                        .sort((a, b) => {
                          const dateA = new Date(a.createdAt).getTime();
                          const dateB = new Date(b.createdAt).getTime();
                          return sortOrder === "newest"
                            ? dateB - dateA
                            : dateA - dateB;
                        })
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
        </TabsContent>
      </Tabs>
      {isMobile && (
        <div className="px-4">
          <p className="text-muted-foreground text-sm">
            Mostrando {filteredActivities.length} de {activities.length}{" "}
            actividades
          </p>
        </div>
      )}
    </div>
  );

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={onClose}>
        <DrawerContent className="">
          <DrawerHeader>
            <DrawerTitle>Hitorial de actividad</DrawerTitle>
            <DrawerDescription className="sr-only">
              Aquí puedes ver el historial de actividad de tu historial médico.
            </DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button
                  variant="mobile"
                  onClick={onClose}
                  className="justify-center"
                >
                  Cerrar
                </Button>
              </DrawerClose>
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent isSecondary className="sm:max-w-5xl">
        <DialogHeader isSecondary className="pb-6!">
          <DialogTitle>Historial de actividad</DialogTitle>
          <DialogDescription className="sr-only">
            Aquí puedes ver el historial de actividad de tu historial médico.
          </DialogDescription>
          <Button
            variant="secondary"
            size="sm"
            onClick={() => exportActivityAsExcel(activities)}
            className="ms-auto w-fit rounded-full"
          >
            <Download className="size-3.5!" />
            Exportar como Excel
          </Button>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary className="items-center justify-between!">
          <p className="text-muted-foreground text-sm">
            Mostrando {filteredActivities.length} de {activities.length}{" "}
            actividades
          </p>
          <DialogClose asChild>
            <Button radius="full" variant="outline">
              Cerrar
            </Button>
          </DialogClose>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
