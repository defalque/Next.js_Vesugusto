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
        className="peer focus-style w-full rounded-full border border-black/10 py-2 pl-11 caret-black/50 outline-none placeholder:text-black/40 placeholder:italic focus:text-black focus:placeholder:text-black/70 dark:border-none dark:border-white/30 dark:bg-white/10 dark:caret-white/85 dark:placeholder:text-white/30 dark:focus:text-white/85 dark:focus:placeholder:text-white"
        onChange={(e) => {
          handleSearch(e.target.value);
          setQuery(e.target.value);
        }}
        value={query}
      />

      <MagnifyingGlassIcon
        aria-hidden
        className="pointer-events-none absolute top-1/2 size-5.5 translate-x-1/2 -translate-y-1/2 text-black/40 peer-focus:text-black/70 dark:text-white/30 dark:peer-focus:text-white"
      />

      {query && (
        <>
          <button
            type="button"
            tabIndex={0}
            aria-label="Cancella query"
            className="focus absolute top-1/2 right-3 z-100 -translate-y-1/2 transform cursor-pointer rounded-xl"
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
              className="size-5.5 text-black transition-colors duration-200 dark:text-white dark:hover:text-gray-300 dark:active:text-gray-300"
            />
          </button>
        </>
      )}
    </div>
  );
}

export default SearchInput;
