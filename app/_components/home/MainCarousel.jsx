"use client";

import React, { useRef } from "react";
import useEmblaCarousel from "embla-carousel-react";
import Autoplay from "embla-carousel-autoplay";
import { useAutoplayProgress } from "@/app/_hooks/useAutoPlayProgress";
import { useAutoplay } from "@/app/_hooks/useAutoPlay";
import { PlayIcon, PauseIcon } from "@heroicons/react/24/outline";

import { SelectedSnapDisplay, useSelectedSnapDisplay } from "./SnapCount";
import { DotButton, useDotButton } from "./DotButton";
// import { useDotButton } from "@/app/_hooks/useDotButton";

function MainCarousel({ children }) {
  const autoplayPlugin = Autoplay({ delay: 4000 });
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true }, [
    autoplayPlugin,
  ]);
  const progressNode = useRef(null);

  const handleDotClick = () => {
    const autoplay = emblaApi?.plugins()?.autoplay;
    if (!autoplay) return;
    console.log("yes");

    if (autoplay.isPlaying()) {
      console.log("is playing");
      autoplay.reset(); // 🔁 Reset completo del delay
      const delay = autoplay.timeUntilNext?.() ?? 4000;
      startProgress(delay); // 🔁 Riavvia la progress bar
    }
  };

  // const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(emblaApi);
  const { selectedIndex, scrollSnaps, onDotButtonClick } = useDotButton(
    emblaApi,
    handleDotClick,
  );

  const { autoplayIsPlaying, toggleAutoplay } = useAutoplay(emblaApi);
  const { showAutoplayProgress, startProgress } = useAutoplayProgress(
    emblaApi,
    progressNode,
  );
  const { selectedSnap, snapCount } = useSelectedSnapDisplay(emblaApi);

  return (
    <section
      role="region"
      aria-roledescription="carousel"
      aria-label="Immagini principali della homepage"
      className="relative min-h-120 overflow-hidden"
    >
      <div ref={emblaRef}>
        <div
          className="flex min-h-160"
          aria-roledescription="slide"
          aria-live="polite"
        >
          {children}
        </div>
      </div>

      <div
        className="absolute bottom-3 left-5 flex h-10 items-center gap-2 p-1.5 sm:left-10"
        role="tablist"
        aria-label="Navigazione tra le slide"
      >
        {scrollSnaps.map((_, index) => (
          <DotButton
            key={index}
            onClick={() => onDotButtonClick(index)}
            role="tab"
            aria-selected={selectedIndex === index}
            aria-label={`Vai alla slide ${index + 1}`}
            aria-controls={`carousel-slide-${index}`}
            className={`size-3 cursor-pointer rounded-full border transition-colors duration-200 ${index === selectedIndex ? "border-white bg-white" : "border-white/50 hover:border-white active:border-white"}`}
          />
        ))}
      </div>

      <div
        className="absolute right-3 bottom-3 flex items-center gap-3"
        aria-label="Controlli autoplay"
      >
        <div
          className={`pointer-events-none relative z-20 h-1 w-17 overflow-hidden rounded-full bg-white/50 transition-opacity duration-200 sm:w-20 ${
            showAutoplayProgress ? "opacity-100" : "opacity-0"
          } transition-opacity duration-300`}
          aria-hidden
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
          disabled={!emblaApi}
          className="cursor-pointer touch-manipulation appearance-none rounded-xl border border-white/50 p-1.5 backdrop-blur-xs transition-colors duration-200 hover:border-white active:border-white"
          onClick={toggleAutoplay}
          type="button"
          aria-label={autoplayIsPlaying ? "Ferma autoplay" : "Attiva autoplay"}
        >
          {autoplayIsPlaying ? (
            <PauseIcon aria-hidden className="size-5 text-white" />
          ) : (
            <PlayIcon aria-hidden className="size-5 text-white" />
          )}
        </button>
      </div>
    </section>
  );
}

export default MainCarousel;
