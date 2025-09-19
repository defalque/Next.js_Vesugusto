"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function MiniImageButton({ index, name, children }) {
  const { selectedIndex, setSelectedIndex } = useSelectedImage();

  const isSelected = selectedIndex === index;

  return (
    <button
      className="focus relative h-17 w-11"
      aria-label={`Seleziona immagine ${index + 1} di ${name}`}
      disabled={isSelected}
      aria-pressed={isSelected}
      onMouseOver={() => {
        if (!isSelected) {
          setSelectedIndex(index);
        }
      }}
      onClick={() => {
        if (!isSelected) {
          setSelectedIndex(index);
        }
      }}
    >
      {children}
    </button>
  );
}

export default MiniImageButton;
