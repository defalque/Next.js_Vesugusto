"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersProvider";

function ProductsSideNavigation({ types }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState(false);
  const [price, setPrice] = useState(false);
  const { isHidden } = useHideFilters();

  const activeFilter = searchParams.get("type") ?? "all";
  const activerPriceFilter = searchParams.get("price") ?? 0;

  function handleFilterClick(filter, value) {
    const params = new URLSearchParams(searchParams.toString());
    params.set("page", 0);

    if (params.get(filter) === value) params.delete(filter);
    else params.set(filter, value);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  return (
    <div
      className={`border-r border-orange-50 shadow-sm dark:border-midnight dark:shadow-2xl transition-all duration-300 ease-in-out ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col px-3 py-2 mt-5 text-md sticky font-normal top-5 w-full">
        <span className="uppercase text-[0.7rem] px-3 text-primary-300 font-bold mb-3">
          Filtra per
        </span>

        <div className=" border-b border-t py-3 border-b-primary-200 border-t-primary-200 ml-3">
          <div
            className="flex items-center cursor-pointer mb-1"
            onClick={() => setCategory(!category)}
          >
            <span>Categoria</span>
            {category ? (
              <ChevronDownIcon className="ml-auto size-4.5"></ChevronDownIcon>
            ) : (
              <ChevronRightIcon className="ml-auto size-4.5"></ChevronRightIcon>
            )}
          </div>
          {category
            ? types.map((type) => (
                <span
                  className={`w-max mt-1.5 rounded-xl py-0 px-2 ml-5 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 f cursor-pointer ${
                    activeFilter === type.type
                      ? "bg-primary-950 text-primary-100"
                      : "text-zinc-600"
                  }`}
                  key={type.type}
                  onClick={() => handleFilterClick("type", type.type)}
                >
                  {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                </span>
              ))
            : null}
        </div>

        <div className="mb-2 border-b py-3 border-b-primary-200 border-t-primary-200 ml-3">
          <div
            className="flex items-center cursor-pointer mb-1"
            onClick={() => setPrice(!price)}
          >
            <span>Prezzo</span>
            {price ? (
              <ChevronDownIcon className="ml-auto size-4.5"></ChevronDownIcon>
            ) : (
              <ChevronRightIcon className="ml-auto size-4.5"></ChevronRightIcon>
            )}
          </div>
          {price && (
            <div>
              <span
                className={`w-max mt-1.5 rounded-xl py-0 px-2 ml-5 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 f cursor-pointer ${
                  activerPriceFilter === "10"
                    ? "bg-primary-950 text-primary-100"
                    : "text-zinc-600"
                }`}
                onClick={() => handleFilterClick("price", "10")}
              >
                Fino a 10&euro;
              </span>
              <span
                className={`w-max mt-1.5 rounded-xl py-0 px-2 ml-5 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 f cursor-pointer ${
                  activerPriceFilter === "10-20"
                    ? "bg-primary-950 text-primary-100"
                    : "text-zinc-600"
                }`}
                onClick={() => handleFilterClick("price", "10-20")}
              >
                Da 10&euro; a 20&euro;
              </span>
              <span
                className={`w-max mt-1.5 rounded-xl py-0 px-2 ml-5 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 f cursor-pointer ${
                  activerPriceFilter === "20-30"
                    ? "bg-primary-950 text-primary-100"
                    : "text-zinc-600"
                }`}
                onClick={() => handleFilterClick("price", "20-30")}
              >
                Da 20&euro; a 30&euro;
              </span>
              <span
                className={`w-max mt-1.5 rounded-xl py-0 px-2 ml-5 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 f cursor-pointer ${
                  activerPriceFilter === "30-50"
                    ? "bg-primary-950 text-primary-100"
                    : "text-zinc-600"
                }`}
                onClick={() => handleFilterClick("price", "30-50")}
              >
                Da 30&euro; a 50&euro;
              </span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsSideNavigation;
