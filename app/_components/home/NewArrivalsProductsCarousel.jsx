"use client";

import { useDotButton } from "@/app/_hooks/useDotButton";
import useEmblaCarousel from "embla-carousel-react";
import { ArrowLeftIcon, ArrowRightIcon } from "@heroicons/react/24/outline";
import RangeSlider from "./RangeSlider";

const {
  usePrevNextButtons,
  PrevButton,
  NextButton,
} = require("@/app/_hooks/useCarouselButtons");

function NewArrivalsProductsCarousel({ length, children }) {
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
      className="page-padding -mx-4 space-y-6 overflow-x-hidden sm:-mx-6 lg:-mx-10"
      ref={emblaRef}
    >
      {children}

      <div
        className="flex flex-row-reverse items-center justify-between"
        aria-label="Controlli carosello"
        role="group"
      >
        <div className="space-x-8 py-2" aria-label="Navigazione slide">
          <PrevButton
            className="group custom-control-focus cursor-pointer rounded-full border border-black/50 p-2 transition-colors duration-500 hover:border-black disabled:cursor-not-allowed disabled:border-black/10 dark:border-white/30 dark:hover:border-white dark:disabled:border-white/10"
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
            className="group custom-control-focus cursor-pointer rounded-full border border-black/50 p-2 transition-colors duration-500 hover:border-black disabled:cursor-not-allowed disabled:border-black/10 dark:border-white/30 dark:hover:border-white dark:disabled:border-white/10"
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

        <div className="flex w-55 items-center sm:w-60 lg:w-70">
          <RangeSlider
            selectedIndex={selectedIndex}
            scrollSnaps={scrollSnaps}
            onChange={(e) => onDotButtonClick(Number(e.target.value))}
            onDotButtonClick={onDotButtonClick}
            length={length}
          />
        </div>
      </div>
    </div>
  );
}

export default NewArrivalsProductsCarousel;

{
  // const rangeRef = useRef(null);
  // const handleRangeScroll = (e) => {
  //   e.preventDefault();
  //   const delta = e.deltaY || e.deltaX; // supporta anche scroll orizzontale
  //   const direction = delta > 0 ? 1 : -1;
  //   const currentValue = Number(rangeRef.current.value);
  //   const newValue = Math.min(
  //     Math.max(currentValue + direction, 0),
  //     scrollSnaps.length - 1,
  //   );
  //   if (newValue !== currentValue) {
  //     onDotButtonClick(newValue);
  //   }
  // };
  /* <input
    ref={rangeRef}
    type="range"
    min={0}
    max={scrollSnaps.length - 1}
    value={selectedIndex}
    onChange={(e) => onDotButtonClick(Number(e.target.value))}
    onWheel={handleRangeScroll}
    aria-label="Navigazione slide tramite slider"
    aria-valuetext={`Slide ${selectedIndex + 1} di ${scrollSnaps.length}`}
  /> */
}

{
  /* <div
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
      className={`custom-focus size-3 cursor-pointer rounded-full border transition-colors duration-200 ${index === selectedIndex ? "border-black bg-black dark:border-white dark:bg-white" : "border-black/50 hover:border-black active:border-black disabled:border-black/10 dark:border-white/50 dark:hover:border-white dark:active:border-white"}`}
    />
  ))}
</div> */
}
