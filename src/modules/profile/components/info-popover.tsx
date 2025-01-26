import { Info } from "lucide-react";
import { memo, useMemo } from "react";

import { Button } from "@/components/ui/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { BetterTooltip } from "@/components/ui/tooltip";
import { QuestionMarkIcon } from "@/modules/icons/common";

type PopoverContentType =
  | "birthdate"
  | "bioFormat"
  | "bioReason"
  | "genre"
  | "weightFormat"
  | "weightReason"
  | "heightFormat"
  | "heightReason"
  | "locationFormat"
  | "locationReason"
  | "taskName"
  | "taskInstructions";

type PopoverContent = {
  title: string;
  content: string[];
};

const popoverContentMap: Record<PopoverContentType, PopoverContent> = {
  birthdate: {
    title: "¿Por qué indicar tu fecha de nacimiento?",
    content: [
      "Conocer tu edad nos ayuda a ofrecer sugerencias y planes de salud apropiados para tu etapa de vida, ajustados a tus necesidades específicas.",
    ],
  },
  bioFormat: {
    title: "Formato de biografía",
    content: [
      "Comparte un breve resumen sobre ti en un máximo de 180 caracteres.",
      'Por ejemplo, "Amante del deporte y la vida saludable, buscando nuevas metas".',
    ],
  },
  bioReason: {
    title: "¿Por qué indicar tu biografía?",
    content: [
      "Nos ayuda a personalizar tu experiencia en función de tus intereses, metas de salud y estilo de vida.",
    ],
  },
  genre: {
    title: "¿Por qué indicar tu género?",
    content: [
      "Nos ayuda a ofrecer recomendaciones de salud y bienestar más ajustadas a tus necesidades específicas, teniendo en cuenta aspectos fisiológicos y hormonales propios de tu género.",
    ],
  },
  weightFormat: {
    title: "Formato de peso",
    content: [
      "Introduce tu peso en kilogramos (kg). Por ejemplo: 70 para 70 kilogramos.",
      "El peso mínimo es 1 kg y el máximo es 300 kg.",
    ],
  },
  weightReason: {
    title: "¿Por qué indicar tu peso?",
    content: [
      "Conocer tu peso nos permite calcular indicadores clave como el índice de masa corporal (IMC).",
      "Esto nos ayuda a personalizar los planes de salud y bienestar según tus necesidades específicas.",
    ],
  },
  heightFormat: {
    title: "Formato de estatura",
    content: [
      "Introduce tu estatura en centímetros (cm). Por ejemplo: 170 para 1 metro con 70 centímetros.",
      "La estatura mínima es 40 cm y la máxima es 250 cm.",
    ],
  },
  heightReason: {
    title: "¿Por qué indicar tu estatura?",
    content: [
      "Conocer tu estatura es esencial para evaluar tus proporciones corporales.",
      "Esto nos permite personalizar estrategias de bienestar y monitorear progresos con mayor precisión.",
    ],
  },
  locationFormat: {
    title: "Formato de ubicación",
    content: [
      "Introduce tu ubicación en un máximo de 50 caracteres.",
      'Por ejemplo: "Santiago, Chile".',
    ],
  },
  locationReason: {
    title: "¿Por qué indicar tu ubicación?",
    content: [
      "Nos permite brindarte contenido y recomendaciones más relevantes, adaptadas a tu entorno geográfico, optimizando tu experiencia.",
    ],
  },
  taskName: {
    title: "Formato de nombre de tarea",
    content: [
      "Introduce un nombre breve para tu tarea o recordatorio en un máximo de 80 caracteres.",
      'Por ejemplo, "Beber agua"',
    ],
  },
  taskInstructions: {
    title: "Formato de instrucciones de tarea",
    content: [
      "Proporciona instrucciones claras y concisas para tu tarea o recordatorio en un máximo de 100 caracteres.",
      'Por ejemplo, "Dime que tome un vaso de agua".',
    ],
  },
};

