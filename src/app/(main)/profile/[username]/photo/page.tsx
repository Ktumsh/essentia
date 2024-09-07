import PhotoModal from "@/modules/profile/components/photo-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";
import { Image as ImageUI } from "@nextui-org/react";
import Image from "next/image";

export default async function PhotoPage() {
  const session = (await auth()) as Session;

  const profileData = await getUserProfileData(session);
  return (
    <PhotoModal>
      {profileData.profile_image && (
        <div className="size-full flex items-center justify-center">
          <div className="bg-gray-200 dark:bg-base-dark rounded-full overflow-hidden">
            <ImageUI
              as={Image}
              width={320}
              height={320}
              quality={100}
              src={profileData.profile_image}
              alt={"Foto de perfil de " + profileData.username}
              classNames={{
                wrapper: "flex items-center justify-center",
                img: "!size-72 md:!size-80 object-cover object-center",
              }}
            />
          </div>
        </div>
      )}
    </PhotoModal>
  );
}
