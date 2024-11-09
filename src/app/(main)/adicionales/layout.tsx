import AdditionalsTabs from "@/modules/additionals/components/additionals-tabs";

export default function AdditionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-dvh w-full flex-col pt-14">
      <div className="flex-1">
        <div className="max-w-8xl mx-auto size-full flex-1 border-gray-200 bg-white text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:border md:border-y-0">
          <AdditionalsTabs />
          {children}
        </div>
      </div>
    </div>
  );
}
