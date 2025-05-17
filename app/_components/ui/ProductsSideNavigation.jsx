"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { ChevronDownIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useHideFilters } from "../contexts/HideFiltersProvider";

function ProductsSideNavigation({ types, flavors }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [category, setCategory] = useState(false);
  const { isHidden, setIsHidden } = useHideFilters();

  const activeFilter = searchParams.get("type") ?? "all";

  return (
    <div
      className={`border-r border-orange-50 shadow-sm dark:border-midnight dark:shadow-2xl transition-all duration-300 ease-in-out ${
        isHidden ? "hidden" : ""
      }`}
    >
      <div className="flex flex-col px-3 py-2 mt-5 text-md sticky font-normal top-5 w-full">
        <span className="uppercase text-[0.7rem] px-3 text-primary-600 font-bold mb-3">
          Filtra per
        </span>

        <div className="mb-2">
          <div
            className="flex items-center cursor-pointer mb-1"
            onClick={() => setCategory(!category)}
          >
            <span className="px-3">Categoria</span>
            {category ? (
              <ChevronDownIcon className="ml-auto size-4.5"></ChevronDownIcon>
            ) : (
              <ChevronRightIcon className="ml-auto size-4.5"></ChevronRightIcon>
            )}
          </div>
          {category
            ? types.map((type) => (
                <span
                  className={`w-max mt-0.5 rounded-xl py-0.5 px-2 ml-5 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 f cursor-pointer ${
                    activeFilter === type.type
                      ? "bg-primary-950 text-primary-100"
                      : "text-primary-dark-900"
                  }`}
                  key={type.type}
                  onClick={() => {
                    // const params = new URLSearchParams();
                    // params.set("type", type.type);
                    // router.replace(`${pathname}?${params.toString()}`, {
                    //   scroll: false,
                    // });
                    const params = new URLSearchParams(window.location.search);

                    // Se il valore corrente di `type` è uguale, lo rimuoviamo (toggle off)
                    if (params.get("type") === type.type) {
                      params.delete("type");
                    } else {
                      // Altrimenti lo impostiamo (toggle on)
                      params.set("type", type.type);
                    }

                    const queryString = params.toString();
                    router.replace(
                      queryString ? `${pathname}?${queryString}` : pathname,
                      {
                        scroll: false,
                      }
                    );
                  }}
                >
                  {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
                </span>
              ))
            : null}
        </div>
      </div>
    </div>
  );
}

export default ProductsSideNavigation;
