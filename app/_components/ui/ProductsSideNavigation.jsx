"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  ChevronDownIcon,
  ChevronRightIcon,
  XMarkIcon,
} from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersContext";

function ProductsSideNavigation({ types }) {
  const urlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState(true);
  const [price, setPrice] = useState(true);
  const { isHidden, setIsHidden } = useHideFilters();

  const activeTypeFilters = urlSearchParams.get("type")?.split(",") ?? [];
  const activePriceFilters = urlSearchParams.get("price")?.split(",") ?? [];

  function handleMultiFilterClick(filter, value) {
    const params = new URLSearchParams(urlSearchParams.toString());
    const currentValues = params.get(filter)?.split(",") ?? [];

    let updatedValues;
    if (currentValues.includes(value)) {
      updatedValues = currentValues.filter((v) => v !== value);
    } else {
      updatedValues = [...currentValues, value];
    }

    if (updatedValues.length === 0) {
      params.delete(filter);
    } else {
      params.set(filter, updatedValues.join(","));
    }

    params.set("page", 0);

    const queryString = params.toString();
    router.replace(queryString ? `${pathname}?${queryString}` : pathname, {
      scroll: false,
    });
  }

  useEffect(() => {
    const mediaQuery = window.matchMedia("(max-width: 767px)");

    const handleMediaChange = (e) => {
      if (e.matches) {
        setIsHidden(true); // chiudi sotto i 768px
      } else {
        setIsHidden(false); // riapri sopra i 768px
      }
    };

    // subito al mount
    handleMediaChange(mediaQuery);

    mediaQuery.addEventListener("change", handleMediaChange);

    return () => mediaQuery.removeEventListener("change", handleMediaChange);
  }, [setIsHidden]);

  return (
    <div
      className={`${
        isHidden
          ? "hidden"
          : "fixed inset-0 top-0 left-0 w-full min-h-screen z-1000 bg-primary-50 dark:bg-primary-dark-950 md:relative md:z-100"
      }`}
    >
      <div className="flex flex-col px-1.5 lg:px-3 py-2 mt-2 text-md md:sticky font-normal top-15 w-full ">
        <div className=" border-b py-3 border-b-zinc-200 dark:border-b-dark-200 ml-1.5 lg:ml-3">
          <XMarkIcon
            className="flex size-10 ml-auto mb-10 text-gray-900 dark:text-primary-50 hover:text-primary-950 cursor-pointer md:hidden"
            onClick={() => setIsHidden(!isHidden)}
          />
          <div
            className="flex items-center text-xl md:text-sm lg:text-base cursor-pointer mb-1"
            onClick={() => setCategory(!category)}
          >
            <span>Categoria</span>
            {category ? (
              <ChevronDownIcon className="ml-auto size-6 md:size-4.5"></ChevronDownIcon>
            ) : (
              <ChevronRightIcon className="ml-auto size-6 md:size-4.5"></ChevronRightIcon>
            )}
          </div>
          {category && (
            <div className="my-2">
              {types.map((type) => (
                <label
                  className="flex items-center text-xl md:text-sm lg:text-base ml-1 mt-1.5 cursor-pointer w-max"
                  key={type.type}
                >
                  <input
                    type="checkbox"
                    checked={activeTypeFilters.includes(type.type)}
                    onChange={() => handleMultiFilterClick("type", type.type)}
                    className="mr-2"
                  />
                  <span className="text-primary-dark-900 dark:text-primary-50 font-light">
                    {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>

        <div className="mb-2 py-3 ml-1.5 lg:ml-3">
          <div
            className="flex items-center text-xl md:text-sm lg:text-base cursor-pointer mb-1"
            onClick={() => setPrice(!price)}
          >
            <span>Prezzo</span>
            {price ? (
              <ChevronDownIcon className="ml-auto size-6 md:size-4.5"></ChevronDownIcon>
            ) : (
              <ChevronRightIcon className="ml-auto size-6 md:size-4.5"></ChevronRightIcon>
            )}
          </div>
          {price && (
            <div className="my-2">
              {[
                { value: "10", label: "Fino a 10€" },
                { value: "10-20", label: "Da 10€ a 20€" },
                { value: "20-30", label: "Da 20€ a 30€" },
                { value: "30-50", label: "Da 30€ a 50€" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center text-xl md:text-sm lg:text-base gap-2 ml-1 mt-1.5 cursor-pointer w-max"
                >
                  <input
                    type="checkbox"
                    checked={activePriceFilters.includes(value)}
                    onChange={() => handleMultiFilterClick("price", value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-primary-dark-900 dark:text-primary-50 font-light">
                    {label}
                  </span>
                </label>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default ProductsSideNavigation;
