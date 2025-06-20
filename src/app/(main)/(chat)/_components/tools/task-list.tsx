"use client";

import {
  Activity,
  CirclePause,
  CirclePlay,
  Clock4,
  FileCheck,
  GlassWater,
  ListChecks,
  MoreVertical,
  PencilLine,
  Trash2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useCallback, useState } from "react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useTasks } from "@/hooks/use-task";

import TaskModal from "./task-modal";

import type { UserTask } from "@/db/schema";

interface TaskListProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TaskList = ({ isOpen, setIsOpen }: TaskListProps) => {
  const { tasks, pauseTask, resumeTask, deleteTask } = useTasks();

  const router = useRouter();

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<UserTask | null>(null);

  const tasksScheduled = tasks.filter((task) => task.status === "active");
  const tasksPaused = tasks.filter((task) => task.status === "paused");

  const noTasks = {
    heading: "No tienes tareas programadas.",
    subheading: "Pide a la IA que programe cosas por ti.",
    sujestions: [
      {
        text: "Recuérdame beber agua todos los días a las 9:00 AM",
        icon: GlassWater,
        color: "text-sky-600",
      },
      {
        text: "Avísame todos los lunes para hacer ejercicio por la tarde",
        icon: Activity,
        color: "text-emerald-600",
      },
      {
        text: "Recuérdame programar mi chequeo médico el primer día de cada mes",
        icon: FileCheck,
        color: "text-rose-600",
      },
    ],
  };

  const handleEditTask = (taskId: string) => {
    const task = tasks.find((t) => t.id === taskId);
    setSelectedTask(task || null);
    setIsOpen(false);

    setIsOpenEdit(true);
  };

  const handlePause = useCallback(
    async (taskId: string) => {
      try {
        await pauseTask(taskId);
        toast.success("Tarea pausada");
      } catch (error) {
        console.error(error);
      }
    },
    [pauseTask],
  );

  const handleResume = useCallback(
    async (taskId: string) => {
      try {
        await resumeTask(taskId);
        toast.success("Tarea reanudada");
      } catch (error) {
        console.error(error);
      }
    },
    [resumeTask],
  );

  const handleDelete = useCallback(
    async (taskId: string) => {
      try {
        await deleteTask(taskId);
        toast.success("Tarea eliminada");
      } catch (error) {
        console.error(error);
      }
    },
    [deleteTask],
  );

  return (
    <>
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Lista de tareas</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>

          {tasks.length === 0 && (
            <div className="flex items-center justify-center">
              <div className="text-muted-foreground flex flex-col items-center justify-center gap-4 text-sm">
                <ListChecks className="size-8" />
                <div className="space-y-1.5 text-center">
                  <p className="text-foreground text-sm font-medium">
                    {noTasks.heading}
                  </p>
                  <p className="text-sm">{noTasks.subheading}</p>
                </div>
                {noTasks.sujestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    radius="xl"
                    className="h-auto shrink py-2 text-start leading-normal text-wrap whitespace-normal"
                    onClick={() =>
                      router.push(
                        "/aeris?q=" + encodeURIComponent(suggestion.text),
                      )
                    }
                  >
                    <suggestion.icon className={`size-4 ${suggestion.color}`} />
                    <span>{suggestion.text}</span>
                  </Button>
                ))}
              </div>
            </div>
          )}

          {tasksScheduled.length > 0 && (
            <div className="flex flex-col">
              <h4 className="text-muted-foreground mb-2 text-xs font-medium">
                Tareas programadas
              </h4>
              <div className="border-border flex flex-col overflow-hidden rounded-lg border">
                {tasksScheduled.map((task) => (
                  <div
                    key={task.id}
                    className="hover:bg-accent border-border inline-flex h-12 cursor-pointer items-center justify-between border-b px-4 text-sm font-medium last:border-none"
                  >
                    <Link
                      href={`/aeris/chat/${task.chatId}`}
                      className="inline-flex size-full items-center gap-4"
                    >
                      <Clock4 className="size-4" />
                      <span>{task.name}</span>
                    </Link>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-background size-7 rounded-sm"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <PencilLine />
                        <span className="sr-only">Editar tarea</span>
                      </Button>
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
                        <DropdownMenuContent className="z-102">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handlePause(task.id)}
                            >
                              <CirclePause />
                              Pausar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
          {tasksPaused.length > 0 && (
            <div className="flex flex-col">
              <h4 className="text-muted-foreground mb-2 text-xs font-medium">
                Tareas pausadas
              </h4>
              <div className="border-border flex flex-col overflow-hidden rounded-lg border">
                {tasksPaused.map((task) => (
                  <div
                    key={task.id}
                    className="border-border hover:bg-accent inline-flex h-12 cursor-pointer items-center justify-between border-b px-4 text-sm font-medium last:border-none"
                  >
                    <Link
                      href={`/aeris/chat/${task.chatId}`}
                      className="inline-flex size-full items-center gap-4"
                    >
                      <Clock4 className="size-4" />
                      <span>{task.name}</span>
                    </Link>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        className="hover:bg-background"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <PencilLine />
                        <span className="sr-only">Editar tarea</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            className="hover:bg-background"
                          >
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-102">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleResume(task.id)}
                            >
                              <CirclePlay />
                              Reanudar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 />
                              Eliminar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>

      <TaskModal
        key={selectedTask?.id}
        taskId={selectedTask?.id || ""}
        name={selectedTask?.name || ""}
        instructions={selectedTask?.instructions || ""}
        frequency={selectedTask?.frequency || "Diariamente"}
        time={selectedTask?.time || ""}
        exactDate={selectedTask?.exactDate}
        weekDay={selectedTask?.weekDay}
        monthDay={selectedTask?.monthDay}
        month={selectedTask?.month}
        isOpen={isOpenEdit}
        setIsOpen={setIsOpenEdit}
      />
    </>
  );
};

export default TaskList;
