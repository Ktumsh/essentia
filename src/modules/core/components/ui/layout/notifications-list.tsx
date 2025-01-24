"use client";

import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import {
  Archive,
  ArchiveX,
  Bell,
  BellOff,
  EllipsisVertical,
  Settings2,
} from "lucide-react";
import Link from "next/link";
import { memo } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { Separator } from "@/components/ui/separator";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { BetterTooltip } from "@/components/ui/tooltip";
import { UserNotification } from "@/db/schema";
import { useActionNotifications } from "@/modules/core/hooks/use-action-notifications";
import { cn } from "@/utils/common";

interface NotificationListProps {
  userId: string;
  notifications: UserNotification[];
}

const NotificationList = ({ userId, notifications }: NotificationListProps) => {
  const isMobile = useIsMobile();
  const {
    hasUnreadNotifications,
    unreadNotifications,
    readNotifications,
    handleMarkAsRead,
    handleDeleteAll,
    handleMarkAllAsRead,
  } = useActionNotifications(userId, notifications);

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
            className="size-8 border border-gray-200 dark:border-dark"
          >
            <span className="relative">
              <Bell />
              {hasUnreadNotifications && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 size-2.5 rounded-full bg-danger"
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
            className="size-8 border border-gray-200 dark:border-dark"
          >
            <span className="relative">
              <Bell />
              {hasUnreadNotifications && (
                <span
                  aria-hidden="true"
                  className="absolute -right-2 -top-2 size-2.5 rounded-full bg-danger"
                ></span>
              )}
            </span>
          </Button>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="relative flex size-96 flex-col overflow-hidden p-0"
        >
          <NotificationsContent
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
  unreadNotifications,
  readNotifications,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteAll,
}: {
  unreadNotifications: UserNotification[];
  readNotifications: UserNotification[];
  handleMarkAsRead: (id: string) => void;
  handleMarkAllAsRead: () => void;
  handleDeleteAll: () => void;
}) => (
  <Tabs defaultValue="inbox">
    <CardHeader
      isSecondary
      className="flex-row items-center justify-between space-y-0 border-b border-gray-200 dark:border-dark"
    >
      <div className="flex items-center gap-4">
        <CardTitle className="hidden text-base font-semibold md:block">
          Notificaciones
        </CardTitle>
        <Separator orientation="vertical" className="hidden h-4 md:block" />
        <TabsList className="h-auto w-fit !bg-transparent p-0 md:-ml-2.5">
          <TabsTrigger
            value="inbox"
            className="gap-1 font-normal !shadow-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-dark"
          >
            No leídas
            {unreadNotifications.length > 0 && (
              <span className="flex size-6 shrink-0 items-center justify-center rounded-full border border-gray-200 bg-white text-xs dark:border-dark dark:bg-full-dark">
                <span className="m-auto">{unreadNotifications.length}</span>
              </span>
            )}
          </TabsTrigger>
          <TabsTrigger
            value="readed"
            className="font-normal !shadow-none data-[state=active]:bg-gray-100 dark:data-[state=active]:bg-dark"
          >
            Archivadas
          </TabsTrigger>
        </TabsList>
      </div>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" radius="full" className="size-6">
            <EllipsisVertical />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="z-[999] flex w-fit flex-col p-1"
        >
          <DropdownMenuItem asChild>
            <Link href="/settings/notifications">
              <Settings2 strokeWidth={1.5} />
              Configurar
            </Link>
          </DropdownMenuItem>
          {unreadNotifications.length > 0 && (
            <DropdownMenuItem onClick={handleDeleteAll}>
              <ArchiveX strokeWidth={1.5} />
              Eliminar todo
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>
    </CardHeader>

    <TabsContent value="inbox" className="mt-0 h-[calc(384px-69px)]">
      <ul className="flex h-full flex-col p-0">
        {unreadNotifications.length > 0 ? (
          unreadNotifications.map((notification) => (
            <NotificationItem
              key={notification.id}
              notification={notification}
              handleMarkAsRead={handleMarkAsRead}
            />
          ))
        ) : (
          <EmptyState message="Sin notificaciones." />
        )}
      </ul>
      {unreadNotifications.length > 0 && (
        <CardFooter className="sticky bottom-0 w-full p-0">
          <Button
            variant="ghost"
            radius="none"
            size="lg"
            className="w-full border-t border-gray-200 dark:border-dark"
            onClick={handleMarkAllAsRead}
          >
            Archivar todas
          </Button>
        </CardFooter>
      )}
    </TabsContent>
    <TabsContent value="readed" className="mt-0 h-[calc(384px-69px)]">
      <CardContent className="flex h-full flex-col p-0">
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
      </CardContent>
    </TabsContent>
  </Tabs>
);

const NotificationItem = ({
  notification,
  handleMarkAsRead,
  isRead,
}: {
  notification: UserNotification;
  handleMarkAsRead?: (id: string) => void;
  isRead?: boolean;
}) => (
  <li
    className={cn(
      "group grid cursor-pointer items-center justify-center border-b border-gray-200 p-4 last:border-none hover:bg-gray-100 dark:border-dark dark:hover:bg-dark",
      isRead ? "grid-cols-1" : "grid-cols-[25px_1fr_40px]",
    )}
  >
    {!isRead && <span className="flex size-2 rounded-full bg-danger" />}
    <Link href={notification.url || "#"} className="space-y-1">
      <p className="text-sm font-medium leading-none">{notification.title}</p>
      <p className="text-sm text-muted-foreground">{notification.message}</p>
    </Link>
    {!isRead && handleMarkAsRead && (
      <BetterTooltip content="Archivar">
        <Button
          aria-label="Archivar"
          variant="ghost"
          size="icon"
          radius="full"
          className="size-8 opacity-0 hover:bg-white group-hover:opacity-100 dark:hover:bg-full-dark"
          onClick={() => handleMarkAsRead(notification.id)}
        >
          <Archive />
          <span className="sr-only">Archivar</span>
        </Button>
      </BetterTooltip>
    )}
  </li>
);

const PureEmptyState = ({ message }: { message: string }) => (
  <div className="my-auto p-4">
    <div className="flex flex-col items-center justify-center gap-4 text-muted-foreground">
      <BellOff />
      <p className="text-center">{message}</p>
    </div>
  </div>
);

const EmptyState = memo(PureEmptyState);

const areEqual = (
  prevProps: NotificationListProps,
  nextProps: NotificationListProps,
) => {
  if (prevProps.userId !== nextProps.userId) return false;
  if (prevProps.notifications.length !== nextProps.notifications.length)
    return false;
  for (let i = 0; i < prevProps.notifications.length; i++) {
    if (
      prevProps.notifications[i].id !== nextProps.notifications[i].id ||
      prevProps.notifications[i].isRead !== nextProps.notifications[i].isRead
    ) {
      return false;
    }
  }
  return true;
};

export default memo(NotificationList, areEqual);
