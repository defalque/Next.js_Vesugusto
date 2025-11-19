import OrderCard from "./OrderCard";

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
