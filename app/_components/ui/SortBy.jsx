"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

function SortBy() {
  const { router, pathname, createQueryString, searchParams } =
    useFilterContext();

  const selectedValue = searchParams.get("sort") ?? "default";

  return (
    <div className="relative w-max self-stretch rounded-xl bg-white/80 backdrop-blur-xs sm:w-fit dark:bg-black/80">
      <label htmlFor="ordina" className="sr-only">
        Ordina per
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
          "data-focus:outline-primary-950 focus peer block h-full w-full cursor-pointer appearance-none rounded-xl border border-gray-200 px-3 py-1.5 pr-10 text-base/6 text-black transition-all duration-200 *:text-black focus:not-data-focus:outline-none data-active:shadow data-focus:outline-2 data-focus:-outline-offset-2 data-hover:shadow dark:border-zinc-700 dark:text-white dark:data-active:border-zinc-600 dark:data-hover:border-zinc-600"
        }
      >
        <option value="default">Ordina</option>
        <option value="price-asc">Prezzo: dal più basso</option>
        <option value="price-desc">Prezzo: dal più alto</option>
      </Select>
      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-zinc-400 transition-colors duration-200 peer-hover:text-zinc-600 peer-active:text-zinc-600 dark:text-zinc-600 dark:peer-hover:text-gray-400 dark:peer-active:text-gray-400"
        aria-hidden="true"
      />
    </div>
  );
}

export default SortBy;

// Dropdown
// return (
//   <Menu>
//     <MenuButton className="w-40 self-stretch rounded-xl">Ordina</MenuButton>
//     <MenuItems modal={false} anchor="bottom-end" className="z-250">
//       <MenuItem>
//         <button
//           className="block text-left data-focus:bg-blue-100"
//           href="/settings"
//         >
//           Ordina
//         </button>
//       </MenuItem>
//       <MenuItem>
//         <button className="block data-focus:bg-blue-100" href="/support">
//           Prezzo: dal più basso
//         </button>
//       </MenuItem>
//       <MenuItem>
//         <button className="block data-focus:bg-blue-100" href="/license">
//           Prezzo: dal più alto
//         </button>
//       </MenuItem>
//     </MenuItems>
//   </Menu>
// );
