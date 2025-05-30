import { TrashIcon } from "@heroicons/react/24/solid";
import Downloader from "./Downloader";

function RecipesList({ recipes }) {
  return (
    <div className="flex flex-col my-10 rounded border border-gray-300">
      {recipes.map((recipe, index) => (
        <div
          key={recipe.id}
          className={`flex items-center gap-4 pb-3 pt-4 pr-4 pl-4 transition-all duration-300 relative ${
            index < recipes.length - 1 ? "border-b border-b-gray-300" : ""
          }`}
        >
          <h1 className="text-medium font-medium hover:text-primary-dark-100 hover:underline transition-all duration-100 cursor-pointer">
            {recipe.title}
          </h1>

          <div className="flex items-center gap-3 ml-auto text-sm font-normal">
            <Downloader recipe={recipe} />

            <button className="flex items-center gap-2 px-3 py-1 bg-primary-950 text-primary-50 rounded-lg hover:bg-primary-900 transition duration-200 cursor-pointer">
              <TrashIcon className="size-4"></TrashIcon>
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default RecipesList;
