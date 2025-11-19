"use client";

import { useReducedMotion } from "@/app/_hooks/useReducedMotion";

import dynamic from "next/dynamic";
import { DisplaySkeleton } from "../ui/skeleton/Skeletons";
const Display = dynamic(() => import("../shop/Display"), {
  ssr: false,
  loading: () => <DisplaySkeleton />,
});

function LazyDisplay({ categories, count, font }) {
  const shouldReduce = useReducedMotion();

  return (
    <Display
      categories={categories}
      shouldReduce={shouldReduce}
      count={count}
      font={font}
    />
  );
}

export default LazyDisplay;
