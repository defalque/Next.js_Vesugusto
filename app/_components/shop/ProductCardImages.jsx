import Link from "next/link";
import Image from "next/image";

function ProductCardImages({ id, name, images, priority = false }) {
  const hasHoverImage = images.length > 1;

  const sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw";

  return (
    <Link href={`/shop/${id}`} className="focus rounded-lg focus:outline-4">
      <div className="group relative aspect-2/3 w-full">
        <Image
          src={images[0]}
          alt={name}
          placeholder="blur"
          blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
          fill
          sizes={sizes}
          priority={priority}
          quality={70}
          className={`rounded-lg object-cover transition duration-300 ease-in-out dark:brightness-80 ${
            hasHoverImage ? "group-hover:opacity-0" : "group-hover:opacity-85"
          }`}
        />

        {hasHoverImage && (
          <Image
            src={images[1]}
            alt={name}
            fill
            sizes={sizes}
            priority={priority}
            quality={70}
            className="absolute top-0 left-0 rounded-lg object-cover opacity-0 transition-opacity duration-300 ease-in-out hover:opacity-100 dark:brightness-80"
          />
        )}
      </div>
    </Link>
  );
}

export default ProductCardImages;
