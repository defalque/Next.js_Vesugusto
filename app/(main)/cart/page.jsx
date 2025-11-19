import { Suspense } from "react";
import { CartProductsListSkeleton } from "../../_components/ui/skeleton/Skeletons";
import CartWrapper from "../../_components/cart/CartWrapper";
import { notoSerif } from "@/app/_lib/font";

export const metadata = {
  title: "Carrello",
  description:
    "Visualizza e gestisci i prodotti aggiunti al tuo carrello. Procedi al checkout o modifica le quantità per ogni articolo.",
};

export default function Page() {
  return (
    <div className="page-padding mx-auto mt-10 flex min-h-fit max-w-[95rem] flex-col gap-8 overflow-clip">
      <h1
        className={`${notoSerif.className} xs:text-4xl my-3 text-3xl font-semibold tracking-wide sm:font-medium lg:text-5xl`}
      >
        Il mio carrello
      </h1>

      <Suspense fallback={<CartProductsListSkeleton />}>
        <CartWrapper />
      </Suspense>
    </div>
  );
}
