import * as m from "motion/react-m";

import FavoriteCard from "./FavoriteCard";
import FavoriteCardActionButtons from "./FavoriteCardActionButtons";
import FavoriteListMotionWrapper from "./FavoriteListMotionWrapper";
import { XMarkIcon } from "@heroicons/react/24/outline";

function FavoritesList({ favorites, userId, cartId }) {
  if (!Array.isArray(favorites)) {
    return <span>Errore: dati prodotti non validi.</span>;
  }

  if (favorites.length === 0) {
    return <span>Non hai nessun prodotto tra i preferiti.</span>;
  }

  return (
    <FavoriteListMotionWrapper>
      <m.div
        key="list"
        role="list"
        aria-label="Lista dei prodotti preferiti"
        initial={{ scale: 0.9, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="grid grid-cols-2 gap-x-10 gap-y-20 sm:gap-x-20 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {favorites.map((favorite) => (
          <m.div
            role="listitem"
            key={favorite.id}
            layout
            exit={{ scale: 0.95, opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <FavoriteCard favorite={favorite.productId}>
              <FavoriteCardActionButtons
                userId={userId}
                cartId={cartId}
                productId={favorite.productId.id}
                productQuantity={favorite.productId.quantity}
              >
                <XMarkIcon
                  aria-hidden="true"
                  className="size-5 transition-colors duration-200 hover:fill-zinc-500"
                />
              </FavoriteCardActionButtons>
            </FavoriteCard>
          </m.div>
        ))}
      </m.div>
    </FavoriteListMotionWrapper>
  );
}

export default FavoritesList;
