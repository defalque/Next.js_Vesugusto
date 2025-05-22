import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import ProductListButtons from "./ProductsListButtons";
import { getFavorites } from "@/app/_lib/data-service";

async function ProductCard({ product }) {
  const session = await auth();

  let isFavorite;
  if (session?.user?.userId) {
    const favorites = await getFavorites(session?.user?.userId);
    isFavorite = favorites?.some((fav) => fav.id === product.id);
  }

  return (
    <div key={product.id} className="flex flex-col">
      <div className="relative h-120 w-full aspect-2/3 group mb-2">
        <Image
          src={product.image?.at(0)}
          fill
          alt={product.name}
          className={`object-cover rounded-lg transition duration-300 ease-in-out  ${
            product.image?.at(1)
              ? "group-hover:opacity-0"
              : "group-hover:opacity-85"
          }`}
        ></Image>
        {product.image?.at(1) ? (
          <Image
            src={product.image?.at(1)}
            alt={product.name}
            fill
            className="object-cover rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-85"
          />
        ) : null}
      </div>

      <ProductListButtons
        product={product}
        userId={session?.user?.userId}
        isFavorite={isFavorite || false}
      ></ProductListButtons>

      <div className="flex items-center">
        <span className="font-medium text-xl">
          {Number.isInteger(product.regularPrice)
            ? `${product.regularPrice},00`
            : product.regularPrice.toFixed(2).replace(".", ",")}{" "}
          &euro;
        </span>
        <Link
          href={`/products/${product.id}`}
          className="text-sm text-primary-950 ml-auto hover:text-primary-800"
        >
          Vai ai dettagli &rarr;
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
