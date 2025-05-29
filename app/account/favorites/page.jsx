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
      <div className=" flex flex-col gap-5 pb-4 border-b border-b-gray-200 mb-5">
        <h1 className="text-5xl font-medium tracking-wide">
          Prodotti preferiti
        </h1>
        <h2 className="text-gray-500">
          Qui puoi trovare e rivedere rapidamente tutti i prodotti che hai
          aggiunto alla tua lista dei preferiti e inserirli subito nel carrello.
        </h2>
      </div>

      {products.length === 0 ? (
        <div>
          <p>Non hai nessun prodotto tra i preferiti.</p>
        </div>
      ) : (
        <FavoritesList
          products={products}
          userId={session.user.userId}
          cartId={session.user.cartId}
        />
      )}
    </div>
  );
}
