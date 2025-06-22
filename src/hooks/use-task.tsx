"use client";

import { useSession } from "next-auth/react";
import { createContext, ReactNode, useCallback, useContext } from "react";
import useSWR from "swr";

import { deleteUserTask, updateUserTaskStatus } from "@/db/querys/task-querys";
import { fetcher } from "@/utils";

import type { UserTask } from "@/db/schema";
import type { KeyedMutator } from "swr";

interface TasksContextType {
  tasks: UserTask[];
  setTasks: KeyedMutator<Array<UserTask>>;
  updateTask: (taskId: string, updatedData: Partial<UserTask>) => void;
  addTask: (newTask: UserTask) => void;
  deleteTask: (taskId: string) => Promise<void>;
  pauseTask: (taskId: string) => Promise<void>;
  resumeTask: (taskId: string) => Promise<void>;
  isLoading: boolean;
}

const TasksContext = createContext<TasksContextType | undefined>(undefined);

export const useTasks = (): TasksContextType => {
  const context = useContext(TasksContext);
  if (!context) {
    throw new Error("useTasksContext debe usarse dentro de un TasksProvider");
  }
  return context;
};

interface TasksProviderProps {
  initialTasks: Array<UserTask>;
  children: ReactNode;
}

export const TasksProvider = ({
  initialTasks,
  children,
}: TasksProviderProps) => {
  const { data: session } = useSession();

  const {
    data: tasks = initialTasks,
    mutate: setTasks,
    isLoading,
  } = useSWR<Array<UserTask>>(session ? "/api/tasks" : null, fetcher, {
    fallbackData: initialTasks,
  });

  const updateTask = useCallback(
    (taskId: string, updatedData: Partial<UserTask>) => {
      setTasks((prevTasks) =>
        (prevTasks ?? []).map((task: UserTask) =>
          task.id === taskId ? { ...task, ...updatedData } : task,
        ),
      );
    },
    [setTasks],
  );

  const addTask = useCallback(
    (newTask: UserTask) => {
      setTasks((prevTasks) => {
        const exists = (prevTasks ?? []).some((task) => task.id === newTask.id);
        if (exists) return prevTasks ?? [];
        return [...(prevTasks ?? []), newTask];
      });
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    async (taskId: string): Promise<void> => {
      await deleteUserTask(taskId);
      setTasks((prevTasks) =>
        (prevTasks ?? []).filter((task: UserTask) => task.id !== taskId),
      );
    },
    [setTasks],
  );

  const pauseTask = useCallback(
    async (taskId: string): Promise<void> => {
      await updateUserTaskStatus(taskId, "paused");
      updateTask(taskId, { status: "paused" });
    },
    [updateTask],
  );

  const resumeTask = useCallback(
    async (taskId: string): Promise<void> => {
      await updateUserTaskStatus(taskId, "active");
      updateTask(taskId, { status: "active" });
    },
    [updateTask],
  );

  return (
    <TasksContext.Provider
      value={{
        tasks,
        setTasks,
        updateTask,
        addTask,
        deleteTask,
        pauseTask,
        resumeTask,
        isLoading,
      }}
    >
      {children}
    </TasksContext.Provider>
  );
};
