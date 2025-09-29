"use client";

import { useSelectedImage } from "@/app/_contexts/SelectedImageContext";

function SelectedImagePolite() {
  const { selectedIndex } = useSelectedImage();

  return (
    <span aria-live="polite" aria-atomic="true" className="sr-only">
      {`Immagine ${selectedIndex + 1} selezionata`}
    </span>
  );
}

export default SelectedImagePolite;
