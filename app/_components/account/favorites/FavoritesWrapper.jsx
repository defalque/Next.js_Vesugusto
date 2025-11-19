import { getFavorites } from "@/app/_lib/data-service";
import FavoritesList from "./FavoritesList";

async function FavoritesWrapper() {
  const favorites = await getFavorites();

  return <FavoritesList favorites={favorites} />;
}

export default FavoritesWrapper;

// import FavoritesListOptimistic from "./FavoritesListOptimistic";
// <FavoritesListOptimistic
//   favorites={favorites}
//   userId={session.user.userId}
//   cartId={session.user.cartId}
// ></FavoritesListOptimistic>
