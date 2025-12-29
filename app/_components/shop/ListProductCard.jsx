"use client";

import * as m from "motion/react-m";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import ProductCardImages from "./ProductCardImages";

function ListProductCard({ product, priority, children }) {
  return (
    <article>
      <div className="grid grid-cols-[10.5rem_1fr] gap-2">
        <div className="order-2 flex grow justify-between px-2 sm:px-1">
          <div className="flex flex-col gap-4">
            <m.h1
              layout="position"
              layoutId={`product-card-name-${product.id}`}
              className="text-base font-medium sm:text-base"
            >
              {product.name}
            </m.h1>
            <m.p
              initial={{ opacity: 0, x: "100%" }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, transition: { duration: 0 } }}
              transition={{ duration: 0.5 }}
              className="text-xs sm:text-sm"
            >
              {product.description}
            </m.p>
            <m.p
              layout="position"
              layoutId={`product-card-price-${product.id}`}
              className="text-base font-semibold sm:text-lg"
            >
              {formatCurrency(product.regularPrice)}
            </m.p>
          </div>

          <div>{children}</div>
        </div>

        <ProductCardImages
          id={product.id}
          name={product.name}
          images={product.image}
          priority={priority}
          view="list"
        />
        {/* <m.div
          layout
          layoutId={`product-card-image-${product.id}`}
          role="presentation"
          className="group relative aspect-2/3 w-42 overflow-hidden bg-zinc-800"
          style={{ borderRadius: 8 }}
        ></m.div> */}
      </div>
    </article>
  );
}

export default ListProductCard;
