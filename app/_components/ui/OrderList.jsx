// "use client";
import { formatDate } from "@/app/_lib/formatDate";
import { formatPrice } from "@/app/_lib/formatPrice";
import {
  CheckCircleIcon,
  ExclamationCircleIcon,
} from "@heroicons/react/24/solid";
import Image from "next/image";
import Link from "next/link";
// import { useState } from "react";

function OrderList({ orders }) {
  // const [showCancelModal, setShowCancelModal] = useState(false);
  // const [selectedOrderId, setSelectedOrderId] = useState(null);

  return (
    <div className="flex flex-col gap-20 mt-10 px-20 relative">
      {/* {showCancelModal && (
        <div className="absolute inset-0 top-0 left-0 h-screen w-full flex flex-col items-center justify-center z-50 bg-transparent backdrop-blur-sm">
          <div className="bg-primary-50 py-10 px-20 flex flex-col items-center rounded-2xl border border-gray-200 shadow-md">
            <h2 className="text-2xl font-medium mb-4">
              Sei sicuro di voler annullare l'ordine?
            </h2>
            <div className="flex items-center gap-3">
              <button
                onClick={() => {
                  // qui puoi annullare l'ordine selectedOrderId
                  setShowCancelModal(false);
                }}
                className="cursor-pointer bg-primary-50 text-primary-dark-900 px-4 py-2 rounded-md border border-gray-300 hover:bg-gray-50 transition-colors duration-200"
              >
                Conferma
              </button>
              <button
                onClick={() => setShowCancelModal(false)}
                className="cursor-pointer bg-primary-950 text-primary-50 px-4 py-2 rounded-md hover:bg-primary-800 transition-colors duration-200"
              >
                Annulla
              </button>
            </div>
          </div>
        </div>
      )} */}

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
    </div>
  );
}

export default OrderList;
