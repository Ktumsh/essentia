import PhotoModal from "@/modules/profile/components/photo-modal";
import { Session } from "@/types/session";
import { getUserProfileData } from "@/utils/profile";
import { auth } from "@@/auth";
import { Image as ImageUI } from "@nextui-org/react";
import Image from "next/image";

export default async function BannerPage() {
  const session = (await auth()) as Session;

  const profileData = await getUserProfileData(session);
  return (
    <PhotoModal>
      {profileData.banner_image && (
        <div className="size-full flex items-center justify-center">
          <ImageUI
            as={Image}
            width={1080}
            height={532}
            quality={100}
            radius="none"
            src={profileData.banner_image}
            alt="Foto de perfil"
            classNames={{
              wrapper:
                "flex items-center justify-center !max-w-full max-h-[624px] md:size-full",
              img: "!size-full object-cover object-center",
            }}
          />
        </div>
      )}
    </PhotoModal>
  );
}
