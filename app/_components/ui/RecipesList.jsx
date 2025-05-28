import { EyeIcon, XMarkIcon } from "@heroicons/react/24/solid";
import Downloader from "./Downloader";

function RecipesList({ recipes }) {
  return (
    <div className="flex flex-col my-10 rounded border border-gray-300">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className={`flex items-center gap-4 pb-3 pt-4 pr-14 pl-4 transition-all duration-300 relative ${
            index < recipes.length - 1 ? "border-b border-b-gray-300" : ""
          }`}
        >
          <h1 className="text-medium font-medium">{recipe.title}</h1>

          <div className="flex items-center gap-3 ml-auto text-sm font-normal">
            <button className="flex items-center gap-2 px-3 py-0.5 bg-primary-950 text-primary-50 rounded-lg hover:bg-primary-900 transition duration-200 cursor-pointer">
              <span>Vedi</span>
            </button>

            <Downloader recipe={recipe} />
          </div>

          <button
            className="absolute top-1.5 right-1.5 text-gray-400 hover:text-gray-600 transition cursor-pointer"
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
