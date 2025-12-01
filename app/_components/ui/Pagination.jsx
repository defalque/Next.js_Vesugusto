"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useTransition } from "react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import Button from "./Button";

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

  const srOnlyText = `Pagina ${currentPage} di ${pageCount}`;

  return (
    <div
      role="navigation"
      aria-label="Paginazione"
      className="flex w-full items-center justify-between px-1 py-3 text-base"
    >
      <span className="sr-only" aria-live="polite">
        {srOnlyText}
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
              aria-label="Pagina precednte"
              onClick={() => {
                startTransition(() => {
                  prevPage();
                });
              }}
              disabled={isPending}
            >
              <ArrowLeftIcon aria-hidden className="size-7" />
            </PaginationButton>
          )}

          {currentPage !== pageCount && (
            <PaginationButton
              aria-label="Prossima pagina"
              onClick={() => {
                startTransition(() => {
                  nextPage();
                });
              }}
              disabled={isPending}
            >
              <ArrowRightIcon aria-hidden className="size-7" />
            </PaginationButton>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;

function PaginationButton({ ...props }) {
  const { children, ...restProps } = props;

  return (
    <button
      {...restProps}
      className="custom-focus cursor-pointer self-start rounded-full bg-black p-3 text-lg font-semibold text-white transition-colors duration-300 hover:bg-black/60 active:bg-black/70 disabled:animate-pulse disabled:cursor-not-allowed disabled:bg-black/60 sm:p-3.5 md:text-base lg:p-3 dark:bg-white dark:text-black dark:hover:bg-zinc-300 dark:hover:text-black dark:active:bg-zinc-300 dark:active:text-black dark:disabled:bg-zinc-300 dark:disabled:text-black dark:disabled:hover:bg-zinc-300"
    >
      {children}
    </button>
  );
}
