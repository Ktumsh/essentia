import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { MenuIcon } from "@/modules/icons/common";
import { AvatarIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";

interface Props {
  profileData: UserProfileData | null;
}

const MenuButton: React.FC<Props> = ({ profileData }) => {
  const { profileImage } = profileData || {};

  return (
    <>
      {profileData ? (
        <>
          <Avatar className="size-8">
            {profileImage && (
              <AvatarImage
                src={profileImage}
                alt={"Avatar de" + profileData.username}
              />
            )}
            <AvatarFallback>
              <AvatarIcon className="text-main-m dark:text-main-dark-m" />
            </AvatarFallback>
          </Avatar>
        </>
      ) : (
        <MenuIcon className="size-6" />
      )}
    </>
  );
};

export default MenuButton;
