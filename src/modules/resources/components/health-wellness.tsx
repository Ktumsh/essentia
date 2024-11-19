"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import Link from "next/link";

import { HashIcon } from "@/modules/icons/common";

import CardList from "./card-list";

const HealthWellness = () => {
  return (
    <section className="px-6 py-4 lg:p-0">
      <div className="flex w-full select-none flex-col justify-start">
        <h3 className="text-main-h dark:text-main-dark">
          <Link
            id="articulos-interesantes"
            data-id="articulos-interesantes"
            data-name="Artículos Interesantes"
            href="#articulos-interesantes"
            className="group mb-2 ml-3 inline-flex h-auto w-fit items-center gap-0 bg-transparent p-0 px-2 text-xl font-semibold tracking-tight transition hover:opacity-80 lg:px-0"
          >
            Artículos Interesantes
            <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-hover:opacity-100" />
          </Link>
        </h3>
      </div>
      <CardList type="article" resource="salud-y-bienestar" />
    </section>
  );
};

export default HealthWellness;
