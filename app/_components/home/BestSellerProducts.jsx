"use cache";

import { getBestSellers } from "@/app/_lib/data-service";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import Link from "next/link";
import SafeImage from "../ui/SafeImage";
import { cacheLife } from "next/cache";

async function BestSellerProducts() {
  cacheLife("weeks");
  const bestSellers = await getBestSellers();

  return (
    <ul
      role="list"
      className="grid w-full grid-cols-2 gap-5 md:grid-cols-1 md:gap-6 lg:grid-cols-2 xl:grid-cols-3"
    >
      {bestSellers.map((bestSeller, index) => (
        <li key={index} className="group relative list-none">
          <article className="flex flex-col gap-2 p-0.5 sm:p-1">
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-3xl">
              <SafeImage
                src={bestSeller.product_image.at(0)}
                alt=""
                role="presentation"
                fill
                sizes="(max-width: 48rem) 50vw, (max-width: 80rem) 33vw, 18.75rem"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                priority={false}
                placeholder="blur"
                className="overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
              />
            </div>
            <div className="px-2 text-base font-semibold sm:px-1 sm:text-lg">
              <h3>{bestSeller.product_name}</h3>
              <p>
                {formatCurrency(
                  bestSeller.product_regularprice - bestSeller.product_discount,
                )}
              </p>
            </div>
            <Link
              href={`/shop/${bestSeller.product_id}`}
              className="custom-focus absolute inset-0 rounded-3xl"
              aria-label={`Vai alla pagina del prodotto ${bestSeller.product_name}`}
            />
          </article>
        </li>
      ))}
    </ul>
  );
}

export default BestSellerProducts;
