import ExcelJS from "exceljs";
import {
  Activity,
  Edit,
  Plus,
  RefreshCw,
  Trash,
  Folder,
  Stethoscope,
  FileText,
  HeartPulse,
  Syringe,
  ClipboardPlus,
  ScanEye,
  X,
  TestTube,
  Hospital,
  BrainCircuit,
  Baby,
  SmilePlus,
  File,
  PencilLine,
  FilePlus,
  FileMinus,
  ListOrdered,
  AlertTriangle,
  Info,
  CheckCircle,
} from "lucide-react";

import { formatDate } from "@/utils";

import type { AIRecommendationType } from "../_components/ai-recommendation";
import type {
  FolderIconType,
  MedicalFileType,
  MedicalHistoryActivity,
} from "@/lib/types";

export const getTagColor = (tag: string): string => {
  const medicalCategories: Record<string, string> = {
    Alergia: "bg-red-600",
    Cirugía: "bg-purple-600",
    "Consulta General": "bg-blue-600",
    Diagnóstico: "bg-amber-600",
    "Enfermedad Crónica": "bg-rose-600",
    "Examen de Laboratorio": "bg-cyan-600",
    "Examen de Imagenología": "bg-indigo-600",
    Medicación: "bg-emerald-600",
    Vacunación: "bg-green-600",
    "Salud Mental": "bg-violet-600",
    Nutrición: "bg-lime-600",
    Odontología: "bg-sky-600",
    Oftalmología: "bg-blue-600",
    Pediatría: "bg-orange-600",
    Cardiología: "bg-red-600",
    Dermatología: "bg-pink-600",
    Neurología: "bg-purple-600",
    "Certificado Médico": "bg-lime-600",
    "Informe Médico": "bg-fuchsia-600",
    Epicrisis: "bg-amber-600",
    "Consentimiento Informado": "bg-blue-600",
    "Receta Médica": "bg-emerald-600",
    Rehabilitación: "bg-teal-600",
    Ginecología: "bg-pink-600",
    Otro: "bg-stone-600",
  };

  return medicalCategories[tag] || "bg-zinc-500";
};

export function getFileTypeColor(type: MedicalFileType): string {
  switch (type) {
    case "Examen":
      return "text-blue-500";
    case "Receta":
      return "text-green-500";
    case "Informe":
      return "text-amber-500";
    case "Diagnóstico":
      return "text-purple-500";
    case "Imagenología":
      return "text-rose-500";
    case "Certificado":
      return "text-teal-500";
    case "Epicrisis":
      return "text-red-500";
    case "Consentimiento":
      return "text-indigo-500";
    default:
      return "text-cyan-500";
  }
}

export function getFileTypeBorderColor(
  type: MedicalFileType,
  direction: "top" | "left" = "top",
): string {
  const mappingTop: Record<string, string> = {
    Examen: "border-t-blue-500",
    Receta: "border-t-green-500",
    Informe: "border-t-amber-500",
    Diagnóstico: "border-t-purple-500",
    Imagenología: "border-t-rose-500",
    Certificado: "border-t-teal-500",
    Epicrisis: "border-t-red-500",
    Consentimiento: "border-t-indigo-500",
  };

  const mappingLeft: Record<string, string> = {
    Examen: "border-l-blue-500",
    Receta: "border-l-green-500",
    Informe: "border-l-amber-500",
    Diagnóstico: "border-l-purple-500",
    Imagenología: "border-l-rose-500",
    Certificado: "border-l-teal-500",
    Epicrisis: "border-l-red-500",
    Consentimiento: "border-l-indigo-500",
  };

  if (direction === "top") {
    return mappingTop[type] || "border-t-cyan-500";
  } else {
    return mappingLeft[type] || "border-l-cyan-500";
  }
}

