"use client";

import { XMarkIcon, CheckIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import SelectCartQuantity from "./SelectCartQuantity";
import { useTransition } from "react";
import { formatPrice } from "@/app/_lib/formatPrice";

function CartProducts({ product, cartId, setIsLoading, onDelete }) {
  const [isPending, startTransition] = useTransition();

  function handleDelete() {
    startTransition(() => onDelete(cartId, product.id));
  }

  return (
    <div
      key={product.id}
      className="grid grid-cols-[auto_minmax(0,1fr)_auto_auto] gap-x-5 items-start py-6 border-t border-t-zinc-200 last:border-b last:border-b-zinc-200"
    >
      <div className="h-50 relative aspect-2/3">
        <Image
          src={product.image?.at(0)}
          fill
          alt={product.name}
          className="object-cover rounded-lg"
        />
      </div>

      <div className="flex flex-col h-full gap-2">
        <h1 className="text-lg text-zinc-500">{product.name}</h1>
        <span className="text-md font-semibold">
          {formatPrice(product.regularPrice)}
        </span>
        <p className="text-sm font-light mt-auto text-zinc-500">
          {product.details}
        </p>
        {product.productQuantity > 0 ? (
          <span className="flex items-start gap-1 text-sm font-light mt-auto mb-0.5">
            <CheckIcon
              className={`size-5 ${
                product.productQuantity > 10
                  ? "text-lime-500 font-bold"
                  : "text-yellow-500 font-medium"
              }`}
            />
            {product.productQuantity > 10 && "Disponibile"}
            {product.productQuantity > 0 &&
              product.productQuantity <= 10 &&
              `Disponibilità limitata: solo ${product.productQuantity} rimasti.`}
          </span>
        ) : (
          <span className="flex items-start gap-1 text-sm font-light mt-auto mb-0.5">
            <XMarkIcon className={`size-5 text-red-600`} />
            Esaurito
          </span>
        )}
      </div>

      <SelectCartQuantity
        cartId={cartId}
        cartQuantity={product.cartQuantity}
        product={product}
        setIsLoading={setIsLoading}
      />

      <button
        className="ml-auto cursor-pointer focus:outline-none focus:ring-1 focus:ring-primary-950"
        onClick={handleDelete}
      >
        <XMarkIcon className="size-5 hover:fill-zinc-500 transition-colors duration-200"></XMarkIcon>
      </button>
    </div>
  );
}

export default CartProducts;
