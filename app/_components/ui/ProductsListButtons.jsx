"use client";

import { addFavorite, deleteFavorite } from "@/app/_lib/actions";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

function ProductButtons({ product, userId, isFavorite }) {
  const [isClicked, setIsClicked] = useState(isFavorite);

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

  return (
    <div className="flex items-center mb-1">
      <h1 className="text-md text-zinc-500 font-normal">{product.name}</h1>
      <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950"></PlusIcon>
      <button
        onClick={handleFavoriteClick}
        className="px-0.5 py-0.5 outline-primary-950"
      >
        <HeartIcon
          className={`size-5.5 cursor-pointer hover:text-primary-dark-900 transition-colors ${
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
