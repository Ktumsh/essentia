"use client";

import {
  useState,
  useEffect,
  useCallback,
  useRef,
  useMemo,
  FC,
  useId,
} from "react";

import {
  Button,
  Input,
  Kbd,
  Modal,
  ModalContent,
  ModalHeader,
  Tooltip,
  useDisclosure,
} from "@nextui-org/react";

import { useRouter } from "next/navigation";

import { searchData, SearchResult } from "@/consts/search-data";

import { useLocalStorage } from "@rehooks/local-storage";

import {
  MATCH_KEYS,
  RECENT_SEARCHES_KEY,
  MAX_RECENT_SEARCHES,
  MAX_RESULTS,
} from "@/consts/search-constants";

import useDebounce from "@/modules/core/hooks/use-debounce";

import { matchSorter } from "match-sorter";

import useWindowSize from "@/modules/core/hooks/use-window-size";

import { formatText } from "@/utils/format";

import {
  DeleteHistoryIcon,
  SearchAIIcon,
  SearchIcon,
} from "@/modules/icons/action";

import { cn } from "@/utils/common";

import { searchStyles } from "@/styles/search-styles";

import { CloseIcon, HashFillIcon } from "@/modules/icons/common";

import { Chevron } from "@/modules/icons/navigation";

import { tooltipStyles } from "@/styles/tooltip-styles";
import { UserProfileData } from "@/types/session";

interface MainSearchProps {
  profileData: UserProfileData | null;
}

