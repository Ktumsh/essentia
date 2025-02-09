"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Archive,
  ArchiveX,
  Bell,
  BellOff,
  EllipsisVertical,
  ExternalLink,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { memo, useState } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetterTooltip } from "@/components/ui/tooltip";
import { UserNotification } from "@/db/schema";
import { useActionNotifications } from "@/modules/core/hooks/use-action-notifications";
import { cn } from "@/utils/common";

interface NotificationListProps {
  userId: string;
}

const NotificationList = ({ userId }: NotificationListProps) => {
  const isMobile = useIsMobile();
  const {
    notifications,
    hasUnreadNotifications,
    unreadNotifications,
    readNotifications,
    handleMarkAsRead,
    handleDeleteAll,
    handleMarkAllAsRead,
  } = useActionNotifications(userId);

  if (isMobile) {
    return (
      <Drawer>
        <DrawerTrigger asChild>
          <Button
            aria-label={
              hasUnreadNotifications
                ? "Tienes notificaciones no leídas"
                : "No tienes notificaciones"
            }
            variant="ghost"
            size="icon"
            radius="full"
            className="dark:border-dark size-8 border border-gray-200"
          >
            <span className="relative">
              <Bell />
              {hasUnreadNotifications && (
                <span
                  aria-hidden="true"
                  className="bg-danger absolute -top-2 -right-2 size-2.5 rounded-full"
                ></span>
              )}
            </span>
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <button aria-hidden="true" className="sr-only"></button>
          <DrawerHeader>
            <DrawerTitle>Notificaciones</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <NotificationsContent
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            readNotifications={readNotifications}
            handleMarkAsRead={handleMarkAsRead}
            handleMarkAllAsRead={handleMarkAllAsRead}
            handleDeleteAll={handleDeleteAll}
          />
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <Button
            aria-label={
              hasUnreadNotifications
                ? "Tienes notificaciones no leídas"
                : "No tienes notificaciones"
            }
            variant="ghost"
            size="icon"
            radius="full"
            className="dark:border-dark size-8 border border-gray-200"
          >
            <span className="relative">
              <Bell />
              {hasUnreadNotifications && (
                <span
                  aria-hidden="true"
                  className="bg-danger absolute -top-2 -right-2 size-2.5 rounded-full"
                ></span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="relative flex w-auto max-w-[417px] flex-col overflow-hidden p-0"
        >
          <NotificationsContent
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            readNotifications={readNotifications}
            handleMarkAsRead={handleMarkAsRead}
            handleMarkAllAsRead={handleMarkAllAsRead}
            handleDeleteAll={handleDeleteAll}
          />
        </PopoverContent>
      </Popover>
    );
  }
};

const NotificationsContent = ({
  notifications,
  unreadNotifications,
  readNotifications,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteAll,
}: {
  notifications: UserNotification[];
  unreadNotifications: UserNotification[];
  readNotifications: UserNotification[];
  handleMarkAsRead: (id: string) => void;
  handleMarkAllAsRead: () => void;
  handleDeleteAll: () => void;
}) => {
  const [activeTab, setActiveTab] = useState("inbox");

  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="grid grid-cols-1 grid-rows-[auto_1fr_auto]"
    >
      <CardHeader
        isSecondary
        className="dark:border-dark flex-row items-center justify-between gap-4 space-y-0 border-b border-gray-200"
      >
        <div className="flex items-center gap-4">
          <CardTitle className="hidden text-base font-semibold md:block">
            Notificaciones
          </CardTitle>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <TabsList className="h-auto w-fit bg-transparent! p-0 md:-ml-2.5">
            <TabsTrigger
              value="inbox"
              className="dark:data-[state=active]:bg-dark gap-1 font-normal shadow-none! data-[state=active]:bg-gray-100"
            >
              No leídas
              {unreadNotifications.length > 0 && (
                <span className="dark:border-accent-dark dark:bg-full-dark text-xxs flex size-5 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white">
                  <span className="m-auto">{unreadNotifications.length}</span>
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="readed"
              className="dark:data-[state=active]:bg-dark font-normal shadow-none! data-[state=active]:bg-gray-100"
            >
              Archivadas
            </TabsTrigger>
          </TabsList>
        </div>
        <DropdownMenu modal={false}>
          <DropdownMenuTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              radius="full"
              className="size-8 shrink-0"
            >
              <EllipsisVertical />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            align="end"
            className="z-999 flex w-fit flex-col p-1"
          >
            <DropdownMenuItem asChild>
              <Link href="/settings/notifications">
                <Settings2 strokeWidth={1.5} />
                Configurar
              </Link>
            </DropdownMenuItem>
            {notifications.length > 0 && (
              <DropdownMenuItem onClick={handleDeleteAll}>
                <ArchiveX strokeWidth={1.5} />
                Eliminar todo
              </DropdownMenuItem>
            )}
          </DropdownMenuContent>
        </DropdownMenu>
      </CardHeader>

      <TabsContent value="inbox" className="mt-0 h-[355px]">
        <ScrollArea className="h-[355px]">
          <ul className="flex h-[355px] flex-col p-0">
            {unreadNotifications.length > 0 ? (
              unreadNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  handleMarkAsRead={handleMarkAsRead}
                />
              ))
            ) : (
              <EmptyState message="Sin notificaciones nuevas." />
            )}
          </ul>
        </ScrollArea>
      </TabsContent>
      <TabsContent value="readed" className="mt-0 h-[355px]">
        <ScrollArea className="h-[355px]">
          <ul className="flex h-[355px] flex-col p-0">
            {readNotifications.length > 0 ? (
              readNotifications.map((notification) => (
                <NotificationItem
                  key={notification.id}
                  notification={notification}
                  isRead
                />
              ))
            ) : (
              <EmptyState message="Sin notificaciones archivadas." />
            )}
          </ul>
        </ScrollArea>
      </TabsContent>
      {activeTab === "inbox" && unreadNotifications.length > 0 && (
        <CardFooter className="w-full p-0">
          <Button
            variant="ghost"
            radius="none"
            size="lg"
            className="dark:border-dark h-12 w-full border-t border-gray-200"
            onClick={handleMarkAllAsRead}
          >
            Archivar todas
          </Button>
        </CardFooter>
      )}
    </Tabs>
  );
};

const NotificationItem = ({
  notification,
  handleMarkAsRead,
  isRead,
}: {
  notification: UserNotification;
  handleMarkAsRead?: (id: string) => void;
  isRead?: boolean;
}) => {
  const router = useRouter();
  return (
    <li
      className={cn(
        "group dark:border-dark dark:hover:bg-dark relative grid cursor-pointer items-center justify-center border-b border-gray-200 p-4 last:border-none hover:bg-gray-100 md:pr-2",
        isRead ? "grid-cols-1" : "grid-cols-[25px_1fr_40px]",
      )}
    >
      {!isRead && <span className="bg-danger flex size-2 rounded-full" />}
      <button
        className="space-y-1 pr-2 text-start"
        onClick={() => {
          if (notification.url && !isRead && handleMarkAsRead) {
            handleMarkAsRead(notification.id);
            router.push(notification.url);
          }
        }}
      >
        <div className="relative w-fit">
          <p className="text-sm leading-none font-medium">
            {notification.title}
          </p>
        </div>
        <p className="text-muted-foreground text-sm">{notification.message}</p>
      </button>
      {!isRead && handleMarkAsRead && (
        <>
          <div className="dark:group-hover:border-accent-dark flex flex-col gap-2 border-l pl-2 transition group-hover:border-gray-200 md:border-transparent">
            <BetterTooltip content="Ver contenido" side="left">
              <Button
                aria-label="Archivar"
                variant="ghost"
                size="icon"
                radius="full"
                className="dark:hover:bg-full-dark size-8 group-hover:opacity-100 hover:bg-white md:opacity-0"
                onClick={() =>
                  notification.url && router.push(notification.url)
                }
              >
                <ExternalLink />
                <span className="sr-only">Ver contenido</span>
              </Button>
            </BetterTooltip>
            <BetterTooltip content="Archivar" side="left">
              <Button
                aria-label="Archivar"
                variant="ghost"
                size="icon"
                radius="full"
                className="dark:hover:bg-full-dark size-8 group-hover:opacity-100 hover:bg-white md:opacity-0"
                onClick={() => handleMarkAsRead(notification.id)}
              >
                <Archive />
                <span className="sr-only">Archivar</span>
              </Button>
            </BetterTooltip>
          </div>
        </>
      )}
    </li>
  );
};

const PureEmptyState = ({ message }: { message: string }) => (
  <li className="my-auto p-4">
    <div className="text-muted-foreground flex flex-col items-center justify-center gap-4">
      <BellOff />
      <p className="text-center">{message}</p>
    </div>
  </li>
);

const EmptyState = memo(PureEmptyState);

export default memo(NotificationList, (prevProps, nextProps) => {
  return prevProps.userId === nextProps.userId;
});