export const getActionBgColor = (action: string) => {
  switch (action) {
    case "created":
      return "bg-green-200/50 dark:bg-green-900/50";
    case "renamed":
      return "bg-yellow-200/50 dark:bg-yellow-900/50";
    case "updated":
      return "bg-blue-200/50 dark:bg-blue-900/50";
    case "deleted":
      return "bg-red-200/50 dark:bg-red-900/50";
    case "restored":
      return "bg-amber-200/50 dark:bg-amber-900/50";
    case "document_added":
      return "bg-emerald-200/50 dark:bg-emerald-900/50";
    case "document_removed":
      return "bg-rose-200/50 dark:bg-rose-900/50";
    case "reordered":
      return "bg-purple-200/50 dark:bg-purple-900/50";
    default:
      return "bg-gray-200/50 dark:bg-gray-900/50";
  }
};

export const getActionIcon = (action: string) => {
  switch (action) {
    case "created":
      return <Plus className="size-4 text-green-500" />;
    case "renamed":
      return <PencilLine className="size-4 text-yellow-500" />;
    case "updated":
      return <Edit className="size-4 text-blue-500" />;
    case "deleted":
      return <Trash className="size-4 text-red-500" />;
    case "restored":
      return <RefreshCw className="size-4 text-amber-500" />;
    case "document_added":
      return <FilePlus className="size-4 text-green-600" />;
    case "document_removed":
      return <FileMinus className="size-4 text-red-600" />;
    case "reordered":
      return <ListOrdered className="size-4 text-purple-500" />;
    default:
      return <Activity className="text-muted-foreground size-4" />;
  }
};

export const getActionSelfText = (action: string) => {
  switch (action) {
    case "created":
      return "añadió";
    case "renamed":
      return "renombró";
    case "updated":
      return "actualizó";
    case "deleted":
      return "eliminó";
    case "restored":
      return "restauró";
    case "document_added":
      return "vinculó un documento a";
    case "document_removed":
      return "desvinculó un documento de";
    case "reordered":
      return "reordenó";
    default:
      return "modificó";
  }
};

export const getActionText = (action: string) => {
  switch (action) {
    case "created":
      return "añadido";
    case "renamed":
      return "renombrado";
    case "updated":
      return "actualizado";
    case "deleted":
      return "eliminado";
    case "restored":
      return "restaurado";
    case "document_added":
      return "vinculado";
    case "document_removed":
      return "desvinculado";
    case "reordered":
      return "reordenado";
    default:
      return "modificado";
  }
};

export const getActionColor = (action: string) => {
  switch (action) {
    case "created":
      return "bg-green-50 text-green-600 border-green-100 dark:bg-green-950 dark:text-green-400 dark:border-green-900/20";
    case "updated":
      return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-950 dark:text-blue-400 dark:border-blue-900/20";
    case "deleted":
      return "bg-red-50 text-red-600 border-red-100 dark:bg-red-950 dark:text-red-400 dark:border-red-900/20";
    case "restored":
      return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-950 dark:text-amber-400 dark:border-amber-900/20";
    case "document_added":
      return "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-950 dark:text-emerald-400 dark:border-emerald-900/20";
    case "document_removed":
      return "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-950 dark:text-rose-400 dark:border-rose-900/20";
    case "reordered":
      return "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-950 dark:text-purple-400 dark:border-purple-900/20";
    case "renamed":
      return "bg-yellow-50 text-yellow-600 border-yellow-100 dark:bg-yellow-950 dark:text-yellow-400 dark:border-yellow-900/20";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-950 dark:text-gray-400 dark:border-gray-900/20";
  }
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return {
        label: "Alta",
        color: "bg-rose-500/10 text-rose-500 border-rose-500/20",
        icon: <AlertTriangle className="size-3 text-rose-500" />,
      };
    case "medium":
      return {
        label: "Media",
        color: "bg-yellow-500/10 text-yellow-500 border-yellow-500/20",
        icon: <Info className="size-3 text-yellow-500" />,
      };
    case "low":
      return {
        label: "Baja",
        color: "bg-green-500/10 text-green-500 border-green-500/20",
        icon: <CheckCircle className="size-3 text-green-500" />,
      };
    default:
      return {
        label: "Normal",
        color: "bg-blue-500/10 text-blue-500 border-blue-500/20",
        icon: <Info className="size-3 text-blue-500" />,
      };
  }
};

