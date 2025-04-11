import { Calendar } from "lucide-react";

import { formatDate } from "@/utils/format";

interface ActivityDateProps {
  date: string | Date;
}

const ActivityDate = ({ date }: ActivityDateProps) => {
  return (
    <div className="flex items-center gap-2">
      <div className="bg-border h-px flex-1"></div>
      <h3 className="text-muted-foreground flex items-center text-xs font-medium md:text-sm">
        <Calendar className="mr-1 size-3.5 md:size-4" />
        {formatDate(new Date(date), "EEEE, d 'de' MMMM")}
      </h3>
      <div className="bg-border h-px flex-1"></div>
    </div>
  );
};

export default ActivityDate;
