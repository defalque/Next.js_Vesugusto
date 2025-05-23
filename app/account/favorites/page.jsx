import { getFavorites } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import FavoritesList from "@/app/_components/ui/FavoritesList";

export const metadata = {
  title: "I tuoi preferiti",
};

export default async function Page() {
  const session = await auth();

  const products = await getFavorites(session.user.userId);

  return (
    <div className="flex flex-col gap-8">
      <h1 className="text-5xl font-medium border-b border-b-zinc-200 tracking-wide pb-8">
        Prodotti salvati
      </h1>

      {products.length === 0 ? (
        <div>
          <p>Non hai nessun prodotto tra i preferiti.</p>
        </div>
      ) : (
        <FavoritesList products={products} userId={session.user.userId} />
      )}
    </div>
  );
}
