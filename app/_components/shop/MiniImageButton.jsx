"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function MiniImageButton({ index, name, children }) {
  const { selectedIndex, setSelectedIndex } = useSelectedImage();

  const isSelected = selectedIndex === index;

  const handleInteraction = () => {
    if (!isSelected) {
      setSelectedIndex(index);
    }
  };

  return (
    <button
      role="option"
      type="button"
      className="focus relative h-17 w-11 outline-offset-2"
      aria-label={`Seleziona immagine ${index + 1} di ${name}`}
      disabled={isSelected}
      aria-selected={isSelected}
      onMouseOver={handleInteraction}
      onClick={handleInteraction}
    >
      {children}
    </button>
  );
}

export default MiniImageButton;
