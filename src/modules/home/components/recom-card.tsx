"use client";

import { StarsIcon } from "@/modules/icons/common";
import { AdditionalFillIcon, AIFillIcon } from "@/modules/icons/interface";
import { HealthCentersFillIcon } from "@/modules/icons/miscellaneus";
import { UserProfileData } from "@/types/session";
import { Card, CardBody } from "@nextui-org/react";
import Link from "next/link";

interface RecomCardProps {
  profileData: UserProfileData | null;
}

const RecomCard = ({ profileData }: RecomCardProps) => {
  const { is_premium } = profileData || {};
  return (
    <div className="flex size-full">
      <div className="w-full gap-4 md:gap-2 grid grid-cols-2">
        {is_premium ? (
          <Card
            as={Link}
            href="/essentia-ai"
            isPressable
            isBlurred
            shadow="none"
            className="col-span-2 bg-light-gradient-v2 dark:bg-dark-gradient-v2 data-[hover=true]:saturate-200 data-[hover=true]:scale-105 data-[hover=true]:shadow-lg !transition"
          >
            <CardBody className="flex-row gap-4 h-16 items-center justify-center">
              <AIFillIcon className="text-white size-7" />
              <h2 className="text-white leading-none text-2xl font-extrabold">
                Essentia AI
              </h2>
            </CardBody>
          </Card>
        ) : (
          <Card
            as={Link}
            href="/premium"
            isPressable
            isBlurred
            shadow="none"
            className="col-span-2 bg-light-gradient-v2 dark:bg-dark-gradient-v2 data-[hover=true]:saturate-200 data-[hover=true]:scale-105 data-[hover=true]:shadow-lg !transition"
          >
            <CardBody className="flex-row gap-4 h-16 items-center justify-center">
              <StarsIcon
                aria-hidden="true"
                className="size-7 [&_*]:fill-white focus:outline-none"
              />
              <h2 className="text-white leading-none text-2xl font-extrabold">
                Hazte Premium
              </h2>
            </CardBody>
          </Card>
        )}
        <Card
          as={Link}
          href="/centros-de-salud"
          isPressable
          isBlurred
          shadow="none"
          className="bg-gray-100 dark:bg-base-dark-50 border border-gray-300 dark:border-base-dark"
        >
          <CardBody className="h-20 items-center justify-between text-base-color-h dark:text-base-color-dark">
            <HealthCentersFillIcon className="size-7" />
            <h2 className="text-sm">Centros de Salud</h2>
          </CardBody>
        </Card>
        <Card
          as={Link}
          href="/adicionales"
          isPressable
          isBlurred
          shadow="none"
          className="bg-gray-100 dark:bg-base-dark-50 border border-gray-300 dark:border-base-dark"
        >
          <CardBody className="h-20 items-center justify-between text-base-color-h dark:text-base-color-dark">
            <AdditionalFillIcon className="size-7" />
            <h2 className="text-sm">Recursos Adicionales</h2>
          </CardBody>
        </Card>
      </div>
    </div>
  );
};

export default RecomCard;
