"use client";

import { pdf } from "@react-pdf/renderer";
import { saveAs } from "file-saver";
import RecipePDF from "./RecipePDF";
import { ArrowDownTrayIcon } from "@heroicons/react/24/solid";

function Downloader({ recipe }) {
  const handleDownload = async (recipe) => {
    const blob = await pdf(<RecipePDF recipe={recipe} />).toBlob();
    saveAs(blob, `${recipe.title}.pdf`);
  };

  return (
    <button
      onClick={() => handleDownload(recipe)}
      className="flex items-center gap-2 px-2 md:px-3 py-1 bg-primary-950 text-primary-50 rounded-lg hover:bg-primary-900 transition duration-200 cursor-pointer"
    >
      <ArrowDownTrayIcon className="size-2.5 sm:size-3 md:size-4" />
    </button>
  );
}

export default Downloader;
