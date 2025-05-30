import { LIMIT } from "@/app/_lib/constants";
import Pagination from "./Pagination";
import ProductCard from "./ProductCard";

function ProductsList({ products, totalProducts }) {
  return (
    <div>
      <div className="grid grid-cols-3 gap-y-30 gap-x-14 transition-all duration-3000 ease-in-out">
        {products?.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>

      <Pagination
        limit={LIMIT}
        label="prodotti"
        items={products}
        totalItems={totalProducts}
      ></Pagination>
    </div>
  );
}

export default ProductsList;
