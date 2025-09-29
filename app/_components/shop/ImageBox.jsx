"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function ImageBox({ index, children }) {
  const { selectedIndex } = useSelectedImage();
  const isVisible = selectedIndex === index;

  return (
    <div
      key={index + 1}
      aria-hidden={!isVisible}
      className={`absolute top-0 left-0 h-full w-full transition-opacity duration-500 ${isVisible ? "pointer-events-auto opacity-100" : "pointer-events-none opacity-0"} `}
    >
      {children}
    </div>
  );
}

export default ImageBox;
