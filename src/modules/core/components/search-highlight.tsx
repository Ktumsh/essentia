"use client";

import { ClearIcon, SearchIcon } from "@/modules/icons/action";
import { Chevron } from "@/modules/icons/navigation";
import { useState, useEffect, useRef } from "react";

const SearchComponent: React.FC = () => {
  const [searchText, setSearchText] = useState("");
  const [highlights, setHighlights] = useState<HTMLElement[]>([]);
  const [currentIndex, setCurrentIndex] = useState(-1);
  const searchBoxRef = useRef<HTMLInputElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<HTMLDivElement>(null);
  const searchIconRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleSearch = () => {
      const searchText = searchBoxRef.current?.value.toLowerCase() || "";
      const content = contentRef.current;
      const buttons = buttonsRef.current;
      const searchIcon = searchIconRef.current;

      if (searchText.trim() !== "") {
        searchIcon?.classList.add("!scale-0");
        buttons?.classList.add("!opacity-100", "!pointer-events-auto");
      } else {
        searchIcon?.classList.remove("!scale-0");
        buttons?.classList.remove("!opacity-100", "!pointer-events-auto");
      }

      removeHighlights();

      if (searchText.trim() === "") return;

      const elements = content?.querySelectorAll<HTMLElement>("*") || [];

      elements.forEach((element) => {
        element.childNodes.forEach((child) => {
          if (child.nodeType === Node.TEXT_NODE) {
            const text = child.textContent!;
            const regex = new RegExp(`(${searchText})`, "gi");
            const highlightedText = text.replace(
              regex,
              '<span class="highlight bg-yellow-500 text-black">$1</span>'
            );
            if (highlightedText !== text) {
              const span = document.createElement("span");
              span.innerHTML = highlightedText;
              child.replaceWith(span);
              setHighlights((prev) => [...prev, span]);
            }
          }
        });
      });
    };

    const handlePrev = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex = prevIndex > 0 ? prevIndex - 1 : prevIndex;
        scrollToHighlight(newIndex);
        return newIndex;
      });
    };

    const handleNext = () => {
      setCurrentIndex((prevIndex) => {
        const newIndex =
          prevIndex < highlights.length - 1 ? prevIndex + 1 : prevIndex;
        scrollToHighlight(newIndex);
        return newIndex;
      });
    };

    const handleClear = () => {
      if (searchBoxRef.current) searchBoxRef.current.value = "";
      setSearchText("");
      removeHighlights();
      if (searchIconRef.current)
        searchIconRef.current.classList.remove("!scale-0");
      if (buttonsRef.current)
        buttonsRef.current.classList.remove(
          "!opacity-100",
          "!pointer-events-auto"
        );
    };

    const scrollToHighlight = (index: number) => {
      if (highlights.length > 0 && index >= 0 && index < highlights.length) {
        highlights[index].scrollIntoView({
          behavior: "smooth",
          block: "center",
        });
      }
    };

    const removeHighlights = () => {
      const content = contentRef.current;
      const elements =
        content?.querySelectorAll<HTMLElement>(".highlight") || [];

      elements.forEach((element) => {
        const parent = element.parentNode as HTMLElement;
        parent.replaceChild(
          document.createTextNode(element.textContent!),
          element
        );
        parent.normalize();
      });

      setHighlights([]);
      setCurrentIndex(-1);
    };

    // Add event listeners
    const searchBox = searchBoxRef.current;
    const clearButton = buttonsRef.current?.querySelector(
      "#clearButton"
    ) as HTMLButtonElement;
    const prevButton = buttonsRef.current?.querySelector(
      "#prevButton"
    ) as HTMLButtonElement;
    const nextButton = buttonsRef.current?.querySelector(
      "#nextButton"
    ) as HTMLButtonElement;

    searchBox?.addEventListener("input", handleSearch);
    clearButton?.addEventListener("click", handleClear);
    prevButton?.addEventListener("click", handlePrev);
    nextButton?.addEventListener("click", handleNext);

    // Clean up event listeners on component unmount
    return () => {
      searchBox?.removeEventListener("input", handleSearch);
      clearButton?.removeEventListener("click", handleClear);
      prevButton?.removeEventListener("click", handlePrev);
      nextButton?.removeEventListener("click", handleNext);
    };
  }, [searchText, currentIndex, highlights]);

  return (
    <div className="hidden lg:flex sticky top-16 float-end items-center w-auto z-50">
      <div className="relative flex w-80">
        <input
          type="text"
          id="searchBox"
          placeholder="Busca palabras clave"
          autoComplete="off"
          ref={searchBoxRef}
          className="flex items-center justify-center w-full h-10 px-4 pr-28 leading-10 placeholder:text-sm placeholder:text-base-color-m dark:placeholder:text-base-color-dark-m focus:outline-none focus:ring-0 border-2 border-transparent focus:border-bittersweet-400 bg-bento-gradient dark:bg-none bg-white/50 dark:bg-base-dark-50 rounded-full shadow-md dark:focus:border-cerise-red-600 backdrop-blur-lg backdrop-saturate-150 transition"
        />
        <div
          id="searchIcon"
          ref={searchIconRef}
          className="absolute top-0 right-0 h-full flex items-center justify-center px-3 transition-transform"
        >
          <SearchIcon className="size-5 text-base-color-m dark:text-base-color-dark-m" />
        </div>
        <div
          id="buttons"
          ref={buttonsRef}
          className="absolute top-0 right-0 h-full flex items-center justify-center gap-2 px-2 opacity-0 transition-opacity pointer-events-none"
        >
          <button
            id="prevButton"
            className="flex items-center justify-center size-7 hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
          >
            <Chevron className="size-5 rotate-90 text-base-color dark:text-base-color-dark" />
          </button>
          <button
            id="nextButton"
            className="flex items-center justify-center size-7 hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
          >
            <Chevron className="size-5 -rotate-90 text-base-color dark:text-base-color-dark" />
          </button>
          <button
            id="clearButton"
            className="flex items-center justify-center size-7 hover:bg-black/10 dark:hover:bg-white/10 rounded-full"
          >
            <ClearIcon className="size-[14px] text-base-color dark:text-base-color-dark-m" />
          </button>
        </div>
      </div>
      <div id="content" ref={contentRef}>
        {/* Your content goes here */}
      </div>
    </div>
  );
};

export default SearchComponent;
