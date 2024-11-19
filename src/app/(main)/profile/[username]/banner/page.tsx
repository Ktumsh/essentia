import { Metadata } from "next";
import Image from "next/image";

import { auth } from "@/app/(auth)/auth";
import PhotoModal from "@/modules/profile/components/photo-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";

type Props = {
  params: Promise<{ username: string }>;
};

export async function generateMetadata(props: Props): Promise<Metadata> {
  const params = await props.params;
  const username = params.username;
  return {
    title: `Foto de portada de ${username}`,
  };
}

export default async function BannerPage(props: Props) {
  const params = await props.params;
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
      {profileData.banner_image && (
        <div className="flex size-full items-center justify-center">
          <Image
            width={1080}
            height={532}
            quality={100}
            src={profileData.banner_image}
            alt={"Banner de perfil de " + profileData.username}
            className="flex aspect-auto max-h-[624px] !max-w-full items-center justify-center object-cover object-center md:size-full"
          />
        </div>
      )}
    </PhotoModal>
  );
}
