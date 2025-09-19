import { formatCurrency } from "@/app/_lib/formatCurrency";
import { formatDate } from "@/app/_lib/formatDate";
import OrderCardHeader from "./OrderCardHeader";
import OrderCardItem from "./OrderCardItem";

function OrderCard({ order }) {
  return (
    <>
      <OrderCardHeader
        id={order.id}
        status={order.status}
        orderDate={formatDate(order.orderDate)}
        totalCost={formatCurrency(order.totalCost)}
      />

      <div className="divide-y divide-gray-200 dark:divide-zinc-700/70">
        {order.orderItems.map((item) => (
          <div className="flex flex-col" key={item.id}>
            <OrderCardItem item={item} />
          </div>
        ))}
      </div>
    </>
  );
}

export default OrderCard;
