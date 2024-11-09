"use client";

import { Button } from "@nextui-org/react";
import Link from "next/link";
import { useEffect, useState } from "react";

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
      <div className="relative flex h-full w-fit bg-white/50 bg-bento-gradient backdrop-blur backdrop-saturate-150 dark:bg-full-dark/50 dark:bg-none">
        <div className="pointer-events-none absolute inset-0 -z-10 bg-noise bg-[length:100px] bg-repeat opacity-5 lg:rounded-xl"></div>
        <div className="flex w-full flex-col items-center p-2 pb-0 lg:justify-between">
          <div className="mb-2 flex items-center gap-5 rounded-xl lg:w-full lg:border lg:border-gray-200 lg:bg-white lg:px-3 lg:py-2 lg:dark:border-full-dark lg:dark:bg-dark">
            <Link href="/recursos" className="h-10">
              <Button variant="flat" color="danger" isIconOnly size="md">
                <BackIcon className="size-7" />
              </Button>
            </Link>
            <h3 className="hidden font-medium uppercase lg:block">Recursos</h3>
          </div>
          <div className="flex w-full flex-col">
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
                              ? "text-bittersweet-400 group-hover:text-bittersweet-500 dark:text-cerise-red-400 dark:group-hover:text-cerise-red-500"
                              : "text-main-h group-hover:text-main dark:text-main-dark dark:group-hover:text-white"
                          }`}
                        />
                      }
                      className="mb-2 h-auto w-fit min-w-fit justify-start p-3 text-left !duration-150 data-[hover=true]:bg-white dark:hover:bg-dark lg:h-[50px] lg:w-full lg:min-w-24"
                    >
                      <span
                        className={`mr-4 hidden text-sm transition-colors lg:block ${
                          currentPath === link.link
                            ? "text-bittersweet-400 group-hover:text-bittersweet-500 dark:text-cerise-red-400 dark:group-hover:text-cerise-red-500"
                            : "text-main-h group-hover:text-main dark:text-main-dark dark:group-hover:text-white"
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
