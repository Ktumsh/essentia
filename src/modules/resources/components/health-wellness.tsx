"use client";

import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";

import { HEALTH_MODAL_DATA } from "@/consts/health-modal";
import { ModalComponent } from "@/modules/core/components/ui/modals/health-fitness-modal";
import { HashIcon } from "@/modules/icons/common";

const HealthWellness = () => {
  return (
    <section className="px-2 md:p-0 py-4">
      <div className="w-full px-3 mb-4">
        <h3 className="drop-shadow-md text-base-color dark:text-white">
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
              <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
            }
            className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
          >
            <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
              Artículos
            </span>
            Interesantes
          </Button>
        </h3>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