export const getPriorityColor = (priority: "high" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "text-red-500";
    case "medium":
      return "text-amber-500";
    case "low":
      return "text-green-500";
    default:
      return "";
  }
};

export const getPriorityBgColor = (priority: "high" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "bg-red-50 dark:bg-red-950";
    case "medium":
      return "bg-amber-50 dark:bg-amber-950";
    case "low":
      return "bg-green-50 dark:bg-green-950";
    default:
      return "";
  }
};

export const getPriorityText = (priority: "high" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "Alta";
    case "medium":
      return "Media";
    case "low":
      return "Baja";
    default:
      return "";
  }
};

export function getPriorityBorderColor(
  priority: "high" | "medium" | "low",
): string {
  const mapping: Record<string, string> = {
    high: "border-red-500/20",
    medium: "border-amber-500/20",
    low: "border-green-500/20",
  };
  return mapping[priority] || "";
}

export const getRelativeTime = (date: Date) => {
  const now = new Date();
  const diffInSeconds = Math.floor((now.getTime() - date.getTime()) / 1000);

  if (diffInSeconds < 60) {
    return "hace unos segundos";
  } else if (diffInSeconds < 3600) {
    const minutes = Math.floor(diffInSeconds / 60);
    return `hace ${minutes} ${minutes === 1 ? "minuto" : "minutos"}`;
  } else if (diffInSeconds < 86400) {
    const hours = Math.floor(diffInSeconds / 3600);
    return `hace ${hours} ${hours === 1 ? "hora" : "horas"}`;
  } else if (diffInSeconds < 604800) {
    const days = Math.floor(diffInSeconds / 86400);
    return `hace ${days} ${days === 1 ? "día" : "días"}`;
  } else {
    return formatDate(date, "dd MMMM yyyy");
  }
};

export function extractCleanFileName(pathname: string): string {
  if (!pathname) return "archivo";

  const fileName = pathname.split("/").pop() || "archivo";

  const decodedFile = decodeURIComponent(
    fileName.replace(/-[a-zA-Z0-9]{20,}(?=\.)/, ""),
  );

  const formatedFileName = decodedFile.replace(/\s+/g, "-").toLowerCase();

  return formatedFileName;
}

export async function uploadMedicalFile(file: File) {
  const formData = new FormData();
  formData.append("file", file);

  try {
    const res = await fetch("/api/files/upload-medical-file", {
      method: "POST",
      body: formData,
    });

    if (!res.ok) {
      const { error } = await res.json();
      throw new Error(error);
    }

    const data = await res.json();

    return {
      url: data.url,
      name: extractCleanFileName(data.pathname),
      size: data.size,
      contentType: data.contentType,
      uploadedAt: new Date(data.uploadedAt),
    };
  } catch (error) {
    throw error;
  }
}

