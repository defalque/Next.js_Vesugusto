import AccountHeading from "@/app/_components/account/AccountHeading";
import OrdersList from "@/app/_components/account/orders/OrdersList";
import Pagination from "@/app/_components/ui/Pagination";
import Search from "@/app/_components/ui/Search";
import { OrdersListSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import { FiltersProvider } from "@/app/_contexts/FiltersContext";
import { ORDERS_LIMIT } from "@/app/_lib/constants";
import { getUserOrdersCount } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import { Suspense } from "react";

export const metadata = {
  title: "I miei ordini",
  description: "Controlla lo stato dei tuoi ordini.",
};

export default async function Page({ searchParams }) {
  const session = await auth();

  const params = await searchParams;
  const filters = {
    query: params?.query || "",
    page: Number(params?.page) || 1,
  };
  const filtersKey = `${filters.page}-${filters.query}`;

  const count = await getUserOrdersCount(session.user.userId, filters);
  const totalPages = Math.ceil(count / ORDERS_LIMIT);
  const isPageOutOfBounds = Number(filters.page) > totalPages;

  return (
    <div className="mb-10 flex flex-col gap-8">
      <AccountHeading
        accessibleLabel="orders-heading"
        title="Storico degli ordini"
        text="Visualizza lo stato degli ordini recenti, gestisci i resi e scopri
          prodotti simili."
      />

      <section className="flex w-full justify-end gap-5">
        <FiltersProvider>
          <Search placeholder="Cerca ordine per numero..." />
        </FiltersProvider>
      </section>

      <section
        aria-labelledby="orders-results-heading"
        className="flex flex-col gap-10"
      >
        <h2 id="orders-results-heading" className="sr-only">
          Risultati ordini
        </h2>

        <div
          aria-live="polite"
          aria-atomic="true"
          className="sr-only"
          role="status"
        >
          {`Sono stati trovati ${count ?? 0} ordini`}
        </div>

        <Suspense key={filtersKey} fallback={<OrdersListSkeleton />}>
          <OrdersList filters={filters} />
        </Suspense>

        {!isPageOutOfBounds && (
          <Pagination count={count ?? 0} limit={ORDERS_LIMIT} />
        )}
      </section>
    </div>
  );
}
