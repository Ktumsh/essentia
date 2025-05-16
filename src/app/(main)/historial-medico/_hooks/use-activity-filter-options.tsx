import { useState, useMemo } from "react";

import type { MedicalHistoryActivity } from "@/lib/types";

type DateRangeOption = "all" | "today" | "week" | "month" | "custom";
type SortOrder = "newest" | "oldest";

interface UseActivityFilterOptions {
  defaultSearchTerm?: string;
  defaultSelectedActions?: string[];
  defaultDateRange?: DateRangeOption;
  defaultStartDate?: string;
  defaultEndDate?: string;
  defaultActiveTab?: string;
  defaultSortOrder?: SortOrder;
}

export function useActivityFilter(
  activities: Array<MedicalHistoryActivity>,
  options?: UseActivityFilterOptions,
) {
  const [searchTerm, setSearchTerm] = useState(
    options?.defaultSearchTerm || "",
  );
  const [selectedActions, setSelectedActions] = useState<string[]>(
    options?.defaultSelectedActions || [],
  );
  const [dateRange, setDateRange] = useState<DateRangeOption>(
    options?.defaultDateRange || "all",
  );
  const [startDate, setStartDate] = useState(options?.defaultStartDate || "");
  const [endDate, setEndDate] = useState(options?.defaultEndDate || "");
  const [activeTab, setActiveTab] = useState(
    options?.defaultActiveTab || "all",
  );
  const [sortOrder, setSortOrder] = useState<SortOrder>(
    options?.defaultSortOrder || "newest",
  );

  // Filtrado general: búsqueda, acción (tab y checkboxes) y rango de fecha
  const filteredActivities = useMemo(() => {
    return activities.filter((item) => {
      // Filtro de búsqueda: por condición o tipo
      const term = searchTerm.toLowerCase();
      const matchesSearch =
        term === "" ||
        (item.source === "document"
          ? item.medicalHistory.condition.toLowerCase().includes(term) ||
            item.medicalHistory.type.toLowerCase().includes(term)
          : item.folder.name.toLowerCase().includes(term));

      // Filtro por pestaña activa (para la vista completa) y acciones seleccionadas (checkboxes)
      const matchesTab = activeTab === "all" || item.action === activeTab;
      const matchesAction =
        selectedActions.length === 0 || selectedActions.includes(item.action);

      // Filtro por rango de fecha
      let matchesDate = true;
      const now = new Date();
      const activityDate = new Date(item.createdAt);

      if (dateRange === "today") {
        matchesDate = activityDate.toDateString() === now.toDateString();
      } else if (dateRange === "week") {
        const oneWeekAgo = new Date(now);
        oneWeekAgo.setDate(now.getDate() - 7);
        matchesDate = activityDate >= oneWeekAgo;
      } else if (dateRange === "month") {
        const oneMonthAgo = new Date(now);
        oneMonthAgo.setMonth(now.getMonth() - 1);
        matchesDate = activityDate >= oneMonthAgo;
      } else if (dateRange === "custom" && startDate && endDate) {
        const start = new Date(startDate);
        const end = new Date(endDate);
        end.setHours(23, 59, 59, 999); // Final del día
        matchesDate = activityDate >= start && activityDate <= end;
      }

      return matchesSearch && matchesTab && matchesAction && matchesDate;
    });
  }, [
    activities,
    searchTerm,
    selectedActions,
    dateRange,
    startDate,
    endDate,
    activeTab,
  ]);

  // Ordenar actividades según el orden seleccionado
  const sortedActivities = useMemo(() => {
    return [...filteredActivities].sort((a, b) => {
      const dateA = new Date(a.createdAt).getTime();
      const dateB = new Date(b.createdAt).getTime();
      return sortOrder === "newest" ? dateB - dateA : dateA - dateB;
    });
  }, [filteredActivities, sortOrder]);

  // Agrupar actividades por fecha (usando toDateString() como clave)
  const groupedActivities = useMemo(() => {
    return sortedActivities.reduce<
      Record<string, Array<MedicalHistoryActivity>>
    >((groups, item) => {
      const dateKey = new Date(item.createdAt).toDateString();
      if (!groups[dateKey]) {
        groups[dateKey] = [];
      }
      groups[dateKey].push(item);
      return groups;
    }, {});
  }, [sortedActivities]);

  return {
    // Estados de filtros
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
    // Resultados
    filteredActivities,
    sortedActivities,
    groupedActivities,
  };
}
