import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import LiteYouTubeEmbed from "react-lite-youtube-embed";

import { FITNESS_MODAL_DATA } from "@/consts/fitness-modal";
import RESOURCES_VIDEOS from "@/consts/resources-videos";
import { ModalComponent } from "@/modules/core/components/ui/modals/health-fitness-modal";
import { HashIcon } from "@/modules/icons/common";

const videos =
  RESOURCES_VIDEOS.find((section) => section.section === "ExerciseFitness")
    ?.videos || [];

const ExcerciseFitness = () => {
  return (
    <>
      <section className="px-2 py-4 md:p-0">
        <div className="mb-4 w-full px-3">
          <h3 className="text-main drop-shadow-md dark:text-white">
            <Button
              as={Link}
              id="rutinas-de-ejercicios"
              data-id="rutinas-de-ejercicios"
              data-name="Rutinas de Ejercicios"
              href="#rutinas-de-ejercicios"
              disableRipple
              radius="none"
              variant="flat"
              endContent={
                <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
              }
              className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
            >
              <span className="mr-1 bg-orient-700 px-2 text-white dark:bg-cerise-red-400 dark:text-black">
                Rutinas
              </span>
              de Ejercicios
            </Button>
          </h3>
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-4">
          {FITNESS_MODAL_DATA.map((modal, index) => (
            <ModalComponent
              key={index}
              modalSize="5xl"
              modalTitle={modal.modalTitle}
              modalImage={modal.modalImage}
              modalBody={modal.modalBody}
              componentId={`component-${modal.id}`}
            />
          ))}
        </div>
      </section>

      {/* Contenedores ocultos para los components de React*/}
      <div id="components" style={{ display: "none" }}>
        {FITNESS_MODAL_DATA.map((modal, index) => (
          <div key={index} id={`component-${modal.id}`}>
            <LiteYouTubeEmbed
              id={videos[index]?.link}
              title={videos[index]?.title}
              poster="maxresdefault"
              wrapperClass="yt-wrap"
              playerClass="yt-player"
              activatedClass="yt-activated"
              aspectHeight={9}
              aspectWidth={16}
              webp
            />
          </div>
        ))}
      </div>
    </>
  );
};

export default ExcerciseFitness;
