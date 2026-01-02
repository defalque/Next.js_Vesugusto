import Link from "next/link";
import Image from "next/image";

function ProductCardImages({ id, name, images, priority = false, view }) {
  const hasHoverImage = images.length > 1;

  const sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw";

  return (
    <Link
      href={`/shop/${id}`}
      aria-label={`Visita il prodotto ${name}`}
      className="focus-visible:ring-primary-dark-200 dark:focus-visible:ring-primary-dark-100 order-1 rounded-lg focus-visible:ring-4 focus-visible:outline-none sm:-mx-0"
    >
      <div
        role="presentation"
        className={`group relative aspect-2/3 w-full overflow-hidden ${view === "grid" ? "w-full" : "w-42"}`}
        style={{ borderRadius: 8 }}
      >
        <Image
          src={images[0] || "/fallback.png"}
          alt=""
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
          fill
          sizes={sizes}
          fetchPriority={priority ? "high" : "low"}
          loading={priority ? "eager" : "lazy"}
          quality={50}
          className={`pointer-events-none object-cover transition-opacity duration-300 ease-in-out dark:brightness-80 ${
            hasHoverImage
              ? "group-active::opacity-0 group-hover:opacity-0"
              : "group-active::opacity-85 group-hover:opacity-85"
          }`}
        />

        {hasHoverImage && (
          <Image
            src={images[1] || "/fallback.png"}
            alt=""
            fill
            sizes={sizes}
            fetchPriority={priority ? "high" : "low"}
            loading={priority ? "eager" : "lazy"}
            quality={50}
            style={{ borderRadius: 8 }}
            className="pointer-events-none absolute top-0 left-0 object-cover opacity-0 transition-opacity duration-700 ease-in-out group-hover:opacity-100 group-active:opacity-100 dark:brightness-80"
          />
        )}
      </div>
    </Link>
  );
}

export default ProductCardImages;
