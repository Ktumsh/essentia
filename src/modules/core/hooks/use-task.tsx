"use client";

import { createContext, ReactNode, useCallback, useContext } from "react";
import useSWR from "swr";

import { deleteUserTask, updateUserTaskStatus } from "@/db/querys/task-querys";
import { fetcher } from "@/utils/common";

import type { UserTask } from "@/db/schema";

interface TasksContextType {
  tasks: UserTask[];
  setTasks: (tasks: UserTask[] | ((tasks: UserTask[]) => UserTask[])) => void;
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

export const TasksProvider: React.FC<{
  initialTasks: UserTask[];
  children: ReactNode;
}> = ({ initialTasks, children }) => {
  const {
    data: tasks = initialTasks,
    mutate: setTasks,
    isLoading,
  } = useSWR("/api/tasks", fetcher, { fallbackData: initialTasks });

  const updateTask = useCallback(
    (taskId: string, updatedData: Partial<UserTask>) => {
      setTasks((prevTasks: UserTask[]) =>
        prevTasks.map((task: UserTask) =>
          task.id === taskId ? { ...task, ...updatedData } : task,
        ),
      );
    },
    [setTasks],
  );

  const addTask = useCallback(
    (newTask: UserTask) => {
      setTasks((prevTasks: UserTask[]) => [...prevTasks, newTask]);
    },
    [setTasks],
  );

  const deleteTask = useCallback(
    async (taskId: string): Promise<void> => {
      await deleteUserTask(taskId);
      setTasks((prevTasks: UserTask[]) =>
        prevTasks.filter((task: UserTask) => task.id !== taskId),
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
