"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/outline";

function Pagination({ count, limit }) {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [isPending, startTransition] = useTransition();

  const currentPage = !searchParams.get("page")
    ? 1
    : Number(searchParams.get("page"));

  const pageCount = Math.ceil(count / limit);

  const createQueryString = useCallback(
    (filterField, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(filterField, value);

      return params.toString();
    },
    [searchParams],
  );

  if (count === 0) return null;

  function nextPage() {
    const next = currentPage === pageCount ? currentPage : currentPage + 1;
    router.push(pathname + "?" + createQueryString("page", String(next)));
  }

  function prevPage() {
    const prev = currentPage === 1 ? currentPage : currentPage - 1;
    router.push(pathname + "?" + createQueryString("page", String(prev)));
  }

  return (
    <div
      role="navigation"
      aria-label="Paginazione"
      className="flex w-full items-center justify-between py-3 text-base"
    >
      <span className="sr-only" aria-live="polite">
        Pagina {currentPage} di {pageCount}
      </span>

      {pageCount > 1 && (
        <p>
          {(currentPage - 1) * limit + 1 ===
          (currentPage === pageCount ? count : currentPage * limit) ? (
            <span>Ultimo risultato</span>
          ) : (
            <>
              <span className="font-semibold">
                {(currentPage - 1) * limit + 1}
              </span>
              -
              <span className="font-semibold">
                {currentPage === pageCount ? count : currentPage * limit}
              </span>
            </>
          )}{" "}
          di <span className="font-semibold">{count}</span> risultati trovati.
        </p>
      )}

      {pageCount <= 1 && count > 1 && (
        <p className="py-2">
          {" "}
          <span className="font-semibold">{count}</span> risultati trovati.
        </p>
      )}
      {pageCount <= 1 && count === 1 && (
        <p className="py-2">Un risultato trovato.</p>
      )}

      {pageCount > 1 && (
        <div className="flex gap-2">
          {currentPage !== 1 && (
            <PaginationButton
              ariaLabel="Indietro"
              onClick={() => {
                startTransition(() => {
                  prevPage();
                });
              }}
              disabled={isPending}
            >
              <ChevronLeftIcon className="size-8 md:size-5" />
            </PaginationButton>
          )}

          {currentPage !== pageCount && (
            <PaginationButton
              ariaLabel="Avanti"
              onClick={() => {
                startTransition(() => {
                  nextPage();
                });
              }}
              disabled={isPending}
            >
              <ChevronRightIcon className="size-8 md:size-5" />
            </PaginationButton>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;

function PaginationButton({ onClick, ariaLabel, disabled, children }) {
  return (
    <button
      className="dark:border-primary-dark-300 inset-shadow-primary-50/60 dark:hover:border-primary-dark-100 bg-primary-950 hover:bg-primary-800 dark:hover:bg-primary-950/40 dark:bg-primary-950/25 disabled:dark:text-primary-50 focus-visible:outline-primary-950 outline-primary-dark-100 dark:disabled:border-primary-dark-300 inline-flex cursor-pointer items-center rounded-lg px-4 py-1 font-semibold text-white inset-shadow-sm transition-colors duration-300 text-shadow-md/10 focus:outline focus-visible:outline-2 disabled:animate-pulse disabled:cursor-not-allowed disabled:text-white disabled:text-shadow-none md:py-2 dark:border dark:inset-shadow-none"
      aria-label={ariaLabel}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}
