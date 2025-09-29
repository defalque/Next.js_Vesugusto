import CheckoutWrapper from "@/app/_components/cart/checkout/CheckoutWrapper";
import Breadcrumbs from "@/app/_components/ui/Breadcrumbs";
import { CheckoutWrapperSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import { auth } from "@/auth";
import { Suspense } from "react";

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

export default async function Page() {
  const session = await auth();

  return (
    <div className="page-padding mx-auto mt-10 flex max-w-[95rem] flex-col gap-8">
      <Breadcrumbs breadcrumbs={breadcrumbs} />

      <Suspense fallback={<CheckoutWrapperSkeleton />}>
        <CheckoutWrapper
          userId={session.user.userId}
          cartId={session.user.cartId}
          name={session.user.name}
          email={session.user.email}
        />
      </Suspense>
    </div>
  );
}
