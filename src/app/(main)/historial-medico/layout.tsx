import MedicalWrapper from "./_components/medical-wrapper";

export default function MedicalHistoryLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <MedicalWrapper>{children}</MedicalWrapper>;
}
