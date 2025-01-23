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
import { useTasks } from "@/modules/core/hooks/use-task";

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
              <div className="flex flex-col items-center justify-center gap-4 text-sm text-muted-foreground">
                <ListChecks strokeWidth={1.5} className="size-8" />
                <div className="text-center">
                  <p className="text-sm font-medium text-main dark:text-white">
                    {noTasks.heading}
                  </p>
                  <p className="text-sm">{noTasks.subheading}</p>
                </div>
                {noTasks.sujestions.map((suggestion, index) => (
                  <Button
                    key={index}
                    variant="outline"
                    size="sm"
                    radius="full"
                    className="text-muted-foreground dark:text-main-dark-h"
                    onClick={() =>
                      router.push(
                        "/essentia-ai?search=" +
                          encodeURIComponent(suggestion.text),
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
              <h4 className="mb-2 text-xs font-medium text-main-h dark:text-main-dark-h">
                Tareas programadas
              </h4>
              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-dark">
                {tasksScheduled.map((task) => (
                  <div
                    key={task.id}
                    className="inline-flex h-12 cursor-pointer items-center justify-between border-b border-gray-200 px-4 text-sm font-medium last:border-none hover:bg-gray-100 dark:border-dark dark:hover:bg-dark"
                  >
                    <Link
                      href={`/essentia-ai/chat/${task.chatId}`}
                      className="inline-flex size-full items-center gap-4"
                    >
                      <Clock4 strokeWidth={1.5} className="size-4" />
                      <span>{task.name}</span>
                    </Link>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        radius="lg"
                        className="hover:bg-white dark:hover:bg-full-dark"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <PencilLine strokeWidth={1.5} />
                        <span className="sr-only">Editar tarea</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            radius="lg"
                            className="hover:bg-white dark:hover:bg-full-dark"
                          >
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-[102]">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handlePause(task.id)}
                            >
                              <CirclePause strokeWidth={1.5} />
                              Pausar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 strokeWidth={1.5} />
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
              <h4 className="mb-2 text-xs font-medium text-main-h dark:text-main-dark-h">
                Tareas pausadas
              </h4>
              <div className="flex flex-col overflow-hidden rounded-lg border border-gray-200 dark:border-dark">
                {tasksPaused.map((task) => (
                  <div
                    key={task.id}
                    className="inline-flex h-12 cursor-pointer items-center justify-between border-b border-gray-200 px-4 text-sm font-medium last:border-none hover:bg-gray-100 dark:border-dark dark:hover:bg-dark"
                  >
                    <Link
                      href={`/essentia-ai/chat/${task.chatId}`}
                      className="inline-flex size-full items-center gap-4"
                    >
                      <Clock4 strokeWidth={1.5} className="size-4" />
                      <span>{task.name}</span>
                    </Link>
                    <div className="inline-flex items-center gap-2">
                      <Button
                        size="icon"
                        variant="ghost"
                        radius="lg"
                        className="hover:bg-white dark:hover:bg-full-dark"
                        onClick={() => handleEditTask(task.id)}
                      >
                        <PencilLine strokeWidth={1.5} />
                        <span className="sr-only">Editar tarea</span>
                      </Button>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button
                            size="icon"
                            variant="ghost"
                            radius="lg"
                            className="hover:bg-white dark:hover:bg-full-dark"
                          >
                            <MoreVertical />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className="z-[102]">
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleResume(task.id)}
                            >
                              <CirclePlay strokeWidth={1.5} />
                              Reanudar
                            </DropdownMenuItem>
                          </DropdownMenuGroup>
                          <DropdownMenuSeparator />
                          <DropdownMenuGroup>
                            <DropdownMenuItem
                              onClick={() => handleDelete(task.id)}
                            >
                              <Trash2 strokeWidth={1.5} />
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
