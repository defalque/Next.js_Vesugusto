"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { MagnifyingGlassIcon, XMarkIcon } from "@heroicons/react/24/outline";
import { useDebouncedCallback } from "use-debounce";

function SearchInput({ placeholder, type }) {
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
    <div className={`relative flex h-12 shrink grow items-center`}>
      <input
        id="search"
        type={type}
        placeholder={placeholder}
        autoFocus
        className="w-full border-b border-b-gray-300 py-1.5 pl-11 caret-black/50 outline-none placeholder:text-gray-400 placeholder:italic dark:border-b-zinc-600 dark:caret-white/80 dark:placeholder:text-zinc-600"
        onChange={(e) => {
          handleSearch(e.target.value);
          setQuery(e.target.value);
        }}
        value={query}
      />

      <MagnifyingGlassIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 size-5.5 translate-x-1/2 -translate-y-1/2 text-gray-400 dark:text-zinc-600"
      />

      {query && (
        <>
          <button
            type="button"
            tabIndex={0}
            aria-label="Cancella query"
            className="focus absolute top-1/2 right-3 z-100 -translate-y-1/2 transform cursor-pointer rounded-xl peer-focus:opacity-100"
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
              className="size-5.5 text-gray-400 transition-colors duration-200 hover:text-zinc-700 active:text-zinc-700 dark:hover:text-gray-300 dark:active:text-gray-300"
            />
          </button>
        </>
      )}
    </div>
  );
}

export default SearchInput;
