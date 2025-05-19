"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";
import SpinnerMiniColored from "./SpinnerMiniColored";
import { LIMIT } from "@/app/_lib/constants";

function LoadMoreButton({ products, count }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();
  const [isLoadingMore, setIsLoadingMore] = useState(false);

  useEffect(() => {
    if (isLoadingMore) {
      setIsLoadingMore(false);
    }
  }, [products]);

  const handleLoadMoreClick = () => {
    setIsLoadingMore(true);
    const params = new URLSearchParams(searchParams.toString());
    const currentPage = Number(params.get("page")) || 0;
    const nextPage = currentPage + 1;

    params.set("page", nextPage.toString());

    router.replace(`${pathname}?${params.toString()}`, {
      scroll: false,
    });
  };

  return (
    <>
      {products?.length > 0 && (
        <div className="text-center mt-8 text-sm">
          <span className="text-primary-700">
            {products.length === count
              ? "Non ci sono altri prodotti da visualizzare."
              : `Hai visualizzato ${products.length} di ${count} prodotti`}
          </span>
        </div>
      )}
      {products?.length > 0 && products.length < count && (
        <div className="text-center py-2 flex items-center w-full justify-center mt-4">
          <button
            className={`cursor-pointer px-4 py-2  ${
              isLoadingMore
                ? "bg-transparent hover:bg-transparent"
                : "bg-primary-500 text-white rounded-lg hover:bg-primary-700"
            }`}
            onClick={handleLoadMoreClick}
            disabled={isLoadingMore}
          >
            {isLoadingMore ? (
              <SpinnerMiniColored></SpinnerMiniColored>
            ) : (
              "Carica altri"
            )}
          </button>
        </div>
      )}
    </>
  );
}

export default LoadMoreButton;
