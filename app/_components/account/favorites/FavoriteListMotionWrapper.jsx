"use client";

import { useReducedMotion } from "@/app/_hooks/useReducedMotion";
import { AnimatePresence, MotionConfig } from "motion/react";

export default function FavoriteListMotionWrapper({ children }) {
  const shouldReduce = useReducedMotion();

  return (
    <MotionConfig reducedMotion={shouldReduce ? "always" : "never"}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </MotionConfig>
  );
}
