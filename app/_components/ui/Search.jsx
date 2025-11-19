"use client";

import { useEffect, useRef, useState } from "react";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { useReducedMotion } from "@/app/_hooks/useReducedMotion";

import { useDebouncedCallback } from "use-debounce";
import { useOnClickOutside } from "usehooks-ts";
import { FocusTrap } from "focus-trap-react";

import * as m from "motion/react-m";
import { AnimatePresence } from "motion/react";

import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";

export default function Search({
  placeholder,
  buttonId,
  placeholderId,
  height = "",
  full = false,
  numberInput = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const outsideClickref = useRef(null);
  const shouldReduce = useReducedMotion();
  useOnClickOutside(outsideClickref, () => setIsOpen(false));

  const { router, pathname, searchParams, query, setQuery } =
    useFilterContext();

  const handleSearch = useDebouncedCallback((term) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", "1");
    if (term) {
      params.set("query", term);
    } else {
      params.delete("query");
    }
    router.replace(`${pathname}?${params.toString()}`);
  }, 300);

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen]);

  return (
    <div className="flex">
      <m.button
        key="button"
        onClick={() => {
          setIsOpen(true);
        }}
        {...(!shouldReduce && { layoutId: buttonId })}
        className={`${height ? `h-${height}` : ``} focus _border-gray-200 relative flex w-fit cursor-pointer items-center border border-black/20 px-4 transition-shadow duration-200 dark:border-zinc-700`}
        style={{ borderRadius: 12 }}
      >
        <m.span {...(!shouldReduce && { layoutId: placeholderId })}>
          {placeholder}
        </m.span>
      </m.button>

      <AnimatePresence>
        {isOpen && (
          <FocusTrap>
            <m.div
              ref={outsideClickref}
              {...(!shouldReduce && { layoutId: buttonId })}
              className={`${full ? "w-full" : "w-full"} absolute right-0 z-100 flex h-full items-center border border-black/20 bg-white px-4 dark:border-zinc-700 dark:bg-black`}
              style={{ borderRadius: 12 }}
            >
              <input
                id="search"
                type={numberInput ? "number" : "text"}
                autoFocus
                className="w-full pl-10 caret-black/50 outline-none dark:caret-white/80"
                onChange={(e) => {
                  handleSearch(e.target.value);
                  setQuery(e.target.value);
                }}
                value={query}
              />

              <MagnifyingGlassIcon
                aria-hidden
                className="pointer-events-none absolute top-1/2 size-5 translate-x-1/2 -translate-y-1/2 text-zinc-500"
              />

              <m.span
                aria-hidden
                {...(!shouldReduce && { layoutId: placeholderId })}
                className="pointer-events-none absolute top-1/2 left-14 -translate-y-1/2 text-zinc-500 data-[hide=true]:opacity-0!"
                data-hide={query ? "true" : "false"}
              >
                {placeholder}
              </m.span>

              {query && (
                <button
                  type="button"
                  tabIndex={0}
                  aria-label="Cancella query"
                  className="focus absolute top-1/2 right-3 -translate-y-1/2 transform cursor-pointer rounded-xl peer-focus:opacity-100"
                  onClick={() => {
                    setQuery("");
                    const params = new URLSearchParams(searchParams);
                    params.delete("query");
                    params.set("page", "1");
                    router.replace(`${pathname}?${params.toString()}`);
                  }}
                >
                  <XMarkIcon
                    aria-hidden="true"
                    className="size-6 text-gray-500 transition-colors duration-200 hover:text-zinc-700 active:text-zinc-700 dark:hover:text-gray-300 dark:active:text-gray-300"
                  />
                </button>
              )}
            </m.div>
          </FocusTrap>
        )}
      </AnimatePresence>
    </div>
  );
}
