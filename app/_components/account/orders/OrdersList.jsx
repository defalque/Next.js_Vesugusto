import { PackageX } from "lucide-react";
import OrderCard from "./OrderCard";
import Link from "next/link";

function OrdersList({ count, orders }) {
  if (!Array.isArray(orders)) {
    return (
      <p role="alert" className="text-red-600">
        Errore: dati ordini non validi.
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <PackageX className="size-10 text-black/65 dark:text-white/85" />
        <p
          role="status"
          aria-live="polite"
          className="mt-2 mb-8 text-black/65 dark:text-white/85"
        >
          Nessun ordine trovato.
        </p>
        <Link
          href="/shop"
          className="cursor-pointer rounded-full bg-black px-4 py-2 font-medium text-white shadow-sm transition duration-200 text-shadow-2xs hover:bg-black/80 active:scale-90 motion-reduce:transition-none dark:bg-white dark:text-black dark:hover:bg-white/85"
        >
          Visita i nostri prodotti
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex flex-col gap-20">
      <div
        aria-live="polite"
        aria-atomic="true"
        className="sr-only"
        role="status"
      >
        {`Ordini trovati: ${count ?? 0}`}
      </div>

      {orders.map((order) => (
        <article
          key={order.id}
          className="flex flex-col overflow-hidden rounded-2xl border border-gray-200 shadow-sm dark:border-zinc-700/70"
        >
          <OrderCard order={order} />
        </article>
      ))}
    </div>
  );
}

export default OrdersList;
