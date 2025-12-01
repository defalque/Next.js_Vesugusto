import { Suspense } from "react";

import Breadcrumbs from "@/app/_components/ui/Breadcrumbs";
import { CheckoutWrapperSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import CheckoutResolver from "@/app/_components/cart/checkout/CheckoutResolver";

export const metadata = {
  title: "Checkout",
  description: "Completa il tuo ordine pagando in modo sicuro con Stripe.",
};

const breadcrumbs = [
  { label: "Il mio carrello", href: "/cart" },
  {
    label: "Checkout",
    href: `/cart/checkout`,
    ariaLabel: "Finalizzazione dell'acquisto",
    active: true,
  },
];

export default async function Page({ searchParams }) {
  const checkoutParams = searchParams.then((sp) => ({
    canceled: sp.canceled,
  }));

  return (
    <div className="page-padding mx-auto mt-5 flex max-w-[95rem] flex-col gap-8 sm:mt-10">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Suspense fallback={<CheckoutWrapperSkeleton />}>
        <CheckoutResolver checkoutParams={checkoutParams} />
      </Suspense>
    </div>
  );
}
