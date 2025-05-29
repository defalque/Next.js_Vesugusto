import RecipesList from "@/app/_components/ui/RecipesList";
import { getRecipes } from "@/app/_lib/data-service";
import { auth } from "@/auth";

export const metadata = {
  title: "Le tue ricette",
};

export default async function Page() {
  const session = await auth();
  const recipes = await getRecipes(session.user.userId);

  return (
    <div>
      <div className=" flex flex-col gap-5 pb-4 border-b border-b-gray-200">
        <h1 className="text-5xl font-medium tracking-wide">Ricette salvate</h1>
        <h2 className="text-gray-500">
          Qui trovi tutte le ricette create nella sezione "creIAmo" e che hai
          deciso di conservare per ispirarti in cucina quando vuoi. Puoi
          rileggere le tue ricette preferite, scaricarle o condividerle con chi
          vuoi, direttamente da qui. La tua personale raccolta di sapori è
          sempre a portata di click!
        </h2>
      </div>

      {recipes.length > 0 ? (
        <RecipesList recipes={recipes} />
      ) : (
        <p className="mt-8">Non hai ancora salvato nessuna ricetta.</p>
      )}
    </div>
  );
}
