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

import { BellButton } from "@/components/button-kit/bell-button";
import { Button } from "@/components/kit/button";
import { CardFooter, CardHeader, CardTitle } from "@/components/kit/card";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/kit/dropdown-menu";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/kit/popover";
import { ScrollArea } from "@/components/kit/scroll-area";
import { Separator } from "@/components/kit/separator";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/kit/tabs";
import { BetterTooltip } from "@/components/kit/tooltip";
import { UserNotification } from "@/db/schema";
import { useActionNotifications } from "@/hooks/use-action-notifications";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { formatDate } from "@/utils/format";

interface NotificationListProps {
  userId: string;
}

const NotificationList = ({ userId }: NotificationListProps) => {
  const {
    notifications,
    hasUnreadNotifications,
    unreadNotifications,
    readNotifications,
    handleMarkAsRead,
    handleDeleteAll,
    handleMarkAllAsRead,
  } = useActionNotifications(userId);

  const isMobile = useIsMobile();

  const [activeTab, setActiveTab] = useState("inbox");

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
            className="relative size-8"
          >
            <Bell />
            {hasUnreadNotifications && (
              <span
                aria-hidden="true"
                className="bg-primary text-xxs text-primary-foreground absolute -top-0.5 right-0 z-10 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-center"
              >
                {unreadNotifications.length > 9
                  ? "9+"
                  : unreadNotifications.length}
              </span>
            )}
          </Button>
        </DrawerTrigger>
        <DrawerContent>
          <button aria-hidden="true" className="sr-only"></button>
          <DrawerHeader>
            <DrawerTitle>Notificaciones</DrawerTitle>
            <DrawerDescription></DrawerDescription>
          </DrawerHeader>
          <NotificationsContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            readNotifications={readNotifications}
            handleMarkAsRead={handleMarkAsRead}
            handleMarkAllAsRead={handleMarkAllAsRead}
            handleDeleteAll={handleDeleteAll}
            isMobile={isMobile}
          />
          <DrawerFooter>
            <div className="bg-accent flex flex-col overflow-hidden rounded-xl">
              {activeTab === "inbox" && unreadNotifications.length > 0 && (
                <Button variant="mobile" onClick={handleMarkAllAsRead}>
                  <ArchiveX strokeWidth={2.5} />
                  Archivar todas
                </Button>
              )}
            </div>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Popover>
        <PopoverTrigger asChild>
          <BellButton
            aria-label={
              hasUnreadNotifications
                ? "Tienes notificaciones no leídas"
                : "No tienes notificaciones"
            }
            variant="ghost"
            size="icon"
            className="relative size-8 rounded-md"
          >
            {hasUnreadNotifications && (
              <span
                aria-hidden="true"
                className="bg-primary text-xxs text-primary-foreground absolute -top-0.5 right-0 z-10 inline-flex items-center justify-center rounded-full px-1.5 py-0.5 text-center"
              >
                {unreadNotifications.length > 9
                  ? "9+"
                  : unreadNotifications.length}
              </span>
            )}
          </BellButton>
        </PopoverTrigger>
        <PopoverContent
          align="end"
          className="relative flex w-auto max-w-[400px] flex-col overflow-hidden p-0"
        >
          <NotificationsContent
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            notifications={notifications}
            unreadNotifications={unreadNotifications}
            readNotifications={readNotifications}
            handleMarkAsRead={handleMarkAsRead}
            handleMarkAllAsRead={handleMarkAllAsRead}
            handleDeleteAll={handleDeleteAll}
            isMobile={isMobile}
          />
        </PopoverContent>
      </Popover>
    );
  }
};

const NotificationsContent = ({
  activeTab,
  setActiveTab,
  notifications,
  unreadNotifications,
  readNotifications,
  handleMarkAsRead,
  handleMarkAllAsRead,
  handleDeleteAll,
  isMobile,
}: {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  notifications: UserNotification[];
  unreadNotifications: UserNotification[];
  readNotifications: UserNotification[];
  handleMarkAsRead: (id: string) => void;
  handleMarkAllAsRead: () => void;
  handleDeleteAll: () => void;
  isMobile: boolean;
}) => {
  return (
    <Tabs
      value={activeTab}
      onValueChange={setActiveTab}
      className="grid grid-cols-1 grid-rows-[auto_1fr_auto]"
    >
      <CardHeader
        isSecondary
        className="border-border flex-row items-center justify-between gap-4 space-y-0 border-b"
      >
        <div className="flex items-center gap-4">
          <CardTitle className="hidden text-base font-semibold md:block">
            Notificaciones
          </CardTitle>
          <Separator orientation="vertical" className="hidden h-4 md:block" />
          <TabsList className="h-auto w-fit bg-transparent! p-0 md:-ml-2.5">
            <TabsTrigger
              value="inbox"
              className="data-[state=active]:bg-accent gap-1 font-normal shadow-none!"
            >
              No leídas
              {unreadNotifications.length > 0 && (
                <span className="text-xxs border-border bg-background flex size-5 shrink-0 items-center justify-center rounded-full border">
                  <span className="m-auto">{unreadNotifications.length}</span>
                </span>
              )}
            </TabsTrigger>
            <TabsTrigger
              value="readed"
              className="data-[state=active]:bg-accent gap-1 font-normal shadow-none!"
            >
              Archivadas
            </TabsTrigger>
          </TabsList>
        </div>
        <DropdownMenu>
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
                <Settings2 />
                Configurar
              </Link>
            </DropdownMenuItem>
            {notifications.length > 0 && (
              <DropdownMenuItem onClick={handleDeleteAll}>
                <ArchiveX />
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
      {!isMobile && (
        <>
          {activeTab === "inbox" && unreadNotifications.length > 0 && (
            <CardFooter className="w-full p-0">
              <Button
                variant="ghost"
                radius="none"
                size="lg"
                className="border-accent h-12 w-full border-t"
                onClick={handleMarkAllAsRead}
              >
                Archivar todas
              </Button>
            </CardFooter>
          )}
        </>
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
        "group/item border-border hover:bg-accent relative grid cursor-pointer items-center justify-center border-b p-4 transition-colors last:border-none md:pr-2",
        isRead ? "grid-cols-1" : "grid-cols-[25px_1fr_40px]",
      )}
    >
      {!isRead && <span className="bg-primary flex size-2 rounded-full" />}
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
        <p className="text-foreground/80 text-sm">{notification.message}</p>
        <span className="text-muted-foreground text-xs">
          {formatDate(notification.createdAt)}
        </span>
      </button>
      {!isRead && handleMarkAsRead && (
        <>
          <div className="dark:group-hover/item:border-alternative border-border group-hover/item:border-border flex flex-col gap-2 border-l pl-2 transition md:border-transparent">
            <BetterTooltip content="Ver contenido" side="left">
              <Button
                aria-label="Archivar"
                variant="ghost"
                size="icon"
                radius="full"
                className="hover:bg-background size-8 group-hover/item:opacity-100 md:opacity-0"
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
                className="hover:bg-background size-8 group-hover/item:opacity-100 md:opacity-0"
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
