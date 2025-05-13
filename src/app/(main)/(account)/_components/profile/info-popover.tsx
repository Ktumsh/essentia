import { HelpCircleIcon, Info } from "lucide-react";
import Link from "next/link";
import { memo, useMemo } from "react";

import { Button } from "@/components/kit/button";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { BetterTooltip } from "@/components/kit/tooltip";
import { LinkIcon } from "@/components/ui/icons/action";

import type { JSX } from "react";

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
  content: (string | JSX.Element)[];
};

const popoverContentMap: Record<PopoverContentType, PopoverContent> = {
  birthdate: {
    title: "¿Por qué indicar tu fecha de nacimiento?",
    content: [
      "Conocer tu edad nos ayuda a ofrecer sugerencias y planes de salud apropiados para tu etapa de vida, ajustados a tus necesidades específicas.",
    ],
  },
  bioFormat: {
    title: "Formato de instrucciones personalizadas",
    content: [
      <>
        ¿Qué debería saber{" "}
        <Link
          href="/soporte?q=Nyra"
          target="_blank"
          className="text-blue-500 underline hover:text-blue-600"
        >
          Nyra
          <LinkIcon className="mb-1 ml-0.5 inline size-2" />
        </Link>{" "}
        para ayudarte mejor?
      </>,
      "Puedes incluir datos sobre tu salud, hábitos, estilo de vida, cómo prefieres que te respondan, qué temas evitar, o cualquier detalle que consideres importante.",
      "Máximo 2000 caracteres.",
    ],
  },
  bioReason: {
    title: "¿Por qué entregar instrucciones personalizadas?",
    content: [
      <>
        Tus instrucciones ayudan a que{" "}
        <Link
          href="/soporte?q=Nyra"
          target="_blank"
          className="text-blue-500 underline hover:text-blue-600"
        >
          Nyra
          <LinkIcon className="mb-1 ml-0.5 inline size-2" />
        </Link>{" "}
        adapte sus respuestas a lo que tú realmente necesitas.
      </>,
      "Así podemos ofrecerte orientación más útil, cercana y alineada con tu estilo de vida.",
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
      'Por ejemplo: "Barcelona, España" o "Ciudad de México, CDMX".',
    ],
  },
  locationReason: {
    title: "¿Por qué indicar tu ubicación?",
    content: [
      "Nos permite brindarte contenido y recomendaciones más relevantes, adaptadas a tu entorno geográfico, optimizando tu experiencia.",
    ],
  },
  taskName: {
    title: "Formato de nombre de actividad",
    content: [
      "Introduce un nombre breve para tu actividad o recordatorio en un máximo de 80 caracteres.",
      'Por ejemplo, "Rutina de estiramientos post-entrenamiento" o "Preparar batido de proteínas"',
    ],
  },
  taskInstructions: {
    title: "Formato de instrucciones de actividad",
    content: [
      "Proporciona instrucciones claras y concisas para tu actividad o recordatorio en un máximo de 100 caracteres.",
      'Por ejemplo, "Recuérdame hacer 10 minutos de estiramientos enfocados en piernas y espalda baja".',
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
        return initMessage + "instrucciones personalizadas";
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
        <PopoverTrigger asChild onClick={(e) => e.stopPropagation()}>
          <Button
            aria-label={moreInfoMessage}
            size="icon"
            radius="full"
            variant="link"
            className="relative my-auto size-3.5 after:absolute after:-inset-2 after:content-['']"
          >
            <HelpCircleIcon className="size-3.5!" />
            <span className="sr-only">{moreInfoMessage}</span>
          </Button>
        </PopoverTrigger>
      </BetterTooltip>
      <PopoverContent
        onClick={(e) => e.stopPropagation()}
        className="text-foreground/80 max-w-60 space-y-1.5 p-3 text-xs"
      >
        <h3 className="text-foreground font-semibold">{title}</h3>
        {content.map((item, index) => (
          <p key={index}>{typeof item === "string" ? item : item}</p>
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
            className="relative size-auto font-normal after:absolute after:-inset-2 after:content-['']"
          >
            <Info className="text-foreground/80 size-3.5!" />
            <span className="sr-only">Más información acerca de tu perfil</span>
          </Button>
        </PopoverTrigger>
      </BetterTooltip>
      <PopoverContent className="text-foreground/80 max-w-60 space-y-1.5 p-3 text-xs">
        <h3 className="text-foreground font-semibold">Información pública</h3>
        <p>
          Solo se mostrará públicamente tu{" "}
          <strong className="text-foreground font-medium">nombre</strong>,{" "}
          <strong className="text-foreground font-medium">apellido</strong>,{" "}
          <strong className="text-foreground font-medium">
            nombre de usuario
          </strong>{" "}
          y{" "}
          <strong className="text-foreground font-medium">
            fecha de nacimiento
          </strong>
          .
        </p>
      </PopoverContent>
    </Popover>
  );
}

function PureTrialInfoPopover() {
  return (
    <Popover>
      <BetterTooltip
        content="Más información acerca de tu plan"
        className="font-normal"
      >
        <PopoverTrigger asChild>
          <Button
            aria-label="Más información acerca de tu plan"
            variant="link"
            size="icon"
            className="relative size-auto font-normal after:absolute after:-inset-2 after:content-['']"
          >
            <Info className="text-foreground/80 size-3.5!" />
            <span className="sr-only">Más información acerca de tu plan</span>
          </Button>
        </PopoverTrigger>
      </BetterTooltip>
      <PopoverContent className="text-foreground/80 max-w-60 space-y-1.5 p-3 text-xs">
        <h3 className="text-foreground font-semibold">Suscripción gratuita</h3>
        <p>
          Estás usando una{" "}
          <strong className="text-foreground font-medium">
            prueba gratuita
          </strong>{" "}
          del plan Premium. Cuando finalice, volverás automáticamente al plan
          gratuito, a menos que actives una suscripción.
        </p>
      </PopoverContent>
    </Popover>
  );
}

export const PublicInfoPopover = memo(PurePublicInfoPopover);
export const TrialInfoPopover = memo(PureTrialInfoPopover);
