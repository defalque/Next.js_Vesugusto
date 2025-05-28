import { auth } from "@/auth";
import Image from "next/image";
import Link from "next/link";
import ProductListButtons from "./ProductsListButtons";
import { getCartProducts, getFavorites } from "@/app/_lib/data-service";
import { formatPrice } from "@/app/_lib/formatPrice";

async function ProductCard({ product }) {
  const session = await auth();

  let isFavorite, isCart;
  if (session?.user?.userId) {
    const favorites = await getFavorites(session?.user?.userId);
    const cartProducts = await getCartProducts(session?.user?.cartId);
    isFavorite = favorites?.some((fav) => fav.id === product.id);
    isCart = cartProducts?.some((prod) => prod.id === product.id);
  }

  return (
    <div key={product.id} className="flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="relative h-130 w-full aspect-2/3 group mb-2">
          <Image
            src={product.image?.at(0)}
            fill
            objectFit="cover"
            quality={70}
            alt={product.name}
            className={` rounded-lg transition duration-300 ease-in-out  ${
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
              objectFit="cover"
              quality={70}
              className="rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100"
            />
          ) : null}
        </div>
      </Link>

      <ProductListButtons
        product={product}
        userId={session?.user?.userId}
        cartId={session?.user?.cartId}
        isFavorite={isFavorite || false}
        isCart={isCart || false}
      ></ProductListButtons>

      <div className="flex items-center">
        <span className="font-normal text-2xl">
          {formatPrice(product.regularPrice)}
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
