"use client";

import {
  CirclePause,
  CirclePlay,
  List,
  MoreVertical,
  PencilLine,
} from "lucide-react";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import { Badge } from "@/components/kit/badge";
import { Button } from "@/components/kit/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/kit/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/kit/dropdown-menu";
import { useNotification } from "@/hooks/use-notification";
import { useTasks } from "@/hooks/use-task";
import { convertTo12HourFormat } from "@/lib/utils";
import { formatDate } from "@/utils/format";

import TaskList from "./task-list";
import TaskModal from "./task-modal";

import type { UserTask } from "@/db/schema";

const TaskStock = ({
  task,
  isLoading,
}: {
  task?: UserTask;
  isLoading?: boolean;
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isOpenList, setIsOpenList] = useState(false);

  const { pauseTask, resumeTask } = useTasks();

  const { permission, subscribeToPush } = useNotification();

  const hasNotified = useRef(false);

  useEffect(() => {
    if (task && permission === "default" && !hasNotified.current) {
      hasNotified.current = true;
      toast("¡Activa las notificaciones!", {
        duration: Infinity,
        closeButton: true,
        description:
          "Activa las notificaciones para recibir recordatorios sobre tus tareas.",
        action: {
          label: "Activar",
          onClick: subscribeToPush,
        },
      });
    }
  }, [task, permission, subscribeToPush]);

  if (!task || isLoading)
    return (
      <Card className="skeleton skeleton-bg flex w-fit max-w-80 min-w-72 items-center justify-between rounded-xl pr-3">
        <CardHeader className="px-5 py-4">
          <CardTitle className="skeleton-text text-sm">
            Recordar beber agua
          </CardTitle>
          <CardDescription className="skeleton-div">
            Diariamente a las 08:00
          </CardDescription>
        </CardHeader>
      </Card>
    );

  const {
    id,
    name,
    instructions,
    frequency,
    time,
    exactDate,
    weekDay,
    monthDay,
    month,
    status,
  } = task;

  const scheduleDescription =
    frequency === "No se repite" && exactDate
      ? `el ${formatDate(exactDate)} a las ${convertTo12HourFormat(time)}`
      : `${frequency} a las ${convertTo12HourFormat(time)}`;

  const handlePause = async () => {
    try {
      await pauseTask(id);
      toast.success("Tarea pausada");
    } catch (error) {
      console.error(error);
    }
  };

  const handleResume = async () => {
    try {
      await resumeTask(id);
      toast.success("Tarea reanudada");
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Card className="bg-accent flex w-fit max-w-80 min-w-72 items-center justify-between rounded-xl border-none pr-3">
        <CardHeader className="px-5 py-4">
          <div className="relative inline-flex items-center gap-2">
            <CardTitle className="text-sm">
              Recordar {name.toLocaleLowerCase()}
            </CardTitle>
            {status === "paused" && (
              <div className="flex text-white">
                <Badge className="text-xxs pointer-events-none bg-amber-500 px-1 py-0.5 leading-none font-normal dark:bg-amber-600 dark:text-white">
                  Pausada
                </Badge>
              </div>
            )}
          </div>
          <CardDescription>{scheduleDescription}</CardDescription>
        </CardHeader>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-background size-7 rounded-sm"
            >
              <MoreVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent>
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsOpen(true)}>
                <PencilLine />
                Editar
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={status === "paused" ? handleResume : handlePause}
              >
                {status === "paused" ? <CirclePlay /> : <CirclePause />}
                {status === "paused" ? "Reanudar" : "Pausar"}
              </DropdownMenuItem>
            </DropdownMenuGroup>
            <DropdownMenuSeparator />
            <DropdownMenuGroup>
              <DropdownMenuItem onClick={() => setIsOpenList(true)}>
                <List />
                Lista de tareas
              </DropdownMenuItem>
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </Card>
      <TaskModal
        taskId={id}
        name={name}
        instructions={instructions}
        frequency={frequency}
        time={time}
        exactDate={exactDate}
        weekDay={weekDay}
        monthDay={monthDay}
        month={month}
        isOpen={isOpen}
        setIsOpen={setIsOpen}
      />
      <TaskList isOpen={isOpenList} setIsOpen={setIsOpenList} />
    </>
  );
};

export default TaskStock;
