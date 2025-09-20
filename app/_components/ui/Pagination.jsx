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
            <Button
              aria-label="Indietro"
              onClick={() => {
                startTransition(() => {
                  prevPage();
                });
              }}
              disabled={isPending}
              className="rounded-full p-3"
            >
              <ArrowLeftIcon className="size-8 md:size-6" />
            </Button>
          )}

          {currentPage !== pageCount && (
            <Button
              aria-label="Avanti"
              onClick={() => {
                startTransition(() => {
                  nextPage();
                });
              }}
              disabled={isPending}
              className="rounded-full p-3"
            >
              <ArrowRightIcon className="size-8 md:size-6" />
            </Button>
          )}
        </div>
      )}
    </div>
  );
}

export default Pagination;
