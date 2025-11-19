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
    "cursor-pointer rounded-full px-4 py-2.5 text-lg md:text-sm transition-all duration-300 border custom-focus active:scale-[0.96]";
  const lightThemeClasses = isChecked
    ? "bg-black text-white border-black"
    : "hover:bg-black/5 active:bg-black/10 hover:border-black/20 border-gray-300";
  const darkThemeClasses = isChecked
    ? "dark:bg-white dark:text-black dark:border-white"
    : "dark:hover:bg-zinc-700 dark:active:bg-zinc-700 dark:hover:text-white dark:active:text-white dark:border-zinc-700 dark:hover:border-zinc-500 dark:active:border-zinc-500";

  const combinedClasses = `${baseClasses} ${lightThemeClasses} ${darkThemeClasses}`;

  return (
    <button
      onClick={handleChange}
      className={combinedClasses}
      // aria-pressed={isChecked}
      // aria-selected={isChecked}
    >
      {label}
    </button>
  );

  // return (
  //   <label
  //     htmlFor={value}
  //     className="flex w-max cursor-pointer items-center justify-center gap-x-2 px-2 text-lg lg:text-base"
  //   >
  //     <input
  //       id={value}
  //       type="checkbox"
  //       checked={isChecked}
  //       onChange={handleChange}
  //       className="accent-primary-950 dark:accent-primary-dark-300 focus-visible:ring-primary-950 active:accent-primary-950 size-4.5 cursor-pointer focus:outline-none focus-visible:ring-2"
  //     />
  //     <span className="text-primary-dark-900 dark:text-primary-50">
  //       {label}
  //     </span>
  //   </label>
  // );
}

export default FilterInput;
