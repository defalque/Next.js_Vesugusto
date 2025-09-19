"use client";

import dynamic from "next/dynamic";
import { AddressInfoSkeleton } from "../../ui/skeleton/Skeletons";

const CheckoutForm = dynamic(() => import("./CheckoutForm"), {
  ssr: false,
  loading: () => <AddressInfoSkeleton />,
});

function CheckoutFormWrapper({ via, comune, cap, numeroCivico }) {
  return (
    <CheckoutForm
      via={via}
      comune={comune}
      cap={cap}
      numeroCivico={numeroCivico}
    />
  );
}

export default CheckoutFormWrapper;
