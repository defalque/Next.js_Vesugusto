import * as m from "motion/react-m";

import FavoriteCard from "./FavoriteCard";
import FavoriteCardActionButtons from "./FavoriteCardActionButtons";
import FavoriteListMotionWrapper from "./FavoriteListMotionWrapper";
import Link from "next/link";
import { HeartCrack } from "lucide-react";

function FavoritesList({ favorites }) {
  if (!Array.isArray(favorites)) {
    return (
      <p role="alert" className="text-red-600">
        Errore: dati prodotti non validi.
      </p>
    );
  }

  if (favorites.length === 0) {
    return (
      <div className="mt-10 flex flex-col items-center">
        <HeartCrack className="size-10 text-black/65 dark:text-white/85" />
        <p
          role="status"
          aria-live="polite"
          className="mt-2 mb-8 text-black/65 dark:text-white/85"
        >
          Non hai nessun prodotto tra i preferiti.
        </p>
        <Link
          href="/shop"
          className="cursor-pointer rounded-full bg-black px-4 py-2 font-medium text-white shadow-sm transition duration-200 text-shadow-2xs hover:bg-black/80 active:scale-90 motion-reduce:transition-none dark:bg-white dark:text-black dark:hover:bg-white/85"
        >
          Visita i nostri prodotti
        </Link>
      </div>
    );
  }

  return (
    <FavoriteListMotionWrapper>
      <div
        key="list"
        role="list"
        aria-label="Lista dei prodotti preferiti"
        className="grid grid-cols-2 gap-x-10 gap-y-20 sm:gap-x-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {favorites.map((favorite) => (
          <m.div layout key={favorite.id} role="listitem">
            <FavoriteCard favorite={favorite.productId}>
              <FavoriteCardActionButtons
                productId={favorite.productId.id}
                productQuantity={favorite.productId.quantity}
              />
            </FavoriteCard>
          </m.div>
        ))}
      </div>
    </FavoriteListMotionWrapper>
  );
}

export default FavoritesList;
