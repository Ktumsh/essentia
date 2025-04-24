"use client";

import { FileText, PlusCircle } from "lucide-react";

import { Button } from "@/components/kit/button";
import { Card, CardContent } from "@/components/kit/card";

type EmptyStateProps = {
  hasFilters: boolean;
  onClearFilters: () => void;
  onAddDocument: () => void;
};

export default function EmptyState({
  hasFilters,
  onClearFilters,
  onAddDocument,
}: EmptyStateProps) {
  return (
    <Card>
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
            <Button radius="full" variant="ghost" onClick={onClearFilters}>
              Limpiar filtros
            </Button>
          ) : (
            <Button radius="full" onClick={onAddDocument}>
              <PlusCircle />
              Añadir documento
            </Button>
          )}
        </div>
      </CardContent>
    </Card>
  );
}
