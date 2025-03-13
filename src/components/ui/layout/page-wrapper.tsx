import { ReactNode } from "react";

const PageWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="text-foreground mx-auto max-w-7xl pb-16 md:min-h-[calc(100dvh-88px)] md:pb-0">
      <div className="px-6 pb-6">{children}</div>
    </div>
  );
};

export default PageWrapper;
