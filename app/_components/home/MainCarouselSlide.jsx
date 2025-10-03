import { notoSerif } from "@/app/_lib/font";
import Image from "next/image";
import Link from "next/link";

function MainCarouselSlide({
  src,
  alt,
  heroHeading,
  heroSubHeading,
  link,
  priority,
  index,
}) {
  return (
    <div
      className="translate-3d-none _h-full relative w-full min-w-0 shrink-0 grow-0 basis-full"
      id={`carousel-slide-${index}`}
    >
      <div
        className={`page-padding absolute inset-0 z-1000 flex justify-start`}
      >
        <div className="flex h-full flex-col items-start justify-end gap-3 py-20">
          <h2
            className={`max-w-xl text-4xl font-semibold tracking-tight text-white text-shadow-lg sm:text-6xl ${notoSerif.className}`}
          >
            {heroHeading}
          </h2>
          <p className="max-w-xl text-lg/6 font-medium text-white text-shadow-lg sm:text-xl">
            {heroSubHeading}
          </p>
          <Link
            href={link}
            className="custom-focus mt-4 rounded-full bg-white px-5 py-3 text-base font-bold text-black transition-colors duration-200 hover:bg-white/80 active:bg-white/80 sm:text-lg"
          >
            Scopri ora
          </Link>
        </div>
      </div>
      <Image
        src={src}
        alt={alt}
        fill
        priority={priority}
        // placeholder="blur"
        className="object-cover brightness-70"
        sizes="(max-width: 48rem) 100vw, (max-width: 75rem) 50vw, 33vw"
      />
    </div>
  );
}

export default MainCarouselSlide;
