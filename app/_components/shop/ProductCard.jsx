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

      <div>
        <div className="mb-0 flex items-center py-0.5 sm:mb-1">
          <h1 className="text-md font-normal text-gray-700 dark:text-gray-300">
            {product.name}
          </h1>

          {children}
        </div>

        <div className="flex items-center">
          <span className="text-lg font-medium sm:text-base lg:text-xl">
            {formatCurrency(product.regularPrice)}
          </span>

          <Link
            href={`/shop/${product.id}`}
            className="text-primary-950 hover:text-primary-800 focus ml-auto hidden rounded px-0.5 text-base sm:block sm:text-xs md:text-sm"
          >
            {/* <span className="block sm:hidden">Vedi </span> */}
            <span className="">Vai ai dettagli</span>
          </Link>
        </div>
      </div>
    </article>
  );
}

export default ProductCard;
