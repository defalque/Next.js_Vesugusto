"use client";

import { SearchInputSkeleton } from "../../ui/skeleton/Skeletons";

// import { LazyMotion } from "motion/react";
// const loadFeatures = () =>
//   import("../../../_lib/features").then((res) => res.default);

import dynamic from "next/dynamic";
const SearchInput = dynamic(() => import("../../ui/SearchInput"), {
  ssr: false,
  loading: () => <SearchInputSkeleton height />,
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
      <SearchInput placeholder="Cerca ordine per numero..." type="number" />
    </section>
  );
}

export default OrderClients;
