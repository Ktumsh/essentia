"use client";

import { ChevronRight, SearchIcon, X } from "lucide-react";
import { matchSorter } from "match-sorter";
import { useRouter } from "next/navigation";
import { memo, useCallback, useEffect, useMemo, useState } from "react";
import { useLocalStorage } from "usehooks-ts";

import { SearchAIIcon } from "@/components/icons/action";
import { HashFillIcon } from "@/components/icons/common";
import { Button } from "@/components/kit/button";
import {
  Command,
  CommandDialog,
  CommandInput,
  CommandList,
  CommandGroup,
  CommandItem,
  CommandEmpty,
} from "@/components/kit/command";
import {
  Drawer,
  DrawerContent,
  DrawerDescription,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/kit/drawer";
import { SEARCH_DATA, SearchResult } from "@/db/data/search-data";
import useDebounce from "@/hooks/use-debounce";
import { useIsMobile } from "@/hooks/use-mobile";
import {
  MATCH_KEYS,
  MAX_RECENT_SEARCHES,
  MAX_RESULTS,
  RECENT_SEARCHES_KEY,
} from "@/lib/consts";
import { formatText } from "@/utils/format";

interface MainSearchProps {
  isPremium: boolean;
  children: React.ReactNode;
}

const MainSearch = ({ isPremium, children }: MainSearchProps) => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const isMobile = useIsMobile();

  const [searchTerm, setSearchTerm] = useState("");
  const [recentSearches, setRecentSearches] = useLocalStorage<SearchResult[]>(
    RECENT_SEARCHES_KEY,
    [],
  );
  const [results, setResults] = useState<SearchResult[]>([]);

  const debouncedTerm = useDebounce(searchTerm, 150);

  /* --------- recomendados --------- */
  const recommendedItems = useMemo(() => {
    const lvl1Intro = SEARCH_DATA.filter(
      (i) => i.type === "lvl1" && i.content.includes("Introducción"),
    );
    const otherLvl1 = SEARCH_DATA.filter(
      (i) => i.type === "lvl1" && !i.content.includes("Introducción"),
    );
    return [...lvl1Intro, ...otherLvl1];
  }, []);

  const filteredRecommended = useMemo(
    () =>
      recommendedItems.filter(
        (item) => !recentSearches.some((r) => r.objectID === item.objectID),
      ),
    [recommendedItems, recentSearches],
  );

  /* --------- búsqueda --------- */
  useEffect(() => {
    if (debouncedTerm.length < 2) {
      setResults([]);
      return;
    }
    const norm = formatText(debouncedTerm);
    const found = matchSorter(SEARCH_DATA, norm, {
      keys: MATCH_KEYS,
      sorter: (m) =>
        m.sort((a, b) =>
          a.item.type === "lvl1" ? -1 : b.item.type === "lvl1" ? 1 : 0,
        ),
    }).slice(0, MAX_RESULTS);
    setResults(found);
  }, [debouncedTerm]);

  const saveRecent = useCallback(
    (item: SearchResult) => {
      const updated = [
        item,
        ...recentSearches.filter((s) => s.objectID !== item.objectID),
      ].slice(0, MAX_RECENT_SEARCHES);
      setRecentSearches(updated);
    },
    [recentSearches, setRecentSearches],
  );

  const onSelect = useCallback(
    (item: SearchResult) => {
      router.push(item.url);
      saveRecent(item);
      setOpen(false);
    },
    [router, saveRecent],
  );

  /* --------- ⌘/Ctrl+K shortcut --------- */
  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault();
        setOpen((prev) => !prev);
      }
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  }, []);

  /* --------- item renderer --------- */
  const renderItem = useCallback(
    (item: SearchResult, isRecent = false) => {
      const isLvl1 = item.type === "lvl1";
      const isLvl2 = item.type === "lvl2";
      const icon = isRecent ? (
        <SearchIcon className="opacity-70" />
      ) : (isLvl1 && item.icon) || (isLvl2 && item.icon) ? (
        <item.icon className="opacity-70" />
      ) : (isLvl1 && item.emoji) || (isLvl2 && item.emoji) ? (
        <span>{item.emoji}</span>
      ) : (
        <HashFillIcon className="opacity-70" />
      );

      return (
        <CommandItem
          key={item.objectID}
          value={String(item.objectID)} /* <- valor único */
          onSelect={() => onSelect(item)}
          className="flex cursor-pointer items-center justify-between gap-2"
        >
          {icon}
          <div className="flex flex-1 flex-col truncate">
            {!isLvl1 && item.hierarchy && (
              <span className="text-muted-foreground truncate text-xs">
                {item.hierarchy.lvl1}
                {item.hierarchy.lvl3 ? ` > ${item.hierarchy.lvl2}` : ""}
              </span>
            )}
            <span className="truncate text-sm">{item.content}</span>
          </div>
          <ChevronRight className="size-4 opacity-50" />
        </CommandItem>
      );
    },
    [onSelect],
  );

  /* --------- Command UI --------- */
  const EmptyState = () => (
    <CommandEmpty>
      <div className="space-y-4 overflow-hidden p-4 text-sm">
        <p className="line-clamp-3">
          <strong className="font-semibold">No hay resultados para</strong>{" "}
          &quot;
          {searchTerm}&quot;
        </p>
        <p className="text-muted-foreground">
          {isPremium
            ? debouncedTerm.length < 6
              ? "Intenta agregar más caracteres al término de búsqueda."
              : "Prueba buscar otra cosa o usa Essentia AI."
            : debouncedTerm.length < 6
              ? "Intenta agregar más caracteres al término de búsqueda."
              : "Intenta buscar otra cosa."}
        </p>
        {isPremium && (
          <Button
            variant="gradient"
            onClick={() => {
              router.push(
                `/essentia-ai?search=${encodeURIComponent(searchTerm)}`,
              );
              setOpen(false);
            }}
            className="rounded-full"
          >
            Buscar con IA
            <SearchAIIcon />
          </Button>
        )}
      </div>
    </CommandEmpty>
  );

  const Cmd = (
    <Command
      shouldFilter={false}
      className="[&_[cmdk-group-heading]]:text-muted-foreground bg-popover md:bg-background **:data-[slot=command-input-wrapper]:h-12 [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium [&_[cmdk-group]]:px-2 [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0 [&_[cmdk-input-wrapper]_svg]:h-5 [&_[cmdk-input-wrapper]_svg]:w-5 [&_[cmdk-input]]:h-12 [&_[cmdk-item]]:px-2 [&_[cmdk-item]]:py-3 [&_[cmdk-item]_svg]:h-5 [&_[cmdk-item]_svg]:w-5"
    >
      <div className="relative px-1">
        <CommandInput
          autoFocus
          placeholder="Explora nuestros recursos..."
          value={searchTerm}
          onValueChange={setSearchTerm}
          className="pr-16"
        />
        <div className="absolute top-1/2 right-3 flex -translate-y-1/2 items-center gap-2">
          {searchTerm.length > 0 && (
            <Button
              size="icon"
              variant="ghost"
              onClick={() => setSearchTerm("")}
              className="size-5"
            >
              <X className="size-3!" />
            </Button>
          )}
          <Button
            onClick={() => setOpen(false)}
            variant="outline"
            className="text-xxs hidden h-fit rounded-sm px-2 py-1 md:inline-flex"
          >
            Esc
          </Button>
        </div>
      </div>

      <CommandList className="max-h-full">
        {searchTerm === "" && recentSearches.length > 0 && (
          <CommandGroup heading="Recientes">
            {recentSearches.map((s) => renderItem(s, true))}
          </CommandGroup>
        )}

        {searchTerm === "" && filteredRecommended.length > 0 && (
          <CommandGroup heading="Recomendados">
            {filteredRecommended.map((i) => renderItem(i))}
          </CommandGroup>
        )}

        {results.length > 0 && (
          <CommandGroup>{results.map((r) => renderItem(r))}</CommandGroup>
        )}

        {results.length === 0 && debouncedTerm.length >= 1 && <EmptyState />}
      </CommandList>
    </Command>
  );

  /* --------- render --------- */
  if (isMobile) {
    return (
      <Drawer open={open} onOpenChange={setOpen}>
        <DrawerTrigger asChild>{children}</DrawerTrigger>
        <DrawerContent className="h-full">
          <DrawerHeader>
            <DrawerTitle>Buscar</DrawerTitle>
            <DrawerDescription className="sr-only">
              Busca entre nuestros recursos y encuentra lo que necesitas.
            </DrawerDescription>
          </DrawerHeader>
          {Cmd}
        </DrawerContent>
      </Drawer>
    );
  }

  return (
    <>
      <CommandDialog open={open} onOpenChange={setOpen}>
        {Cmd}
      </CommandDialog>
      <span onClick={() => setOpen(true)}>{children}</span>
    </>
  );
};

export default memo(MainSearch);
