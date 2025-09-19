"use client";

import { useFilterContext } from "@/app/_contexts/FiltersContext";

function FilterInput({ label, value, filterField }) {
  const { router, pathname, createQueryString, searchParams } =
    useFilterContext();

  const selectedValues = searchParams.get(filterField)?.split(",") ?? [];
  const isChecked = selectedValues.includes(value);

  const handleChange = () => {
    router.push(pathname + "?" + createQueryString(filterField, value));
  };

  return (
    <label
      htmlFor={value}
      className="flex w-max items-center justify-center gap-x-2 p-1 text-base lg:text-sm"
    >
      <input
        id={value}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="accent-primary-950 focus-visible:ring-primary-950 size-4 focus:outline-none focus-visible:ring-2"
      />
      <span className="text-primary-dark-900 dark:text-primary-50 font-light">
        {label}
      </span>
    </label>
  );
}

export default FilterInput;
