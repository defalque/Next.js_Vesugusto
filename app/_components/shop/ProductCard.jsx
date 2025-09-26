import Link from "next/link";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import ProductCardImages from "./ProductCardImages";

function ProductCard({ product, priority, children }) {
  return (
    <article key={product.id} className="flex flex-col gap-2">
      <ProductCardImages
        id={product.id}
        name={product.name}
        images={product.image}
        priority={priority}
      />

      <div className="px-2 sm:px-1">
        <div className="flex items-center">
          <h1 className="text-base font-semibold sm:text-base">
            {product.name}
          </h1>

          {children}
        </div>

        <div className="flex items-center">
          <p className="text-base font-semibold sm:text-lg">
            {formatCurrency(product.regularPrice)}
          </p>

          {/* <Link
            href={`/shop/${product.id}`}
            className="custom-control-focus text-primary-dark-200 ml-auto hidden rounded px-0.5 text-base font-semibold sm:block sm:text-sm 2xl:text-sm"
          >
            Vedi dettagli
          </Link> */}
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
