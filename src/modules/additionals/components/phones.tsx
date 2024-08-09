import { PhoneIcon } from "@/modules/icons/status";
import { Card, CardFooter } from "@nextui-org/react";

export default function Phones() {
  const phones = [
    {
      title: "Salud Responde",
      description:
        "Permite acceder a un servicio telefónico compuesto por médicos, enfermeros, enfermeras, matrones y matronas del Ministerio de Salud (MINSAL). Este entrega información, apoyo y educación respecto de los derechos y beneficios que ofrece la red de salud.",
      phone: "600 360 77 77",
      row: "row-span-5",
    },
    {
      title: "Prevención del suicidio: “No estás solo, no estás sola”",
      description:
        "A través de esta línea, las personas que estén enfrentando una emergencia o crisis de salud mental asociada al suicidio, podrán contactarse con un psicólogo especialmente capacitado que los escuchará y ayudará.",
      phone: "*41 41",
      row: "row-span-6",
    },
    {
      title: "Ambulancia SAMU",
      description:
        "El Servicio de atención médica de urgencia (SAMU) entrega atención prehospitalaria oportuna, de acceso universal y de calidad mediante cobertura a nivel nacional.",
      phone: "131",
      row: "row-span-4",
    },
    {
      title: "Emergencia Comuna de Las Condes",
      description:
        "Número telefónico que enlaza con todas las unidades operativas del municipio frente a emergencias. Se puede acceder desde red fija y móvil, es sin costo y está disponible 24/7.",
      phone: "1402",
      row: "row-span-4",
    },
    {
      title: "Emergencia comuna de Vitacura",
      description:
        "La Municipalidad de Vitacura cuenta con este servicio, para casos de emergencia no vital en la comuna.",
      phone: "1403",
      row: "row-span-4",
    },
    {
      title: "Bomberos",
      description: "",
      phone: "132",
      row: "row-span-3",
    },
  ];
  return (
    <section className="flex flex-col items-center justify-centersize-full">
      <div className="w-full sm:max-h-[calc(100dvh-200px)] grid grid-cols-12 sm:grid-rows-12 gap-5">
        {phones.map((phone, index) => (
          <Card
            key={index}
            className={`group relative w-full bg-white/50 dark:bg-base-full-dark-50 border border-gray-100/50 dark:border-base-full-dark-50 backdrop-blur backdrop-saturate-150 shadow-md rounded-xl col-span-12 sm:col-span-6 text-base-color-h dark:text-base-color-dark !transition-none ${phone.row}`}
          >
            <div className="bg-noise bg-repeat bg-[length:100px] pointer-events-none absolute inset-0 opacity-5 rounded-xl z-10"></div>
            <div className="flex flex-col size-full items-center justify-center">
              <div className="flex flex-col size-full items-center px-8 pt-6 pb-2">
                <div className="inline-flex items-center justify-between w-full mb-3">
                  <h2 className="text-start text-2xl font-bold group-hover:text-black dark:group-hover:text-white transition-colors">
                    {phone.title}
                  </h2>
                </div>
                <div>
                  <p className="text-sm lg:text-base text-start text-base-color-h dark:text-base-color-dark-h group-hover:text-black dark:group-hover:text-white transition-colors">
                    {phone.description}
                  </p>
                </div>
              </div>
              <CardFooter className="flex w-full px-8 pb-8 ">
                <span>
                  <PhoneIcon className="size-6 group-hover:text-black dark:group-hover:text-white transition-colors" />
                </span>
                <p className="ml-2 text-xl font-bold text-base-color dark:text-base-color-dark group-hover:text-black dark:group-hover:text-white transition-colors">
                  Llame al {phone.phone}
                </p>
              </CardFooter>
            </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
