import { zodResolver } from "@hookform/resolvers/zod";
import { es } from "date-fns/locale";
import { ChevronDown, Loader } from "lucide-react";
import { useSession } from "next-auth/react";
import { useCallback, useState } from "react";
import { FieldErrors, useForm } from "react-hook-form";
import { toast } from "sonner";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/ui/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { updateUserTask } from "@/db/querys/task-querys";
import { useTasks } from "@/modules/core/hooks/use-task";
import { TaskFormData, taskSchema } from "@/modules/core/lib/form-schemas";
import { formatDate } from "@/utils/format";

const TIMES = [
  "00:00",
  "00:15",
  "00:30",
  "00:45",
  "01:00",
  "01:15",
  "01:30",
  "01:45",
  "02:00",
  "02:15",
  "02:30",
  "02:45",
  "03:00",
  "03:15",
  "03:30",
  "03:45",
  "04:00",
  "04:15",
  "04:30",
  "04:45",
  "05:00",
  "05:15",
  "05:30",
  "05:45",
  "06:00",
  "06:15",
  "06:30",
  "06:45",
  "07:00",
  "07:15",
  "07:30",
  "07:45",
  "08:00",
  "08:15",
  "08:30",
  "08:45",
  "09:00",
  "09:15",
  "09:30",
  "09:45",
  "10:00",
  "10:15",
  "10:30",
  "10:45",
  "11:00",
  "11:15",
  "11:30",
  "11:45",
  "12:00",
  "12:15",
  "12:30",
  "12:45",
  "13:00",
  "13:15",
  "13:30",
  "13:45",
  "14:00",
  "14:15",
  "14:30",
  "14:45",
  "15:00",
  "15:15",
  "15:30",
  "15:45",
  "16:00",
  "16:15",
  "16:30",
  "16:45",
  "17:00",
  "17:15",
  "17:30",
  "17:45",
  "18:00",
  "18:15",
  "18:30",
  "18:45",
  "19:00",
  "19:15",
  "19:30",
  "19:45",
  "20:00",
  "20:15",
  "20:30",
  "20:45",
  "21:00",
  "21:15",
  "21:30",
  "21:45",
  "22:00",
  "22:15",
  "22:30",
  "22:45",
  "23:00",
  "23:15",
  "23:30",
  "23:45",
];

const FREQUENCIES = [
  "No se repite",
  "Diariamente",
  "Semanalmente",
  "Mensualmente",
  "Anualmente",
];

const WEEK_DAY = [
  "lunes",
  "martes",
  "miércoles",
  "jueves",
  "viernes",
  "sábado",
  "domingo",
];

const MONTH_DAY = Array.from({ length: 31 }, (_, i) => i + 1);

const MONTH = [
  "enero",
  "febrero",
  "marzo",
  "abril",
  "mayo",
  "junio",
  "julio",
  "agosto",
  "septiembre",
  "octubre",
  "noviembre",
  "diciembre",
];

interface TaskModalProps {
  taskId: string;
  name: string;
  instructions: string;
  frequency:
    | "No se repite"
    | "Diariamente"
    | "Semanalmente"
    | "Mensualmente"
    | "Anualmente";
  time: string;
  exactDate?: Date | null;
  weekDay?: string | null;
  monthDay?: number | null;
  month?: string | null;
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
}

