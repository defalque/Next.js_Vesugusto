import { getFavorites } from "@/app/_lib/data-service";
import FavoritesList from "./FavoritesList";
import { auth } from "@/auth";

async function Favorites() {
  const session = await auth();

  const products = await getFavorites(session.user.userId);

  return products.length === 0 ? (
    <p className="-mt-5">Non hai nessun prodotto tra i preferiti.</p>
  ) : (
    <FavoritesList
      products={products}
      userId={session.user.userId}
      cartId={session.user.cartId}
    />
  );
}

export default Favorites;
