"use client";

import * as m from "motion/react-m";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import ProductCardImages from "./ProductCardImages";

function GridProductCard({ product, priority, children }) {
  return (
    <article>
      <div className="flex flex-col gap-2">
        <div className="order-2 flex justify-between px-2 sm:px-1">
          <div className="flex flex-col">
            <m.h1
              layout="position"
              layoutId={`product-card-name-${product.id}`}
              className="text-base font-medium sm:text-base"
            >
              {product.name}
            </m.h1>
            <p className="sr-only">{product.description}</p>
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

        {/* <m.div
          layout
          layoutId={`product-card-image-${product.id}`}
          role="presentation"
          className="group relative aspect-2/3 w-full overflow-hidden bg-zinc-800"
          style={{ borderRadius: 8 }}
        ></m.div> */}

        <ProductCardImages
          id={product.id}
          name={product.name}
          images={product.image}
          priority={priority}
          view="grid"
        />
      </div>
    </article>
  );
}

export default GridProductCard;
