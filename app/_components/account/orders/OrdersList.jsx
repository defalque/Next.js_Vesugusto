import { ORDERS_LIMIT } from "@/app/_lib/constants";
import { getPaginatedUserOrders } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import OrderCard from "./OrderCard";

async function OrdersList({ filters }) {
  const session = await auth();

  const orders = await getPaginatedUserOrders(
    ORDERS_LIMIT,
    filters,
    session.user.userId,
  );

  if (!Array.isArray(orders)) {
    return <span>Errore: dati ordini non validi.</span>;
  }

  if (orders.length === 0) {
    return <span>Nessun ordine trovato.</span>;
  }

  return (
    <div className="relative flex flex-col gap-20">
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
