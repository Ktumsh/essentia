import { ReactNode } from "react";

interface ChatLayoutProps {
  children: ReactNode;
}

export default async function ChatLayout({ children }: ChatLayoutProps) {
  return (
    <div className="relative flex h-[calc(100dvh-120px)] w-full overflow-hidden text-white lg:h-[calc(100dvh-56px)]">
      {children}
    </div>
  );
}
