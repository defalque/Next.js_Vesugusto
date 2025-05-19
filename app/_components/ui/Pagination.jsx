"use client";

import { LIMIT } from "@/app/_lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import SpinnerMini from "./SpinnerMini";

function Pagination({ products, totalProducts }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLeftLoading, setIsLeftLoading] = useState(false);
  const [isRightLoading, setIsRightLoading] = useState(false);

  useEffect(() => {
    if (isLeftLoading) setIsLeftLoading(false);

    if (isRightLoading) setIsRightLoading(false);
  }, [products]);

  const currentPage = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(totalProducts / LIMIT);

  const handleNextClick = () => {
    setIsRightLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    const nextPage =
      currentPage === pageCount - 1 ? currentPage : currentPage + 1;

    params.set("page", nextPage.toString());

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  const handlePrevClick = () => {
    setIsLeftLoading(true);
    const params = new URLSearchParams(searchParams.toString());
    const nextPage = currentPage === 0 ? currentPage : currentPage - 1;

    params.set("page", nextPage.toString());

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  console.log(currentPage);
  if (pageCount <= 1) return null;

  return (
    <>
      {products?.length > 0 && (
        <div className="flex items-center px-5 py-3 mt-8 mb-4 border-y border-y-primary-300">
          <div className="text-primary-700 text-sm">
            Hai visualizzato da <span>{currentPage * LIMIT + 1}</span> a
            <span>
              {" "}
              {currentPage === pageCount - 1
                ? totalProducts
                : (currentPage + 1) * LIMIT}
            </span>{" "}
            di <span>{totalProducts}</span> prodotti
          </div>

          <div className="ml-auto flex items-center gap-8">
            <button
              className={`px-4 py-2 text-white rounded-lg ${
                currentPage === 0
                  ? "bg-zinc-200 hover:bg-zinc-200 cursor-not-allowed hidden"
                  : "bg-primary-500 hover:bg-primary-700 cursor-pointer"
              }`}
              onClick={handlePrevClick}
              disabled={currentPage === 0}
            >
              {isLeftLoading ? (
                <SpinnerMini></SpinnerMini>
              ) : (
                <ChevronLeftIcon className="size-6" />
              )}
            </button>

            <button
              className={`px-4 py-2 text-white rounded-lg ${
                currentPage === pageCount - 1
                  ? "bg-zinc-200 hover:bg-zinc-200 cursor-not-allowed hidden"
                  : "bg-primary-500 hover:bg-primary-700 cursor-pointer"
              }`}
              onClick={handleNextClick}
              disabled={currentPage === pageCount - 1}
            >
              {isRightLoading ? (
                <SpinnerMini></SpinnerMini>
              ) : (
                <ChevronRightIcon className="size-6" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default Pagination;
