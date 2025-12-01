"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function IconButton({ length, children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useSelectedImage();

  return (
    <button
      type="button"
      className="focus-style focus-visible:ring-primary-950 focus-visibile:ring-offset-2 cursor-pointer rounded-full bg-white/50 p-2 focus-visible:ring-4"
      onClick={() => setSelectedIndex((selectedIndex - 1 + length) % length)}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
