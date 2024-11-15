"use client";

import {
  Button,
  Input,
  Modal,
  ModalContent,
  useDisclosure,
} from "@nextui-org/react";
import { useLocalStorage } from "@rehooks/local-storage";
import { matchSorter } from "match-sorter";
import { useRouter } from "next/navigation";
import { useState, useEffect, useCallback, useMemo, FC, useId } from "react";

import {
  MATCH_KEYS,
  RECENT_SEARCHES_KEY,
  MAX_RECENT_SEARCHES,
  MAX_RESULTS,
} from "@/consts/search-constants";
import { searchData, SearchResult } from "@/consts/search-data";
import useDebounce from "@/modules/core/hooks/use-debounce";
import { SearchAIIcon, SearchIcon } from "@/modules/icons/action";
import { CloseIcon, HashFillIcon } from "@/modules/icons/common";
import { Chevron } from "@/modules/icons/navigation";
import { searchStyles } from "@/styles/search-styles";
import { cn } from "@/utils/common";
import { formatText } from "@/utils/format";

interface MainSearchProps {
  isPremium?: boolean;
}

const MainSearch: FC<MainSearchProps> = ({ isPremium }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const id = useId();
  const router = useRouter();

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
      onClose();
    },
    [router, saveRecentSearch, onClose],
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
          fullWidth
          size="lg"
          variant="light"
          disableAnimation
          startContent={mainIcon}
          endContent={
            <Chevron
              className={cn("size-5 rotate-180", searchStyles.dataText)}
            />
          }
          className={cn(
            searchStyles.buttonCommon,
            searchStyles.buttonTextColor,
          )}
          onPress={() => handleSearchSelect(item)}
        >
          <div
            className={cn(
              "flex w-full flex-col justify-center",
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
                "select-none truncate text-sm text-main-h dark:text-main-dark-h",
                searchStyles.dataText,
              )}
            >
              {item.content}
            </h3>
          </div>
        </Button>
      );
    },
    [handleSearchSelect],
  );

  return (
    <>
      {/* Desktop Search */}
      <Button
        aria-label="Busca rápida"
        radius="full"
        onPress={onOpen}
        startContent={<SearchIcon className="size-5" />}
        className="hidden w-10 min-w-0 px-0 text-main-m dark:bg-dark dark:text-main-dark-m md:inline-flex lg:min-w-40 lg:justify-start lg:px-4 xl:w-full"
      >
        <span className="hidden lg:block">Busca rápida</span>
      </Button>

      {/* Mobile Search */}
      <Button
        aria-label="Busca rápida"
        onPress={onOpen}
        fullWidth
        radius="none"
        variant="light"
        color="danger"
        className="inline-flex !h-full min-w-0 text-gray-500 after:absolute after:left-0 after:top-0 after:h-[3px] after:w-full after:scale-x-0 after:bg-current after:content-[''] data-[hover=true]:bg-gray-100 dark:text-gray-400 dark:data-[hover=true]:bg-full-dark/50 dark:dark:data-[hover=true]:text-cerise-red-600 dark:data-[hover=true]:text-bittersweet-400 md:hidden"
      >
        <span className="sr-only">Busca rápida</span>
        <SearchIcon className="size-6" aria-hidden="true" />
      </Button>

      <Modal
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        scrollBehavior="inside"
        size="xl"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "m-0 bg-white dark:bg-full-dark text-main dark:text-main-dark overflow-hidden rounded-t-2xl rounded-b-none md:rounded-2xl",
        }}
      >
        <ModalContent>
          <>
            <header className="border-b border-gray-200 dark:border-dark">
              <div className={cn(searchStyles.modalHeader)}>
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
                  isClearable
                  radius="none"
                  size="lg"
                  placeholder="Explora nuestros recursos..."
                  value={searchTerm}
                  onValueChange={handleSearchChange}
                  startContent={<SearchIcon className="mr-1 size-7" />}
                  endContent={<CloseIcon className="size-3.5" />}
                  classNames={{
                    clearButton:
                      "border border-gray-200 dark:border-dark hover:bg-gray-100 dark:hover:bg-dark/50 transition-colors duration-150",
                    inputWrapper: cn(searchStyles.inputWrapper),
                    input: cn(searchStyles.input),
                  }}
                />
                <button
                  onClick={onClose}
                  className="ml-2 hidden rounded-md border border-gray-200 px-2 py-1 text-xxs font-medium transition-colors hover:bg-gray-100 dark:border-dark dark:hover:bg-dark/50 md:block"
                >
                  ESC
                </button>
              </div>
            </header>
            <div
              role="listbox"
              aria-label="Sugerencias"
              aria-labelledby={id}
              id={id}
              className={cn(
                searchStyles.modalContent,
                "max-h-[50vh] md:scrollbar-default",
              )}
            >
              {/* Búsquedas recientes y recomendaciones */}
              {searchTerm.length < 1 &&
                recentSearches.length > 0 &&
                recommendedItems.length > 0 && (
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
                          {searchTerm.length < 6
                            ? "Intenta agregar más caracteres al término de búsqueda."
                            : "Intenta buscar otra cosa o prueba buscando con Essentia AI."}
                        </p>
                      </div>
                      {isPremium && (
                        <Button
                          radius="sm"
                          onPress={() => {
                            router.push(
                              `/essentia-ai?search=${encodeURIComponent(
                                searchTerm,
                              )}`,
                            );
                            onClose();
                          }}
                          endContent={
                            <SearchAIIcon
                              aria-hidden="true"
                              className="size-5 text-white"
                            />
                          }
                          className="justify-center rounded-md bg-light-gradient-v2 text-sm font-medium text-white antialiased will-change-transform data-[hover=true]:text-white data-[hover=true]:opacity-hover data-[hover=true]:transition dark:bg-dark-gradient"
                        >
                          Buscar con Essentia AI
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
              {/* Sin búsquedas recientes */}
              {searchTerm.length < 1 && recentSearches.length === 0 && (
                <div role="presentation" data-value="no-recent">
                  <div className={cn(searchStyles.noResults)}>
                    <p className="text-main-l antialiased will-change-transform dark:text-main-dark-l">
                      Sin búsquedas recientes
                    </p>
                  </div>
                </div>
              )}
            </div>
            <footer className="flex flex-row justify-end gap-2 border-t-1 border-gray-200 px-6 py-4 text-main dark:border-dark md:hidden">
              <Button
                radius="sm"
                size="sm"
                onPress={onClose}
                className="w-full border border-gray-200 bg-gray-100 text-sm font-medium text-main shadow-sm dark:border-dark dark:bg-dark dark:text-white md:w-fit md:bg-white dark:md:bg-full-dark"
              >
                Cerrar
              </Button>
            </footer>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainSearch;
