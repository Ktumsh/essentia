import { memo } from "react";

interface SettingsOpsHeaderProps {
  title: string;
}

const SettingsOptsHeader = ({ title }: SettingsOpsHeaderProps) => {
  return (
    <div className="w-full pb-4 pt-8">
      <h1 className="text-xl font-semibold leading-none tracking-tight dark:text-white">
        {title}
      </h1>
    </div>
  );
};

export default memo(SettingsOptsHeader);
