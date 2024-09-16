import "react-lite-youtube-embed/dist/LiteYouTubeEmbed.css";
import { FITNESS_MODAL_DATA } from "@/consts/fitness-modal";
import LiteYouTubeEmbed from "react-lite-youtube-embed";
import RESOURCES_VIDEOS from "@/consts/resources-videos";
import { Button } from "@nextui-org/react";
import Link from "next/link";
import { HashIcon } from "@/modules/icons/common";
import { ModalComponent } from "@/modules/core/components/ui/modals/health-fitness-modal";

const videos =
  RESOURCES_VIDEOS.find((section) => section.section === "ExerciseFitness")
    ?.videos || [];

const ExcerciseFitness = () => {
  return (
    <>
      <section className="px-2 md:px-0 py-6 pb-12 lg:pb-6">
        <div className="w-full px-3 mb-4">
          <h3 className="drop-shadow-md text-base-color dark:text-white">
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
                <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
              }
              className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
            >
              <span className="px-2 mr-1 bg-orient-700 dark:bg-cerise-red-400 text-white dark:text-black">
                Rutinas
              </span>
              de Ejercicios
            </Button>
          </h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

      {/* Contenedores ocultos para los componentes de React*/}
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
