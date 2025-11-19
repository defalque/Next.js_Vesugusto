import { formatCurrency } from "@/app/_lib/formatCurrency";
import ProductCardImages from "./ProductCardImages";

function ProductCard({ product, priority, children }) {
  return (
    <article key={product.id}>
      <div className="flex flex-col gap-2">
        <div className="order-2 flex justify-between px-2 sm:px-1">
          <div className="flex flex-col">
            <h1 className="text-base font-semibold sm:text-base">
              {product.name}
            </h1>
            <p className="sr-only">{product.description}</p>
            <p className="text-base font-semibold sm:text-lg">
              {formatCurrency(product.regularPrice)}
            </p>
          </div>

          <div>{children}</div>
        </div>

        <ProductCardImages
          id={product.id}
          name={product.name}
          images={product.image}
          priority={priority}
        />
      </div>
    </article>
  );
}

export default ProductCard;
