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
    const [favorites, cartProducts] = await Promise.all([
      getFavorites(session?.user?.userId),
      getCartProducts(session?.user?.cartId),
    ]);

    isFavorite = favorites?.some((fav) => fav.id === product.id);
    isCart = cartProducts?.some((prod) => prod.id === product.id);
  }

  return (
    <div key={product.id} className="flex flex-col">
      <Link href={`/products/${product.id}`}>
        <div className="relative w-full aspect-2/3 group mb-2">
          <Image
            src={product.image?.at(0)}
            fill
            quality={70}
            alt={product.name}
            className={`object-cover rounded-lg transition duration-300 ease-in-out dark:brightness-80  ${
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
              quality={70}
              className="object-cover rounded-lg absolute top-0 left-0 opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 dark:brightness-80"
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
        <span className="font-medium text-base lg:text-xl">
          {formatPrice(product.regularPrice)}
        </span>
        <Link
          href={`/products/${product.id}`}
          className="hidden xs:block text-xs lg:text-sm text-primary-950 ml-auto hover:text-primary-800"
        >
          Vai ai dettagli &rarr;
        </Link>
        <Link
          href={`/products/${product.id}`}
          className="text-xs lg:text-sm text-primary-950 ml-auto hover:text-primary-800 xs:hidden"
        >
          Vedi &rarr;
        </Link>
      </div>
    </div>
  );
}

export default ProductCard;
