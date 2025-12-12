"use client";

import Image from "next/image";
import { useState } from "react";

const FALLBACK_SRC = "/fallback.png"; // <-- Path alla tua immagine di fallback

function SafeImage(props) {
  // Handle empty string, undefined, or null by using fallback
  const initialSrc =
    props.src && typeof props.src === "string" && props.src.trim() !== ""
      ? props.src
      : FALLBACK_SRC;
  const [src, setSrc] = useState(initialSrc);

  return (
    <Image
      {...props}
      src={src || FALLBACK_SRC}
      onError={() => setSrc(FALLBACK_SRC)}
      alt={props.alt || "Immagine non disponibile al momento"}
    />
  );
}

export default SafeImage;
