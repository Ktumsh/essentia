"use client";

import { Slash } from "lucide-react";
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
} from "@/components/ui/breadcrumb";
import useChatName from "@/modules/core/hooks/use-chat-name";
import useLessonName from "@/modules/core/hooks/use-lesson-name";
import { formatSegment } from "@/utils/format";

const NavbarLinks = () => {
  const pathname = usePathname();
  const params = useParams();

  const resourceSlug = params.resource as string;
  const moduleSlug = params.module as string;
  const lessonSlug = params.lesson as string;

  const pathSegments = pathname.split("/").filter(Boolean);

  const isLesson = pathname.includes(`/${lessonSlug}`);
  const isChat = pathname.includes("/chat");
  const isLastHome = pathSegments.length === 0;

  const chatId = isChat ? pathSegments[pathSegments.length - 1] : null;

  const chatName = useChatName(chatId) || null;
  const lessonName =
    useLessonName(resourceSlug, moduleSlug, lessonSlug) || null;

  return (
    <Breadcrumb>
      <BreadcrumbList>
        <BreadcrumbItem>
          {isLastHome ? (
            <BreadcrumbPage>Inicio</BreadcrumbPage>
          ) : (
            <BreadcrumbLink asChild>
              <Link href="/">Inicio</Link>
            </BreadcrumbLink>
          )}
        </BreadcrumbItem>
        {pathSegments.length > 0 && (
          <BreadcrumbSeparator>
            <Slash />
          </BreadcrumbSeparator>
        )}
        {pathSegments.map((segment, index) => {
          if (segment === "chat" || segment === moduleSlug) {
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

          return (
            <Fragment key={index}>
              <BreadcrumbItem>
                {(isChat && !chatName && isLast) ||
                (isLesson && !lessonName && isLast) ? (
                  <BreadcrumbEllipsis />
                ) : isLast ? (
                  <BreadcrumbPage>{linkName}</BreadcrumbPage>
                ) : (
                  <BreadcrumbLink asChild>
                    <Link href={href}>{linkName}</Link>
                  </BreadcrumbLink>
                )}
              </BreadcrumbItem>
              {pathSegments.length !== index + 1 && (
                <BreadcrumbSeparator>
                  <Slash />
                </BreadcrumbSeparator>
              )}
            </Fragment>
          );
        })}
      </BreadcrumbList>
    </Breadcrumb>
  );
};

export default NavbarLinks;
