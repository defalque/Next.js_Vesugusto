"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function IconButton({ length, children, ...props }) {
  const { selectedIndex, setSelectedIndex } = useSelectedImage();

  return (
    <button
      className="focus cursor-pointer rounded"
      onClick={() => setSelectedIndex((selectedIndex - 1 + length) % length)}
      {...props}
    >
      {children}
    </button>
  );
}

export default IconButton;
