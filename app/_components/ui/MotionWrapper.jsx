"use client";

import { LazyMotion } from "motion/react";
const loadFeatures = () =>
  import("../../_lib/features").then((res) => res.default);

function MotionWrapper({ children }) {
  return <LazyMotion features={loadFeatures}>{children}</LazyMotion>;
}

export default MotionWrapper;
