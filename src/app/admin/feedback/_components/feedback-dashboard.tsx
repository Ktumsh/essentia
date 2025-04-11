"use client";

import * as React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Button } from "@/components/kit/button";
import {
  ChartContainer,
  ChartLegend,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/kit/chart";
import { Input } from "@/components/kit/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/kit/select";
import { UserFeedback } from "@/db/schema";

import { exportToCSV, getEmoji } from "../_lib/utils";

type Props = {
  feedback: UserFeedback[];
  totalCount: number;
};

const COLORS = {
  positivos: "#22c55e",
  neutros: "#a3a3a3",
  negativos: "#ef4444",
} as const;

export default function FeedbackDashboard({ feedback, totalCount }: Props) {
  const [search, setSearch] = React.useState("");
  const [reactionFilter, setReactionFilter] = React.useState("all");
  const [contextFilter, setContextFilter] = React.useState("all");
  const [page, setPage] = React.useState(1);
  const rowsPerPage = 20;

  const filtered = feedback.filter((f) => {
    const matchSearch =
      f.comment.toLowerCase().includes(search.toLowerCase()) ||
      f.device?.toLowerCase().includes(search.toLowerCase());
    const matchReaction =
      reactionFilter !== "all" ? f.reaction === reactionFilter : true;
    const matchContext =
      contextFilter !== "all" ? f.context === contextFilter : true;
    return matchSearch && matchReaction && matchContext;
  });

  const pageData = filtered.slice((page - 1) * rowsPerPage, page * rowsPerPage);

  const stats = React.useMemo(() => {
    const positivos = filtered.filter((f) =>
      ["love", "happy"].includes(f.reaction),
    ).length;
    const negativos = filtered.filter((f) =>
      ["angry", "frustrated"].includes(f.reaction),
    ).length;
    const neutros = filtered.length - positivos - negativos;
    return { positivos, negativos, neutros, total: filtered.length };
  }, [filtered]);

  const pieData = [
    { name: "Positivos", value: stats.positivos, key: "positivos" },
    { name: "Neutros", value: stats.neutros, key: "neutros" },
    { name: "Negativos", value: stats.negativos, key: "negativos" },
  ] as const;

  const uniqueContexts = [
    ...new Set(feedback.map((f) => f.context).filter(Boolean)),
  ];

  return (
    <div className="mx-auto max-w-6xl space-y-10 px-4 py-10">
      <div className="flex flex-wrap items-center gap-4">
        <Input
          placeholder="Buscar comentario o dispositivo..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="max-w-sm"
        />

        <Select value={reactionFilter} onValueChange={setReactionFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todas las reacciones" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todas las reacciones</SelectItem>
            <SelectItem value="love">😍 Me encantó</SelectItem>
            <SelectItem value="happy">😊 Me gustó</SelectItem>
            <SelectItem value="neutral">😐 Indiferente</SelectItem>
            <SelectItem value="frustrated">😕 Me confundí</SelectItem>
            <SelectItem value="angry">😡 No me gustó</SelectItem>
          </SelectContent>
        </Select>

        <Select value={contextFilter} onValueChange={setContextFilter}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="Todos los contextos" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="all">Todos los contextos</SelectItem>
            {uniqueContexts.map((c) => (
              <SelectItem key={c} value={c || ""}>
                {c}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Button
          variant="outline"
          onClick={() => exportToCSV(filtered, "feedback.csv")}
        >
          Exportar CSV
        </Button>
      </div>

      <div className="flex flex-col-reverse gap-8 md:flex-row md:items-start">
        <div className="flex-1 space-y-2 text-sm">
          <p>💬 Total: {stats.total}</p>
          <p>😍 Positivos: {stats.positivos}</p>
          <p>😐 Neutros: {stats.neutros}</p>
          <p>😡 Negativos: {stats.negativos}</p>
        </div>

        {stats.total > 0 ? (
          <>
            <ChartContainer
              id="feedback-chart"
              config={{
                positivos: { label: "Positivos", color: COLORS.positivos },
                neutros: { label: "Neutros", color: COLORS.neutros },
                negativos: { label: "Negativos", color: COLORS.negativos },
              }}
              className="mx-auto h-80 w-full max-w-md"
            >
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={pieData as any}
                    dataKey="value"
                    nameKey="name"
                    cx="50%"
                    cy="50%"
                    outerRadius={80}
                    innerRadius={50}
                    label
                  >
                    {pieData.map((entry) => (
                      <Cell
                        key={entry.key}
                        fill={COLORS[entry.key as keyof typeof COLORS]}
                      />
                    ))}
                  </Pie>
                  <ChartTooltip content={<ChartTooltipContent />} />
                </PieChart>
              </ResponsiveContainer>
            </ChartContainer>

            <ChartLegend
              payload={pieData.map((entry) => ({
                color: COLORS[entry.key as keyof typeof COLORS],
                value: entry.name,
                type: "square",
              }))}
            />
          </>
        ) : (
          <div className="text-muted-foreground text-sm italic">
            No hay datos para mostrar el gráfico.
          </div>
        )}
      </div>

      <div className="overflow-auto rounded-md border">
        <table className="min-w-full text-sm">
          <thead className="bg-muted text-left">
            <tr>
              <th className="p-2">Comentario</th>
              <th className="p-2">Reacción</th>
              <th className="p-2">Contexto</th>
              <th className="p-2">Dispositivo</th>
              <th className="p-2">IP</th>
              <th className="p-2">Fecha</th>
            </tr>
          </thead>
          <tbody>
            {pageData.map((f) => (
              <tr key={f.id} className="border-t">
                <td className="p-2">{f.comment}</td>
                <td className="p-2 text-xl">{getEmoji(f.reaction)}</td>
                <td className="p-2">{f.context}</td>
                <td className="p-2">{f.device}</td>
                <td className="p-2 text-xs">{f.ip}</td>
                <td className="p-2 text-xs">
                  {new Date(f.createdAt).toLocaleString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <div className="flex items-center justify-between pt-4 text-sm">
        <p className="text-muted-foreground">
          Mostrando {pageData.length} de {filtered.length} resultados (de{" "}
          {totalCount} totales)
        </p>
        <div className="space-x-2">
          <Button
            size="sm"
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
          >
            Anterior
          </Button>
          <Button
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page * rowsPerPage >= filtered.length}
          >
            Siguiente
          </Button>
        </div>
      </div>
    </div>
  );
}
