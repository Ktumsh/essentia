"use client";

import {
  CirclePause,
  CirclePlay,
  Clock4,
  MoreVertical,
  PencilLine,
  Trash2,
} from "lucide-react";
import Link from "next/link";
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

  const [isOpenEdit, setIsOpenEdit] = useState(false);
  const [selectedTask, setSelectedTask] = useState<UserTask | null>(null);

  const tasksScheduled = tasks.filter((task) => task.status === "active");
  const tasksPaused = tasks.filter((task) => task.status === "paused");

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
