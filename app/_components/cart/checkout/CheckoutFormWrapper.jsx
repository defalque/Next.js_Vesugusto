"use client";

import dynamic from "next/dynamic";
import { AddressInfoSkeleton } from "../../ui/skeleton/Skeletons";
import { FormButtonsContextProvider } from "@/app/_contexts/FormButtonsContext";

const CheckoutForm = dynamic(() => import("./CheckoutForm"), {
  ssr: false,
  loading: () => <AddressInfoSkeleton />,
});

function CheckoutFormWrapper({
  address,
  city,
  zipCode,
  houseNumber,
  phoneNumber,
}) {
  return (
    <FormButtonsContextProvider>
      <CheckoutForm
        address={address}
        city={city}
        zipCode={zipCode}
        houseNumber={houseNumber}
        phoneNumber={phoneNumber}
      />
    </FormButtonsContextProvider>
  );
}

export default CheckoutFormWrapper;
