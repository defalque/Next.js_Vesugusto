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
        <li key={index} className="relative list-none rounded-3xl">
          <div className="overflow-hidden rounded-3xl border border-white/10">
            <article className="group relative z-10 flex aspect-2/3 w-full flex-col justify-end gap-2 rounded-3xl">
              <div className="absolute inset-0 z-0">
                <div className="relative h-full w-full">
                  <SafeImage
                    src={bestSeller.product_image?.at(0) || null}
                    alt=""
                    role="presentation"
                    fill
                    sizes="(max-width: 48rem) 50vw, (max-width: 80rem) 33vw, 18.75rem"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                    priority={false}
                    placeholder="blur"
                    className="object-cover"
                    style={{ borderRadius: "1.5rem" }}
                  />
                </div>
              </div>
              <div className="absolute top-0 left-0 z-10 h-full w-full bg-linear-to-b from-transparent via-transparent to-black"></div>

              <div className="relative z-10 w-full px-3.5 py-2.5 text-base font-semibold text-white sm:px-4.5 sm:text-lg">
                <h3>{bestSeller.product_name}</h3>
                <p>
                  {formatCurrency(
                    bestSeller.product_regularprice -
                      bestSeller.product_discount,
                  )}
                </p>
              </div>
            </article>
            <Link
              href={`/shop/${bestSeller.product_id}`}
              className="custom-focus absolute inset-0 z-100 rounded-3xl"
              aria-label={`Vai alla pagina del prodotto ${bestSeller.product_name}`}
            />
          </div>
        </li>
      ))}
    </ul>
  );
}

export default BestSellerProducts;
