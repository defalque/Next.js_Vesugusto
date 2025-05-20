"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersProvider";

function ProductsSideNavigation({ types }) {
  const urlSearchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState(false);
  const [price, setPrice] = useState(false);
  const { isHidden } = useHideFilters();

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

  return (
    <div className={`${isHidden ? "hidden" : ""}`}>
      <div className="flex flex-col px-3 py-2 mt-5 text-md sticky font-normal top-5 w-full">
        <span className="uppercase text-[0.7rem] px-3 text-zinc-400 font-bold mb-3">
          Filtra per
        </span>

        <div className=" border-b border-t py-3 border-b-zinc-300 border-t-zinc-300 ml-3">
          <div
            className="flex items-center cursor-pointer mb-2"
            onClick={() => setCategory(!category)}
          >
            <span>Categoria</span>
            {category ? (
              <ChevronDownIcon className="ml-auto size-4.5"></ChevronDownIcon>
            ) : (
              <ChevronRightIcon className="ml-auto size-4.5"></ChevronRightIcon>
            )}
          </div>
          {category &&
            types.map((type) => (
              <label
                className="flex items-center ml-1 cursor-pointer w-max"
                key={type.type}
              >
                <input
                  type="checkbox"
                  checked={activeTypeFilters.includes(type.type)}
                  onChange={() => handleMultiFilterClick("type", type.type)}
                  className="mr-2"
                />
                <span className="text-primary-dark-900 font-light">
                  {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                </span>
              </label>
            ))}
        </div>

        <div className="mb-2 border-b py-3 border-b-zinc-300 border-t-primary-200 ml-3">
          <div
            className="flex items-center cursor-pointer mb-2"
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
              {[
                { value: "10", label: "Fino a 10€" },
                { value: "10-20", label: "Da 10€ a 20€" },
                { value: "20-30", label: "Da 20€ a 30€" },
                { value: "30-50", label: "Da 30€ a 50€" },
              ].map(({ value, label }) => (
                <label
                  key={value}
                  className="flex items-center gap-2 ml-1 mt-1.5 cursor-pointer w-max"
                >
                  <input
                    type="checkbox"
                    checked={activePriceFilters.includes(value)}
                    onChange={() => handleMultiFilterClick("price", value)}
                    className="w-4 h-4 cursor-pointer"
                  />
                  <span className="text-primary-dark-900 font-light">
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
