"use client";

import { formatCurrency } from "@/app/_lib/formatCurrency";
import Image from "next/image";
import ProductAvailability from "./ProductAvailability";
import Link from "next/link";

function CartProductCard({ product, children }) {
  return (
    <article className="xs:gap-x-5 xs:grid-rows-[auto_auto_1fr_auto] grid grid-cols-[auto_minmax(0,1fr)_auto_auto] grid-rows-[auto_auto_auto_auto_auto] items-start gap-x-3.5 gap-y-1 py-5 sm:gap-x-4">
      <Link
        href={`/shop/${product.id}`}
        aria-label={`Visita la pagina del prodotto ${product.name}`}
        className="xs:h-50 focus relative row-span-full aspect-2/3 h-full rounded-md transition-opacity duration-200 hover:opacity-85 focus:outline-4"
      >
        <Image
          src={product.image}
          fill
          sizes="(min-width: 64rem) 8.33rem, (min-width: 40rem) 6.67rem, 5.33rem"
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
          alt={product.description}
          className="dark:shadow-dark-100 rounded-lg object-cover dark:shadow-sm"
        />
      </Link>

      <h1 className="self-baseline text-lg text-zinc-500 dark:text-gray-300">
        {product.name}
      </h1>

      <span className="text-md col-start-2 row-start-2 self-center font-semibold">
        {formatCurrency(product.regularPrice - product.discount)}
      </span>

      <p className="xs:block col-start-2 row-start-3 mt-1 hidden text-xs font-light text-zinc-500 sm:text-sm dark:text-gray-300">
        {product.details}
      </p>

      <ProductAvailability quantity={product.quantity} />

      {children}
    </article>
  );
}

export default CartProductCard;
