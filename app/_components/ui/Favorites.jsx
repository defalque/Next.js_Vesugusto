import { getFavorites } from "@/app/_lib/data-service";
import { auth } from "@/auth";
import FavoritesHandler from "./FavoritesHandler";

async function Favorites() {
  const session = await auth();

  const products = await getFavorites(session.user.userId);

  return (
    <FavoritesHandler
      products={products}
      userId={session.user.userId}
      cartId={session.user.cartId}
    ></FavoritesHandler>
  );
}

export default Favorites;