function InfoPopover({ type }: { type: PopoverContentType }) {
  const { title, content } = popoverContentMap[type];

  const moreInfoMessage = useMemo(() => {
    const initMessage = "Más información sobre ";
    switch (type) {
      case "birthdate":
        return initMessage + "la fecha de nacimiento";
      case "bioFormat":
      case "bioReason":
        return initMessage + "la biografía";
      case "genre":
        return initMessage + "el género";
      case "weightFormat":
      case "weightReason":
        return initMessage + "el peso";
      case "heightFormat":
      case "heightReason":
        return initMessage + "la estatura";
      case "locationFormat":
      case "locationReason":
        return initMessage + "la ubicación";
      case "taskName":
        return initMessage + "el nombre de la tarea";
      case "taskInstructions":
        return initMessage + "las instrucciones de la tarea";
    }
  }, [type]);

  return (
    <Popover>
      <BetterTooltip content={moreInfoMessage}>
        <PopoverTrigger asChild>
          <Button
            aria-label={moreInfoMessage}
            variant="destructive"
            size="icon"
            radius="full"
            className="relative my-auto size-3 after:absolute after:-inset-2 after:content-['']"
          >
            <QuestionMarkIcon className="size-2.5!" />
            <span className="sr-only">{moreInfoMessage}</span>
          </Button>
        </PopoverTrigger>
      </BetterTooltip>
      <PopoverContent className="max-w-60 space-y-1.5 p-3 text-xs text-main-h dark:text-main-dark">
        <h3 className="font-semibold text-main dark:text-white">{title}</h3>
        {content.map((text, index) => (
          <p key={index}>{text}</p>
        ))}
      </PopoverContent>
    </Popover>
  );
}

export const PopoverBirthdate = memo(() => <InfoPopover type="birthdate" />);
export const PopoverBioFormat = memo(() => <InfoPopover type="bioFormat" />);
export const PopoverBioReason = memo(() => <InfoPopover type="bioReason" />);
export const PopoverGenre = memo(() => <InfoPopover type="genre" />);
export const PopoverWeightFormat = memo(() => (
  <InfoPopover type="weightFormat" />
));
export const PopoverWeightReason = memo(() => (
  <InfoPopover type="weightReason" />
));
export const PopoverHeightFormat = memo(() => (
  <InfoPopover type="heightFormat" />
));
export const PopoverHeightReason = memo(() => (
  <InfoPopover type="heightReason" />
));
export const PopoverLocationFormat = memo(() => (
  <InfoPopover type="locationFormat" />
));
export const PopoverLocationReason = memo(() => (
  <InfoPopover type="locationReason" />
));
export const PopoverTaskName = memo(() => <InfoPopover type="taskName" />);
export const PopoverTaskInstructions = memo(() => (
  <InfoPopover type="taskInstructions" />
));

PopoverBirthdate.displayName = "PopoverBirthdate";
PopoverBioFormat.displayName = "PopoverBioFormat";
PopoverBioReason.displayName = "PopoverBioReason";
PopoverGenre.displayName = "PopoverGenre";
PopoverWeightFormat.displayName = "PopoverWeightFormat";
PopoverWeightReason.displayName = "PopoverWeightReason";
PopoverHeightFormat.displayName = "PopoverHeightFormat";
PopoverHeightReason.displayName = "PopoverHeightReason";
PopoverLocationFormat.displayName = "PopoverLocationFormat";
PopoverLocationReason.displayName = "PopoverLocationReason";
PopoverTaskName.displayName = "PopoverTaskName";
PopoverTaskInstructions.displayName = "PopoverTaskInstructions";

function PurePublicInfoPopover() {
  return (
    <Popover>
      <BetterTooltip
        content="Más información acerca de tu perfil"
        className="font-normal"
      >
        <PopoverTrigger asChild>
          <Button
            aria-label="Más información acerca de tu perfil"
            variant="link"
            size="icon"
            className="relative ml-2 size-auto font-normal after:absolute after:-inset-2 after:content-['']"
          >
            <Info className="size-3.5! text-main-h dark:text-main-dark" />
            <span className="sr-only">Más información acerca de tu perfil</span>
          </Button>
        </PopoverTrigger>
      </BetterTooltip>
      <PopoverContent className="max-w-60 space-y-1.5 p-3 text-xs text-main-h dark:text-main-dark">
        <h3 className="font-semibold text-main dark:text-white">
          Información pública
        </h3>
        <p>
          Solo se mostrará públicamente tu{" "}
          <strong className="font-medium text-main dark:text-white">
            nombre
          </strong>
          ,{" "}
          <strong className="font-medium text-main dark:text-white">
            apellido
          </strong>
          ,{" "}
          <strong className="font-medium text-main dark:text-white">
            nombre de usuario
          </strong>{" "}
          y{" "}
          <strong className="font-medium text-main dark:text-white">
            fecha de nacimiento
          </strong>
          .
        </p>
      </PopoverContent>
    </Popover>
  );
}

export const PublicInfoPopover = memo(PurePublicInfoPopover);
