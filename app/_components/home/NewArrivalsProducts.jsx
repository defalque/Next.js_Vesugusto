import { getNewArrivals } from "@/app/_lib/data-service";
import NewArrivalsProductsCarousel from "./NewArrivalsProductsCarousel";
import SafeImage from "../ui/SafeImage";
import Link from "next/link";
import { formatCurrency } from "@/app/_lib/formatCurrency";
import Image from "next/image";

async function NewArrivalsProducts() {
  const newArrivals = await getNewArrivals();

  return (
    <NewArrivalsProductsCarousel>
      <ul
        role="list"
        aria-label="Lista dei nuovi arrivi"
        className="flex justify-around gap-x-5 md:gap-x-7 lg:gap-x-10"
      >
        {newArrivals.map((newArrival) => (
          <li
            key={newArrival.id}
            className="group relative flex-shrink-0 basis-1/2 list-none md:basis-1/3 xl:basis-1/4"
          >
            <article
              className="flex flex-col justify-between gap-2"
              aria-label={`Vai alla pagina di ${newArrival.name}`}
            >
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-3xl">
                <Image
                  src={newArrival.image.at(0)}
                  alt={`Prodotto: ${newArrival.name}`}
                  fill
                  sizes="(max-width: 47.9375rem) 50vw, (max-width: 79.9375rem) 33vw, 25vw"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                  priority={false}
                  placeholder="blur"
                  className="overflow-hidden object-cover transition-transform duration-300 group-hover:scale-110 group-active:scale-110"
                />
              </div>

              <div className="text-base font-semibold sm:text-lg">
                <h3>{newArrival.name}</h3>
                <p>
                  {formatCurrency(
                    newArrival.regularPrice - newArrival.discount,
                  )}
                </p>
              </div>
            </article>
            <Link
              href={`/shop/${newArrival.id}`}
              className="absolute inset-0"
              aria-label={`Scopri ${newArrival.name}`}
            />
          </li>
        ))}
      </ul>
    </NewArrivalsProductsCarousel>
  );
}

export default NewArrivalsProducts;
