"use client";

import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersContext";

function ProductsHeader({ totalProducts, children }) {
  const { isHidden, setIsHidden } = useHideFilters();

  return (
    <div className="px-10">
      <div className=" flex flex-col gap-5 pb-6 mt-5 mb-5 border-b border-b-gray-200">
        <h1 className="text-5xl font-medium tracking-wide">
          Il nostro e-commerce
        </h1>
        <h2 className="text-gray-500 font-normal">
          Esplora il nostro ampio catalogo di prodotti. Utilizza i filtri per
          categoria e prezzo per trovare esattamente ciò che stai cercando. Ogni
          prodotto è descritto dettagliatamente per aiutarti nella tua scelta.
        </h2>
      </div>
      {isHidden ? (
        <div className="flex flex-col gap-5 w-full justify-end mb-2 bg-primary-50 py-4 sticky top-17 z-100 ">
          <div className="flex items-center font-light">
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
        <div className="flex flex-col gap-5 w-full justify-end mb-2 bg-primary-50 py-4 sticky top-17 z-100">
          <div className="flex items-center font-light">
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
