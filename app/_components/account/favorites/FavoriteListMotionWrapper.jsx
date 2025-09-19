"use client";

import { LazyMotion, AnimatePresence } from "motion/react";

const loadFeatures = () =>
  import("../../../_lib/features").then((res) => res.default);

export default function FavoriteListMotionWrapper({ children }) {
  return (
    <LazyMotion features={loadFeatures}>
      <AnimatePresence mode="wait">{children}</AnimatePresence>
    </LazyMotion>
  );
}