const MainSearch: FC<MainSearchProps> = ({ profileData }) => {
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  const id = useId();

  const router = useRouter();

  const { width } = useWindowSize();

  const [searchTerm, setSearchTerm] = useState<string>("");
  const [recentSearches, setRecentSearches] = useLocalStorage<SearchResult[]>(
    RECENT_SEARCHES_KEY,
    []
  );
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [activeItem, setActiveItem] = useState(0);

  const debouncedSearchTerm = useDebounce(searchTerm, 150);

  const eventRef = useRef<"mouse" | "keyboard">();
  const listRef = useRef<HTMLDivElement>(null);
  const menuNodes = useRef(new Map<number, HTMLButtonElement>()).current;

  const { is_premium } = profileData || {};

  const items = useMemo(() => {
    if (debouncedSearchTerm.length < 2) return recentSearches;
    const normalizedValue = formatText(debouncedSearchTerm);
    const results = matchSorter(searchData, normalizedValue, {
      keys: MATCH_KEYS,
      sorter: (matches) =>
        matches.sort((a, b) =>
          a.item.type === "lvl1" ? -1 : b.item.type === "lvl1" ? 1 : 0
        ),
    }).slice(0, MAX_RESULTS);
    return results.length > 0 ? results : recentSearches;
  }, [debouncedSearchTerm, recentSearches]);

  useEffect(() => {
    if (debouncedSearchTerm.length < 2) {
      setSearchResults([]);
    } else {
      const normalizedValue = formatText(debouncedSearchTerm);
      const results = matchSorter(searchData, normalizedValue, {
        keys: MATCH_KEYS,
        sorter: (matches) =>
          matches.sort((a, b) =>
            a.item.type === "lvl1" ? -1 : b.item.type === "lvl1" ? 1 : 0
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
    [recentSearches, setRecentSearches]
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
    [router, saveRecentSearch, onClose]
  );

  const clearRecentSearches = useCallback(() => {
    setRecentSearches([]);
  }, [setRecentSearches]);

  const onItemSelect = useCallback(
    (item: SearchResult) => {
      onClose();
      router.push(item.url);
      saveRecentSearch(item);
    },
    [onClose, router, saveRecentSearch]
  );

  const onInputKeyDown = useCallback(
    (e: React.KeyboardEvent) => {
      eventRef.current = "keyboard";
      switch (e.key) {
        case "ArrowDown":
          e.preventDefault();
          setActiveItem((prev) => Math.min(prev + 1, items.length - 1));
          break;
        case "ArrowUp":
          e.preventDefault();
          setActiveItem((prev) => Math.max(prev - 1, 0));
          break;
        case "Enter":
          if (items.length > 0) {
            onItemSelect(items[activeItem]);
          }
          break;
        default:
          break;
      }
    },
    [activeItem, items, onItemSelect]
  );

  useEffect(() => {
    if (eventRef.current === "mouse" || !listRef.current) return;
    const node = menuNodes.get(activeItem);
    if (node) {
      node.scrollIntoView({ behavior: "smooth", block: "nearest" });
    }
  }, [activeItem, menuNodes]);

  const renderItem = useCallback(
    (item: SearchResult, index: number, isRecent = false) => {
      const isLvl1 = item.type === "lvl1";
      const isLvl2 = item.type === "lvl2";
      const mainIcon = isRecent ? (
        <SearchIcon
          className={cn(
            searchStyles.iconColor,
            "group-data-[hover=true]:text-white",
            "group-data-[focus=true]:text-white",
            "group-data-[active=true]:text-white"
          )}
        />
      ) : (isLvl1 && item.icon) || (isLvl2 && item.icon) ? (
        <item.icon
          className={cn(
            searchStyles.iconColor,
            "group-data-[hover=true]:text-white",
            "group-data-[focus=true]:text-white",
            "group-data-[active=true]:text-white"
          )}
        />
      ) : (
        <HashFillIcon
          className={cn(
            searchStyles.iconColor,
            "group-data-[hover=true]:text-white",
            "group-data-[focus=true]:text-white",
            "group-data-[active=true]:text-white"
          )}
        />
      );

      return (
        <Button
          key={item.objectID}
          ref={(el) => {
            if (el) menuNodes.set(index, el);
            else menuNodes.delete(index);
          }}
          role="option"
          data-value={item.content}
          data-active={width && width > 768 ? activeItem === index : undefined}
          fullWidth
          size="lg"
          radius="lg"
          variant="light"
          disableAnimation
          startContent={mainIcon}
          endContent={
            <Chevron
              className={cn(
                "size-5 rotate-180",
                "group-data-[hover=true]:text-white",
                "group-data-[focus=true]:text-white",
                "group-data-[active=true]:text-white"
              )}
            />
          }
          className={cn(
            searchStyles.buttonCommon,
            "data-[hover=true]:bg-bittersweet-400",
            "dark:data-[hover=true]:bg-cerise-red-600",
            "data-[focus=true]:bg-bittersweet-400",
            "dark:data-[focus=true]:bg-cerise-red-600",
            "data-[active=true]:bg-bittersweet-400",
            "dark:data-[active=true]:bg-cerise-red-600",
            searchStyles.buttonTextColor
          )}
          onPress={() => handleSearchSelect(item)}
        >
          <div className="flex flex-col w-full justify-center max-w-[80%]">
            {!isLvl1 && (
              <span
                className={cn(
                  "text-xs select-none flex items-center",
                  "group-data-[hover=true]:text-white",
                  "group-data-[focus=true]:text-white",
                  "group-data-[active=true]:text-white"
                )}
              >
                {item.hierarchy?.lvl1}
                {item.hierarchy?.lvl3 ? ` > ${item.hierarchy?.lvl2}` : ""}
              </span>
            )}
            <p
              className={cn(
                "truncate text-base-color-h dark:text-base-color-dark-h select-none",
                "group-data-[hover=true]:text-white",
                "group-data-[focus=true]:text-white",
                "group-data-[active=true]:text-white"
              )}
            >
              {item.content}
            </p>
          </div>
        </Button>
      );
    },
    [activeItem, menuNodes, handleSearchSelect, width]
  );

  return (
    <>
      {/* Desktop Search */}
      <Button
        aria-label="Abrir búsqueda"
        radius="full"
        onPress={onOpen}
        startContent={<SearchIcon className="size-5" />}
        className="hidden md:inline-flex lg:justify-start w-10 xl:w-full px-0 lg:px-4 min-w-0 lg:min-w-40 dark:bg-base-dark text-base-color-m dark:text-base-color-dark-m"
      >
        <span className="hidden lg:block">Busca rápida...</span>
      </Button>

      {/* Mobile Search */}
      <Button
        aria-label="Abrir búsqueda"
        onPress={onOpen}
        fullWidth
        radius="none"
        variant="light"
        color="danger"
        className="inline-flex md:hidden !h-full min-w-0 after:content-[''] after:absolute after:left-0 after:top-0 after:w-full after:h-[3px] after:bg-current after:scale-x-0 data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-full-dark-50 text-gray-500 dark:text-gray-400 dark:data-[hover=true]:text-bittersweet-400 dark:dark:data-[hover=true]:text-cerise-red-600"
      >
        <SearchIcon className="size-6" aria-hidden="true" />
      </Button>

      <Modal
        placement={width && width > 768 ? "center" : "top"}
        isOpen={isOpen}
        onOpenChange={onOpenChange}
        hideCloseButton
        scrollBehavior="inside"
        size="xl"
        radius="sm"
        classNames={{
          backdrop: "z-[101] bg-black/80",
          wrapper: "z-[102]",
          base: "mx-0 bg-white dark:bg-base-full-dark border border-gray-200 dark:border-base-dark text-base-color dark:text-base-color-dark",
          header: "p-0 border-b border-gray-200 dark:border-base-dark",
        }}
      >
        <ModalContent>
          <>
            <ModalHeader>
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
                  size="lg"
                  placeholder="Explora nuestros recursos..."
                  value={searchTerm}
                  onKeyDown={onInputKeyDown}
                  onValueChange={handleSearchChange}
                  startContent={<SearchIcon className="size-7 mr-1" />}
                  endContent={<CloseIcon className="size-3.5" />}
                  classNames={{
                    clearButton:
                      "border border-gray-200 dark:border-base-dark hover:bg-gray-100 dark:hover:bg-base-dark-50 transition-colors duration-150",
                    inputWrapper: cn(
                      searchStyles.inputWrapper,
                      "data-[hover=true]:bg-transparent",
                      "group-data-[focus=true]:bg-transparent",
                      "group-data-[focus-visible=true]:ring-0",
                      "group-data-[focus-visible=true]:ring-offset-0"
                    ),
                    input: cn(searchStyles.input),
                  }}
                />
                <Kbd
                  classNames={{
                    abbr: "hidden",
                    base: "hidden lg:block py-1 px-2 ml-2 font-medium text-[0.7rem] leading-snug bg-gray-200 dark:bg-base-dark text-base-color dark:text-base-color-dark",
                  }}
                >
                  ESC
                </Kbd>
              </div>
            </ModalHeader>
            <div
              role="listbox"
              aria-label="Sugerencias"
              aria-labelledby={id}
              id={id}
              ref={listRef}
              className={cn(
                searchStyles.modalContent,
                "max-h-[50vh] md:scrollbar-default custom-scroll v2"
              )}
            >
              {/* Búsquedas recientes */}
              {searchTerm.length < 1 && recentSearches.length > 0 && (
                <div role="presentation" data-value="recent">
                  <div id={id} aria-hidden="true">
                    <div className="flex items-center justify-between">
                      <p>Recientes</p>
                    </div>
                  </div>
                  <div role="group" aria-labelledby={id}>
                    {recentSearches.map((search, index) =>
                      renderItem(search, index, true)
                    )}
                    <Tooltip
                      content="Limpiar historial de búsquedas"
                      delay={800}
                      closeDelay={0}
                      classNames={{
                        content: tooltipStyles.content,
                      }}
                    >
                      <Button
                        isIconOnly
                        radius="sm"
                        size="sm"
                        variant="light"
                        onPress={clearRecentSearches}
                        startContent={<DeleteHistoryIcon className="size-5" />}
                        className="mt-2 float-end text-danger data-[hover=true]:bg-gray-100 dark:data-[hover=true]:bg-base-dark-50"
                      ></Button>
                    </Tooltip>
                  </div>
                </div>
              )}
              {/* No results found */}
              {searchTerm.length >= 1 && searchResults.length === 0 && (
                <div role="presentation" data-value="no-results">
                  <div className={cn(searchStyles.noResults)}>
                    <div className="space-y-4">
                      <div>
                        <p>No hay resultados para &quot;{searchTerm}&quot;</p>
                        <p className="text-base-color-d dark:text-base-color-dark-d">
                          {searchTerm.length < 6
                            ? "Intente agregar más caracteres a su término de búsqueda."
                            : "Intente buscar otra cosa."}
                        </p>
                      </div>
                      {is_premium && (
                        <Button
                          radius="sm"
                          onPress={() => {
                            router.push(
                              `/essentia-ai?search=${encodeURIComponent(
                                searchTerm
                              )}`
                            );
                            onClose();
                          }}
                          endContent={
                            <SearchAIIcon
                              aria-hidden="true"
                              className="size-5 text-white"
                            />
                          }
                          className="justify-center rounded-md text-sm bg-light-gradient-v2 dark:bg-dark-gradient text-white data-[hover=true]:opacity-hover data-[hover=true]:text-white data-[hover=true]:transition font-medium"
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
                  {searchResults.map((result, index) =>
                    renderItem(result, index)
                  )}
                </div>
              )}
              {/* Sin búsquedas recientes */}
              {searchTerm.length < 1 && recentSearches.length === 0 && (
                <div role="presentation" data-value="no-recent">
                  <div className={cn(searchStyles.noResults)}>
                    <p className="text-base-color-d dark:text-base-color-dark-d">
                      Sin búsquedas recientes
                    </p>
                  </div>
                </div>
              )}
            </div>
          </>
        </ModalContent>
      </Modal>
    </>
  );
};

export default MainSearch;
