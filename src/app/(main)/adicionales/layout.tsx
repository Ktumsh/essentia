import AdditionalsTabs from "@/modules/additionals/components/additionals-tabs";

export default function AdditionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto max-w-7xl border-gray-200 bg-white pb-16 text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:min-h-[calc(100dvh-56px)] md:border md:border-y-0 md:pb-0">
      <AdditionalsTabs />
      {children}
    </div>
  );
}
