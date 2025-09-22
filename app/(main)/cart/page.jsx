import { Suspense } from "react";
import { CartProductsListSkeleton } from "../../_components/ui/skeleton/Skeletons";
import CartWrapper from "../../_components/cart/CartWrapper";

export const metadata = {
  title: "Carrello",
  description:
    "Visualizza e gestisci i prodotti aggiunti al tuo carrello. Procedi al checkout o modifica le quantità per ogni articolo.",
};

export default function Page() {
  return (
    <div className="my-5 flex min-h-screen flex-col gap-8 px-4 xl:px-20">
      <h1 className="xs:text-4xl col-span-full text-3xl font-semibold tracking-wide sm:font-medium lg:text-5xl">
        Il mio carrello
      </h1>

      <Suspense fallback={<CartProductsListSkeleton />}>
        <CartWrapper />
      </Suspense>
    </div>
  );
}
