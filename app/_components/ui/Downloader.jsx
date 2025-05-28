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
      className="flex items-center gap-2 px-3 py-2 bg-primary-950 text-primary-50 rounded-xl hover:bg-primary-800 transition duration-200 cursor-pointer"
    >
      <ArrowDownTrayIcon className="size-5" />
    </button>
  );
}

export default Downloader;
