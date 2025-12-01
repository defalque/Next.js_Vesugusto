"use client";

import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { LazyMotion, AnimatePresence, MotionConfig } from "motion/react";

const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

export default function FavoriteListMotionWrapper({ children }) {
  const shouldReduce = useReducedMotion();

  return (
    <LazyMotion features={loadFeatures}>
      <MotionConfig reducedMotion={shouldReduce ? "always" : "never"}>
        <AnimatePresence mode="wait">{children}</AnimatePresence>
      </MotionConfig>
    </LazyMotion>
  );
}
