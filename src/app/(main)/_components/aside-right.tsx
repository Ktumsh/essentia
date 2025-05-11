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
    <aside className="sticky top-0 right-0 max-h-dvh w-full select-none @7xl:max-w-72">
      <div className="relative float-end flex w-full p-5 @7xl:p-0">
        <div className="grid w-full grid-cols-2 flex-col items-center gap-5 pb-0 lg:justify-between @7xl:flex @7xl:p-2">
          <DesktopDailyTip facts={facts} loading={loading} />
          {userData && <StorageDesktop />}
          {userData && !isPremium && <UpgradeCard />}
        </div>
      </div>
    </aside>
  );
};

export default AsideRight;
