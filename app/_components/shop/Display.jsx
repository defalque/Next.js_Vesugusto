"use client";

import { useEffect } from "react";

import * as m from "motion/react-m";
import {
  AnimatePresence,
  LazyMotion,
  MotionConfig,
  useSpring,
  useTransform,
} from "motion/react";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

import useMeasure from "react-use-measure";

function Display({ categories, shouldReduce, count, font }) {
  const displayedCategories =
    categories.length > 0 ? [...categories].reverse() : ["Tutti"];

  const [ref, bounds] = useMeasure();

  const countValue = useSpring(0, {
    stiffness: 185,
    damping: 25,
  });

  const countDisplay = useTransform(
    countValue,
    (value) => `${Math.round(value)}`,
  );

  useEffect(() => {
    countValue.set(count);
  }, [count]);

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig
        reducedMotion={shouldReduce ? "user" : "never"}
        transition={{
          type: "spring",
          stiffness: 320,
          damping: 22,
          mass: 0.7,
        }}
      >
        <m.div
          layout
          // initial={{ width: bounds.width }}
          // animate={{ width: bounds.width }}
          className={`xs:text-3xl _mr-auto flex w-full space-x-2 self-center overflow-y-clip text-2xl font-medium lg:text-4xl ${font.className}`}
        >
          <div ref={ref} className="flex h-fit items-center divide-x">
            <AnimatePresence mode="popLayout" initial={false}>
              {displayedCategories.map((cat, i) => (
                <m.span
                  key={cat}
                  layout
                  initial={{
                    y: shouldReduce ? 0 : 40,
                    opacity: 0,
                    scale: 0.8,
                    filter: shouldReduce ? "blur(0px)" : "blur(4px)",
                  }}
                  animate={{
                    y: 0,
                    opacity: 1,
                    scale: 1,
                    filter: "blur(0px)",
                  }}
                  exit={{
                    y: shouldReduce ? 0 : -40,
                    opacity: 0,
                    scale: 0.8,
                    filter: shouldReduce ? "blur(0px)" : "blur(4px)",
                  }}
                  className={`${i == 0 ? "pr-4" : "px-4"}`}
                >
                  {cat.charAt(0).toUpperCase() + cat.slice(1)}
                </m.span>
              ))}
            </AnimatePresence>

            <m.span
              layout={!shouldReduce}
              className="pl-4 text-neutral-600 dark:text-neutral-200"
            >
              {shouldReduce ? count : countDisplay}
            </m.span>
          </div>
        </m.div>
      </MotionConfig>
    </LazyMotion>
  );
}

export default Display;
