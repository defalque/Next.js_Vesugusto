import { Suspense } from "react";
import AccountHeading from "@/app/_components/account/AccountHeading";
import FavoritesWrapper from "@/app/_components/account/favorites/FavoritesWrapper";
import { FavoritesListSkeleton } from "@/app/_components/ui/skeleton/Skeletons";

export const metadata = {
  title: "I miei preferiti",
  description: "Visualizza e gestisci la tua lista dei prodotti preferiti.",
};

export default function Page() {
  return (
    <div className="mb-10 flex flex-col gap-8">
      <AccountHeading
        accessibleLabel="favorites-heading"
        title="Prodotti preferiti"
        text="Qui puoi trovare e rivedere rapidamente tutti i prodotti che hai
          aggiunto alla tua lista dei preferiti e inserirli subito nel carrello."
      />

      <Suspense fallback={<FavoritesListSkeleton />}>
        <FavoritesWrapper />
      </Suspense>
    </div>
  );
}
