"use client";
import { EyeIcon, EyeSlashIcon } from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersProvider";
import ProductsSideNavigation from "./ProductsSideNavigation";

function ProductsHandler({ types, children }) {
  const { isHidden, setIsHidden } = useHideFilters();

  return (
    <div
      className={`grid h-full transition-all duration-3000 ease-in-out ${
        isHidden ? "grid-cols-[1fr]" : "grid-cols-[12rem_1fr]"
      }`}
    >
      <ProductsSideNavigation types={types}></ProductsSideNavigation>

      <div>
        {isHidden ? (
          <div className="flex items-center w-full justify-end mb-2 py-4 px-5 sticky top-0 z-100 bg-primary-50">
            <div
              className="cursor-pointer w-max flex items-center"
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="mr-2">Mostra filtri</span>
              <EyeIcon className="size-5"></EyeIcon>
            </div>
          </div>
        ) : (
          <div
            className="flex items-center w-full justify-end mb-2 py-4 px-5 sticky top-0 z-100 bg-primary-50"
            onClick={() => setIsHidden(!isHidden)}
          >
            <div
              className="cursor-pointer w-max flex items-center"
              onClick={() => setIsHidden(!isHidden)}
            >
              <span className="mr-2">Nascondi filtri</span>
              <EyeSlashIcon className="size-5"></EyeSlashIcon>
            </div>
          </div>
        )}

        {children}
      </div>
    </div>
  );
}

export default ProductsHandler;
