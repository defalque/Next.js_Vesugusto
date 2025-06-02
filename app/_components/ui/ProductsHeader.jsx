"use client";

import {
  EyeIcon,
  EyeSlashIcon,
  AdjustmentsHorizontalIcon,
} from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersContext";
import { useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ProductsHeader({ totalProducts, currentSort, children }) {
  const urlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const { isHidden, setIsHidden } = useHideFilters();
  const [sortOption, setSortOption] = useState("default");

  const handleSortChange = (e) => {
    const value = e.target.value;
    setSortOption(value);
    const params = new URLSearchParams(urlSearchParams.toString());

    if (value === "default") {
      params.delete("sort");
    } else {
      params.set("sort", value);
    }

    params.set("page", 0);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  };

  return (
    <div className={`${isHidden ? "px-5 lg:px-30" : "px-5 lg:px-10"}`}>
      <div className=" flex flex-col gap-5 pb-6 mt-5 mb-5 border-b border-b-gray-200 dark:border-b-dark-200">
        <h1 className="text-3xl xs:text-4xl lg:text-5xl font-medium tracking-wide">
          Il nostro e-commerce
        </h1>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm lg:text-base font-normal">
          Esplora il nostro ampio catalogo di prodotti. Utilizza i filtri per
          categoria e prezzo per trovare esattamente ciò che stai cercando. Ogni
          prodotto è descritto dettagliatamente per aiutarti nella tua scelta.
        </h2>
      </div>
      <div
        className={
          "flex flex-col gap-5 w-full justify-end mb-2 py-4 sticky top-14 sm:top-15 md:top-17 z-100 bg-primary-50 dark:bg-primary-dark-950 "
        }
      >
        <div className="flex items-center font-light text-xs sm:text-sm">
          {totalProducts > 0 ? (
            <span>
              {totalProducts === 1
                ? "1 prodotto trovato."
                : `${totalProducts} prodotti trovati.`}
            </span>
          ) : (
            <span>Nessun prodotto trovato.</span>
          )}
          <div className="ml-auto mr-5 w-26 sm:w-40">
            <select
              value={sortOption}
              onChange={handleSortChange}
              className="block w-full px-1 py-1 border border-gray-300 dark:border-dark-200 bg-primary-50 dark:bg-dark-300 rounded-lg  focus:outline-none focus:ring-primary-500 focus:border-primary-500 text-xs sm:text-sm"
            >
              <option value="default">Ordina</option>
              <option value="price-asc">Prezzo: dal più basso</option>
              <option value="price-desc">Prezzo: dal più alto</option>
            </select>
          </div>
          <div
            className="cursor-pointer hidden md:flex items-center"
            onClick={() => setIsHidden(!isHidden)}
          >
            <span className="mr-2">
              {isHidden ? "Mostra filtri" : "Nascondi filtri"}
            </span>
            {isHidden ? (
              <EyeIcon className="size-5" />
            ) : (
              <EyeSlashIcon className="size-5" />
            )}
          </div>
          <div
            className="cursor-pointer md:hidden flex items-center hover:bg-gray-100 dark:hover:bg-dark-200 px-1.5 py-1 rounded-md"
            onClick={() => setIsHidden(false)}
          >
            <span className="mr-2">Filtri</span>
            <AdjustmentsHorizontalIcon className="size-5" />
          </div>
        </div>
      </div>

      {children}
    </div>
  );
}

export default ProductsHeader;
