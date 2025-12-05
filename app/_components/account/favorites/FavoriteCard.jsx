import Link from "next/link";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import SafeImage from "../../ui/SafeImage";

export default function FavoriteCard({ favorite, children }) {
  return (
    <div className="relative flex flex-col gap-2 overflow-hidden">
      <div className="_flex-col order-2 flex flex-wrap justify-between gap-1 px-1 text-base text-gray-800 sm:text-base dark:text-gray-300">
        <span className="break-all">{favorite.name}</span>
        <span className="font-semibold">
          {formatCurrency(favorite.regularPrice - favorite.discount)}
        </span>
      </div>

      <span className="sr-only">
        {favorite.quantity === 0 &&
          "Questo prodotto non è disponibile: esaurito"}
        {favorite.quantity > 0 &&
          favorite.quantity <= 10 &&
          `Questo prodotto ha disponibilità limitata: solo ${favorite.quantity}`}
      </span>

      {children}
      <div className="p-1">
        <Link
          className="focus-style-img _focus:outline-4 order-1 block rounded-lg transition-opacity duration-200 hover:opacity-85"
          href={`/shop/${favorite.id}`}
          aria-label={`Vai alla pagina del prodotto ${favorite.name}`}
        >
          <div className="relative aspect-2/3 overflow-hidden rounded-lg shadow-sm">
            <SafeImage
              src={favorite.image}
              fill
              placeholder="blur"
              blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
              alt={favorite.name}
              sizes="(max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              className="object-cover dark:brightness-70"
            />
            {favorite.quantity === 0 && (
              <span
                className="absolute right-0 bottom-4 rounded-l-full bg-white px-3 py-0 text-base font-bold uppercase"
                aria-hidden="true"
              >
                Esaurito
              </span>
            )}

            {favorite.quantity > 0 && favorite.quantity <= 10 && (
              <span
                className="text-primary-dark-950 xs:py-1 absolute right-0 bottom-4 rounded-l-full bg-white px-3 py-0 text-base font-bold"
                aria-hidden="true"
              >
                Solo {favorite.quantity}!
              </span>
            )}
          </div>
        </Link>
      </div>
    </div>
  );
}
