import Link from "next/link";
import { Suspense } from "react";
import BestSellerProducts from "./BestSellerProducts";
import { BestSellerProductsSkeleton } from "../ui/skeleton/Skeletons";

function BestSellers({ font }) {
  return (
    <section
      aria-labelledby="most-loved"
      className="page-padding flex w-full flex-col gap-x-10 gap-y-13 py-20 md:flex-row"
    >
      <div className="h-max space-y-10 md:sticky md:top-30">
        <div className="space-y-3">
          <h2
            id="most-loved"
            className={`text-4xl font-semibold sm:text-5xl ${font.className}`}
          >
            I più amati
          </h2>
          <p className="text-base/6 text-black/65 sm:text-lg dark:text-white/85">
            I prodotti scelti ogni giorno da centinaia di nostri clienti. Scopri
            cosa rende questi sapori così speciali.
          </p>
        </div>
        <Link
          href="/shop"
          className="custom-focus mt-4 rounded-full bg-black px-5 py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-black/80 active:bg-black/80 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-white/80 dark:active:bg-white/80"
        >
          Vedi di più
        </Link>
      </div>

      <Suspense fallback={<BestSellerProductsSkeleton />}>
        <BestSellerProducts />
      </Suspense>
    </section>
  );
}

export default BestSellers;
