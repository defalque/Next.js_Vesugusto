import { ORDERS_LIMIT } from "@/app/_lib/constants";
import { getPaginatedUserOrders } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import OrderCard from "./OrderCard";

async function OrdersList({ count, filters }) {
  const session = await auth();

  const orders = await getPaginatedUserOrders(
    ORDERS_LIMIT,
    filters,
    session.user.userId,
  );

  if (!Array.isArray(orders)) {
    return (
      <p role="alert" className="text-red-600">
        Errore: dati ordini non validi.
      </p>
    );
  }

  if (orders.length === 0) {
    return (
      <p role="status" aria-live="polite">
        Nessun ordine trovato.
      </p>
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
