"use client";

import { useLocalStorage } from "@rehooks/local-storage";
import { X } from "lucide-react";
import { matchSorter } from "match-sorter";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, FC, useId } from "react";

import { useIsMobile } from "@/components/hooks/use-mobile";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@/components/ui/drawer";
import { Input } from "@/components/ui/input";
import {
  MATCH_KEYS,
  RECENT_SEARCHES_KEY,
  MAX_RECENT_SEARCHES,
  MAX_RESULTS,
} from "@/consts/search-constants";
import { searchData, SearchResult } from "@/consts/search-data";
import useDebounce from "@/modules/core/hooks/use-debounce";
import { SearchAIIcon, SearchIcon } from "@/modules/icons/action";
import { HashFillIcon } from "@/modules/icons/common";
import { Chevron } from "@/modules/icons/navigation";
import { searchStyles } from "@/styles/search-styles";
import { cn } from "@/utils/common";
import { formatText } from "@/utils/format";

interface MainSearchProps {
  isPremium: boolean;
  children?: React.ReactNode;
}

const MainSearch: FC<MainSearchProps> = ({ isPremium, children }) => {
  const [isOpen, setIsOpen] = useState(false);
  const id = useId();
  const router = useRouter();

  const isMobile = useIsMobile();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useLocalStorage<SearchResult[]>(
    RECENT_SEARCHES_KEY,
    [],
  );
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);

  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  const recommendedItems = useMemo(() => {
    const lvl1WithIntroduction = searchData.filter(
      (item) => item.type === "lvl1" && item.content.includes("Introducción"),
    );

    const otherLvl1 = searchData.filter(
      (item) => item.type === "lvl1" && !item.content.includes("Introducción"),
    );

    return [...lvl1WithIntroduction, ...otherLvl1];
  }, []);

  useEffect(() => {
    if (debouncedSearchTerm.length < 2) {
      setSearchResults([]);
    } else {
      const normalizedValue = formatText(debouncedSearchTerm);
      const results = matchSorter(searchData, normalizedValue, {
        keys: MATCH_KEYS,
        sorter: (matches) =>
          matches.sort((a, b) =>
            a.item.type === "lvl1" ? -1 : b.item.type === "lvl1" ? 1 : 0,
          ),
      }).slice(0, MAX_RESULTS);
      setSearchResults(results);
    }
  }, [debouncedSearchTerm]);

  const saveRecentSearch = useCallback(
    (search: SearchResult) => {
      const updatedSearches = [
        search,
        ...recentSearches.filter((s) => s.objectID !== search.objectID),
      ].slice(0, MAX_RECENT_SEARCHES);
      setRecentSearches(updatedSearches);
    },
    [recentSearches, setRecentSearches],
  );

  const handleSearchChange = useCallback((value: string) => {
    setSearchTerm(value);
  }, []);

  const handleSearchSelect = useCallback(
    (search: SearchResult) => {
      router.push(search.url);
      saveRecentSearch(search);
      setIsOpen(false);
    },
    [router, saveRecentSearch, setIsOpen],
  );

  const renderItem = useCallback(
    (item: SearchResult, isRecent = false) => {
      const isLvl1 = item.type === "lvl1";
      const isLvl2 = item.type === "lvl2";

      const mainIcon = isRecent ? (
        <SearchIcon className={cn(searchStyles.icon, searchStyles.dataText)} />
      ) : (isLvl1 && item.icon) || (isLvl2 && item.icon) ? (
        <item.icon className={cn(searchStyles.icon, searchStyles.dataText)} />
      ) : (
        <HashFillIcon
          className={cn(searchStyles.icon, searchStyles.dataText)}
        />
      );

      return (
        <Button
          key={item.objectID}
          role="option"
          data-value={item.content}
          size="lg"
          variant="ghost"
          fullWidth
          className={cn(
            searchStyles.buttonCommon,
            searchStyles.buttonTextColor,
          )}
          onClick={() => handleSearchSelect(item)}
        >
          {mainIcon}
          <div
            className={cn(
              "flex w-full flex-col justify-center truncate",
              !isLvl1 && "py-2",
            )}
          >
            {!isLvl1 && item.hierarchy && (
              <span
                className={cn(
                  "flex select-none items-center text-xs",
                  searchStyles.dataText,
                )}
              >
                {item.hierarchy.lvl1}
                {item.hierarchy.lvl3 ? ` > ${item.hierarchy.lvl2}` : ""}
              </span>
            )}
            <h3
              className={cn(
                "select-none truncate text-sm text-main dark:text-main-dark",
                searchStyles.dataText,
              )}
            >
              {item.content}
            </h3>
          </div>
          <Chevron className={cn("size-5 rotate-180", searchStyles.dataText)} />
        </Button>
      );
    },
    [handleSearchSelect],
  );

  const SearchContent = useCallback(() => {
    return (
      <div
        role="listbox"
        aria-label="Sugerencias"
        aria-labelledby={id}
        id={id}
        className={cn(searchStyles.modalContent)}
      >
        {/* Búsquedas recientes */}
        {searchTerm.length < 1 && recentSearches.length > 0 && (
          <div
            role="presentation"
            data-value="recent"
            className="antialiased will-change-transform"
          >
            <div id={id}>
              <div className="flex h-10 items-center justify-between px-2">
                <span className="text-sm text-main-m dark:text-main-dark-m">
                  Recientes
                </span>
              </div>
            </div>
            <div role="group" aria-labelledby={id}>
              {recentSearches.map((search) => renderItem(search, true))}
            </div>
          </div>
        )}
        {/* Búsquedas recomendadas */}
        {searchTerm.length < 1 && recommendedItems.length > 0 && (
          <div
            role="presentation"
            data-value="recent"
            className="antialiased will-change-transform"
          >
            <div id={id}>
              <div className="flex h-10 items-center justify-between px-2">
                <span className="text-sm text-main-m dark:text-main-dark-m">
                  Recomendados
                </span>
              </div>
            </div>
            <div role="group" aria-labelledby={id}>
              {recommendedItems.map((item) => renderItem(item))}
            </div>
          </div>
        )}
        {/* No results found */}
        {searchTerm.length >= 1 && searchResults.length === 0 && (
          <div role="presentation" data-value="no-results">
            <div className={cn(searchStyles.noResults)}>
              <div className="space-y-4">
                <div className="text-sm antialiased will-change-transform">
                  <p>No hay resultados para &quot;{searchTerm}&quot;</p>
                  <p className="text-main-l dark:text-main-dark-l">
                    {isPremium ? (
                      <>
                        {searchTerm.length < 6
                          ? "Intenta agregar más caracteres al término de búsqueda."
                          : "Intenta buscar otra cosa o prueba buscando con Essentia AI."}
                      </>
                    ) : (
                      <>
                        {searchTerm.length < 6
                          ? "Intenta agregar más caracteres al término de búsqueda."
                          : "Intenta buscar otra cosa."}
                      </>
                    )}
                  </p>
                </div>
                {isPremium && (
                  <Button
                    onClick={() => {
                      router.push(
                        `/essentia-ai?search=${encodeURIComponent(searchTerm)}`,
                      );
                      setIsOpen(false);
                    }}
                    className="justify-center rounded-md bg-light-gradient-v2 text-sm font-medium text-white antialiased will-change-transform data-[hover=true]:text-white data-[hover=true]:opacity-hover data-[hover=true]:transition dark:bg-dark-gradient"
                  >
                    Buscar con Essentia AI
                    <SearchAIIcon
                      aria-hidden="true"
                      className="size-5 text-white"
                    />
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Search Results */}
        {searchResults.length > 0 && (
          <div role="presentation" data-value="search">
            {searchResults.map((result) => renderItem(result))}
          </div>
        )}
      </div>
    );
  }, [
    searchTerm,
    recentSearches,
    recommendedItems,
    searchResults,
    isPremium,
    id,
    router,
    renderItem,
  ]);

  const Search = useCallback(() => {
    return (
      <div className={cn(searchStyles.modalHeader)}>
        <div className={cn(searchStyles.inputWrapper)}>
          <SearchIcon className="mr-1 size-6 shrink-0" />
          <Input
            role="combobox"
            autoFocus
            autoComplete="off"
            autoCorrect="off"
            spellCheck="false"
            aria-autocomplete="list"
            aria-expanded="true"
            aria-controls={id}
            aria-labelledby={id}
            placeholder="Explora nuestros recursos..."
            value={searchTerm}
            onChange={(e) => handleSearchChange(e.target.value)}
            className={cn(searchStyles.input)}
          />
          {searchTerm.length > 0 && (
            <Button
              size="icon"
              variant="outline"
              radius="full"
              onClick={() => setSearchTerm("")}
              className={cn(searchStyles.clearButton)}
            >
              <X className="!size-3.5" />
            </Button>
          )}
        </div>
        <button
          onClick={() => setIsOpen(false)}
          className="ml-2 hidden rounded-md border border-gray-200 px-2 py-1 text-xxs font-medium transition-colors hover:bg-gray-100 dark:border-dark dark:hover:bg-dark/50 md:block"
        >
          ESC
        </button>
      </div>
    );
  }, [id, searchTerm, setIsOpen, handleSearchChange]);

  if (isMobile) {
    return (
      <Drawer open={isOpen} onOpenChange={setIsOpen}>
        <DrawerTrigger asChild>
          <Button
            aria-label="Busca rápida"
            variant="ghost"
            fullWidth
            className="inline-flex !h-full min-w-0 p-0 text-main-m transition-none after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-current after:content-[''] hover:!bg-transparent active:!bg-gray-100 active:transition-colors dark:text-main-dark-h active:dark:!bg-dark/50 md:hidden"
          >
            <span className="sr-only">Busca rápida</span>
            <SearchIcon className="!size-6" aria-hidden="true" />
          </Button>
        </DrawerTrigger>
        <DrawerContent className="max-h-[47dvh] min-h-[47dvh]">
          <DrawerHeader className="gap-0 border-b border-gray-200 p-0 dark:border-dark">
            <DrawerTitle>Buscar</DrawerTitle>
            <Search />
          </DrawerHeader>
          <SearchContent />
        </DrawerContent>
      </Drawer>
    );
  } else {
    return (
      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogTrigger asChild>{children}</DialogTrigger>
        <DialogContent closeButton={false} className="gap-0 p-0">
          <DialogHeader className="border-b border-gray-200 dark:border-dark">
            <DialogTitle className="sr-only">Busca rápida</DialogTitle>
            <DialogDescription className="sr-only">
              Busca rápida
            </DialogDescription>
            <Search />
          </DialogHeader>
          <SearchContent />
        </DialogContent>
      </Dialog>
    );
  }
};

export default MainSearch;