export const exportActivityAsExcel = async (
  filteredActivities: Array<MedicalHistoryActivity>,
) => {
  const workbook = new ExcelJS.Workbook();

  workbook.creator = "Essentia";
  workbook.title = "Historial de Actividad Médica - Essentia";
  workbook.subject = "Reporte de actividad del historial médico";
  workbook.created = new Date();

  const worksheet = workbook.addWorksheet("Historial Médico");

  // TÍTULO
  worksheet.mergeCells("A1:F1");
  worksheet.getCell("A1").value = "Historial de Actividad Médica - Essentia";
  worksheet.getCell("A1").font = {
    size: 14,
    bold: true,
    color: { argb: "FF1E1E1E" },
  };
  worksheet.getCell("A1").alignment = {
    vertical: "middle",
    horizontal: "center",
  };
  worksheet.getCell("A1").border = { bottom: { style: "thin" } };

  worksheet.mergeCells("A2:F2");
  worksheet.getCell("A2").value =
    `Fecha de exportación: ${formatDate(new Date(), "dd/MM/yyyy")}`;
  worksheet.getCell("A2").font = {
    italic: true,
    size: 11,
    color: { argb: "FF555555" },
  };
  worksheet.getCell("A2").alignment = {
    vertical: "middle",
    horizontal: "center",
  };

  worksheet.addRow([]);

  // Columnas
  worksheet.columns = [
    { header: "Fecha", key: "fecha", width: 15 },
    { header: "Hora", key: "hora", width: 12 },
    { header: "Categoría Médica", key: "tipo", width: 20 },
    { header: "Acción", key: "accion", width: 18 },
    { header: "Documento", key: "documento", width: 50 },
    { header: "", key: "dummy", width: 2 }, // Columna vacía
  ];

  // Encabezados
  const headerRow = worksheet.addRow(
    worksheet.columns.map((col) => col.header),
  );

  headerRow.eachCell((cell, colNumber) => {
    if (colNumber === worksheet.columns.length) return;
    cell.font = { bold: true, color: { argb: "FF1E1E1E" } };
    cell.fill = {
      type: "pattern",
      pattern: "solid",
      fgColor: { argb: "FFE0E7FF" },
    };
    cell.alignment = { horizontal: "center", vertical: "middle" };
    cell.border = {
      top: { style: "thin" },
      left: { style: "thin" },
      bottom: { style: "thin" },
      right: { style: "thin" },
    };
  });

  // Datos
  filteredActivities.forEach((item) => {
    const date = new Date(item.createdAt);
    const row = worksheet.addRow({
      fecha: formatDate(date, "dd/MM/yyyy"),
      hora: formatDate(date, "HH:mm:ss"),
      tipo: "",
      accion: getActionText(item.action),
      documento: "",
      dummy: "",
    });

    if (item.source === "document") {
      row.getCell("tipo").value = item.medicalHistory.type;
      const docCell = row.getCell("documento");
      const text = item.medicalHistory.condition;
      if (item.file?.url) {
        docCell.value = { text, hyperlink: item.file.url };
        docCell.font = { color: { argb: "FF4F46E5" }, underline: true };
      } else {
        docCell.value = text;
      }
    } else {
      // source === "folder"
      row.getCell("tipo").value = "Carpeta";
      const docCell = row.getCell("documento");
      docCell.value = item.folder.name;
      // docCell.value = { text: item.folder.name, hyperlink: `/folders/${item.folder.id}` };
    }

    row.eachCell((cell, colNumber) => {
      if (colNumber === worksheet.columns.length) return;
      cell.alignment = { horizontal: "center", vertical: "middle" };
      cell.border = {
        top: { style: "thin" },
        left: { style: "thin" },
        bottom: { style: "thin" },
        right: { style: "thin" },
      };
    });
  });

  worksheet.addRow([]);

  // Footer
  const footerRow = worksheet.addRow([]);
  worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
  const footerCell = worksheet.getCell(`A${footerRow.number}`);
  footerCell.value = {
    text: "Archivo generado automáticamente por Essentia - https://www.essentia.plus",
    hyperlink: "https://www.essentia.plus",
  };
  footerCell.font = {
    italic: true,
    size: 10,
    color: { argb: "FF555555" },
    underline: true,
  };
  footerCell.alignment = { horizontal: "center", vertical: "middle" };

  // Descargar
  const buffer = await workbook.xlsx.writeBuffer();
  const blob = new Blob([buffer], {
    type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = `actividad_historial_medico_${formatDate(new Date(), "dd-MM-yyyy")}.xlsx`;
  link.click();
  URL.revokeObjectURL(url);
};

export function isRecommendationSaved(
  recommendation: AIRecommendationType,
  savedRecommendations: AIRecommendationType[],
): boolean {
  return savedRecommendations.some((r) => r.id === recommendation.id);
}

export const iconOptions = [
  "folder",
  "health",
  "document",
  "heart",
  "vaccine",
  "prescription",
  "exam",
  "xray",
  "lab",
  "surgery",
  "mental",
  "pregnancy",
  "dentist",
  "file",
] as const;

export const folderIconMap: Record<
  FolderIconType,
  React.FC<{ className?: string }>
> = {
  folder: Folder,
  health: Stethoscope,
  document: FileText,
  heart: HeartPulse,
  vaccine: Syringe,
  prescription: ClipboardPlus,
  exam: ScanEye,
  xray: X,
  lab: TestTube,
  surgery: Hospital,
  mental: BrainCircuit,
  pregnancy: Baby,
  dentist: SmilePlus,
  file: File,
};

export const folderIconLabelMap: Record<FolderIconType, string> = {
  folder: "Carpeta",
  health: "Salud",
  document: "Documento",
  heart: "Cardiología",
  vaccine: "Vacunas",
  prescription: "Recetas",
  exam: "Exámenes",
  xray: "Rayos X",
  lab: "Laboratorio",
  surgery: "Cirugías",
  mental: "Salud mental",
  pregnancy: "Embarazo",
  dentist: "Odontología",
  file: "Archivo",
};

export const folderColorLabelMap: Record<
  "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple",
  string
> = {
  gray: "Gris",
  blue: "Azul",
  green: "Verde",
  pink: "Rosado",
  red: "Rojo",
  orange: "Naranjo",
  purple: "Morado",
};

export const folderColorClassMap: Record<
  "gray" | "blue" | "green" | "pink" | "red" | "orange" | "purple",
  {
    bg: string;
    text: string;
  }
> = {
  gray: {
    bg: "bg-gray-200/50 dark:bg-gray-900/50",
    text: "text-gray-500",
  },
  blue: {
    bg: "bg-blue-200/50 dark:bg-blue-900/50",
    text: "text-blue-500",
  },
  green: {
    bg: "bg-green-200/50 dark:bg-green-900/50",
    text: "text-green-500",
  },
  pink: {
    bg: "bg-pink-200/50 dark:bg-pink-900/50",
    text: "text-pink-500",
  },
  red: {
    bg: "bg-red-200/50 dark:bg-red-900/50",
    text: "text-red-500",
  },
  orange: {
    bg: "bg-orange-200/50 dark:bg-orange-900/50",
    text: "text-orange-500",
  },
  purple: {
    bg: "bg-purple-200/50 dark:bg-purple-900/50",
    text: "text-purple-500",
  },
};

export function getPlanLimitMessage(
  remaining: number,
  unlimited: boolean,
  type: "doc" | "ai",
  isTrialActive: boolean,
): string {
  if (unlimited) {
    return type === "doc"
      ? "Puedes subir documentos ilimitados 🎉"
      : "Puedes guardar recomendaciones IA ilimitadas 🎉";
  }

  if (remaining === 0) {
    return type === "doc"
      ? "Alcanzaste el límite de documentos 😱"
      : isTrialActive
        ? "Alcanzaste el límite de tu prueba gratuita 😵"
        : "Alcanzaste el límite de recomendaciones IA 😱";
  }

  if (remaining <= 3) {
    return type === "doc"
      ? `Puedes subir ${remaining} documento${remaining > 1 ? "s" : ""} más 🙂`
      : `Puedes guardar ${remaining} ${remaining === 1 ? "recomendación" : "recomendaciones"} más 😐`;
  }

  return type === "doc"
    ? `Puedes subir ${remaining} documento${remaining > 1 ? "s" : ""} más 😊`
    : `Puedes guardar ${remaining} ${remaining === 1 ? "recomendación" : "recomendaciones"} más 😊`;
}
