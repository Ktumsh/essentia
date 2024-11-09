import { Button, Card, CardBody, Chip, Divider } from "@nextui-org/react";
import { ExclamationTriangleIcon } from "@radix-ui/react-icons";
import Link from "next/link";

import { HashIcon } from "@/modules/icons/common";

const Medicines = () => {
  return (
    <section className="mt-5 flex flex-col text-main-h dark:text-main-dark">
      <div className="mb-2 self-start">
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
            <HashIcon className="ml-1 size-5 opacity-0 transition-opacity group-data-[hover=true]:opacity-100" />
          }
          className="h-auto w-fit gap-0 bg-transparent p-0 text-xl font-semibold data-[pressed=true]:scale-100 data-[hover=true]:opacity-80"
        >
          <Chip
            color="danger"
            startContent={<ExclamationTriangleIcon className="ml-2 size-3" />}
          >
            <h3>Medicamentos para un botiquín</h3>
          </Chip>
        </Button>
      </div>
      <div className="flex w-full">
        <Card
          radius="sm"
          shadow="none"
          className="mt-2 border border-gray-200 bg-gray-100 text-main-h dark:border-dark dark:bg-dark/50 dark:text-main-dark"
        >
          <CardBody className="z-10 flex-row gap-6 overflow-x-auto scrollbar-hide">
            <ul className="min-w-[90%] space-y-2 md:min-w-0">
              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border border-gray-300 dark:border-dark"
                >
                  Analgésicos y Antiinflamatorios
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[70px] h-auto bg-gray-300 dark:bg-dark md:mb-7"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
                    <Divider className="mb-9 bg-gray-300 dark:bg-dark" />
                    <Divider className="mb-[70px] bg-gray-300 dark:bg-dark md:mb-7" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Antihistamínicos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[90px] h-auto bg-gray-300 dark:bg-dark md:mb-12 md:bg-gray-200"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
                    <Divider className="mb-[90px] bg-gray-300 dark:bg-dark md:mb-12" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Antidiarreicos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-8 h-auto bg-gray-300 dark:bg-dark md:mb-4"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Antieméticos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[70px] h-auto bg-gray-300 dark:bg-dark md:mb-12"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
                    <Divider className="mb-[70px] bg-gray-300 dark:bg-dark md:mb-12" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Antiácidos y Tratamientos para Reflujo Ácido
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-12 h-auto bg-gray-300 dark:bg-dark md:mb-7"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
                    <Divider className="mb-12 bg-gray-300 dark:bg-dark md:mb-7" />
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
            <ul className="min-w-[90%] space-y-2 md:min-w-0">
              <li>
                <Chip
                  variant="dot"
                  color="danger"
                  className="border border-gray-300 dark:border-dark"
                >
                  Antibióticos Tópicos
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Crema de Hidrocortisona
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Solución Salina Estéril
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-8 h-auto bg-gray-300 dark:bg-dark md:mb-4"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Epinefrina (EpiPen)
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
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
                  className="border border-gray-300 dark:border-dark"
                >
                  Carbón Activado
                </Chip>
                <div className="ml-3 flex">
                  <Divider
                    orientation="vertical"
                    className="mb-[72px] h-auto bg-gray-300 dark:bg-dark md:mb-8"
                  />
                  <div className="flex w-4 flex-col justify-between">
                    <Divider className="my-4 bg-gray-300 dark:bg-dark" />
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
