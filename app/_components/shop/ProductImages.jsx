// "use client";
import SelectedImageContextProvider from "@/app/_contexts/SelectedImageContext";
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import IconButton from "./IconButton";
import MiniImageButton from "./MiniImageButton";
import ImageBox from "./ImageBox";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Navigation, Pagination } from "swiper/modules";

function ProductImages({ product }) {
  const images = product.image || [];
  const hasMultipleImages = images.length > 1;

  if (!images.length) return null; // Fallback se non ci sono immagini

  const sizes = "(min-width: 64rem) 33vw, (min-width: 40rem) 50vw, 100vw";

  // return (
  //   <section
  //     aria-label={`Immagini prodotto ${product.name}`}
  //     className="w-full"
  //   >
  //     <Swiper
  //       modules={[Navigation, Pagination]}
  //       spaceBetween={0}
  //       slidesPerView={1}
  //       navigation
  //       pagination={{ clickable: true }}
  //       className="rounded-lg"
  //     >
  //       {images.map((img, index) => (
  //         <SwiperSlide key={index}>
  //           <div className="relative aspect-[2/3] w-full overflow-hidden rounded-lg">
  //             <Image
  //               src={img}
  //               alt={`${product.name}: immagine ${index + 1}`}
  //               fill
  //               placeholder="blur"
  //               blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
  //               quality={80}
  //               priority={index === 0}
  //               sizes={sizes}
  //               className="object-cover dark:shadow-sm dark:brightness-80"
  //             />
  //           </div>
  //         </SwiperSlide>
  //       ))}
  //     </Swiper>
  //   </section>
  // );

  return (
    <section
      aria-label={`Immagini prodotto ${product.name}`}
      className="sticky top-17 flex items-start gap-x-5"
    >
      <SelectedImageContextProvider
        key={product.image.length}
        images={product.image}
      >
        {hasMultipleImages && (
          <div className="hidden flex-col items-center gap-4 lg:flex">
            {images.map((img, index) => (
              <MiniImageButton
                key={index + 1}
                index={index}
                name={product.name}
              >
                <Image
                  src={img}
                  alt={`Miniatura ${index + 1} di ${product.name}`}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                  quality={70}
                  sizes="4rem"
                  className="object-cover dark:shadow-sm dark:brightness-80"
                />
              </MiniImageButton>
            ))}
          </div>
        )}

        <div className="relative aspect-2/3 w-full overflow-hidden rounded-lg">
          {product.image.length === 0 && (
            <span>Nessuna immagine presente.</span>
          )}
          {product.image.length > 0 &&
            product.image.map((img, index) => (
              <ImageBox key={index + 1} index={index}>
                <Image
                  src={img}
                  alt={`${product.name}: immagine ${index + 1}`}
                  fill
                  placeholder="blur"
                  blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mP8L8VQDwAE0wGaYyyo1gAAAABJRU5ErkJggg=="
                  quality={80}
                  priority={index === 0 ? true : false}
                  sizes={sizes}
                  className="object-cover transition-opacity duration-500 dark:shadow-sm dark:brightness-80"
                />
              </ImageBox>
            ))}

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
