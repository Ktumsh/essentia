"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import { HEALTH_MODAL_DATA } from "@/consts/health-modal";
import { HashIcon } from "@/modules/icons/common";

import { ModalComponent } from "./health-fitness-modal";

const HealthWellness = () => {
  return (
    <section className="px-2 py-4 md:p-0">
      <div className="mb-4 w-full px-3">
        <h3 className="text-main drop-shadow-md dark:text-white">
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
            className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
          >
            <span className="mr-1 bg-orient-700 px-2 text-white dark:bg-cerise-red-400 dark:text-black">
              Artículos
            </span>
            Interesantes
          </Button>
        </h3>
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
        {HEALTH_MODAL_DATA.map((modal, index) => (
          <ModalComponent
            key={index}
            modalTitle={modal.modalTitle}
            modalImage={modal.modalImage}
            modalBody={modal.modalBody}
            componentId=""
          />
        ))}
      </div>
    </section>
  );
};

export default HealthWellness;
