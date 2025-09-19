import { getFavorites } from "@/app/_lib/data-service";
import { auth } from "@/auth";
// import FavoritesListOptimistic from "./FavoritesListOptimistic";
import FavoritesList from "./FavoritesList";

async function FavoritesWrapper() {
  const session = await auth();

  const favorites = await getFavorites(session.user.userId);

  return (
    <FavoritesList
      favorites={favorites}
      userId={session.user.userId}
      cartId={session.user.cartId}
    />
    // <FavoritesListOptimistic
    //   favorites={favorites}
    //   userId={session.user.userId}
    //   cartId={session.user.cartId}
    // ></FavoritesListOptimistic>
  );
}

export default FavoritesWrapper;
