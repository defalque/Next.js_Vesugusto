import SelectedImageContextProvider from "@/app/_contexts/SelectedImageContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import IconButton from "./IconButton";
import MiniImageButton from "./MiniImageButton";
import ImageBox from "./ImageBox";
import SelectedImagePolite from "./SelectedImagePolite";

function ProductImages({ product }) {
  const images = product.image || [];
  const hasMultipleImages = images.length > 1;

  if (!images.length) return null; // Fallback se non ci sono immagini

  const sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw";

  return (
    <section
      aria-label={`Immagini del prodotto ${product.name}`}
      className="sticky top-17 flex items-start gap-x-5"
    >
      <SelectedImageContextProvider
        key={product.image.length}
        images={product.image}
      >
        {hasMultipleImages && (
          <div
            role="listbox"
            aria-label="Azioni immagini"
            className="hidden flex-col items-center gap-4 lg:flex"
          >
            {images.map((img, index) => (
              <MiniImageButton
                key={index + 1}
                index={index}
                name={product.name}
              >
                <Image
                  role="presentation"
                  src={img}
                  alt=""
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                  sizes="4rem"
                  className="object-cover dark:shadow-sm dark:brightness-80"
                />
              </MiniImageButton>
            ))}
          </div>
        )}

        <div
          aria-label="Descrizione e azioni immagini del prodotto"
          className="relative aspect-2/3 w-full overflow-hidden rounded-lg"
        >
          {product.image.length === 0 ? (
            <p>Nessuna immagine presente.</p>
          ) : (
            <>
              <SelectedImagePolite />
              {product.image.map((img, index) => (
                <ImageBox key={index + 1} index={index}>
                  <Image
                    src={img}
                    //sarebbe da aggiungere un campo altText nel database
                    alt={`${product.name}: immagine ${index + 1}`}
                    fill
                    placeholder="blur"
                    blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                    priority={index === 0}
                    sizes={sizes}
                    className="object-cover transition-opacity duration-500 dark:shadow-sm dark:brightness-80"
                  />
                </ImageBox>
              ))}
            </>
          )}

          {hasMultipleImages && (
            <div className="absolute top-1/2 right-0 left-0 z-10 flex -translate-y-1/2 justify-between px-2">
              <IconButton
                title="Immagine precedente"
                length={product.image.length}
              >
                <ChevronLeftIcon
                  aria-hidden="true"
                  className="text-primary-50 size-8 cursor-pointer"
                />
              </IconButton>

              <IconButton
                title="Prossima immagine"
                length={product.image.length}
              >
                <ChevronRightIcon
                  aria-hidden="true"
                  className="text-primary-50 size-8 cursor-pointer"
                />
              </IconButton>
            </div>
          )}
        </div>
      </SelectedImageContextProvider>
    </section>
  );
}

export default ProductImages;
