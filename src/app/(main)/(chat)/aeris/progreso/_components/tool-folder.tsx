"use client";

import Image from "next/image";
import Link from "next/link";

import { Card, CardFooter } from "@/components/ui/card";
import { useUserProfile } from "@/hooks/use-user-profile";
import { cn, formatDate } from "@/utils";

import ToolFolderHeader from "./tool-folder-header";
import { TOOL_SLUGS } from "../../../_lib/tool-helper";

interface ToolFolderProps {
  group: {
    toolName: string;
    count: number;
    latest: Date | null;
    recentDates: Date[];
  };
}

const ToolFolder = ({ group }: ToolFolderProps) => {
  const { user } = useUserProfile();

  const { profileImage, username } = user || {};

  const { toolName, count, latest, recentDates } = group;

  const slug = TOOL_SLUGS[toolName];

  return (
    <Link href={`/aeris/progreso/${slug}`}>
      <Card
        key={toolName}
        className={cn(
          "hover:shadow-stock rounded-3xl border transition hover:-translate-y-2",
        )}
      >
        <ToolFolderHeader
          toolName={toolName}
          count={count}
          recentDates={recentDates}
        />
        <CardFooter className="justify-between p-4">
          <div className="flex min-w-0 items-center gap-1 text-sm leading-none">
            <span className="bg-accent size-4 overflow-hidden rounded">
              <Image
                src={profileImage ?? ""}
                width={16}
                height={16}
                alt={`Avatar de ${username}`}
                className="h-auto w-full object-cover"
              />
            </span>
            <span className="text-foreground truncate font-medium">
              {username}
            </span>
          </div>
          <span className="text-muted-foreground text-sm">
            Actualizado el {formatDate(latest as Date, "dd 'de' MMMM, yyyy")}
          </span>
        </CardFooter>
      </Card>
    </Link>
  );
};

export default ToolFolder;
