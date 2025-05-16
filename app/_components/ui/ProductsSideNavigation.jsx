"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

function ProductsSideNavigation({ types, flavors }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const activeFilter = searchParams.get("type") ?? "all";

  return (
    <div className="border-r border-orange-50 shadow-sm dark:border-midnight dark:shadow-2xl">
      <ul className="flex flex-col gap-2 text-lg px-3 py-2 mt-5">
        <li className="uppercase text-xs px-3 text-primary-600 font-bold">
          Filtra per
        </li>

        <li
          className={`rounded-xl py-0.5 px-3 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 font-semibold cursor-pointer ${
            activeFilter === "all"
              ? "text-primary-950"
              : "text-primary-dark-900"
          }`}
          onClick={() => {
            const params = new URLSearchParams();
            params.set("type", "all");
            router.replace(`${pathname}?${params.toString()}`, {
              scroll: false,
            });
          }}
        >
          Tutto
        </li>

        {types.map((type) => (
          <li
            className={`rounded-xl py-0.5 px-3 hover:bg-primary-950 hover:text-primary-100 dark:hover:bg-primary-800 dark:hover:text-primary-50 transition-colors flex items-center gap-4 font-semibold cursor-pointer ${
              activeFilter === type.type ? "text-primary-950" : ""
            }`}
            key={type.type}
            onClick={() => {
              const params = new URLSearchParams();
              params.set("type", type.type);
              router.replace(`${pathname}?${params.toString()}`, {
                scroll: false,
              });
            }}
          >
            {type.type.charAt(0).toUpperCase() + type.type.slice(1)}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ProductsSideNavigation;
