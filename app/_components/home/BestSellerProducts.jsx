import { getBestSellers } from "@/app/_lib/data-service";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import Link from "next/link";
import SafeImage from "../ui/SafeImage";

async function BestSellerProducts() {
  const bestSellers = await getBestSellers();

  return (
    <ul
      role="list"
      className="grid w-full grid-cols-2 gap-10 md:grid-cols-1 lg:grid-cols-2 xl:grid-cols-3"
    >
      {bestSellers.map((bestSeller, index) => (
        <li key={index} className="group relative list-none">
          <article
            className="flex flex-col gap-2"
            aria-label={`Vai alla pagina di ${bestSeller.product_name}`}
          >
            <div className="relative aspect-2/3 w-full overflow-hidden rounded-3xl">
              <SafeImage
                src={bestSeller.product_image.at(0)}
                alt={`Prodotto: ${bestSeller.product_name}`}
                fill
                sizes="(max-width: 48rem) 50vw, (max-width: 80rem) 33vw, 18.75rem"
                blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                priority={false}
                placeholder="blur"
                className="overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
              />
            </div>

            <div className="text-base font-semibold sm:text-lg">
              <h3>{bestSeller.product_name}</h3>
              <p>
                {formatCurrency(
                  bestSeller.product_regularprice - bestSeller.product_discount,
                )}
              </p>
            </div>
          </article>
          <Link
            href={`/shop/${bestSeller.product_id}`}
            className="absolute inset-0"
            aria-label={`Scopri ${bestSeller.product_name}`}
          />
        </li>
      ))}
    </ul>
  );
}

export default BestSellerProducts;
