import PhotoModal from "@/modules/profile/components/photo-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@/app/(auth)/auth";
import { Image as ImageUI } from "@nextui-org/react";
import { Metadata } from "next";
import Image from "next/image";

type Props = {
  params: { username: string };
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const username = params.username;
  return {
    title: `Foto de perfil de ${username}`,
  };
}

export default async function PhotoPage({ params }: Props) {
  const { username } = params;

  const session = ((await auth()) || null) as Session;

  let profileData;
  if (session) {
    const authenticatedUserProfile = await getUserProfileData(session);
    if (authenticatedUserProfile.username === username) {
      profileData = authenticatedUserProfile;
    } else {
      profileData = await getUserProfileData(undefined, username);
    }
  } else {
    profileData = await getUserProfileData(undefined, username);
  }

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
                img: "!size-48 md:!size-80 object-cover object-center",
              }}
            />
          </div>
        </div>
      )}
    </PhotoModal>
  );
}
