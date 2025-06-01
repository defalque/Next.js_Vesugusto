import Recipes from "@/app/_components/ui/Recipes";
import Spinner from "@/app/_components/ui/Spinner";
import { Suspense } from "react";

export const metadata = {
  title: "Le tue ricette",
};

export default function Page() {
  return (
    <div>
      <div className=" flex flex-col gap-5 pb-4 border-b border-b-gray-200 dark:border-b-dark-200">
        <h1 className="text-2xl md:text-5xl font-medium tracking-wide">
          Ricette salvate
        </h1>
        <h2 className="text-gray-500 dark:text-gray-300 text-sm md:text-base">
          Qui trovi tutte le ricette create nella sezione "creIAmo" e che hai
          deciso di conservare per ispirarti in cucina quando vuoi. Puoi
          rileggere le tue ricette preferite, scaricarle o condividerle con chi
          vuoi, direttamente da qui. La tua personale raccolta di sapori è
          sempre a portata di click!
        </h2>
      </div>

      <Suspense fallback={<Spinner label="Caricamento ricette..."></Spinner>}>
        <Recipes></Recipes>
      </Suspense>
    </div>
  );
}
