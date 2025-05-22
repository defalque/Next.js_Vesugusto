"use client";

import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import TrashButton from "@/app/_components/ui/TrashButton";

export default function FavoriteCard({ product, userId }) {
  const [isRemoving, setIsRemoving] = useState(false);

  const handleDelete = async () => {
    setIsRemoving(true);

    setTimeout(() => {}, 300);
  };

  return (
    <div
      className={`transition-all duration-500 ease-in-out ${
        isRemoving ? "animate-scaleOut" : "animate-scaleIn"
      }`}
    >
      <div className="flex flex-col gap-3">
        <Link href={`/products/${product.id}`} className="mb-1">
          <div className="flex flex-col gap-3">
            <div className="relative h-100 aspect-2/3 group">
              <Image
                src={product.image?.at(0)}
                fill
                alt={product.name}
                className="object-cover rounded-lg"
              />
              <TrashButton
                userId={userId}
                productId={product.id}
                onDelete={handleDelete}
              />
            </div>

            <div className="flex items-center">
              <h1 className="text-md text-zinc-500 font-normal">
                {product.name}
              </h1>
              <span className="font-medium ml-auto">
                {Number.isInteger(product.regularPrice)
                  ? `${product.regularPrice},00`
                  : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
                &euro;
              </span>
            </div>
          </div>
        </Link>

        <button className="py-2 uppercase bg-primary-950 hover:bg-primary-800 text-primary-100 font-bold cursor-pointer transition-colors duration-300">
          Sposta nel carrello
        </button>
      </div>
    </div>
  );
}
