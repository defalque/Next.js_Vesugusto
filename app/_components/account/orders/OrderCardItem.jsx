import { formatCurrency } from "@/app/_lib/formatCurrency";
import SafeImage from "../../ui/SafeImage";
import Link from "next/link";

function OrderCardItem({ item }) {
  const { productId, quantity } = item;
  const { name, image, regularPrice, discount, description, id } = productId;

  return (
    <div
      className={`grid grid-cols-[auto_1fr] grid-rows-[auto_auto_auto_auto] gap-x-3 px-3 py-4 font-light sm:grid-cols-[auto_minmax(0,1fr)_auto] sm:grid-rows-[auto_auto_auto_auto] sm:gap-x-5 md:px-5 lg:grid-rows-[auto_auto_auto] lg:py-8 xl:px-10`}
    >
      <div className="relative row-span-full aspect-2/3 h-50 sm:h-55">
        <SafeImage
          src={image?.at(0)}
          fill
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
          alt={name}
          sizes="(min-width: 64rem) 12rem, (min-width: 40rem) 10rem, 8rem"
          className="rounded-md object-cover dark:brightness-80"
        />
      </div>

      <span className="row-start-1 text-base font-semibold">{name}</span>

      <div className="row-start-2 font-semibold sm:row-start-1 sm:justify-self-end">
        <span>{formatCurrency(regularPrice - discount)}</span>
      </div>

      <p className="col-span-2 mt-2 hidden text-black/65 sm:row-start-2 sm:mt-0 sm:inline sm:text-xs/snug lg:line-clamp-none lg:text-sm dark:text-white/85">
        {description}
      </p>

      <span className="col-span-2 col-start-2 row-start-3 text-sm sm:self-end">
        Quantità: <span className="text-base font-semibold">{quantity}</span>
      </span>

      <div className="text-primary-dark-200 dark:text-primary-dark-100 col-start-2 row-start-4 flex flex-wrap items-center gap-3 self-end text-sm font-semibold md:text-sm lg:col-start-3 lg:row-start-3">
        <Link
          href={`/shop/${id}`}
          className="hover:text-primary-950 active:text-primary-950 dark:hover:text-primary-900 dark:active:text-primary-900 focus-style cursor-pointer rounded whitespace-nowrap transition-all duration-200"
        >
          Vedi prodotto
        </Link>
        <button
          type="button"
          className="hover:text-primary-950 active:text-primary-950 dark:hover:text-primary-900 dark:active:text-primary-900 focus-style cursor-pointer rounded whitespace-nowrap transition-all duration-200"
        >
          Compra di nuovo
        </button>
      </div>
    </div>
  );
}

export default OrderCardItem;
