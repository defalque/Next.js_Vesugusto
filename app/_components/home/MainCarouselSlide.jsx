import { playfair } from "@/app/_lib/font";
import Image from "next/image";
import Link from "next/link";

function MainCarouselSlide({ src, alt, heroHeading, heroSubHeading, link }) {
  return (
    <div className="relative shrink-0 grow-0 basis-full">
      <Image src={src} alt={alt} fill className="object-cover brightness-70" />
      <div className={`absolute inset-0 flex justify-start px-5 sm:px-10`}>
        <div className="flex h-full flex-col items-start justify-end gap-3 py-20">
          <h2
            className={`max-w-xl text-4xl font-bold tracking-tight text-white text-shadow-lg sm:text-6xl ${playfair.className}`}
          >
            {heroHeading}
          </h2>
          <p className="max-w-xl text-lg/6 text-white text-shadow-lg sm:text-xl">
            {heroSubHeading}
          </p>
          <Link
            href={link}
            className="mt-4 rounded-full bg-white px-5 py-3 text-base font-bold text-black sm:text-lg"
          >
            Scopri ora
          </Link>
        </div>
      </div>
    </div>
  );
}

export default MainCarouselSlide;
