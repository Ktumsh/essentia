import { FileText } from "lucide-react";

import { SmilePlusButton } from "@/components/button-kit/smile-plus-button";
import { Button } from "@/components/kit/button";
import { Card, CardContent } from "@/components/kit/card";

type DocumentEmptyStateProps = {
  hasFilters: boolean;
  onClearFilters: () => void;
  onAddDocument: () => void;
};

const DocumentEmptyState = ({
  hasFilters,
  onClearFilters,
  onAddDocument,
}: DocumentEmptyStateProps) => {
  return (
    <Card className="border border-dashed">
      <CardContent className="flex flex-col items-center justify-center py-10">
        <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
          <FileText className="text-muted-foreground size-12 opacity-50" />
          <div className="space-y-1.5 text-center">
            <p className="text-foreground text-sm font-medium">
              No hay documentos médicos
            </p>
            <p className="text-xs md:text-sm">
              {hasFilters
                ? "No se encontraron documentos con los filtros aplicados."
                : "Añade tu primer documento médico para comenzar a construir tu historial."}
            </p>
          </div>
          {hasFilters ? (
            <Button variant="ghost" size="sm" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          ) : (
            <SmilePlusButton size="sm" onClick={onAddDocument}>
              Añadir documento
            </SmilePlusButton>
          )}
        </div>
      </CardContent>
    </Card>
  );
};

export default DocumentEmptyState;
