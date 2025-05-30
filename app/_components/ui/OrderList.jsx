import { formatDate } from "@/app/_lib/formatDate";
import { formatPrice } from "@/app/_lib/formatPrice";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
import Pagination from "./Pagination";
import { ORDERS_LIMIT } from "@/app/_lib/constants";
import {
  getUserOrders,
  getUserOrdersWithPagination,
} from "@/app/_lib/data-service";
import { auth } from "@/auth";

async function OrderList({ filters }) {
  const session = await auth();

  const allOrdersData = getUserOrders(session.user.userId);
  const ordersData = getUserOrdersWithPagination(
    ORDERS_LIMIT,
    filters,
    session.user.userId
  );

  const [allOrders, orders] = await Promise.all([allOrdersData, ordersData]);

  return orders.length > 0 ? (
    <div className="flex flex-col gap-20 mt-10 px-20 relative">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col border border-gray-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="flex items-center gap-x-15 text-sm px-10 py-4 border-b border-b-gray-200 bg-gray-50">
            <div className=" flex flex-col gap-1">
              <h2 className="font-medium">Numero ordine</h2>
              <span className="text-gray-500">#{order.id}</span>
            </div>

            <div className=" flex flex-col gap-1">
              <h2 className="font-medium">Data dell'ordine</h2>
              <span className="text-gray-500">
                {formatDate(order.orderDate)}
              </span>
            </div>

            <div className=" flex flex-col gap-1">
              <h2 className="font-medium">Totale ordine</h2>
              <span className="text-primary-dark-900 font-medium self-center">
                {formatPrice(order.total)}
              </span>
            </div>

            {order.status === "delivered" && (
              <div className="flex items-center gap-2 ml-auto">
                <CheckCircleIcon className="size-6 fill-green-600"></CheckCircleIcon>
                <span>Consegnato</span>
              </div>
            )}
            {order.status === "unconfirmed" && (
              <div className="flex items-center gap-2 ml-auto text-md font-light">
                <ExclamationCircleIcon className="size-6 fill-yellow-400"></ExclamationCircleIcon>
                <span>In preparazione</span>
              </div>
            )}

            {/* <div className="flex items-center ml-auto gap-3">
              <button className="p-2 bg-primary-950 hover:bg-primary-900 text-primary-50 transition-colors duration-200 cursor-pointer rounded-lg text-md font-medium">
                Vedi ordine
              </button>
              {order.status === "unconfirmed" && (
                <button
                  onClick={() => {
                    setSelectedOrderId(order.id);
                    setShowCancelModal(true);
                  }}
                  className="p-2 bg-primary-dark-950 hover:bg-primary-dark-800 text-primary-50 transition-colors duration-200 cursor-pointer rounded-lg text-md font-medium"
                >
                  Annulla
                </button>
              )}
            </div> */}
          </div>

          {order.items.map((item, index) => (
            <div className="flex flex-col" key={item.id}>
              <div
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-5 px-10 py-8 font-light ${
                  index < order.items.length - 1
                    ? "border-b border-b-gray-200"
                    : ""
                }`}
              >
                <div className="h-40 relative aspect-2/3 row-span-3">
                  <Image
                    src={item.product.image.at(0)}
                    fill
                    alt={item.product.name}
                    className="object-cover rounded-md"
                  />
                </div>

                <h2 className="font-medium">{item.product.name}</h2>

                <div className="flex justify-end font-medium">
                  <span>{formatPrice(item.product.regularPrice)}</span>
                </div>

                <p className="col-span-2 text-gray-500">
                  {item.product.description}
                </p>

                <span className="text-sm self-end">
                  Quantità: {item.quantity}
                </span>

                <div className="flex gap-3 items-center text-sm text-primary-dark-100 hover:text-primary-900 self-end">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="hover:underline cursor-pointer transition-all duration-200"
                  >
                    Vedi prodotto
                  </Link>
                  <span className="text-gray-200">|</span>
                  <button className="hover:underline cursor-pointer transition-all duration-200">
                    Compra di nuovo
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}

      <div className="-mt-20">
        <Pagination
          limit={ORDERS_LIMIT}
          label="ordini"
          items={orders}
          totalItems={allOrders.length}
        ></Pagination>
      </div>
    </div>
  ) : (
    <p className="mt-8">Non hai ancora effettuato nessun ordine.</p>
  );
}

export default OrderList;
