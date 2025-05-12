import type { ReactNode } from "react";

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  action?: ReactNode;
}

const ToolEmptyState = ({
  icon,
  title,
  description,
  action,
}: EmptyStateProps) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-4 rounded-2xl border border-dashed p-8 text-center">
      <div className="text-muted-foreground">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-muted-foreground max-w-md text-sm">{description}</p>
      {action && <div>{action}</div>}
    </div>
  );
};
export default ToolEmptyState;
