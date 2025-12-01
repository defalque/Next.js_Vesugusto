"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";
import { Select } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/24/outline";

const options = [
  { value: "default", label: "Ordina" },
  { value: "price-asc", label: "Prezzo: crescente" },
  { value: "price-desc", label: "Prezzo: decrescente" },
];

function SortBy() {
  const { router, pathname, createQueryString, searchParams } =
    useFilterContext();

  const selectedValue = searchParams.get("sort") ?? "default";

  return (
    <div className="relative w-max self-stretch rounded-xl bg-white/80 backdrop-blur-xs sm:w-fit dark:bg-black/80">
      <label htmlFor="ordina" className="sr-only">
        Ordina prodotti per prezzo o data creazione
      </label>

      <Select
        id="ordina"
        name="ordina"
        title="Ordina prodotti per prezzo o data creazione"
        value={selectedValue}
        onChange={(e) => {
          const value = e.target.value;
          router.push(pathname + "?" + createQueryString("sort", value));
        }}
        className={
          "data-focus:outline-primary-950 focus-style peer bg-primary-100/70 _border block h-full w-full cursor-pointer appearance-none rounded-md border-black/20 px-3 py-2 pr-10 text-base/6 text-black transition-all duration-200 *:text-black focus:not-data-focus:outline-none data-active:shadow data-focus:outline-2 data-focus:-outline-offset-2 dark:border-zinc-700 dark:bg-white/10 dark:text-white dark:data-active:border-zinc-600 dark:data-hover:border-zinc-600"
        }
      >
        {options.map((option) => (
          <option
            key={option.value}
            value={option.value}
            aria-selected={selectedValue === option.value}
          >
            {option.label}
          </option>
        ))}
      </Select>

      <ChevronDownIcon
        className="pointer-events-none absolute top-1/2 right-2.5 size-4 -translate-y-1/2 text-black transition-colors duration-200 peer-hover:text-zinc-600 peer-active:text-zinc-600 dark:text-white dark:peer-hover:text-gray-400 dark:peer-active:text-gray-400"
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
