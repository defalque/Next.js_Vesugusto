import { getRecipes } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import RecipesList from "./RecipesList";

async function Recipes() {
  const session = await auth();
  const recipes = await getRecipes(session.user.userId);

  return recipes.length > 0 ? (
    <RecipesList recipes={recipes} />
  ) : (
    <p className="mt-8 text-sm md:text-base">
      Non hai ancora salvato nessuna ricetta.
    </p>
  );
}

export default Recipes;
