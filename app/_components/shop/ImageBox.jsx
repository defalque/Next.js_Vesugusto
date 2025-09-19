"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function ImageBox({ index, children }) {
  const { selectedIndex } = useSelectedImage();

  return (
    <div
      key={index + 1}
      className={`absolute top-0 left-0 h-full w-full transition-opacity duration-500 ${
        selectedIndex === index ? "opacity-100" : "opacity-0"
      }`}
    >
      {children}
    </div>
  );
}

export default ImageBox;
