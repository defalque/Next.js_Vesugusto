"use client";

import { shimmer } from "../../ui/skeleton/Skeletons";

import { LazyMotion } from "motion/react";
const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

import dynamic from "next/dynamic";
import SearchOrder from "../../ui/SearchInput";
const Search = dynamic(() => import("../../ui/Search"), {
  ssr: false,
  loading: () => (
    <div
      className={`${shimmer} relative h-12 w-50 animate-pulse self-stretch overflow-hidden rounded-xl bg-gray-200 dark:bg-zinc-700`}
    />
  ),
});

function OrderClients() {
  return (
    <section className="relative flex w-full justify-end gap-5">
      {/* <LazyMotion features={loadFeatures}>
        <Search
          placeholder="Cerca ordine per numero"
          buttonId="orderOpen"
          placeholderId="orderSearch"
          height="12"
          full
          numberInput
        />
      </LazyMotion> */}
      <SearchOrder placeholder="Cerca ordine per numero..." type="number" />
    </section>
  );
}

export default OrderClients;
