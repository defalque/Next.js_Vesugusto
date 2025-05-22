import { getFavorites } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import FavoriteCard from "@/app/_components/ui/FavoriteCard";

export const metadata = {
  title: "I tuoi preferiti",
};

export default async function Page() {
  const session = await auth();

  const products = await getFavorites(session.user.userId);

  if (products.length === 0)
    return (
      <div>
        <p>Non hai nessun prodotto tra i preferiti.</p>
      </div>
    );

  return (
    <div className="grid grid-cols-4 gap-10">
      {products.map((product) => (
        <FavoriteCard
          key={product.id}
          product={product}
          userId={session.user.userId}
        />
      ))}
    </div>
  );
}
