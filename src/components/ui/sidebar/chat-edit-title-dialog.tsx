"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { Loader } from "lucide-react";
import { useEffect } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@/components/kit/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/kit/dialog";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
} from "@/components/kit/drawer";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/kit/form";
import { Input } from "@/components/kit/input";
import { useIsMobile } from "@/hooks/use-mobile";
import { ChatTitleFormData, chatTitleSchema } from "@/lib/form-schemas";

interface ChatEditTitleDialogProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  onSaveTitle: () => Promise<string | number | undefined>;
  chatTitle: string;
  setChatTitle: (title: string) => void;
  isSubmitting: boolean;
}

const ChatEditTitleDialog = ({
  open,
  setOpen,
  onSaveTitle,
  chatTitle,
  setChatTitle,
  isSubmitting,
}: ChatEditTitleDialogProps) => {
  const isMobile = useIsMobile();

  const form = useForm<ChatTitleFormData>({
    resolver: zodResolver(chatTitleSchema),
    defaultValues: {
      chatTitle: chatTitle,
    },
    mode: "onChange",
  });

  const { handleSubmit, reset } = form;

  useEffect(() => {
    if (!open) {
      reset({ chatTitle });
    }
  }, [open, chatTitle, reset]);

  const content = (
    <Form {...form}>
      <form className="p-4 md:p-6">
        <FormField
          control={form.control}
          name="chatTitle"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <Input
                  {...field}
                  type="text"
                  placeholder="Escribe un nombre para tu chat"
                  onChange={(e) => {
                    field.onChange(e);
                    setChatTitle(e.target.value);
                  }}
                  maxLength={100}
                  className="dark:border-alternative md:dark:border-border md:border-border"
                />
              </FormControl>
              <FormMessage />
              <span className="text-muted-foreground ml-auto text-xs">
                {field.value.length}/100
              </span>
            </FormItem>
          )}
        />
      </form>
    </Form>
  );

  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerContent>
          <DrawerHeader>
            <DrawerTitle>Renombrar chat</DrawerTitle>
            <DrawerDescription className="sr-only">
              Cambia el nombre de tu chat.
            </DrawerDescription>
          </DrawerHeader>
          {content}
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              <DrawerClose asChild>
                <Button
                  variant="mobile"
                  disabled={isSubmitting}
                  className="justify-center"
                >
                  Cancelar
                </Button>
              </DrawerClose>
            </div>
            <Button
              variant="mobile-primary"
              disabled={isSubmitting}
              onClick={handleSubmit(onSaveTitle)}
            >
              {isSubmitting ? (
                <>
                  <Loader className="animate-spin" />
                  Guardando...
                </>
              ) : (
                "Guardar"
              )}
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent isSecondary>
        <DialogHeader isSecondary>
          <DialogTitle>Renombrar chat</DialogTitle>
          <DialogDescription className="sr-only">
            Cambia el nombre de tu chat.
          </DialogDescription>
        </DialogHeader>
        {content}
        <DialogFooter isSecondary>
          <DialogClose asChild>
            <Button variant="outline" radius="full" disabled={isSubmitting}>
              Cancelar
            </Button>
          </DialogClose>
          <Button
            radius="full"
            disabled={isSubmitting}
            onClick={handleSubmit(onSaveTitle)}
          >
            {isSubmitting ? (
              <>
                <Loader className="animate-spin" />
                Guardando...
              </>
            ) : (
              "Guardar"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default ChatEditTitleDialog;
