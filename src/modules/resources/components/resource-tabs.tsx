"use client";

import { useEffect, useState } from "react";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import {
  HealthIcon,
  ExcerciseIcon,
  NutritionIcon,
  WellbeingIcon,
  SexualityIcon,
  ForAllAgesIcon,
} from "@/modules/icons/interface";
import { BackIcon } from "@/modules/icons/navigation";

const ResourceTabs = () => {
  const [currentPath, setCurrentPath] = useState("");

  useEffect(() => {
    setCurrentPath(window.location.pathname);
  }, []);

  const asideLinks = [
    {
      name: "Salud y bienestar",
      link: "/recursos/salud-y-bienestar",
      icon: HealthIcon,
    },
    {
      name: "Ejercicios y fitness",
      link: "/recursos/ejercicios-y-fitness",
      icon: ExcerciseIcon,
    },
    {
      name: "Nutrición y alimentación",
      link: "/recursos/nutricion-y-alimentacion",
      icon: NutritionIcon,
    },
    {
      name: "Bienestar emocional",
      link: "/recursos/bienestar-emocional",
      icon: WellbeingIcon,
    },
    {
      name: "Salud y educación sexual",
      link: "/recursos/salud-y-educacion-sexual",
      icon: SexualityIcon,
    },
    {
      name: "Salud para todas las edades",
      link: "/recursos/salud-para-todas-las-edades",
      icon: ForAllAgesIcon,
    },
  ];
  return (
    <aside className="w-auto">
      <div className="relative flex w-fit h-full bg-white/50 bg-bento-gradient dark:bg-none dark:bg-base-full-dark-50 backdrop-blur backdrop-saturate-150">
        <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 lg:rounded-xl -z-10"></div>
        <div className="flex flex-col items-center lg:justify-between w-full p-2 pb-0">
          <div className="flex items-center gap-5 lg:w-full mb-2 lg:px-3 lg:py-2 rounded-xl lg:bg-white lg:dark:bg-base-dark lg:border lg:border-gray-200 lg:dark:border-base-full-dark">
            <Link href="/recursos" className="h-10">
              <Button variant="flat" color="danger" isIconOnly size="md">
                <BackIcon className="size-7" />
              </Button>
            </Link>
            <h3 className="hidden lg:block font-medium uppercase">Recursos</h3>
          </div>
          <div className="flex flex-col w-full">
            <ul>
              {asideLinks.map((link, index) => (
                <li key={index} className="w-fit lg:w-full">
                  <Link href={link.link}>
                    <Button
                      disableRipple
                      fullWidth
                      size="lg"
                      radius="lg"
                      variant="light"
                      startContent={
                        <link.icon
                          className={`size-5 transition-colors ${
                            currentPath === link.link
                              ? "text-bittersweet-400 dark:text-cerise-red-400 group-hover:text-bittersweet-500 dark:group-hover:text-cerise-red-500"
                              : "text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white"
                          }`}
                        />
                      }
                      className="w-fit lg:w-full min-w-fit lg:min-w-24 h-auto lg:h-[50px] justify-start text-left p-3 mb-2 data-[hover=true]:bg-white dark:hover:bg-base-dark !duration-150"
                    >
                      <span
                        className={`hidden lg:block text-sm mr-4 transition-colors ${
                          currentPath === link.link
                            ? "text-bittersweet-400 dark:text-cerise-red-400 group-hover:text-bittersweet-500 dark:group-hover:text-cerise-red-500"
                            : "text-base-color-h dark:text-base-color-dark group-hover:text-base-color dark:group-hover:text-white"
                        }`}
                      >
                        {link.name}
                      </span>
                    </Button>
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </aside>
  );
};

export default ResourceTabs;
