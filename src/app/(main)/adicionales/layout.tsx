import AdditionalsTabs from "@/modules/additionals/components/tabs";

export default function AdditionalsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="w-full flex items-stretch justify-center grow md:px-8 2xl:px-16 pt-14 pb-16 md:pb-0 shrink">
      <div className="flex flex-col min-h-[calc(100dvh-112px)] md:min-h-[calc(100dvh-56px)] w-full lg:min-w-[1024px] md:py-5 lg:px-5 shrink items-stretch grow">
        <AdditionalsTabs />
        {children}
      </div>
    </div>
  );
}
