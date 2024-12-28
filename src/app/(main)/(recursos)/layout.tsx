interface ResourceLayoutProps {
  children: React.ReactNode;
}

export default function ResourcesLayout({ children }: ResourceLayoutProps) {
  return (
    <div className="mx-auto max-w-7xl flex-1 border-gray-200 bg-white pb-16 text-main dark:border-dark dark:bg-full-dark dark:text-main-dark md:min-h-[calc(100dvh-56px)] md:border md:border-y-0 md:pb-0">
      <div className="select-none lg:px-6 lg:pb-6">
        <div className="mx-auto grid grid-cols-1 gap-6 lg:grid-cols-[1fr_424px]">
          {children}
        </div>
      </div>
    </div>
  );
}
