import { ORDERS_LIMIT } from "@/app/_lib/constants";

import {
  getPaginatedUserOrders,
  getUserOrdersCount,
} from "@/app/_lib/data-service";

import OrdersList from "./OrdersList";
import Pagination from "../../ui/Pagination";

async function OrdersResolver({ filterParams }) {
  const params = await filterParams;

  const filters = {
    query: params?.query || "",
    page: Number(params?.page) || 1,
  };
  const filtersKey = `${filters.query}-${filters.page}`;

  const [count, orders] = await Promise.all([
    getUserOrdersCount(filters),
    getPaginatedUserOrders(ORDERS_LIMIT, filters),
  ]);

  const totalPages = Math.ceil(count / ORDERS_LIMIT);
  const isPageOutOfBounds = Number(filters.page) > totalPages;

  return (
    <>
      <OrdersList count={count} orders={orders} />

      {!isPageOutOfBounds && (
        <Pagination count={count ?? 0} limit={ORDERS_LIMIT} />
      )}
    </>
  );
}

export default OrdersResolver;
