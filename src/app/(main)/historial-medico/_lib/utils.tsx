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
  FileImage,
  FileType,
  ZoomIn,
  ZoomOut,
  type LucideIcon,
  Siren,
  Lightbulb,
  ClipboardList,
} from "lucide-react";

import { formatDate } from "@/utils";

import type { MedicalHistory } from "@/db/querys/medical-history-querys";
import type { FolderFormData } from "@/lib/form-schemas";
import type {
  FolderIconType,
  MedicalFileType,
  MedicalHistoryActivity,
  Priority,
  RecommendationType,
  SavedRecommendation,
} from "@/lib/types";

export const categoryColors: Record<string, string> = {
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

export const getTagColor = (tag: string): string => {
  return categoryColors[tag] || "bg-zinc-500";
};

export const recommendationTypeStyleConfig: Record<
  RecommendationType,
  { bg: string; gradient: string; label: string }
> = {
  general: {
    bg: "bg-blue-50 dark:bg-blue-950",
    gradient: "from-blue-500 via-blue-400 to-blue-300",
    label: "General",
  },
  preventive: {
    bg: "bg-emerald-50 dark:bg-emerald-950",
    gradient: "from-emerald-500 via-emerald-400 to-emerald-300",
    label: "Preventiva",
  },
  lifestyle: {
    bg: "bg-orange-50 dark:bg-orange-950",
    gradient: "from-orange-500 via-orange-400 to-orange-300",
    label: "Estilo de Vida",
  },
  medication: {
    bg: "bg-purple-50 dark:bg-purple-950",
    gradient: "from-purple-500 via-purple-400 to-purple-300",
    label: "Medicación",
  },
  followUp: {
    bg: "bg-yellow-50 dark:bg-yellow-950",
    gradient: "from-yellow-500 via-yellow-400 to-yellow-300",
    label: "Seguimiento",
  },
  emergency: {
    bg: "bg-red-50 dark:bg-red-950",
    gradient: "from-red-500 via-red-400 to-red-300",
    label: "Emergencia",
  },
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

export function getFileTypeBgColor(type: MedicalFileType): string {
  switch (type) {
    case "Examen":
      return "bg-blue-50 dark:bg-blue-950";
    case "Receta":
      return "bg-green-50 dark:bg-green-950";
    case "Informe":
      return "bg-amber-50 dark:bg-amber-950";
    case "Diagnóstico":
      return "bg-purple-50 dark:bg-purple-950";
    case "Imagenología":
      return "bg-rose-50 dark:bg-rose-950";
    case "Certificado":
      return "bg-teal-50 dark:bg-teal-950";
    case "Epicrisis":
      return "bg-red-50 dark:bg-red-950";
    case "Consentimiento":
      return "bg-indigo-50 dark:bg-indigo-950";
    default:
      return "bg-cyan-50 dark:bg-cyan-950";
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

export function groupDocumentsCountByCategory(
  documents: Array<MedicalHistory>,
): Record<string, number> {
  return documents.reduce(
    (acc, doc) => {
      doc.tags.forEach((tag) => {
        if (!acc[tag]) acc[tag] = 0;
        acc[tag]++;
      });
      return acc;
    },
    {} as Record<string, number>,
  );
}

export function groupDocumentsByCategory(
  documents: Array<MedicalHistory>,
): Record<string, Array<MedicalHistory>> {
  return documents.reduce(
    (acc, doc) => {
      doc.tags.forEach((tag) => {
        if (!acc[tag]) acc[tag] = [];
        acc[tag].push(doc);
      });
      return acc;
    },
    {} as Record<string, Array<MedicalHistory>>,
  );
}

export const getDocsToAnalyze = ({
  documents,
  analysisMethod,
  selectedDocuments,
  selectedCategories,
}: {
  documents: Array<MedicalHistory>;
  analysisMethod: "all" | "specific" | "categories";
  selectedDocuments: Array<string>;
  selectedCategories: Array<string>;
}): Array<MedicalHistory> => {
  if (analysisMethod === "all") return documents;
  if (analysisMethod === "specific")
    return documents.filter((doc) => selectedDocuments.includes(doc.id));
  if (analysisMethod === "categories")
    return documents.filter((doc) =>
      doc.tags.some((tag) => selectedCategories.includes(tag)),
    );
  return [];
};

export const getAnalysisDescription = ({
  analysisMethod,
  docCount,
  selectedDocuments,
  selectedCategories,
}: {
  analysisMethod: "all" | "specific" | "categories";
  docCount: number;
  selectedDocuments: Array<string>;
  selectedCategories: Array<string>;
}) => {
  switch (analysisMethod) {
    case "all":
      return `Todos los documentos han sido analizados(${docCount})`;
    case "specific":
      return `${selectedDocuments.length} documento${selectedDocuments.length !== 1 ? "s" : ""} seleccionado${selectedDocuments.length !== 1 ? "s" : ""} analizada`;
    case "categories":
      return `${selectedCategories.length} categoría${selectedCategories.length !== 1 ? "s" : ""} analizada`;
    default:
      return "Preparando análisis...";
  }
};

export function getConfidenceColor(confidence: number): string {
  if (confidence >= 90) return "text-green-500";
  if (confidence >= 70) return "text-yellow-500";
  return "text-red-500";
}

export const priorityConfig: Record<
  string,
  {
    label: string;
    color: string;
    textColor: string;
    bgColor: string;
    borderColor: string;
    icon: LucideIcon;
  }
> = {
  critical: {
    label: "Crítica",
    color: "bg-red-500",
    textColor: "text-red-700 dark:text-red-300",
    bgColor: "bg-red-50 dark:bg-red-950/20",
    borderColor: "border-red-200 dark:border-red-800",
    icon: Siren,
  },
  high: {
    label: "Alta",
    color: "bg-orange-500",
    textColor: "text-orange-700 dark:text-orange-300",
    bgColor: "bg-orange-50 dark:bg-orange-950/20",
    borderColor: "border-orange-200 dark:border-orange-800",
    icon: AlertTriangle,
  },
  medium: {
    label: "Media",
    color: "bg-yellow-500",
    textColor: "text-yellow-700 dark:text-yellow-300",
    bgColor: "bg-yellow-50 dark:bg-yellow-950/20",
    borderColor: "border-yellow-200 dark:border-yellow-800",
    icon: ClipboardList,
  },
  low: {
    label: "Baja",
    color: "bg-green-500",
    textColor: "text-green-700 dark:text-green-300",
    bgColor: "bg-green-50 dark:bg-green-950/20",
    borderColor: "border-green-200 dark:border-green-800",
    icon: Lightbulb,
  },
};

export const getPriorityBadge = (priority: string) => {
  switch (priority) {
    case "high":
      return {
        label: "Alta",
        color: "bg-rose-100 dark:bg-rose-950 text-rose-500 border-rose-500/20",
        icon: <AlertTriangle className="size-3 text-rose-500" />,
      };
    case "medium":
      return {
        label: "Media",
        color:
          "bg-yellow-100 dark:bg-yellow-950 text-yellow-500 border-yellow-500/20",
        icon: <Info className="size-3 text-yellow-500" />,
      };
    case "low":
      return {
        label: "Baja",
        color:
          "bg-green-100 dark:bg-green-950 text-green-500 border-green-500/20",
        icon: <CheckCircle className="size-3 text-green-500" />,
      };
    default:
      return {
        label: "Normal",
        color: "bg-blue-100 dark:bg-blue-950 text-blue-500 border-blue-500/20",
        icon: <Info className="size-3 text-blue-500" />,
      };
  }
};

export const getPriorityColor = (priority: Priority) => {
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

export const getPriorityBgColor = (priority: Priority) => {
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

export const getPriorityText = (priority: Priority) => {
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

export function getPriorityBorderColor(priority: Priority): string {
  const mapping: Record<string, string> = {
    high: "border-red-500/20",
    medium: "border-amber-500/20",
    low: "border-green-500/20",
  };
  return mapping[priority] || "";
}

export function getFileType(name: string) {
  const extension = name.split(".").pop()?.toLowerCase() || "";

  if (extension === "pdf") return "pdf";
  if (["jpg", "jpeg", "png", "gif", "webp", "svg", "bmp"].includes(extension))
    return "image";
  if (["txt", "md", "json", "xml", "csv", "log"].includes(extension))
    return "text";

  return "unknown";
}

export function getFileIcon(fileType: string) {
  switch (fileType) {
    case "pdf":
      return <FileText className="size-4 text-blue-500" />;
    case "image":
      return <FileImage className="size-4 text-rose-500" />;
    case "text":
      return <FileType className="size-4 text-teal-500" />;
    default:
      return <File className="size-4 text-gray-500" />;
  }
}

export function getFileBackgroundColor(fileType: string) {
  switch (fileType) {
    case "pdf":
      return "bg-blue-50 dark:bg-blue-950";
    case "image":
      return "bg-rose-50 dark:bg-rose-950";
    default:
      return "bg-teal-50 dark:bg-teal-950";
  }
}

export function getToggleZoomIcon(
  zoom: number,
  previousZoom: React.RefObject<number | null>,
) {
  if (zoom > 100) return <ZoomOut />;
  if (zoom < 100) return <ZoomIn />;

  if (zoom === 100 && previousZoom.current !== null) {
    if (previousZoom.current > 100) return <ZoomIn />;
    if (previousZoom.current < 100) return <ZoomOut />;
  }

  return <ZoomIn />;
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
      name: data.originalName,
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
  recommendation: SavedRecommendation,
  savedRecommendations: SavedRecommendation[],
): boolean {
  return savedRecommendations.some((r) => r.id === recommendation.id);
}

export function getAllRecommendationSaved({
  recommendations,
  savedRecommendations,
  isSaved,
}: {
  recommendations: SavedRecommendation[];
  savedRecommendations: SavedRecommendation[];
  isSaved: (rec: SavedRecommendation, saved: SavedRecommendation[]) => boolean;
}) {
  if (recommendations.length === 0) return false;
  return recommendations.every((rec) => isSaved(rec, savedRecommendations));
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

export const folderIconMap: Record<FolderIconType, LucideIcon> = {
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

export const getColorClass = (color: FolderFormData["color"]) => {
  switch (color) {
    case "gray":
      return "bg-gray-500";
    case "blue":
      return "bg-blue-500";
    case "green":
      return "bg-green-500";
    case "pink":
      return "bg-pink-500";
    case "red":
      return "bg-red-500";
    case "orange":
      return "bg-orange-500";
    case "purple":
      return "bg-purple-500";
    default:
      return "bg-muted";
  }
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
