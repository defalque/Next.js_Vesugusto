"use client";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import RecipePDF from "./RecipePDF";

function Downloader({ recipe }) {
  const handleDownload = async (recipe) => {
    const blob = await pdf(<RecipePDF recipe={recipe} />).toBlob();
    saveAs(blob, `${recipe.title}.pdf`);
  };

  return (
    <button
      onClick={() => handleDownload(recipe)}
      className="flex items-center gap-2 px-3 py-0.5 bg-primary-950 text-primary-50 rounded-lg hover:bg-primary-900 transition duration-200 cursor-pointer"
    >
      <span>Scarica</span>
    </button>
  );
}

export default Downloader;
