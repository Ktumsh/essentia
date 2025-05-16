import DesktopDailyTip from "./desktop-daily-tip";
import StorageDesktop from "./storage-desktop";
import UpgradeCard from "./upgrade-card";

import type { FunFactType } from "@/db/data/fun-fact-data";
import type { UserProfileData } from "@/lib/types";

interface AsideRightProps {
  facts: FunFactType[] | null;
  loading: boolean;
  userData: UserProfileData | null;
}

const AsideRight = ({ facts, loading, userData }: AsideRightProps) => {
  const { isPremium } = userData ?? {};
  return (
    <aside className="sticky top-0 right-0 max-h-dvh w-full select-none @7xl:max-w-72">
      <div className="relative float-end flex w-full p-5 @7xl:p-0">
        <div className="grid w-full grid-cols-2 flex-col items-center gap-5 pb-0 lg:justify-between @7xl:flex @7xl:p-5 @7xl:pl-0">
          <DesktopDailyTip facts={facts} loading={loading} />
          {userData && <StorageDesktop />}
          {userData && !isPremium && <UpgradeCard />}
        </div>
      </div>
    </aside>
  );
};

export default AsideRight;
