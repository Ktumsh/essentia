import ExcelJS from "exceljs";
import { Activity, Edit, Plus, RefreshCw, Trash } from "lucide-react";
import { toast } from "sonner";

import {
  MedicalFileType,
  MedicalHistoryActivityWithDetails,
} from "@/db/querys/medical-history-querys";
import { formatDate } from "@/utils/format";

export const getTagColor = (tag: string): string => {
  const medicalCategories: Record<string, string> = {
    Alergia:
      "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20",
    Cirugía:
      "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-900/20",
    "Consulta General":
      "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20",
    Diagnóstico:
      "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-900/20",
    "Enfermedad Crónica":
      "bg-rose-50 text-rose-600 border-rose-100 dark:bg-rose-900/10 dark:text-rose-400 dark:border-rose-900/20",
    "Examen de Laboratorio":
      "bg-cyan-50 text-cyan-600 border-cyan-100 dark:bg-cyan-900/10 dark:text-cyan-400 dark:border-cyan-900/20",
    "Examen de Imagenología":
      "bg-indigo-50 text-indigo-600 border-indigo-100 dark:bg-indigo-900/10 dark:text-indigo-400 dark:border-indigo-900/20",
    Medicación:
      "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-900/20",
    Vacunación:
      "bg-green-50 text-green-600 border-green-100 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20",
    "Salud Mental":
      "bg-violet-50 text-violet-600 border-violet-100 dark:bg-violet-900/10 dark:text-violet-400 dark:border-violet-900/20",
    Nutrición:
      "bg-lime-50 text-lime-600 border-lime-100 dark:bg-lime-900/10 dark:text-lime-400 dark:border-lime-900/20",
    Odontología:
      "bg-sky-50 text-sky-600 border-sky-100 dark:bg-sky-900/10 dark:text-sky-400 dark:border-sky-900/20",
    Oftalmología:
      "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20",
    Pediatría:
      "bg-orange-50 text-orange-600 border-orange-100 dark:bg-orange-900/10 dark:text-orange-400 dark:border-orange-900/20",
    Cardiología:
      "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20",
    Dermatología:
      "bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400 dark:border-pink-900/20",
    Neurología:
      "bg-purple-50 text-purple-600 border-purple-100 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-900/20",
    "Certificado Médico":
      "bg-slate-50 text-slate-600 border-slate-100 dark:bg-slate-900/10 dark:text-slate-400 dark:border-slate-900",
    "Informe Médico":
      "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-900/10 dark:text-gray-400 dark:border-gray-900/20",
    Epicrisis:
      "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-900/20",
    "Consentimiento Informado":
      "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20",
    "Receta Médica":
      "bg-emerald-50 text-emerald-600 border-emerald-100 dark:bg-emerald-900/10 dark:text-emerald-400 dark:border-emerald-900/20",
    Rehabilitación:
      "bg-teal-50 text-teal-600 border-teal-100 dark:bg-teal-900/10 dark:text-teal-400 dark:border-teal-900/20",
    Ginecología:
      "bg-pink-50 text-pink-600 border-pink-100 dark:bg-pink-900/10 dark:text-pink-400 dark:border-pink-900/20",
    Otro: "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-900/10 dark:text-gray-400 dark:border-gray-900",
  };

  return (
    medicalCategories[tag] ||
    "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-900/10 dark:text-gray-400 dark:border-gray-900/20"
  );
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
    case "Imagenología":
      return "text-cyan-500";
    case "Certificado":
      return "text-teal-500";
    case "Epicrisis":
      return "text-red-500";
    case "Consentimiento":
      return "text-indigo-500";
    default:
      return "text-gray-500";
  }
}

export const getActionIcon = (action: string) => {
  switch (action) {
    case "created":
      return <Plus className="size-4 text-green-500" />;
    case "updated":
      return <Edit className="size-4 text-blue-500" />;
    case "deleted":
      return <Trash className="size-4 text-red-500" />;
    case "restored":
      return <RefreshCw className="size-4 text-amber-500" />;
    default:
      return <Activity className="size-4" />;
  }
};

export const getActionSelfText = (action: string) => {
  switch (action) {
    case "created":
      return "añadió";
    case "updated":
      return "actualizó";
    case "deleted":
      return "eliminó";
    case "restored":
      return "restauró";
    default:
      return "modificó";
  }
};

export const getActionText = (action: string) => {
  switch (action) {
    case "created":
      return "añadido";
    case "updated":
      return "actualizado";
    case "deleted":
      return "eliminado";
    case "restored":
      return "restaurado";
    default:
      return "modificado";
  }
};

export const getActionColor = (action: string) => {
  switch (action) {
    case "created":
      return "bg-green-50 text-green-600 border-green-100 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20";
    case "updated":
      return "bg-blue-50 text-blue-600 border-blue-100 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20";
    case "deleted":
      return "bg-red-50 text-red-600 border-red-100 dark:bg-red-900/10 dark:text-red-400 dark:border-red-900/20";
    case "restored":
      return "bg-amber-50 text-amber-600 border-amber-100 dark:bg-amber-900/10 dark:text-amber-400 dark:border-amber-900/20";
    default:
      return "bg-gray-50 text-gray-600 border-gray-100 dark:bg-gray-900/10 dark:text-gray-400 dark:border-gray-900/20";
  }
};

export const getPriorityColor = (priority: "high" | "medium" | "low") => {
  switch (priority) {
    case "high":
      return "text-red-600 dark:text-red-500";
    case "medium":
      return "text-amber-600 dark:text-amber-500";
    case "low":
      return "text-green-600 dark:text-green-500";
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
    return formatDate(date, "dd MMMM yyyy, HH:mm");
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
      toast.error(error);
      return;
    }

    const data = await res.json();

    return {
      url: data.url,
      name: extractCleanFileName(data.pathname),
      size: data.size,
      contentType: data.contentType,
      uploadedAt: new Date(data.uploadedAt),
    };
  } catch (err) {
    console.error(err);
    toast.error("¡Ups! 😔", {
      description: "No se pudo cargar el archivo. Intenta de nuevo.",
    });
  }
}

export const exportActivityAsExcel = async (
  filteredActivities: MedicalHistoryActivityWithDetails[],
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
      tipo: item.medicalHistory.type,
      accion: getActionText(item.action),
      documento: item.medicalHistory.condition,
      dummy: "", // Columna vacía
    });

    const docCell = row.getCell(5);
    if (item.file?.url) {
      docCell.value = {
        text: item.medicalHistory.condition,
        hyperlink: item.file.url,
      };
      docCell.font = { color: { argb: "FF4F46E5" }, underline: true };
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

  worksheet.addRow([]); // Fila vacía al final

  // Footer
  const footerRow = worksheet.addRow([]);
  worksheet.mergeCells(`A${footerRow.number}:F${footerRow.number}`);
  const footerCell = worksheet.getCell(`A${footerRow.number}`);
  footerCell.value = {
    text: "Archivo generado automáticamente por Essentia - https://essentia-web.vercel.app",
    hyperlink: "https://essentia-web.vercel.app",
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
