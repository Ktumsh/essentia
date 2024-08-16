import { HashIcon } from "@/modules/icons/common";
import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import { useGlowingEffect } from "../hooks/use-glowing-effect";

const Medicines = () => {
  const { handleMouseMove, setRef } = useGlowingEffect();
  return (
    <section className="flex flex-col mt-5 text-base-color-h dark:text-base-color-dark">
      <div className="self-start px-3 mb-2">
        <Button
          as={Link}
          id="medicamentos-para-un-botiquin-de-primeros-auxilios"
          data-id="medicamentos-para-un-botiquin-de-primeros-auxilios"
          data-name="Medicamentos para un botiquín de primeros auxilios"
          href="#medicamentos-para-un-botiquin-de-primeros-auxilios"
          disableRipple
          radius="none"
          variant="flat"
          endContent={
            <HashIcon className="size-5 ml-1 opacity-0 group-data-[hover=true]:opacity-100 transition-opacity" />
          }
          className="gap-0 text-xl w-fit p-0 bg-transparent h-auto data-[hover=true]:opacity-80 font-semibold data-[pressed=true]:scale-100"
        >
          <Chip
            variant="flat"
            color="danger"
            startContent={<ExclamationTriangleIcon className="size-3 ml-2" />}
          >
            <h3>Medicamentos para un botiquín de primeros suxilios</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex w-full px-3 md:px-0">
        <Card
          ref={(el) => setRef(el)}
          onMouseMove={(e) => handleMouseMove(e)}
          className="card mt-2 bg-white dark:bg-base-full-dark dark:border dark:border-base-dark text-base-color-h dark:text-base-color-dark"
          style={
            {
              "--clr": "#f2709c",
              "--clr-dark": "#ff7373",
            } as React.CSSProperties
          }
        >
          <CardBody className="flex-row gap-5 overflow-x-auto scrollbar-hide z-10">
            <ul className="space-y-2 min-w-[90%] md:min-w-0">
              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Analgésicos y Antiinflamatorios
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[70px] md:mb-7 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                    <Divider className="mb-9 bg-black/10 dark:bg-white/10" />
                    <Divider className="mb-[70px] md:mb-7 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      <strong>Paracetamol:</strong> Utilizado para el alivio del
                      dolor y la fiebre.
                    </li>
                    <li>
                      <strong>Ibuprofeno:</strong> Un antiinflamatorio no
                      esteroideo (AINE) que también alivia el dolor y reduce la
                      fiebre.
                    </li>
                    <li>
                      <strong>Aspirina:</strong> Útil para el alivio del dolor,
                      la fiebre, y como anticoagulante en casos de emergencia
                      cardíaca (como un ataque cardíaco).
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Antihistamínicos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[90px] md:mb-12 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                    <Divider className="mb-[90px] md:mb-12 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      <strong>Loratadina:</strong> Utilizado para tratar
                      reacciones alérgicas y síntomas de la fiebre del heno.
                    </li>
                    <li>
                      <strong>Difenhidramina:</strong> Un antihistamínico de
                      primera generación que puede ser útil para reacciones
                      alérgicas agudas y como sedante en caso de picaduras de
                      insectos o urticaria.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Antidiarreicos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-8 md:mb-4 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      <strong>Loperamida:</strong> Utilizado para tratar
                      episodios agudos de diarrea.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Antieméticos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[70px] md:mb-12 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                    <Divider className="mb-[70px] md:mb-12 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      <strong>Metoclopramida:</strong> Puede ser utilizado para
                      prevenir o tratar náuseas y vómitos.
                    </li>
                    <li>
                      <strong>Ondansetrón:</strong> Un antiemético más potente,
                      útil en casos de náuseas severas, como las que pueden
                      ocurrir con tratamientos de quimioterapia o cirugías.
                    </li>
                  </ul>
                </div>
              </li>
              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Antiácidos y Tratamientos para Reflujo Ácido
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-12 md:mb-7 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                    <Divider className="mb-12 md:mb-7 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      <strong>Omeprazol:</strong> Un inhibidor de la bomba de
                      protones que reduce la producción de ácido en el estómago,
                      útil para el tratamiento del reflujo ácido y la acidez.
                    </li>
                    <li>
                      <strong>
                        Hidróxido de magnesio/aluminio (Maalox, Mylanta):
                      </strong>{" "}
                      Antiácidos de acción rápida para aliviar la acidez
                      estomacal.
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
            <ul className="space-y-2 min-w-[90%] md:min-w-0">
              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Antibióticos Tópicos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] md:mb-8 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      <strong>
                        Neomicina/Bacitracina/Polimixina B (Neosporin):
                      </strong>{" "}
                      Una crema o ungüento antibiótico para prevenir infecciones
                      en cortes y raspaduras.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Crema de Hidrocortisona
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] md:mb-8 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      Útil para tratar picazón e inflamación por picaduras de
                      insectos, dermatitis de contacto, y otras afecciones
                      cutáneas menores.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Solución Salina Estéril
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-8 md:mb-4 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      Para limpiar heridas o utilizar como colirio en caso de
                      irritación ocular.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Epinefrina (EpiPen)
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] md:mb-8 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      Utilizada para tratar reacciones alérgicas severas
                      (anafilaxia). Este medicamento solo debe ser utilizado
                      bajo prescripción médica y con la debida capacitación.
                    </li>
                  </ul>
                </div>
              </li>

              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border-black/10 dark:border-white/10"
                >
                  Carbón Activado
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] md:mb-8 h-auto bg-black/10 dark:bg-white/10"
                  />
                  <div className="flex flex-col justify-between w-4">
                    <Divider className="my-4 bg-black/10 dark:bg-white/10" />
                  </div>
                  <ul className="ml-2 mt-2 space-y-2 text-sm">
                    <li>
                      Puedes ser utilizado en ciertos casos de intoxicación para
                      adsorber toxinas en el estómago, siempre bajo la dirección
                      de un profesional de salud.
                    </li>
                  </ul>
                </div>
              </li>
            </ul>
          </CardBody>
        </Card>
      </div>
    </section>
  );
};

export default Medicines;
