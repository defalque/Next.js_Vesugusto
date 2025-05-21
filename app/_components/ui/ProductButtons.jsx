"use client";

import { addFavorite } from "@/app/_lib/actions";
import { HeartIcon, PlusIcon } from "@heroicons/react/24/outline";

function ProductButtons({ product, userId }) {
  const handleFavoriteClick = async () => {
    const succes = await addFavorite(userId, product.id);
    if (succes) console.log("SUCCESS");
  };

  return (
    <div className="flex items-center mb-1">
      <h1 className="text-md text-zinc-500 font-normal">{product.name}</h1>
      <PlusIcon className="ml-auto mr-2 size-5.5 cursor-pointer text-zinc-500 hover:text-primary-dark-950"></PlusIcon>
      <button
        onClick={handleFavoriteClick}
        className="px-0.5 py-0.5 outline-primary-950"
      >
        <HeartIcon className="size-5.5 cursor-pointer text-zinc-500 hover:fill-primary-dark-900 hover:text-primary-dark-900 transition-colors"></HeartIcon>
      </button>
    </div>
  );
}

export default ProductButtons;
