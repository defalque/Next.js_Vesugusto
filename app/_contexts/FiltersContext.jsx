"use client";

import { createContext, useCallback, useContext } from "react";
import { useRouter, usePathname, useSearchParams } from "next/navigation";

const FilterContext = createContext();

export function FiltersProvider({ children }) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (filterField, value) => {
      const params = new URLSearchParams(searchParams.toString());
      const currentValues = params.get(filterField)?.split(",") ?? [];

      params.set("page", "1");

      if (filterField === "sort") {
        // Sovrascrivi direttamente con il nuovo valore
        if (!value) {
          params.delete("sort");
        } else {
          params.set("sort", value);
        }
      } else {
        // Gestione multi-valore per altri campi
        const currentValues = params.get(filterField)?.split(",") ?? [];
        let updatedValues;

        if (currentValues.includes(value)) {
          updatedValues = currentValues.filter((v) => v !== value);
        } else {
          updatedValues = [...currentValues, value];
        }

        if (updatedValues.length === 0) {
          params.delete(filterField);
        } else {
          params.set(filterField, updatedValues.join(","));
        }
      }

      // let updatedValues;
      // if (currentValues.includes(value)) {
      //   updatedValues = currentValues.filter((v) => v !== value);
      // } else {
      //   updatedValues = [...currentValues, value];
      // }

      // if (updatedValues.length === 0) {
      //   params.delete(filterField);
      // } else {
      //   params.set(filterField, updatedValues.join(","));
      // }

      return params.toString();
    },
    [searchParams],
  );

  return (
    <FilterContext.Provider
      value={{
        router,
        pathname,
        searchParams,
        createQueryString,
      }}
    >
      {children}
    </FilterContext.Provider>
  );
}

export function useFilterContext() {
  const context = useContext(FilterContext);
  if (!context) {
    throw new Error("useFilterContext must be used within a FilterProvider");
  }
  return context;
}
