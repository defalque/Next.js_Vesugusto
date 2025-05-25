"use client";

import {
  addCartItem,
  addFavorite,
  deleteCartItem,
  deleteFavorite,
} from "@/app/_lib/actions";
import { HeartIcon } from "@heroicons/react/24/outline";
import { ShoppingBagIcon } from "@heroicons/react/24/solid";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import SpinnerMini from "./SpinnerMiniColored";
import SpinnerSuperMini from "./SpinnerSuperMini";

function ProductButtons({ product, userId, cartId, isFavorite, isCart }) {
  const [isClicked, setIsClicked] = useState(isFavorite);
  const [isCartClicked, setIsCartClicked] = useState(isCart);
  const [isLoading, setIsLoading] = useState(false);

  const handleFavoriteClick = async () => {
    if (userId) {
      if (!isFavorite) {
        setIsClicked(!isClicked);
        await addFavorite(userId, product.id);
      } else {
        setIsClicked(!isClicked);
        await deleteFavorite(userId, product.id);
      }
    } else {
      toast(
        "Accedi o registrati per aggiungere questo prodotto tra i preferiti",
        {
          icon: "❤️",
        }
      );
    }
  };

  const handleCartClick = async () => {
    if (userId) {
      if (!isCart) {
        setIsCartClicked(!isCart);
        setIsLoading(true);
        const success = await addCartItem(cartId, product.id, 1);
        setIsLoading(false);
        if (success) {
          // setCartItems((prevItems) => {
          //   const existing = prevItems.find((item) => item.id === product.id);
          //   if (!existing) {
          //     return [...prevItems, { id: product.id }];
          //   }
          //   return prevItems;
          // });
        }
      } else {
        setIsCartClicked(!isCartClicked);
        setIsLoading(true);
        const success = await deleteCartItem(cartId, product.id);
        setIsLoading(false);
        if (success) {
          // setCartItems((prevItems) =>
          //   prevItems.filter((item) => item.id !== product.id)
          // );
        }
      }
    } else {
      toast("Accedi o registrati per aggiungere questo prodotto al carrello", {
        icon: "🛒",
      });
    }
  };

  return (
    <div className="flex items-center mb-1 py-0.5">
      <h1 className="text-md text-zinc-500 font-normal">{product.name}</h1>

      <button
        className="ml-auto px-0.5 py-0.5 outline-primary-950"
        onClick={handleCartClick}
      >
        {isLoading ? (
          <SpinnerSuperMini></SpinnerSuperMini>
        ) : (
          <ShoppingBagIcon
            className={`ml-auto mr-2 size-5.5 cursor-pointer fill-primary-50 stroke-primary-950 hover:fill-primary-950 hover:stroke-primary-950 transition-colors duration-200 ${
              isCartClicked ? "fill-primary-950" : ""
            }`}
          ></ShoppingBagIcon>
        )}
      </button>

      <button
        onClick={handleFavoriteClick}
        className="px-0.5 py-0.5 outline-primary-950"
      >
        <HeartIcon
          className={`size-5.5 cursor-pointer hover:text-primary-dark-900 transition-colors duration-200 ${
            isClicked
              ? "fill-primary-dark-900 text-primary-dark-900"
              : "text-zinc-500 hover:fill-primary-dark-900"
          }`}
        ></HeartIcon>
      </button>
      <Toaster toastOptions={{}}></Toaster>
    </div>
  );
}

export default ProductButtons;
