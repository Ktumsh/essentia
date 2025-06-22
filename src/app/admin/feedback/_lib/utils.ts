import type { UserFeedback } from "@/db/schema";

export function getEmoji(reaction: string) {
  return (
    {
      love: "😍",
      happy: "😊",
      neutral: "😐",
      frustrated: "😕",
      angry: "😡",
    }[reaction] ?? "❓"
  );
}

export function exportToCSV(data: UserFeedback[], filename: string) {
  const header = Object.keys(data[0] ?? {}) as (keyof UserFeedback)[];
  const csv = [
    header.join(","),
    ...data.map((row) => header.map((key) => `"${row[key] ?? ""}"`).join(",")),
  ].join("\n");

  const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
  const link = document.createElement("a");
  link.href = URL.createObjectURL(blob);
  link.download = filename;
  link.click();
}
