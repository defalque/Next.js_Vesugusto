import { confirmOrder } from "@/app/_lib/actions";
import Button from "../../ui/Button";
import OrderCardStatus from "./OrderCardStatus";

function OrderCardHeader({ id, orderDate, totalCost, status }) {
  return (
    <div className="flex flex-wrap items-center gap-x-10 gap-y-2 border-b border-b-gray-200 bg-gray-50 px-3 py-4 text-sm md:px-5 md:text-base xl:px-10 dark:border-b-zinc-700/70 dark:bg-zinc-800/70">
      <OrderInfo name="Ordine" value={`#${id}`} />
      <OrderInfo name="Data ordine:" value={orderDate} />
      <OrderInfo name="Totale:" value={totalCost} />

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
    <div className="inline-flex gap-1 text-gray-500 dark:text-gray-400">
      <span>{name}</span>
      <span className="text-primary-dark-900 font-semibold dark:text-gray-50">
        {value}
      </span>
    </div>
  );
}
