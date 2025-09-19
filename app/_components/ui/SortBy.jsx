"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";

function SortBy() {
  const { router, pathname, createQueryString, searchParams } =
    useFilterContext();

  const selectedValue = searchParams.get("sort") ?? "default";

  return (
    <div className="w-40 self-center rounded-xl bg-white/80 backdrop-blur-xs dark:bg-black/80">
      <label htmlFor="ordina" className="sr-only">
        Ordina
      </label>

      <select
        id="ordina"
        name="ordina"
        aria-label="Ordina prodotti"
        title="Ordina prodotti per prezzo o data creazione"
        value={selectedValue}
        onChange={(e) => {
          const value = e.target.value;
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
        className="focus-visible:outline-primary-950 outline-primary-dark-100 block w-full rounded-xl border border-gray-200 px-1 py-2 text-sm shadow transition-colors duration-200 hover:border-gray-300 focus-visible:outline-2 dark:border-zinc-700 dark:hover:border-zinc-600"
      >
        <option value="default">Ordina</option>
        <option value="price-asc">Prezzo: dal più basso</option>
        <option value="price-desc">Prezzo: dal più alto</option>
      </select>
    </div>
  );
}

export default SortBy;
