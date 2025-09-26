import Link from "next/link";
import { Suspense } from "react";
import NewArrivalsProducts from "./NewArrivalsProducts";

function NewArrivals({ font }) {
  return (
    <section
      role="region"
      aria-labelledby="new-arrivals"
      aria-describedby="new-arrivals-p"
      className="page-padding flex w-full flex-col gap-x-10 gap-y-6 pt-10 pb-20"
    >
      <div className="flex h-max w-full flex-wrap items-end justify-between gap-x-10 gap-y-5">
        <div className="space-y-3">
          <h2
            id="new-arrivals"
            className={`text-4xl font-semibold sm:text-5xl ${font.className}`}
          >
            Nuovi arrivi
          </h2>
          <h3
            id="new-arrivals-p"
            className="text-base/6 text-black/65 sm:text-lg dark:text-white/85"
          >
            Scopri i nuovi prodotti ispirati alla tradizione vesuviana.
            Ingredienti genuini, storie autentiche, gusto inconfondibile.
          </h3>
        </div>

        <Link
          href="/shop"
          className="custom-focus rounded-full text-base font-bold transition-colors duration-200 sm:text-lg"
        >
          Vedi tutti
        </Link>
      </div>

      <Suspense fallback={<div className="spinner" />}>
        <NewArrivalsProducts />
      </Suspense>
    </section>
  );
}

export default NewArrivals;
