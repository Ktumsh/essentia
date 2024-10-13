import {
  Avatar,
  AvatarGroup,
  Divider,
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@nextui-org/react";
import { createAvatar } from "@dicebear/core";
import * as icons from "@dicebear/icons";
import { TrophyIcon } from "@/modules/icons/miscellaneus";
import useWindowSize from "@/modules/core/hooks/use-window-size";

interface AchievementPanelProps {
  isOwnProfile: boolean;
}

const AchievementsPanel = ({ isOwnProfile }: AchievementPanelProps) => {
  const windowSize = useWindowSize();

  const createAchievementIcon = (seed: string) => {
    const avatar = createAvatar(icons, {
      seed: seed,
      size: 64,
      radius: 50,
    });

    return avatar.toDataUri();
  };

  const achievements = [
    {
      id: 1,
      name: "Meditación Maestra",
      icon: createAchievementIcon("meditacion-maestra"),
    },
    {
      id: 2,
      name: "Plan Nutricional Cumplido",
      icon: createAchievementIcon("plan-nutricional-cumplido"),
    },
    {
      id: 3,
      name: "Rutina Fitness Iniciada",
      icon: createAchievementIcon("rutina-fitness-iniciada"),
    },
    {
      id: 4,
      name: "Consulta AI Realizada",
      icon: createAchievementIcon("consulta-ai-realizada"),
    },
    {
      id: 5,
      name: "Consejos de Bienestar Emocional",
      icon: createAchievementIcon("bienestar-emocional"),
    },
    {
      id: 6,
      name: "Rutina Física Personalizada",
      icon: createAchievementIcon("rutina-fisica-personalizada"),
    },
    {
      id: 7,
      name: "Educación Sexual Segura",
      icon: createAchievementIcon("educacion-sexual"),
    },
    {
      id: 8,
      name: "Mejora del Sueño",
      icon: createAchievementIcon("mejora-sueno"),
    },
    {
      id: 9,
      name: "Plan Nutricional Personalizado",
      icon: createAchievementIcon("plan-nutricional-personalizado"),
    },
    {
      id: 10,
      name: "Evaluación de Riesgos de Salud",
      icon: createAchievementIcon("evaluacion-riesgos-salud"),
    },
    {
      id: 11,
      name: "Semana Saludable Completa",
      icon: createAchievementIcon("semana-saludable"),
    },
    {
      id: 12,
      name: "Desafío Hidratación Superado",
      icon: createAchievementIcon("desafio-hidratacion"),
    },
    {
      id: 13,
      name: "Hábitos de Sueño Mejorados",
      icon: createAchievementIcon("habitos-sueno-mejorados"),
    },
    {
      id: 14,
      name: "Maestro del Yoga",
      icon: createAchievementIcon("maestro-yoga"),
    },
  ];

  return (
    <>
      <Divider className="bg-gray-200 dark:bg-base-dark" />
      <div>
        <h3 className="mb-2 font-semibold md:text-lg text-bittersweet dark:text-orient">
          {isOwnProfile ? "Mis insignias" : "Insignias"}
        </h3>

        {achievements.length > 0 ? (
          <AvatarGroup
            size={windowSize.width > 768 ? "lg" : "sm"}
            isGrid={windowSize.width > 768 ? false : true}
            max={achievements.length}
            classNames={{
              base: "grid-cols-8",
            }}
          >
            {achievements.map((achievement) => (
              <Popover
                key={achievement.id}
                showArrow
                radius="lg"
                classNames={{
                  base: "before:bg-light-gradient-v2 before:dark:bg-dark-gradient",
                  content:
                    "border-3 border-white dark:border-base-dark bg-light-gradient-v2 dark:bg-dark-gradient p-0",
                }}
              >
                <PopoverTrigger className="aria-expanded:opacity-100">
                  <Avatar
                    src={achievement.icon}
                    alt={achievement.name}
                    classNames={{
                      base: "ring-2 md:ring-4 ring-white dark:ring-base-full-dark cursor-pointer",
                    }}
                  />
                </PopoverTrigger>
                <PopoverContent>
                  <div className="flex flex-col items-center justify-center space-y-2 py-4 px-6 text-white">
                    <div className="text-sm font-semibold font-spacemono text-nowrap">
                      {achievement.name}
                    </div>
                    <div className="inline-flex items-center justify-center gap-2 text-xs text-nowrap">
                      <TrophyIcon className="size-3.5" />
                      <span>¡Insignia desbloqueado!</span>
                    </div>
                  </div>
                </PopoverContent>
              </Popover>
            ))}
          </AvatarGroup>
        ) : (
          <p className="text-sm text-base-color-m dark:text-base-color-dark-m">
            Aquí podrás visualizar tus metas en la plataforma.
          </p>
        )}
      </div>
    </>
  );
};

export default AchievementsPanel;
