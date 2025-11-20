import { Suspense } from "react";

import { FiltersProvider } from "@/app/_contexts/FiltersContext";

import AccountHeading from "@/app/_components/account/AccountHeading";
import OrderClients from "@/app/_components/account/orders/OrderClients";
import OrdersResolver from "@/app/_components/account/orders/OrdersResolver";
import {
  OrdersListSkeleton,
  SearchInputSkeleton,
} from "@/app/_components/ui/skeleton/Skeletons";

export const metadata = {
  title: "I miei ordini",
  description: "Controlla lo stato dei tuoi ordini.",
};

export default async function Page({ searchParams }) {
  const filterParams = searchParams.then((sp) => ({
    query: sp.query,
    page: sp.page,
  }));

  return (
    <div className="mb-10 flex flex-col gap-8">
      <AccountHeading
        title="Storico degli ordini"
        text="Visualizza lo stato degli ordini recenti, gestisci i resi e scopri
          prodotti simili."
      />

      <Suspense
        fallback={
          <div className="relative flex w-full justify-end gap-5">
            <SearchInputSkeleton height />
          </div>
        }
      >
        <FiltersProvider>
          <OrderClients />
        </FiltersProvider>
      </Suspense>

      <section
        aria-labelledby="orders-results-heading"
        className="flex flex-col gap-10"
      >
        <h2 id="orders-results-heading" className="sr-only">
          Risultati ordini
        </h2>

        <Suspense fallback={<OrdersListSkeleton />}>
          <OrdersResolver filterParams={filterParams} />
        </Suspense>
      </section>
    </div>
  );
}
