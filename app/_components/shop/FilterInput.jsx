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

  // const handleClick = () => {
  //   const newSelectedValues = isChecked
  //     ? selectedValues.filter((v) => v !== value) // remove if already selected
  //     : [...selectedValues, value]; // add if not selected

  //   const newQuery = newSelectedValues.length
  //     ? createQueryString(filterField, newSelectedValues.join(","))
  //     : createQueryString(filterField, null); // remove query if empty

  //   router.push(pathname + "?" + newQuery);
  // };

  // const baseClasses =
  //   "cursor-pointer rounded-xl px-4 py-1 text-lg md:text-base transition-colors duration-200 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary-950";
  // const lightThemeClasses = isChecked
  //   ? "bg-gray-200/80"
  //   : "border-gray-200 hover:bg-gray-200/80 active:bg-gray-200/80";
  // const darkThemeClasses = isChecked
  //   ? "dark:bg-zinc-700/50"
  //   : "dark:border-zinc-800 dark:hover:bg-zinc-700/50 dark:active:bg-zinc-700/50";

  // const combinedClasses = `${baseClasses} ${lightThemeClasses} ${darkThemeClasses}`;

  // return (
  //   <button
  //     onClick={handleChange}
  //     className={combinedClasses}
  //     aria-pressed={isChecked}
  //   >
  //     {label}
  //   </button>
  // );

  return (
    <label
      htmlFor={value}
      className="flex w-max cursor-pointer items-center justify-center gap-x-2 px-2 text-lg lg:text-base"
    >
      <input
        id={value}
        type="checkbox"
        checked={isChecked}
        onChange={handleChange}
        className="accent-primary-950 dark:accent-primary-dark-300 focus-visible:ring-primary-950 active:accent-primary-950 size-4.5 cursor-pointer focus:outline-none focus-visible:ring-2"
      />
      <span className="text-primary-dark-900 dark:text-primary-50">
        {label}
      </span>
    </label>
  );
}

export default FilterInput;
