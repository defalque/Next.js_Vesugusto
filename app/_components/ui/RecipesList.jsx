import { XMarkIcon } from "@heroicons/react/24/solid";
import Downloader from "./Downloader";

function RecipesList({ recipes }) {
  return (
    <div className="grid grid-cols-4 gap-10 mt-10">
      {recipes.map((recipe) => (
        <div
          key={recipe.id}
          className="px-6 py-5 rounded-2xl space-y-4 flex flex-col items-center border border-gray-200 shadow-sm bg-white relative transition-all duration-300 hover:shadow-md hover:-translate-y-1"
        >
          <h1 className="text-base font-semibold text-center text-gray-800 px-2">
            {recipe.title.length > 46
              ? `${recipe.title.substring(0, 40)}...`
              : recipe.title}
          </h1>

          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 bg-primary-950 text-primary-50 rounded-xl hover:bg-primary-800 transition duration-200 text-sm font-medium cursor-pointer">
              <span>Vedi</span>
            </button>

            <Downloader recipe={recipe} />
          </div>

          <button
            className="absolute top-2 right-2 text-gray-400 hover:text-gray-600 transition cursor-pointer"
            aria-label="Elimina ricetta"
          >
            <XMarkIcon className="size-5" />
          </button>
        </div>
      ))}
    </div>
  );
}

export default RecipesList;
