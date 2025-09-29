import Link from "next/link";
import Image from "next/image";

function ProductCardImages({ id, name, images, priority = false }) {
  const hasHoverImage = images.length > 1;

  const sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw";

  return (
    <Link
      href={`/shop/${id}`}
      aria-label={`Visita il prodotto ${name}`}
      className="focus-visible:ring-primary-950 order-1 rounded-3xl focus-visible:ring-4 focus-visible:outline-none sm:-mx-0"
    >
      <div role="presentation" className="group relative aspect-2/3 w-full">
        <Image
          src={images[0]}
          alt=""
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
          fill
          sizes={sizes}
          priority={priority}
          quality={70}
          className={`pointer-events-none rounded-3xl object-cover transition-opacity duration-700 ease-in-out dark:brightness-80 ${
            hasHoverImage
              ? "group-active::opacity-0 group-hover:opacity-0"
              : "group-active::opacity-85 group-hover:opacity-85"
          }`}
        />

        {hasHoverImage && (
          <Image
            src={images[1]}
            alt=""
            fill
            sizes={sizes}
            priority={priority}
            quality={70}
            className="pointer-events-none absolute top-0 left-0 rounded-3xl object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 group-active:opacity-100 dark:brightness-80"
          />
        )}
      </div>
    </Link>
  );
}

export default ProductCardImages;
