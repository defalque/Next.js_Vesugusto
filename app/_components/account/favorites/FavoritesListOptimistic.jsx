"use client";

import { LazyMotion, AnimatePresence } from "motion/react";
import * as m from "motion/react-m";

// Make sure to return the specific export containing the feature bundle.
const loadFeatures = () =>
  import("../../../_lib/features.js").then((res) => res.default);

import { useOptimistic, useTransition } from "react";
import {
  addFavoriteToCartAndDeleteFavorite,
  deleteFavorite,
} from "@/app/_lib/actions";
import FavoriteCard from "./FavoriteCard";
import DeleteCartItem from "../../cart/DeleteCartItem";
import Button from "../../ui/Button";

function FavoritesListOptimistic({ favorites, userId, cartId }) {
  const [optimisticFavorites, optimisticDelete] = useOptimistic(
    favorites,
    (curFavorites, favoriteId) => {
      return curFavorites.filter((favorite) => favorite.id !== favoriteId);
    },
  );

  const [isPending, startTransition] = useTransition();

  if (!Array.isArray(optimisticFavorites)) {
    return <span>Errore: dati prodotti non validi.</span>;
  }

  if (optimisticFavorites.length === 0) {
    return <span>Non hai nessun prodotto tra i preferiti.</span>;
  }

  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence mode="wait">
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
          <AnimatePresence>
            {optimisticFavorites.map((favorite) => (
              <m.div
                role="listitem"
                key={favorite.id}
                layout
                exit={{ scale: 0.95, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <FavoriteCard
                  favorite={favorite.productId}
                  deleteFavoriteSlot={
                    <DeleteCartItem
                      className="bg-primary-50/60 dark:text-primary-dark-950 focus absolute top-1 right-1 w-max cursor-pointer rounded-full px-1 py-1 font-bold transition-colors duration-200 hover:bg-gray-50 disabled:animate-pulse disabled:cursor-not-allowed"
                      handleDeleteCartItem={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        startTransition(async () => {
                          try {
                            optimisticDelete(favorite.id);
                            await deleteFavorite(userId, favorite.productId.id);
                          } catch (err) {
                            const toast = (await import("react-hot-toast"))
                              .default;
                            toast.error(err.message);
                          }
                        });
                      }}
                      disabled={isPending}
                    />
                  }
                  addFavoriteToCartSlot={
                    <Button
                      className="truncate rounded px-2 py-1 text-xs font-semibold uppercase"
                      onClick={() =>
                        startTransition(async () => {
                          try {
                            optimisticDelete(favorite.id);
                            await addFavoriteToCartAndDeleteFavorite(
                              userId,
                              cartId,
                              favorite.productId.id,
                            );
                          } catch (err) {
                            const toast = (await import("react-hot-toast"))
                              .default;
                            toast.error(err.message);
                          }
                        })
                      }
                      aria-label="Aggiungi al carrello"
                      disabled={favorite.quantity === 0 || isPending}
                    >
                      <span className="hidden sm:inline">
                        Sposta nel carrello
                      </span>
                      <span className="inline sm:hidden">Aggiungi</span>
                    </Button>
                  }
                />
              </m.div>
            ))}
          </AnimatePresence>
        </m.div>
      </AnimatePresence>
    </LazyMotion>
  );
}

export default FavoritesListOptimistic;
