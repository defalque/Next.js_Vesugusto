"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }) {
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

  return (
    <div className="relative flex flex-1">
      <label htmlFor="search" className="sr-only">
        Cerca
      </label>
      <input
        id="search"
        className="peer focus block h-full w-full rounded-xl border border-gray-200 bg-white/80 py-2 pr-10 pl-10 text-sm shadow-xs backdrop-blur-xs transition-colors duration-200 placeholder:text-zinc-500 sm:py-2 sm:text-base dark:border-zinc-700 dark:bg-black/80 dark:placeholder:text-zinc-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
          setQuery(e.target.value);
        }}
        value={query}
      />
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500"
      />
      {query && (
        <button
          type="button"
          tabIndex={0}
          aria-label="Cancella query"
          className="focus absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-xl"
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
            className="_absolute _top-1/2 _right-3 _-translate-y-1/2 size-5 text-gray-500 transition-colors duration-200 hover:text-zinc-700 active:text-zinc-700 dark:hover:text-gray-300 dark:active:text-gray-300"
          />
        </button>
      )}
    </div>
  );
}
