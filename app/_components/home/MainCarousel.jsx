"use client";

import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplayProgress } from "@/app/_hooks/useAutoPlayProgress";
import { useAutoplay } from "@/app/_hooks/useAutoPlay";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

import slide1 from "../../../public/hero.jpg";
import slide2 from "../../../public/s.jpg";
import slide3 from "../../../public/drinkslide.jpg";

import { SelectedSnapDisplay, useSelectedSnapDisplay } from "./SnapCount";
import { DotButton, useDotButton } from "./DotButton";
import MainCarouselSlide from "./MainCarouselSlide";

const slides = [
  {
    src: slide1,
    alt: "Slide 1",
    heroHeading: "Ogni stagione ha il suo sapore",
    heroSubHeading:
      "Esplora le novità stagionali dei nostri prodotti, prima che finiscano!",
    link: "/shop",
  },
  {
    src: slide2,
    alt: "Slide 2",
    heroHeading: "Porta a tavola l’anima vesuviana",
    heroSubHeading:
      "Un viaggio gastronomico caratterizzato da sapori intensi, tradizionali e sorprendenti.",
    link: "/shop",
  },
  {
    src: slide3,
    alt: "Slide 3",
    heroHeading: "Dal cratere al calice",
    heroSubHeading:
      "Esplora la nostra selezione di drink unici e territoriali, un'autenticità da sorseggiare.",
    link: "/shop",
  },
];

function MainCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    Autoplay({ delay: 4000 }),
  ]);
  const progressNode = useRef(null);

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);
  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(emblaApi);
  const { showAutoplayProgress } = useAutoplayProgress(emblaApi, progressNode);
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <div className="relative min-h-120 overflow-hidden" ref={emblaRef}>
      <div className="relative flex min-h-160">
        {slides.map((slide, index) => (
          <MainCarouselSlide
            key={index}
            src={slide.src}
            alt={slide.alt}
            heroHeading={slide.heroHeading}
            heroSubHeading={slide.heroSubHeading}
            link={slide.link}
          />
        ))}
      </div>

      <div className="absolute bottom-3 left-5 flex h-10 items-center gap-2 p-1.5 sm:left-10">
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            className={`size-3 cursor-pointer rounded-full border ${index === selectedIndex ? "border-white bg-white" : "border-white/50"}`}
          />
        ))}
      </div>

      <div className="absolute right-3 bottom-3 flex items-center gap-3">
        <div
          className={`pointer-events-none relative z-20 h-1 w-20 overflow-hidden rounded-full bg-white/50 transition-opacity duration-200 ${
            showAutoplayProgress ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
        >
          <div
            ref={progressNode}
            className="absolute top-0 left-0 h-full w-full origin-left bg-white"
          />
        </div>

        <SelectedSnapDisplay
          selectedSnap={selectedSnap}
          snapCount={snapCount}
        />

        <button
          className="_active:border-white cursor-pointer rounded-xl border border-white/50 p-1.5 backdrop-blur-xs transition-colors duration-200 hover:border-white"
          onClick={toggleAutoplay}
          type="button"
        >
          {autoplayIsPlaying ? (
            <PauseIcon className="size-5 text-white" />
          ) : (
            <PlayIcon className="size-5 text-white" />
          )}
        </button>
      </div>
    </div>
  );
}

export default MainCarousel;
