import MainCarousel from "@/app/_components/home/MainCarousel";
import MainCarouselSlide from "@/app/_components/home/MainCarouselSlide";

import slide1 from "../../../public/hero.jpg";
import slide2 from "../../../public/s.jpg";
import slide3 from "../../../public/drinkslide.jpg";
import BestSellerProducts from "@/app/_components/home/BestSellerProducts";
import Link from "next/link";
import { playfair } from "@/app/_lib/font";
import { Suspense } from "react";
import { BestSellerProductsSkeleton } from "@/app/_components/ui/skeleton/Skeletons";
import NewArrivalsProducts from "@/app/_components/home/NewArrivalsProducts";
import { ArrowRightIcon } from "@heroicons/react/24/outline";

export const metadata = {
  title: "Home",
  description:
    "Benvenuto su Vesugusto: vivi un viaggio tra sapori unici, prodotti tipici vesuviani e nuove selezioni da non perdere.",
};

const slides = [
  {
    src: slide1,
    alt: "Slide 1",
    heroHeading: "Ogni stagione ha il suo sapore",
    heroSubHeading:
      "Esplora le novità stagionali dei nostri prodotti prima che finiscano!",
    link: "/shop",
  },
  {
    src: slide2,
    alt: "Slide 2",
    heroHeading: "Porta a tavola l’anima vesuviana",
    heroSubHeading:
      "Un viaggio gastronomico caratterizzato da sapori intensi, tradizionali e sorprendenti.",
    link: "/shop?page=1&category=food",
  },
  {
    src: slide3,
    alt: "Slide 3",
    heroHeading: "Dal cratere al calice",
    heroSubHeading:
      "Esplora la nostra selezione di drink unici e territoriali, un'autenticità da sorseggiare.",
    link: "/shop?page=1&category=drink",
  },
];

export default function Page() {
  return (
    <>
      <MainCarousel>
        {slides.map((slide, index) => (
          <MainCarouselSlide
            key={index}
            src={slide.src}
            alt={slide.alt}
            heroHeading={slide.heroHeading}
            heroSubHeading={slide.heroSubHeading}
            link={slide.link}
            priority={index === 0}
            index={index}
            totalSlides={slides.length}
          />
        ))}
      </MainCarousel>

      <section
        role="region"
        aria-labelledby="most-loved"
        className="flex w-full flex-col gap-x-10 gap-y-13 px-4 py-20 sm:px-10 md:flex-row"
      >
        <div className="h-max space-y-10 md:sticky md:top-30">
          <div className="space-y-3">
            <h2
              id="most-loved"
              className={`text-4xl font-semibold sm:text-5xl ${playfair.className}`}
            >
              I più amati
            </h2>
            <p className="text-base/6 text-black/65 sm:text-lg dark:text-white/85">
              I prodotti scelti ogni giorno da centinaia di nostri clienti.
              Scopri cosa rende questi sapori così speciali.
            </p>
          </div>
          <Link
            href="/shop"
            className="mt-4 rounded-full bg-black px-5 py-3 text-base font-bold text-white transition-colors duration-200 hover:bg-black/80 active:bg-black/80 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-white/80 dark:active:bg-white/80"
          >
            Vedi di più
          </Link>
        </div>

        <Suspense fallback={<BestSellerProductsSkeleton />}>
          <BestSellerProducts />
        </Suspense>
      </section>

      <section
        role="region"
        aria-labelledby="new-arrivals"
        className="flex w-full flex-col gap-x-10 gap-y-6 px-4 pt-10 pb-20 sm:px-10"
      >
        <div className="flex h-max w-full flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="space-y-3">
            <h2
              id="new-arrivals"
              className={`text-4xl font-semibold sm:text-5xl ${playfair.className}`}
            >
              Nuovi arrivi
            </h2>
            <p className="text-base/6 text-black/65 sm:text-lg dark:text-white/85">
              Scopri i nuovi prodotti ispirati alla tradizione vesuviana.
              Ingredienti genuini, storie autentiche, gusto inconfondibile.
            </p>
          </div>

          <Link
            href="/shop"
            className="rounded-full text-base font-bold transition-colors duration-200 sm:text-lg"
          >
            Vedi tutti
          </Link>
        </div>

        <Suspense fallback={<div className="spinner" />}>
          <NewArrivalsProducts />
        </Suspense>
      </section>

      <section
        role="region"
        aria-labelledby="newsletter-signup"
        className="from-primary-dark-400 dark:from-primary-dark-400/60 to-primary-dark-800 dark:to-primary-dark-800/60 flex w-full flex-col items-center gap-x-15 gap-y-6 bg-linear-to-bl px-4 py-10 sm:px-10 sm:py-15 md:py-20 lg:flex-row"
      >
        <div className="flex h-max w-full flex-wrap items-end justify-between gap-x-10 gap-y-5">
          <div className="space-y-3">
            <h2
              id="newsletter-signup"
              className={`from-primary-50 to-primary-400 bg-linear-to-tr bg-clip-text p-0.5 text-2xl font-bold text-transparent text-shadow-2xs sm:text-4xl ${playfair.className}`}
            >
              Iscriviti e resta aggiornato
            </h2>
            <p
              id="newsletter-description"
              className="bg-primary-200/90 bg-clip-text text-sm/6 text-transparent sm:text-base"
            >
              Unisciti alla nostra newsletter per ricevere tutte le ultime
              novità, sconti e offerte.
            </p>
          </div>
        </div>

        <form className="relative w-full">
          <label htmlFor="newsletter" className="sr-only">
            Inserisci la tua email
          </label>
          <input
            type="email"
            id="newsletter-email"
            name="email"
            required
            aria-required="true"
            aria-describedby="newsletter-description"
            className="focus relative block w-full rounded-xl bg-white/80 px-5 py-3.5 pr-10 text-base shadow-xs backdrop-blur-xs transition-colors duration-200 placeholder:text-zinc-500 sm:text-lg dark:bg-black/30 dark:placeholder:text-zinc-300/90"
            placeholder="Inserisci la tua email"
          />
          <button
            aria-label="Iscriviti ora"
            type="submit"
            className="absolute top-1/2 right-3 -translate-y-1/2 cursor-pointer rounded-full bg-black p-2 text-base font-bold text-white transition-colors duration-200 hover:bg-black/80 sm:text-lg dark:bg-white dark:text-black dark:hover:bg-white/80 dark:active:bg-white/80"
          >
            <ArrowRightIcon aria-hidden className="size-5" />
          </button>
        </form>
      </section>
    </>
  );
}
