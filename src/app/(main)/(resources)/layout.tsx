import PageWrapper from "@/components/ui/layout/page-wrapper";

interface ResourceLayoutProps {
  children: React.ReactNode;
}

export default function ResourcesLayout({ children }: ResourceLayoutProps) {
  return (
    <PageWrapper>
      <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-[1fr_424px]">
        {children}
      </div>
    </PageWrapper>
  );
}
