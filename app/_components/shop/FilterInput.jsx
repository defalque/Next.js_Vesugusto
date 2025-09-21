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

  const baseClasses =
    "cursor-pointer rounded-2xl border px-4 py-1 text-base transition-colors duration-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-primary-950";
  const lightThemeClasses = isChecked
    ? "bg-primary-950 font-semibold text-gray-100"
    : "border-gray-200 hover:bg-gray-100";
  const darkThemeClasses = isChecked
    ? "dark:bg-zinc-100 dark:text-black"
    : "dark:border-zinc-800 dark:hover:bg-zinc-900";

  const combinedClasses = `${baseClasses} ${lightThemeClasses} ${darkThemeClasses}`;

  return (
    <button
      onClick={handleChange}
      className={combinedClasses}
      aria-pressed={isChecked}
    >
      {label}
    </button>
  );

  // return (
  //   <label
  //     htmlFor={value}
  //     className="flex w-max items-center justify-center gap-x-2 p-1 text-base lg:text-sm"
  //   >
  //     <input
  //       id={value}
  //       type="checkbox"
  //       checked={isChecked}
  //       onChange={handleChange}
  //       className="accent-primary-950 focus-visible:ring-primary-950 size-4 focus:outline-none focus-visible:ring-2"
  //     />
  //     <span className="text-primary-dark-900 dark:text-primary-50 font-light">
  //       {label}
  //     </span>
  //   </label>
  // );
}

export default FilterInput;
