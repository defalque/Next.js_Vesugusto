"use client";

import { useDotButton } from "@/app/_hooks/useDotButton";
import { DotButton } from "./DotButton";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";

const {
  usePrevNextButtons,
  PrevButton,
  NextButton,
} = require("@/app/_hooks/useCarouselButtons");

function NewArrivalsProductsCarousel({ children }) {
  const [emblaRef, emblaApi] = useEmblaCarousel({
    align: "start",
  });

  const { selectedIndex, scrollSnaps, onDotButtonClick } =
    useDotButton(emblaApi);

  const {
    prevBtnDisabled,
    nextBtnDisabled,
    onPrevButtonClick,
    onNextButtonClick,
  } = usePrevNextButtons(emblaApi);

  return (
    <div
      className="-mx-4 space-y-6 overflow-x-hidden px-4 sm:-mx-10 sm:px-10"
      ref={emblaRef}
    >
      {children}

      <div
        className="flex items-center justify-between"
        aria-label="Controlli carosello"
      >
        <div className="space-x-8" role="group" aria-label="Navigazione slide">
          <PrevButton
            className="group cursor-pointer rounded-full border border-black/50 p-2 transition-colors duration-500 hover:border-black disabled:cursor-not-allowed disabled:border-black/10 dark:border-white/30 dark:hover:border-white dark:disabled:border-white/10"
            onClick={onPrevButtonClick}
            disabled={prevBtnDisabled}
            aria-label="Slide precedente"
          >
            <ArrowLeftIcon
              aria-hidden
              className="size-5 transition-colors duration-500 group-disabled:text-black/10 dark:group-disabled:text-white/10"
            />
          </PrevButton>

          <NextButton
            className="group cursor-pointer rounded-full border border-black/50 p-2 transition-colors duration-500 hover:border-black disabled:cursor-not-allowed disabled:border-black/10 dark:border-white/30 dark:hover:border-white dark:disabled:border-white/10"
            onClick={onNextButtonClick}
            disabled={nextBtnDisabled}
            aria-label="Slide successiva"
          >
            <ArrowRightIcon
              aria-hidden
              className="size-5 transition-colors duration-500 group-disabled:text-black/10 dark:group-disabled:text-white/10"
            />
          </NextButton>
        </div>

        <div
          className="flex h-10 items-center gap-2 p-1.5"
          role="tablist"
          aria-label="Indicatori di scorrimento"
        >
          {scrollSnaps.map((_, index) => (
            <DotButton
              key={index}
              onClick={() => onDotButtonClick(index)}
              role="tab"
              aria-selected={selectedIndex === index}
              aria-label={`Vai alla slide ${index + 1}`}
              className={`size-3 cursor-pointer rounded-full border transition-colors duration-200 ${index === selectedIndex ? "border-black bg-black dark:border-white dark:bg-white" : "border-black/50 hover:border-black active:border-black disabled:border-black/10 dark:border-white/50 dark:hover:border-white dark:active:border-white"}`}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default NewArrivalsProductsCarousel;
