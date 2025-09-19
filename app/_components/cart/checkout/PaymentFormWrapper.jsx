"use client";

import dynamic from "next/dynamic";
import { PaymentFormLoader } from "../../ui/skeleton/Skeletons";

const PaymentForm = dynamic(() => import("./PaymentForm"), {
  ssr: false,
  loading: () => <PaymentFormLoader />,
});

function PaymentFormWrapper({ amount, userId, cartId, name, email, disabled }) {
  return (
    <PaymentForm
      amount={amount}
      userId={userId}
      cartId={cartId}
      name={name}
      email={email}
      disabled={disabled}
    />
  );
}

export default PaymentFormWrapper;
