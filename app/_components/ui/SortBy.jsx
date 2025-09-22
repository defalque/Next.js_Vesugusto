"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function SortBy() {
  const { router, pathname, createQueryString, searchParams } =
    useFilterContext();

  const selectedValue = searchParams.get("sort") ?? "default";

  return (
    <div className="relative w-40 self-stretch rounded-xl bg-white/80 backdrop-blur-xs dark:bg-black/80">
      <label htmlFor="ordina" className="sr-only">
        Ordina
      </label>

      <Select
        id="ordina"
        name="ordina"
        aria-label="Ordina prodotti"
        title="Ordina prodotti per prezzo o data creazione"
        value={selectedValue}
        onChange={(e) => {
          const value = e.target.value;
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
        className={
          "data-focus:ring-primary-950 data-focus:outline-primary-950 focus-visible:outline-primary-950 darak:data-active:border-zinc-600 block h-full w-full cursor-pointer appearance-none rounded-xl border border-gray-200 px-3 py-1.5 text-base/6 text-black transition-all duration-200 *:text-black data-active:shadow data-hover:shadow dark:border-zinc-700 dark:text-white dark:data-hover:border-zinc-600"
        }
      >
        <option value="default">Ordina</option>
        <option value="price-asc">Prezzo: dal più basso</option>
        <option value="price-desc">Prezzo: dal più alto</option>
      </Select>
      {/* <ChevronDownIcon
        className="group pointer-events-none absolute top-1/16 right-2.5 size-4 h-full text-black dark:text-white"
        aria-hidden="true"
      /> */}
    </div>
  );
}

export default SortBy;
