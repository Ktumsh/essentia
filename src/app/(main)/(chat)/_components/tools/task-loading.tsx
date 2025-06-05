import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const TaskLoading = () => {
  return (
    <Card className="skeleton skeleton-bg flex w-fit max-w-80 min-w-72 items-center justify-between rounded-xl pr-3">
      <CardHeader className="px-5 py-4">
        <CardTitle className="skeleton-text text-sm">
          Recordar beber agua
        </CardTitle>
        <CardDescription className="skeleton-div">
          Diariamente a las 08:00
        </CardDescription>
      </CardHeader>
    </Card>
  );
};

export default TaskLoading;
