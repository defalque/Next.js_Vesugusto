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
    <div className="flex flex-col gap-20 mt-10 px-5 xl:px-20 relative">
      {orders.map((order) => (
        <div
          key={order.id}
          className="flex flex-col border border-gray-200 dark:border-dark-200 rounded-2xl overflow-hidden shadow-sm"
        >
          <div className="flex items-center gap-x-3 sm:gap-x-7 xl:gap-x-15 text-[10px] sm:text-xs lg:text-sm px-4 xl:px-10 py-4 border-b border-b-gray-200 bg-gray-50 dark:border-dark-200 dark:bg-dark-300">
            <div className="flex flex-row sm:flex-col gap-1">
              <h2 className="font-medium hidden sm:flex">Numero ordine</h2>
              <h2 className="flex sm:hidden">N.</h2>
              <span className="text-gray-500 dark:text-gray-300">
                #{order.id}
              </span>
            </div>

            <div className=" flex flex-row sm:flex-col gap-1">
              <h2 className="font-medium hidden sm:flex">Data dell'ordine</h2>
              <h2 className="font-medium hidden xs:flex sm:hidden">Data:</h2>
              <span className="text-gray-500 dark:text-gray-300">
                {formatDate(order.orderDate)}
              </span>
            </div>

            <div className=" flex flex-row sm:flex-col gap-1">
              <h2 className="font-medium hidden sm:flex">Totale ordine</h2>
              <h2 className="font-medium hidden xs:flex sm:hidden">Tot.</h2>
              <span className="text-primary-dark-900 dark:text-gray-300 font-medium self-center">
                {formatPrice(order.total)}
              </span>
            </div>

            {order.status === "delivered" && (
              <div className="flex items-center gap-2 ml-auto">
                <CheckCircleIcon className="size-6 fill-green-600"></CheckCircleIcon>
                <span className="hidden md:flex">Consegnato</span>
              </div>
            )}
            {order.status === "unconfirmed" && (
              <div className="flex items-center gap-2 ml-auto text-md font-light">
                <ExclamationCircleIcon className="size-6 fill-yellow-400"></ExclamationCircleIcon>
                <span className="hidden md:flex">In preparazione</span>
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
                className={`grid grid-cols-[auto_minmax(0,1fr)_auto] gap-x-5 gap-y-2 xs:gap-y-3 lg:gap-y-0 px-3 md:px-5 xl:px-10 py-4 lg:py-8 font-light ${
                  index < order.items.length - 1
                    ? "border-b border-b-gray-200 dark:border-b-dark-200"
                    : ""
                }`}
              >
                <div className="h-40 relative aspect-2/3 row-span-3">
                  <Image
                    src={item.product.image.at(0)}
                    fill
                    alt={item.product.name}
                    className="object-cover rounded-md dark:brightness-80"
                  />
                </div>

                <h2 className="font-medium col-span-2 xxs:col-span-1 text-xs xs:text-base">
                  {item.product.name}
                </h2>

                <div className="flex justify-start xs:justify-end font-medium text-xs xs:text-sm lg:text-base">
                  <span>{formatPrice(item.product.regularPrice)}</span>
                </div>

                <p className="col-span-2 text-[10px] md:text-sm lg:text-base text-gray-500 dark:text-gray-300">
                  <span className="hidden xs:flex">
                    {item.product.description}
                  </span>
                  <span className="block xs:hidden">
                    {item.product.description.split(" ").length > 25
                      ? item.product.description
                          .split(" ")
                          .slice(0, 25)
                          .join(" ") + "..."
                      : item.product.description}
                  </span>
                </p>

                <span className="text-xs col-span-2 lg:col-span-1 lg:text-sm self-end">
                  Quantità: {item.quantity}
                </span>

                <div className="flex gap-3 col-span-full col-start-1 mt-2 lg:mt-0 lg:col-span-1 lg:col-start-3 items-center text-xs lg:text-sm text-primary-dark-100 dark:text-primary-800 hover:text-primary-900 self-end">
                  <Link
                    href={`/products/${item.product.id}`}
                    className="hover:underline cursor-pointer transition-all duration-200"
                  >
                    Vedi prodotto
                  </Link>
                  <span className="text-gray-200 dark:text-gray-800">|</span>
                  <button className="hover:underline cursor-pointer transition-all duration-200 dark:text-primary-800 ">
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
