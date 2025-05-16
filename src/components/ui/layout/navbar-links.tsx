"use client";

import Link from "next/link";
import { useParams, usePathname } from "next/navigation";
import { Fragment } from "react";

import {
  Breadcrumb,
  BreadcrumbEllipsis,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/kit/breadcrumb";
import { useChatContext } from "@/hooks/use-chat-context";
import useChatName from "@/hooks/use-chat-name";
import useFolderName from "@/hooks/use-folder-name";
import useLessonName from "@/hooks/use-lesson-name";
import { formatDate, formatSegment } from "@/utils/format";

import type { UserProfileData } from "@/lib/types";

interface NavbarLinksProps {
  user: UserProfileData | null;
}

const NavbarLinks = ({ user }: NavbarLinksProps) => {
  const pathname = usePathname();
  const params = useParams();

  const { activeChatId } = useChatContext();

  const { username } = user || {};

  const routeSlug = params.route as string;
  const stageSlug = params.stage as string;
  const lessonSlug = params.lesson as string;
  const folderId = params.id as string;

  const pathSegments = pathname.split("/").filter(Boolean);

  const isLesson = pathname.includes(`/${lessonSlug}`);
  const isChat = pathname.includes("/chat");
  const isLastHome = pathSegments.length === 0;

  const chatId = isChat ? pathSegments[pathSegments.length - 1] : null;

  const { chatName } = useChatName(chatId || activeChatId) || null;
  const lessonName = useLessonName(routeSlug, stageSlug, lessonSlug) || null;

  const { folderName } = useFolderName(folderId);

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isLastHome ? (
            <div>
              <p className="text-foreground font-medium">Hola, {username}</p>
              <p className="text-xs">{formatDate(new Date(), "PPPP")}</p>
            </div>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {pathSegments.length > 0 && <BreadcrumbSeparator />}
        {pathSegments.map((segment, index) => {
          if (["chat", "carpetas"].includes(segment) || segment === stageSlug) {
            return null;
          }

          const href = `/${pathSegments.slice(0, index + 1).join("/")}`;

          let linkName = formatSegment(segment);

          const isLast = index === pathSegments.length - 1;

          if (isChat && index === pathSegments.length - 1 && chatName) {
            linkName = chatName;
          }

          if (isLesson && index === pathSegments.length - 1 && lessonName) {
            linkName = lessonName;
          }

          if (segment === folderId && folderName) {
            linkName = folderName;
          }

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {(isChat && !chatName && isLast) ||
                (isLesson && !lessonName && isLast) ||
                (segment === folderId && !folderName && isLast) ||
                linkName === "Profiles" ? (
                  <BreadcrumbEllipsis />
                ) : isLast ? (
                  <BreadcrumbPage>{linkName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {pathSegments.length !== index + 1 && <BreadcrumbSeparator />}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavbarLinks;
