import { usePathname } from "next/navigation";
import { useEffect, useRef } from "react";

import { cancelReview } from "@/db/querys/progress-querys";

export function useCancelOnUnload(
  userId: string,
  reviewId: string,
  startedAt: Date | null,
) {
  const pathname = usePathname();
  const prevPathRef = useRef(pathname);

  useEffect(() => {
    if (
      !startedAt ||
      new Date().getTime() - new Date(startedAt).getTime() < 1000
    ) {
      return;
    }
    const cancel = async () => {
      try {
        await cancelReview({ userId, reviewId });
        console.log("✅ Revisión cancelada automáticamente");
      } catch (err) {
        console.error("❌ Error al cancelar revisión automáticamente", err);
      }
    };

    const handleVisibilityChange = () => {
      if (document.visibilityState === "hidden") {
        cancel();
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);

    const previousPath = prevPathRef.current;

    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);

      if (previousPath !== pathname) {
        cancel();
      }
    };
  }, [userId, reviewId, startedAt, pathname]);
}
