"use client";

import { Skeleton } from "@/components/ui/skeleton";

const ActivityPreviewLoading = () => {
  return (
    <>
      <div className="mt-6 flex items-center gap-2 text-sm font-medium">
        <span>Actividad Reciente</span>
      </div>

      <div className="mt-3 overflow-hidden">
        <ul className="timeline timeline-vertical timeline-snap-icon timeline-hr-sm ms-[-100%] pl-10">
          {Array.from({ length: 5 }).map((_, idx) => (
            <li key={idx}>
              {idx !== 0 && <hr />}
              <div className="timeline-middle">
                <Skeleton className="size-8 rounded-full" />
              </div>
              <div className="timeline-end my-2.5 w-full pl-4">
                <div className="mb-1 flex justify-between">
                  <Skeleton className="h-4 w-24 rounded" />
                  <Skeleton className="h-3.5 w-12 rounded" />
                </div>
                <Skeleton className="h-3.5 w-3/4 rounded" />
              </div>
              <hr />
            </li>
          ))}

          <li>
            <hr />
            <div className="timeline-middle">
              <Skeleton className="h-8 w-8 rounded-full" />
            </div>
            <div className="timeline-end mx-5 my-2 w-full">
              <Skeleton className="h-8 w-40 rounded-full" />
            </div>
          </li>
        </ul>
      </div>
    </>
  );
};

export default ActivityPreviewLoading;