const TaskModal = ({
  taskId,
  name,
  instructions,
  frequency,
  time,
  exactDate,
  weekDay,
  monthDay,
  month,
  isOpen,
  setIsOpen,
}: TaskModalProps) => {
  const { data: session } = useSession();

  const userId = session?.user?.id as string;

  const { updateTask } = useTasks();

  const [loading, setLoading] = useState(false);

  const isMobile = useIsMobile();

  const prepareDefaultValues = (): TaskFormData => ({
    frequency: frequency,
    time: time,
    exactDate: exactDate,
    weekDay: weekDay || WEEK_DAY[0],
    monthDay: monthDay || MONTH_DAY[0],
    month: month || MONTH[0],
  });

  const defaultValues = prepareDefaultValues();

  const form = useForm<TaskFormData>({
    resolver: zodResolver(taskSchema),
    defaultValues: defaultValues,
  });

  const { control, reset, watch, handleSubmit } = form;

  const currentValues = watch();

  const hasChanges =
    JSON.stringify(currentValues) !== JSON.stringify(defaultValues);

  const currentFrequency = watch("frequency");

  const handleSave = async (data: TaskFormData) => {
    setLoading(true);
    try {
      const updatedTask = await updateUserTask(taskId, userId, {
        frequency: data.frequency,
        time: data.time,
        exactDate: data.exactDate ?? null,
        weekDay: data.weekDay ?? null,
        monthDay: data.monthDay ?? null,
        month: data.month ?? null,
      });

      toast.success("¡Tarea actualizada!");

      updateTask(taskId, updatedTask);

      setIsOpen(false);
    } catch (error) {
      console.error("Error al actualizar la tarea:", error);
    } finally {
      setLoading(false);
    }
  };

  const onError = (errors: FieldErrors<TaskFormData>) => {
    if (Object.keys(errors).length > 0) {
      toast.error("Por favor corrige los errores en el formulario.");
    }
  };

  const Content = useCallback(() => {
    return (
      <Form {...form}>
        <form className="w-full md:space-y-4">
          <div className="w-full space-y-6 p-6">
            <div className="inline-flex w-full items-center gap-4">
              <div className="flex w-full flex-col space-y-2">
                <Label>Nombre de la tarea (solo lectura)</Label>
                <Input readOnly value={name} className="pointer-events-none" />
              </div>
              <div className="flex w-full flex-col space-y-2">
                <Label>Instrucciones (solo lectura)</Label>
                <Input
                  readOnly
                  value={instructions}
                  className="pointer-events-none"
                />
              </div>
            </div>
            <div className="flex gap-4">
              <div className="flex w-full flex-col space-y-2">
                <FormLabel>
                  <div className="inline-flex items-center gap-1.5">
                    Cronograma
                  </div>
                </FormLabel>
                <div className="flex flex-col items-center gap-4 md:flex-row">
                  <FormField
                    control={control}
                    name="frequency"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            {...field}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue>{field.value}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              {FREQUENCIES.map((frequency) => (
                                <SelectItem key={frequency} value={frequency}>
                                  {frequency}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                  {currentFrequency === "No se repite" && (
                    <FormField
                      control={control}
                      name="exactDate"
                      render={({ field }) => (
                        <FormItem>
                          <Popover>
                            <PopoverTrigger asChild>
                              <FormControl>
                                <Button
                                  variant={"outline"}
                                  className="justify-between px-3 text-left font-normal"
                                >
                                  {field.value
                                    ? formatDate(
                                        field.value,
                                        "dd 'de' MMMM 'de' yyyy",
                                      )
                                    : formatDate(
                                        new Date(),
                                        "dd 'de' MMMM 'de' yyyy",
                                      )}
                                  <ChevronDown className="opacity-50" />
                                </Button>
                              </FormControl>
                            </PopoverTrigger>
                            <PopoverContent
                              side="top"
                              align="start"
                              className="flex w-auto flex-col space-y-2 p-2"
                            >
                              <Calendar
                                mode="single"
                                locale={es}
                                selected={field.value ?? new Date()}
                                onSelect={field.onChange}
                                initialFocus
                              />
                            </PopoverContent>
                          </Popover>
                        </FormItem>
                      )}
                    />
                  )}
                  {currentFrequency === "Semanalmente" && (
                    <FormField
                      control={control}
                      name="weekDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              {...field}
                              value={field.value ?? WEEK_DAY[0]}
                              onValueChange={field.onChange}
                            >
                              <SelectTrigger>
                                <SelectValue>{field.value}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <ScrollArea className="h-48">
                                  {WEEK_DAY.map((day) => (
                                    <SelectItem key={day} value={day}>
                                      {day}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}
                  {currentFrequency === "Mensualmente" && (
                    <FormField
                      control={control}
                      name="monthDay"
                      render={({ field }) => (
                        <FormItem>
                          <FormControl>
                            <Select
                              {...field}
                              value={
                                field.value?.toString() ??
                                MONTH_DAY[0].toString()
                              }
                              onValueChange={(value) =>
                                field.onChange(Number(value))
                              }
                            >
                              <SelectTrigger>
                                <SelectValue>{field.value}</SelectValue>
                              </SelectTrigger>
                              <SelectContent>
                                <ScrollArea className="h-48">
                                  {MONTH_DAY.map((day) => (
                                    <SelectItem
                                      key={day}
                                      value={day.toString()}
                                    >
                                      {day}
                                    </SelectItem>
                                  ))}
                                </ScrollArea>
                              </SelectContent>
                            </Select>
                          </FormControl>
                        </FormItem>
                      )}
                    />
                  )}

                  {currentFrequency === "Anualmente" && (
                    <>
                      <FormField
                        control={control}
                        name="monthDay"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                {...field}
                                value={
                                  field.value?.toString() ??
                                  MONTH_DAY[0].toString()
                                }
                                onValueChange={(value) =>
                                  field.onChange(Number(value))
                                }
                              >
                                <SelectTrigger>
                                  <SelectValue>{field.value}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <ScrollArea className="h-48">
                                    {MONTH_DAY.map((day) => (
                                      <SelectItem
                                        key={day}
                                        value={day.toString()}
                                      >
                                        {day}
                                      </SelectItem>
                                    ))}
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />

                      <FormField
                        control={control}
                        name="month"
                        render={({ field }) => (
                          <FormItem>
                            <FormControl>
                              <Select
                                {...field}
                                value={field.value ?? MONTH[0]}
                                onValueChange={field.onChange}
                              >
                                <SelectTrigger>
                                  <SelectValue>{field.value}</SelectValue>
                                </SelectTrigger>
                                <SelectContent>
                                  <ScrollArea className="h-48">
                                    {MONTH.map((month) => (
                                      <SelectItem key={month} value={month}>
                                        {month}
                                      </SelectItem>
                                    ))}
                                  </ScrollArea>
                                </SelectContent>
                              </Select>
                            </FormControl>
                          </FormItem>
                        )}
                      />
                    </>
                  )}
                  <FormField
                    control={control}
                    name="time"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Select
                            {...field}
                            value={field.value}
                            onValueChange={field.onChange}
                          >
                            <SelectTrigger>
                              <SelectValue>{field.value}</SelectValue>
                            </SelectTrigger>
                            <SelectContent>
                              <ScrollArea className="h-48">
                                {TIMES.map((time) => (
                                  <SelectItem key={time} value={time}>
                                    {time}
                                  </SelectItem>
                                ))}
                              </ScrollArea>
                            </SelectContent>
                          </Select>
                        </FormControl>
                      </FormItem>
                    )}
                  />
                </div>
              </div>
            </div>
          </div>
        </form>
      </Form>
    );
  }, [control, currentFrequency, form, instructions, name]);

  if (isMobile) {
    return (
      <Drawer
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          reset(defaultValues);
        }}
      >
        <DrawerContent>
          <DrawerHeader className="gap-0 border-b border-gray-200 p-0 dark:border-dark">
            <DrawerTitle>Tarea</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <Content />
          <DrawerFooter>
            <DrawerClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancelar
              </Button>
            </DrawerClose>
            <Button
              disabled={loading || !hasChanges}
              variant="destructive"
              onClick={handleSubmit(handleSave, onError)}
            >
              {loading ? <Loader className="animate-spin" /> : "Guardar"}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog
        open={isOpen}
        onOpenChange={() => {
          setIsOpen(!isOpen);
          reset(defaultValues);
        }}
      >
        <DialogContent isSecondary className="max-w-2xl overflow-visible">
          <DialogHeader isSecondary>
            <DialogTitle>Tarea</DialogTitle>
            <DialogDescription></DialogDescription>
          </DialogHeader>
          <button aria-hidden="true" className="sr-only"></button>
          <Content />
          <DialogFooter isSecondary>
            <DialogClose asChild>
              <Button variant="outline" disabled={loading}>
                Cancelar
              </Button>
            </DialogClose>
            <Button
              disabled={loading || !hasChanges}
              variant="destructive"
              onClick={handleSubmit(handleSave, onError)}
            >
              {loading ? <Loader className="animate-spin" /> : "Guardar"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    );
  }
};

export default TaskModal;
