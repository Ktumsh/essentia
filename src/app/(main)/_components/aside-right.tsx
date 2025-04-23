import { UserProfileData } from "@/types/auth";

import DesktopDailyTip from "./desktop-daily-tip";
import StorageDesktop from "./storage-desktop";
import UpgradeCard from "./upgrade-card";

import type { HealthFact } from "@/types/common";

interface AsideRightProps {
  facts: HealthFact[] | null;
  loading: boolean;
  userData: UserProfileData | null;
}

const AsideRight = ({ facts, loading, userData }: AsideRightProps) => {
  const { isPremium } = userData ?? {};
  return (
    <aside className="@8xl:block sticky top-0 right-0 hidden max-h-dvh w-full max-w-72 select-none">
      <div className="relative float-end flex w-72">
        <div className="flex w-full flex-col items-center gap-5 p-2 pb-0 lg:justify-between">
          <DesktopDailyTip facts={facts} loading={loading} />
          {userData && <StorageDesktop />}
          {userData && !isPremium && <UpgradeCard />}
        </div>
      </div>
    </aside>
  );
};

export default AsideRight;
