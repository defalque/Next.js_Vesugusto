import Image from "next/image";
import Link from "next/link";
import { formatCurrency } from "@/app/_lib/formatCurrency";

export default function FavoriteCard({ favorite, children }) {
  return (
    <div className="relative flex flex-col gap-2">
      <Link
        className="focus rounded-lg transition-opacity duration-200 hover:opacity-85 focus:outline-4"
        href={`/shop/${favorite.id}`}
      >
        <div className="relative aspect-2/3 overflow-hidden rounded-lg shadow-sm">
          <Image
            src={favorite.image}
            fill
            placeholder="blur"
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
            alt={favorite.name}
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
            className="object-cover dark:brightness-70"
          />
          {/* {deleteFavoriteSlot} */}

          {favorite.quantity === 0 && (
            <span className="text-primary-dark-950 xs:py-1 absolute right-0 bottom-4 rounded-l-full bg-white px-3 py-0 text-sm font-bold uppercase sm:text-base">
              Esaurito
            </span>
          )}

          {favorite.quantity > 0 && favorite.quantity <= 10 && (
            <span className="text-primary-dark-950 xs:py-1 absolute right-0 bottom-4 rounded-l-full bg-white px-3 py-0 text-sm font-bold">
              Solo {favorite.quantity}!
            </span>
          )}
        </div>
      </Link>

      <div className="flex flex-col gap-1 text-sm text-gray-800 sm:text-base dark:text-gray-300">
        <span>{favorite.name}</span>
        <span className="font-semibold">
          {formatCurrency(favorite.regularPrice - favorite.discount)}
        </span>
      </div>

      {/* {addFavoriteToCartSlot} */}
      {children}
    </div>
  );
}
