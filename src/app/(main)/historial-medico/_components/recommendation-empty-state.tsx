import { Lightbulb } from "lucide-react";

import { Button } from "@/components/kit/button";
import { Card, CardContent } from "@/components/kit/card";

interface RecommendationEmptyStateProps {
  searchTerm: string;
  priorityFilter: string;
  onClearFilters: () => void;
}

const RecommendationEmptyState = ({
  searchTerm,
  priorityFilter,
  onClearFilters,
}: RecommendationEmptyStateProps) => {
  return (
    <Card className="border border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <Lightbulb className="mb-4 size-16 text-amber-400 opacity-50 dark:text-amber-300" />
        <p className="text-foreground text-sm font-medium">
          No hay recomendaciones guardadas
        </p>
        <p className="text-muted-foreground mt-2 max-w-md text-center text-sm">
          {searchTerm || priorityFilter !== "all"
            ? "No se encontraron recomendaciones con los filtros aplicados."
            : "Guarda recomendaciones de IA para acceder a ellas fácilmente en el futuro."}
        </p>
        {(searchTerm || priorityFilter !== "all") && (
          <Button
            size="sm"
            variant="ghost"
            onClick={onClearFilters}
            className="mt-4"
          >
            Limpiar filtros
          </Button>
        )}
      </CardContent>
    </Card>
  );
};

export default RecommendationEmptyState;
