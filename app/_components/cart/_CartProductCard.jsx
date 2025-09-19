"use client";

import { formatCurrency } from "@/app/_lib/formatCurrency";
import Image from "next/image";
import ProductAvailability from "./ProductAvailability";

function CartProductCard({ product, children }) {
  return (
    <article className="xs:gap-x-5 grid grid-cols-[auto_minmax(0,1fr)_auto_auto] items-start gap-x-4 py-5">
      <div className="relative aspect-2/3 h-40 sm:h-50">
        <Image
          src={product.image}
          fill
          sizes="(min-width: 40rem) 8.33rem, 6.67rem"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
          alt={product.name}
          className="dark:shadow-dark-100 rounded-lg object-cover dark:shadow-sm"
        />
      </div>

      <div className="flex h-full flex-col gap-2">
        <h1 className="text-lg text-zinc-500 dark:text-gray-300">
          {product.name}
        </h1>

        <span className="text-md font-semibold">
          {formatCurrency(product.regularPrice - product.discount)}
        </span>

        <p className="xs:block mt-1 hidden text-xs font-light text-zinc-500 lg:text-sm dark:text-gray-300">
          {product.details}
        </p>

        <ProductAvailability quantity={product.quantity} />
      </div>

      {children}
    </article>
  );
}

export default CartProductCard;
