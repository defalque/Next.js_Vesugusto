"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { useEffect } from "react";
import { useDebouncedCallback } from "use-debounce";

export default function Search({ placeholder }) {
  const { router, pathname, searchParams, query, setQuery } =
    useFilterContext();

  // useEffect(() => {
  //   handleSearch(query);
  // }, [query]);

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
        className="peer focus:border-primary-950 focus:ring-primary-950/20 block w-full rounded-xl border border-gray-200 bg-white/80 py-2 pl-10 text-sm shadow-xs backdrop-blur-xs transition-colors duration-200 placeholder:text-zinc-500 focus:ring-2 focus:outline-none dark:border-zinc-700 dark:bg-black/80 dark:placeholder:text-zinc-500"
        placeholder={placeholder}
        onChange={(e) => {
          handleSearch(e.target.value);
          setQuery(e.target.value);
        }}
        value={query}
      />
      <MagnifyingGlassIcon
        aria-hidden="true"
        className="peer-focus:text-brand-950 dark:peer-focus:text-brand-dark-100 absolute top-1/2 left-3 size-5 -translate-y-1/2 text-gray-500"
      />
    </div>
  );
}
