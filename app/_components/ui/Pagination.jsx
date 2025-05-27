"use client";

import { LIMIT } from "@/app/_lib/constants";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import { useEffect, useState } from "react";
import SpinnerMini from "./SpinnerMini";

export default function Pagination({ products, totalProducts }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLeftLoading, setIsLeftLoading] = useState(false);
  const [isRightLoading, setIsRightLoading] = useState(false);

  const currentPage = !searchParams.get("page")
    ? 0
    : Number(searchParams.get("page"));
  const pageCount = Math.ceil(totalProducts / LIMIT);

  useEffect(() => {
    if (isLeftLoading) setIsLeftLoading(false);

    if (isRightLoading) setIsRightLoading(false);

    if (isLeftLoading || isRightLoading) {
      window.scrollTo({ top: 0, behavior: "smooth" });
    }
  }, [products]);

  useEffect(() => {
    if (currentPage + 1 > pageCount && pageCount > 0) {
      const params = new URLSearchParams(searchParams.toString());
      params.set("page", "0");
      router.replace(`?${params.toString()}`);
    }
  }, [currentPage, pageCount, searchParams, router]);

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

  if (pageCount <= 1) return null;

  return (
    <>
      {products?.length > 0 && (
        <div className="flex items-center py-3 mt-8 mb-4">
          <div className="text-primary-700 text-sm">
            Hai visualizzato da{" "}
            <span className="font-semibold">{currentPage * LIMIT + 1}</span> a
            <span className="font-semibold">
              {" "}
              {currentPage === pageCount - 1
                ? totalProducts
                : (currentPage + 1) * LIMIT}
            </span>{" "}
            di <span className="font-semibold">{totalProducts}</span> prodotti.
          </div>

          <div className="ml-auto flex items-center gap-8">
            <PaginationButton
              currentPage={currentPage}
              pageCount={0}
              handleClick={handlePrevClick}
            >
              {isLeftLoading ? (
                <SpinnerMini></SpinnerMini>
              ) : (
                <ChevronLeftIcon className="size-6" />
              )}
            </PaginationButton>

            <PaginationButton
              currentPage={currentPage}
              pageCount={pageCount - 1}
              handleClick={handleNextClick}
            >
              {isRightLoading ? (
                <SpinnerMini></SpinnerMini>
              ) : (
                <ChevronRightIcon className="size-6" />
              )}
            </PaginationButton>
          </div>
        </div>
      )}
    </>
  );
}

function PaginationButton({ currentPage, pageCount, handleClick, children }) {
  return (
    <button
      className={`px-4 py-2 text-white rounded-lg transition-colors duration-300 ${
        currentPage === pageCount
          ? "bg-zinc-200 hover:bg-zinc-200 cursor-not-allowed hidden"
          : "bg-primary-950 hover:bg-primary-800 cursor-pointer"
      }`}
      onClick={handleClick}
      disabled={currentPage === pageCount}
    >
      {children}
    </button>
  );
}
