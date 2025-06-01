import OrderList from "@/app/_components/ui/OrderList";
import Spinner from "@/app/_components/ui/Spinner";
// import { ORDERS_LIMIT } from "@/app/_lib/constants";
// import {
//   getUserOrders,
//   getUserOrdersWithPagination,
// } from "@/app/_lib/data-service";
// import { auth } from "@/auth";
import { Suspense } from "react";

export const metadata = {
  title: "I tuoi ordini",
};

export default async function Page({ searchParams }) {
  const params = await searchParams;
  const filters = {
    page: Number(params?.page) || 0,
  };

  return (
    <div>
      <div className=" flex flex-col gap-5 pb-4 border-b border-b-gray-200 dark:border-b-dark-200">
        <h1 className="text-2xl md:text-5xl font-medium tracking-wide">
          Storico degli ordini
        </h1>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          Visualizza lo stato degli ordini recenti, gestisci i resi e scopri
          prodotti simili.
        </h2>
      </div>

      <Suspense
        fallback={<Spinner label="Caricamento ordini..."></Spinner>}
        key={filters}
      >
        <OrderList filters={filters}></OrderList>
      </Suspense>
    </div>
  );
}
