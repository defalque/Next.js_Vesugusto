import { Suspense } from "react";
import Spinner from "@/app/_components/ui/Spinner";
import Favorites from "@/app/_components/ui/Favorites";

export const metadata = {
  title: "I tuoi preferiti",
};

export default function Page() {
  return (
    <div className="flex flex-col gap-8">
      <div className=" flex flex-col gap-5 pb-4 border-b border-b-gray-200 dark:border-b-dark-200 mb-5">
        <h1 className="text-2xl md:text-5xl font-medium tracking-wide">
          Prodotti preferiti
        </h1>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          Qui puoi trovare e rivedere rapidamente tutti i prodotti che hai
          aggiunto alla tua lista dei preferiti e inserirli subito nel carrello.
        </h2>
      </div>

      <Suspense fallback={<Spinner label="Caricamento preferiti..."></Spinner>}>
        <Favorites></Favorites>
      </Suspense>
    </div>
  );
}
