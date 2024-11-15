"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import { HashIcon } from "@/modules/icons/common";

import CardList from "./card-list";

const HealthWellness = () => {
  return (
    <section className="px-6 py-4 lg:p-0">
      <div className="flex w-full select-none flex-col justify-start">
        <h3 className="text-main-h dark:text-main-dark">
          <Button
            as={Link}
            id="articulos-interesantes"
            data-id="articulos-interesantes"
            data-name="Artículos Interesantes"
            href="#articulos-interesantes"
            disableRipple
            radius="none"
            variant="flat"
            endContent={
              <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
            }
            className="mb-2 ml-3 h-auto w-fit gap-0 bg-transparent p-0 px-2 text-xl font-semibold tracking-tight data-[pressed=true]:scale-100 data-[hover=true]:opacity-80 lg:px-0"
          >
            Artículos Interesantes
          </Button>
        </h3>
      </div>
      <CardList type="article" resource="salud-y-bienestar" />
    </section>
  );
};

export default HealthWellness;
