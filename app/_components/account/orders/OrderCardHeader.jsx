import Button from "../../ui/Button";
import OrderCardStatus from "./OrderCardStatus";

function OrderCardHeader({ id, orderDate, totalCost, status }) {
  return (
    <div
      role="group"
      aria-label="Informazioni ordine"
      className="flex flex-col flex-wrap gap-x-10 gap-y-2 border-b border-b-gray-200 bg-gray-50 px-3 py-4 text-sm sm:flex-row sm:items-center md:px-5 md:text-base xl:px-10 dark:border-b-zinc-700/70 dark:bg-zinc-800/70"
    >
      <OrderInfo name="Numero ordine" value={`#${id}`} />
      <OrderInfo name="Data ordine" value={orderDate} />
      <OrderInfo name="Totale" value={totalCost} />

      <OrderCardStatus orderStatus={status} />

      {status === "pending" && (
        <form>
          <Button className="rounded px-2" type="submit">
            Conferma
          </Button>
        </form>
      )}
    </div>
  );
}

export default OrderCardHeader;

function OrderInfo({ name, value }) {
  return (
    <dl className="inline-flex gap-1 text-black/65 dark:text-white/85">
      <dt>{name}</dt>
      <dd className="font-semibold text-black dark:text-white">{value}</dd>
    </dl>
  );
}
