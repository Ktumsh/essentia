import { memo } from "react";

interface SettingsOpsHeaderProps {
  title: string;
  description?: string;
}

const SettingsOptsHeader = ({ title, description }: SettingsOpsHeaderProps) => {
  return (
    <div className="w-full pb-4 pt-8">
      <h1 className="text-xl font-semibold tracking-tight dark:text-white">
        {title}
      </h1>
      <p className="mt-1 hidden text-sm text-muted-foreground md:block">
        {description}
      </p>
    </div>
  );
};

export default memo(SettingsOptsHeader);
