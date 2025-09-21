"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function SortBy() {
  const { router, pathname, createQueryString, searchParams } =
    useFilterContext();

  const selectedValue = searchParams.get("sort") ?? "default";

  return (
    <div className="relative w-40 self-center rounded-xl bg-white/80 backdrop-blur-xs dark:bg-black/80">
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
          "data-focus:outline-primary-950 block w-full appearance-none rounded-xl border border-gray-200 px-3 py-1.5 text-sm/6 text-black *:text-black dark:border-zinc-700 dark:text-white"
        }
      >
        <option value="default">Ordina</option>
        <option value="price-asc">Prezzo: dal più basso</option>
        <option value="price-desc">Prezzo: dal più alto</option>
      </Select>
      <ChevronDownIcon
        className="group pointer-events-none absolute top-2.5 right-2.5 size-4 text-black dark:text-white"
        aria-hidden="true"
      />
    </div>
  );
}

export default SortBy;
