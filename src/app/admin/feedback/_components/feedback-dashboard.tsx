"use client";

import {
  Search,
  Download,
  TrendingUp,
  MessageSquare,
  Users,
} from "lucide-react";
import { useMemo, useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { formatDate } from "@/utils";

import { exportToCSV, getEmoji } from "../_lib/utils";

import type { UserFeedback } from "@/db/schema";

type FeedbackDashboardProps = {
  feedback: Array<UserFeedback>;
  totalCount: number;
};

const COLORS = {
  positivos: "#22c55e",
  neutros: "#06b6d4",
  negativos: "#ef4444",
} as const;

const REACTION_LABELS = {
  love: "😍 Me encantó",
  happy: "😊 Me gustó",
  neutral: "😐 Indiferente",
  frustrated: "😕 Me confundí",
  angry: "😡 No me gustó",
} as const;

export default function FeedbackDashboard({
  feedback,
  totalCount,
}: FeedbackDashboardProps) {
  const [search, setSearch] = useState("");
  const [reactionFilter, setReactionFilter] = useState("all");
  const [contextFilter, setContextFilter] = useState("all");
  const [page, setPage] = useState(1);
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

  const stats = useMemo(() => {
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

  const getReactionVariant = (reaction: UserFeedback["reaction"]) => {
    if (["love", "happy"].includes(reaction)) return "default";
    if (reaction === "neutral") return "secondary";
    return "destructive";
  };

  return (
    <div className="relative flex h-dvh flex-col overflow-y-auto">
      <div className="mx-auto w-full max-w-7xl space-y-8 p-6">
        {/* Header */}
        <h1 className="font-merriweather text-3xl font-semibold tracking-tight">
          Feedback de Usuarios
        </h1>

        {/* Stats Cards */}
        <div className="grid gap-4 md:grid-cols-4">
          <Card className="border-2 border-dashed">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Total</CardTitle>
              <MessageSquare className="text-muted-foreground size-4" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{stats.total}</div>
              <p className="text-muted-foreground text-xs">
                comentarios filtrados
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-green-200 bg-green-50 dark:border-green-800 dark:bg-green-950/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Positivos</CardTitle>
              <TrendingUp className="size-4 text-green-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-green-500">
                {stats.positivos}
              </div>
              <p className="text-muted-foreground text-xs">
                {stats.total > 0
                  ? Math.round((stats.positivos / stats.total) * 100)
                  : 0}
                % del total
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-cyan-200 bg-cyan-50 dark:border-cyan-800 dark:bg-cyan-950/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Neutros</CardTitle>
              <Users className="size-4 text-cyan-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-cyan-500">
                {stats.neutros}
              </div>
              <p className="text-muted-foreground text-xs">
                {stats.total > 0
                  ? Math.round((stats.neutros / stats.total) * 100)
                  : 0}
                % del total
              </p>
            </CardContent>
          </Card>

          <Card className="border-2 border-dashed border-red-200 bg-red-50 dark:border-red-800 dark:bg-red-950/80">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium">Negativos</CardTitle>
              <TrendingUp className="size-4 rotate-180 text-red-500" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold text-red-500">
                {stats.negativos}
              </div>
              <p className="text-muted-foreground text-xs">
                {stats.total > 0
                  ? Math.round((stats.negativos / stats.total) * 100)
                  : 0}
                % del total
              </p>
            </CardContent>
          </Card>
        </div>

        {/* Filters */}
        <Card className="bg-muted">
          <CardHeader>
            <CardTitle>Filtros</CardTitle>
            <CardDescription>
              Filtra los comentarios por búsqueda, reacción o contexto
            </CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <div className="relative min-w-[200px] flex-1">
                <Search className="text-muted-foreground absolute top-1/2 left-3 size-4 -translate-y-1/2" />
                <Input
                  placeholder="Buscar comentario o dispositivo..."
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  className="bg-background pl-10"
                />
              </div>

              <Select value={reactionFilter} onValueChange={setReactionFilter}>
                <SelectTrigger className="bg-background w-[200px]">
                  <SelectValue placeholder="Todas las reacciones" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las reacciones</SelectItem>
                  {Object.entries(REACTION_LABELS).map(([key, label]) => (
                    <SelectItem key={key} value={key}>
                      {label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={contextFilter} onValueChange={setContextFilter}>
                <SelectTrigger className="bg-background w-[200px]">
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
                className="bg-background rounded-full"
              >
                <Download className="size-4" />
                Exportar CSV
              </Button>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Chart */}
          <Card className="lg:col-span-1">
            <CardHeader>
              <CardTitle>Distribución de Feedback</CardTitle>
              <CardDescription>
                Proporción de comentarios por sentimiento
              </CardDescription>
            </CardHeader>
            <CardContent>
              {stats.total > 0 ? (
                <ChartContainer
                  config={{
                    positivos: { label: "Positivos", color: COLORS.positivos },
                    neutros: { label: "Neutros", color: COLORS.neutros },
                    negativos: { label: "Negativos", color: COLORS.negativos },
                  }}
                  className="h-[300px] w-full"
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
                        innerRadius={40}
                        paddingAngle={2}
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
              ) : (
                <div className="text-muted-foreground flex h-[300px] items-center justify-center">
                  No hay datos para mostrar
                </div>
              )}
            </CardContent>
          </Card>

          {/* Table */}
          <Card className="lg:col-span-2">
            <CardHeader className="pb-4">
              <CardTitle>Comentarios de Feedback</CardTitle>
              <CardDescription>
                Explora todos los comentarios y reacciones de tus usuarios
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {pageData.length > 0 ? (
                  <>
                    <div className="space-y-2">
                      {pageData.map((f) => (
                        <div
                          key={f.id}
                          className="group bg-card hover:bg-muted/30 hover:border-border/80 relative rounded-lg border p-4 transition-all"
                        >
                          {/* Header compacto con reacción, contexto y fecha */}
                          <div className="mb-3 flex items-center justify-between">
                            <div className="flex items-center gap-3">
                              <Badge variant={getReactionVariant(f.reaction)}>
                                <span className="text-sm">
                                  {getEmoji(f.reaction)}
                                </span>
                                {REACTION_LABELS[f.reaction]
                                  .split(" ")
                                  .slice(1)
                                  .join(" ")}
                              </Badge>
                              {f.context && (
                                <Badge
                                  variant="outline"
                                  className="px-2 py-0.5 text-xs"
                                >
                                  {f.context}
                                </Badge>
                              )}
                            </div>
                            <time className="text-muted-foreground font-mono text-xs">
                              {formatDate(f.createdAt, "dd/MM HH:mm")}
                            </time>
                          </div>

                          {/* Comentario principal */}
                          <div className="mb-3">
                            <p className="text-foreground text-sm leading-relaxed">
                              &quot;{f.comment}&quot;
                            </p>
                          </div>

                          {/* Metadatos compactos en línea */}
                          <div className="text-muted-foreground flex items-center gap-4 text-xs">
                            {f.device && (
                              <div className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-green-500"></span>
                                <span className="font-medium">
                                  Dispositivo:
                                </span>
                                <span>{f.device}</span>
                              </div>
                            )}
                            {f.ip && (
                              <div className="flex items-center gap-1">
                                <span className="h-1.5 w-1.5 rounded-full bg-orange-500"></span>
                                <span className="font-medium">IP:</span>
                                <span className="font-mono">{f.ip}</span>
                              </div>
                            )}
                            <div className="ml-auto flex items-center gap-1">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500"></span>
                              <span className="font-mono">
                                #{f.id.slice(-6)}
                              </span>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Paginación compacta */}
                    <div className="flex items-center justify-between border-t pt-4">
                      <div className="text-muted-foreground text-sm">
                        <span className="font-medium">{pageData.length}</span>{" "}
                        de{" "}
                        <span className="font-medium">{filtered.length}</span>{" "}
                        comentarios
                        {totalCount !== filtered.length && (
                          <span className="ml-1 text-xs">
                            (de {totalCount} totales)
                          </span>
                        )}
                      </div>

                      <div className="flex items-center gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => Math.max(1, p - 1))}
                          disabled={page === 1}
                          className="h-8 px-3"
                        >
                          ← Anterior
                        </Button>

                        <div className="bg-muted flex items-center gap-1 rounded px-2 py-1 text-xs">
                          <span className="font-medium">{page}</span>
                          <span className="text-muted-foreground">/</span>
                          <span className="font-medium">
                            {Math.ceil(filtered.length / rowsPerPage)}
                          </span>
                        </div>

                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setPage((p) => p + 1)}
                          disabled={page * rowsPerPage >= filtered.length}
                          className="h-8 px-3"
                        >
                          Siguiente →
                        </Button>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="flex flex-col items-center justify-center py-8 text-center">
                    <div className="bg-muted mb-3 flex h-12 w-12 items-center justify-center rounded-full">
                      <MessageSquare className="text-muted-foreground h-6 w-6" />
                    </div>
                    <h3 className="mb-1 text-base font-semibold">
                      No hay comentarios
                    </h3>
                    <p className="text-muted-foreground max-w-sm text-sm">
                      No se encontraron comentarios que coincidan con los
                      filtros aplicados.
                    </p>
                  </div>
                )}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
