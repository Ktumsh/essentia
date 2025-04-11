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

export function exportToCSV(data: any[], filename: string) {
  const header = Object.keys(data[0] ?? {});
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
