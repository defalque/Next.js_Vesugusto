"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersProvider";

function ProductsHeader({ totalProducts, children }) {
  const { isHidden, setIsHidden } = useHideFilters();

  return (
    <div className="mt-1">
      {isHidden ? (
        <div className="flex flex-col gap-5 w-full justify-end mb-2 bg-primary-50 py-4 px-8 sticky top-0 z-100 ">
          <div className="flex items-center">
            {totalProducts > 0 ? (
              <span>
                {totalProducts === 1
                  ? "1 prodotto trovato."
                  : `${totalProducts} prodotti trovati.`}
              </span>
            ) : (
              <span>Nessun prodotto trovato.</span>
            )}

            <div
              className="ml-auto cursor-pointer flex items-center"
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="mr-2">Mostra filtri</span>
              <EyeIcon className="size-5"></EyeIcon>
            </div>
          </div>
        </div>
      ) : (
        <div className="flex flex-col gap-5 w-full justify-end mb-2 bg-primary-50 py-4 px-8 sticky top-0 z-100">
          <div className="flex items-center">
            {totalProducts > 0 ? (
              <span>
                {totalProducts === 1
                  ? "1 prodotto trovato."
                  : `${totalProducts} prodotti trovati.`}
              </span>
            ) : (
              <span>Nessun prodotto trovato.</span>
            )}
            <div
              className="ml-auto cursor-pointer flex items-center"
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="mr-2">Nascondi filtri</span>
              <EyeSlashIcon className="size-5"></EyeSlashIcon>
            </div>
          </div>
        </div>
      )}
      {children}
    </div>
  );
}

export default ProductsHeader;
