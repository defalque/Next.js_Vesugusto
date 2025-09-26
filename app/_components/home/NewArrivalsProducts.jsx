import { getNewArrivals } from "@/app/_lib/data-service";
import NewArrivalsProductsCarousel from "./NewArrivalsProductsCarousel";
import SafeImage from "../ui/SafeImage";
import Link from "next/link";
import { formatCurrency } from "@/app/_lib/formatCurrency";
// import Image from "next/image";

async function NewArrivalsProducts() {
  const newArrivals = await getNewArrivals();

  return (
    <NewArrivalsProductsCarousel length={newArrivals.length}>
      <ul
        role="list"
        aria-label="Lista dei nuovi arrivi"
        className="flex justify-around gap-x-6 py-2 md:gap-x-7 lg:gap-x-10"
      >
        {newArrivals.map((newArrival, index) => (
          <li
            role="listitem"
            key={newArrival.id}
            aria-labelledby={`item-name-${index}`}
            aria-roledescription="slide"
            className="group relative flex-shrink-0 basis-1/2 list-none md:basis-1/3 xl:basis-1/4"
          >
            <article
              className="flex flex-col justify-between gap-2 p-0.5 sm:p-1"
              aria-label={`Vai alla pagina di ${newArrival.name}`}
            >
              <div className="relative aspect-2/3 w-full overflow-hidden rounded-3xl">
                <SafeImage
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

              <div className="px-2 text-base font-semibold sm:px-1 sm:text-lg">
                <h4 id={`item-name-${index}`}>{newArrival.name}</h4>
                <p>
                  {formatCurrency(
                    newArrival.regularPrice - newArrival.discount,
                  )}
                </p>
              </div>
            </article>
            <Link
              href={`/shop/${newArrival.id}`}
              className="custom-focus absolute inset-0 rounded-3xl"
              aria-label={`Scopri ${newArrival.name}`}
            />
          </li>
        ))}
      </ul>
    </NewArrivalsProductsCarousel>
  );
}

export default NewArrivalsProducts;
