import { supabase } from "./supabase";
import { cache } from "react";
import { cacheLife, cacheTag } from "next/cache";
import { auth } from "@clerk/nextjs/server";

//----------------------------------------------------------- ✅
export async function getPaginatedProducts(limit, filters) {
  "use cache";
  cacheTag(`paginated-${{ ...filters }}`);
  cacheLife("hours");

  const from = (filters.page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("id, name, regularPrice, image, description")
    .gt("quantity", 0)
    .range(from, to);

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}%`);
  }

  // Filtro per type (array)
  if (filters.category.length > 0) {
    query = query.in("type", filters.category);
  }

  // Filtro per price (array con più range)
  if (filters.price.length > 0) {
    const orClauses = filters.price.map((range) => {
      if (range.includes("-")) {
        const [min, max] = range.split("-").map(Number);
        return `and(regularPrice.gte.${min * 100},regularPrice.lte.${max * 100})`;
      } else {
        const max = Number(range);
        return `regularPrice.lte.${max * 100}`;
      }
    });

    const orFilter = orClauses.join(",");
    query = query.or(orFilter);
  }

  if (filters.sort === "price-asc") {
    query = query.order("regularPrice", { ascending: true });
  } else if (filters.sort === "price-desc") {
    query = query.order("regularPrice", { ascending: false });
  } else if (filters.sort === "default") {
    query = query.order("created_at", { ascending: false });
  }

  const { data, error } = await query;
  if (error) {
    console.error(error);
    throw new Error(error);
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getFilteredProductsCount(filters) {
  "use cache";
  cacheTag(`paginated-count-${{ ...filters }}`);
  cacheLife("hours");

  let query = supabase
    .from("products")
    .select("id", { count: "exact" })
    .gt("quantity", 0);

  if (filters.query) {
    query = query.ilike("name", `%${filters.query}%`);
  }

  // Filtro per type (array)
  if (filters.category.length > 0) {
    query = query.in("type", filters.category);
  }

  // Filtro per price (array con più range)
  if (filters.price.length > 0) {
    const orClauses = filters.price.map((range) => {
      if (range.includes("-")) {
        const [min, max] = range.split("-").map(Number);
        return `and(regularPrice.gte.${min * 100},regularPrice.lte.${max * 100})`;
      } else {
        const max = Number(range);
        return `regularPrice.lte.${max * 100}`;
      }
    });

    const orFilter = orClauses.join(",");
    query = query.or(orFilter);
  }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
}

//----------------------------------------------------------- ✅
export const getProduct = cache(async (id) => {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare il prodotto.");
  }

  return data;
});

//----------------------------------------------------------- ✅
export async function getFavorites() {
  "use cache: private";
  const { userId: clerkUserId } = await auth();
  if (!clerkUserId) {
    return null;
  }
  cacheTag(`favorites-${clerkUserId}`);

  const { data: favoriteProducts, error: favoriteProductsError } =
    await supabase
      .from("favorites")
      .select(
        "id, productId(id, name, image, quantity, regularPrice, discount)",
      )
      .eq("clerkUserId", clerkUserId)
      .order("created_at", { ascending: false });

  if (favoriteProductsError) {
    console.error(favoriteProductsError);
    throw new Error(favoriteProductsError);
  }

  // Normalizzazione: prendi solo la prima immagine
  const normalizedFavorites = favoriteProducts.map((fav) => {
    const product = fav.productId;
    return {
      ...fav,
      productId: {
        ...product,
        image: Array.isArray(product.image) ? product.image[0] : product.image,
      },
    };
  });

  return normalizedFavorites;
}

//----------------------------------------------------------- ✅
export async function getAllProducts() {
  "use cache";
  cacheTag("products");
  cacheLife("hours");

  const { data, error } = await supabase.from("products").select("id");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getCartProd() {
  "use cache: private";
  const { userId } = await auth();
  cacheTag(`cart-${userId}`);
  cacheLife("hours");

  const {
    data: { id },
    cartsError,
  } = await supabase
    .from("carts")
    .select("id")
    .eq("clerkUserId", userId)
    .single();

  if (cartsError) {
    console.error(cartsError);
    throw new Error("Could not load products");
  }

  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "id, created_at, productId(id, name, regularPrice, discount, quantity, details, description, image), quantity",
    )
    .eq("cartId", id)
    .order("created_at", { ascending: true });

  if (error) {
    console.error(error);
    throw new Error("Cart products could not be loaded");
  }

  // Normalizza i dati
  const normalizedData = data.map((item) => ({
    id: item.id,
    created_at: item.created_at,
    quantity: item.quantity,
    cartItemPrice:
      item.quantity * (item.productId?.regularPrice - item.productId?.discount),
    product: {
      ...item.productId,
      image: item.productId?.image?.[0] || null,
    },
  }));

  return { cartId: id, cartProducts: normalizedData };
}

//----------------------------------------------------------- ✅
export async function getCartProductsCount() {
  "use cache: private";
  const { userId } = await auth();
  cacheTag(`${userId}-cart-count`);

  const { data: count, error } = await supabase.rpc("get_cart_products_count", {
    user_id: userId,
  });

  if (error) {
    console.error("Errore nel conteggio dei prodotti nel carrello: ", error);
    throw new Error("Errore nel conteggio dei prodotti nel carrello");
  }

  return count;
}

//----------------------------------------------------------- ✅
export async function getUserInfo() {
  "use cache: private";
  const { userId } = await auth();
  cacheTag(`${userId}-info`);

  const { data, error } = await supabase
    .from("users")
    .select(
      "firstName, lastName, email, phoneNumber, address, houseNumber, city, zipCode",
    )
    .eq("clerkUserId", userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      "Non è stato possibile ottenere le informazioni del tuo profilo.",
    );
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getUserOrdersCount(filters) {
  "use cache: private";
  const { userId } = await auth();
  cacheTag(`${userId}-orders-count`);

  let query = supabase
    .from("orders")
    .select("id", { count: "exact" })
    .eq("clerkUserId", userId)
    .order("created_at", { ascending: false });

  if (filters.query) {
    query.eq("id", filters.query);
  }

  const { count, error: ordersError } = await query;

  if (ordersError) {
    console.error(
      "Errore nel recupero degli ordini dell'utente: ",
      ordersError,
    );
    throw new Error("Errore nel recupero degli ordini dell'utente");
  }

  return count ?? 0;
}

//----------------------------------------------------------- ✅
export async function getPaginatedUserOrders(limit, filters) {
  "use cache: private";
  const { userId } = await auth();
  cacheTag(`orders-${userId}`);

  const from = (filters.page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("orders")
    .select("id, orderDate, status, totalCost")
    .eq("clerkUserId", userId)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (filters.query) {
    query.eq("id", filters.query);
  }

  const { data: orders, error: ordersError } = await query;

  if (ordersError) {
    console.error(
      "Errore nel recupero degli ordini dell'utente: ",
      ordersError,
    );
    throw new Error("Errore nel recupero degli ordini dell'utente");
  }

  // Se non ci sono ordini, ritorna direttamente
  if (!orders || orders.length === 0) {
    return [];
  }

  // Prendi gli ID degli ordini
  const orderIds = orders.map((order) => order.id);

  // Recupera gli order_items associati a quegli ordini
  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select(
      "id, orderId, quantity, productId(id, name, image, regularPrice, discount, description)",
    )
    .in("orderId", orderIds);

  if (orderItemsError) {
    console.error("Errore nel recupero degli order_items: ", orderItemsError);
    throw new Error("Errore nel recupero degli order_items");
  }

  const normalizedData = orders.map((order) => {
    const items = orderItems.filter(
      (orderItem) => orderItem.orderId === order.id,
    );

    return {
      id: order.id,
      orderDate: order.orderDate,
      status: order.status,
      totalCost: order.totalCost,
      orderItems: items,
    };
  });

  return normalizedData;
}

//----------------------------------------------------------- ✅
export async function getOrder(orderId) {
  "use cache: private";
  const { userId } = await auth();
  cacheTag(`order-${orderId}`);

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .eq("clerkUserId", userId)
    .maybeSingle();

  if (orderError) {
    console.error("Errore nel recupero dell'ordine dell'utente: ", orderError);
    throw new Error("Errore nel recupero dell'ordine dell'utente");
  }

  return order;
}

//----------------------------------------------------------- ❌
export async function getUserOrder(userId, paymentIntent) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, isTokenUsed")
    .eq("userId", userId)
    .eq("paymentIntent", paymentIntent)
    .single();

  if (orderError) {
    console.error("Errore nel recupero dell'ordine dell'utente: ", orderError);
    throw new Error("Errore nel recupero dell'ordine dell'utente");
  }

  const { id: orderId, isTokenUsed } = order;

  if (isTokenUsed) {
    return { success: false };
  }

  const { data: order_items, error: orderItemsError } = await supabase
    .from("order_items")
    .select(
      "id, productId(id, name, regularPrice, discount, quantity, details, image), quantity",
    )
    .eq("orderId", orderId);

  if (orderItemsError) {
    console.error(
      "Errore nel recupero dei prodotti dell'ordine dell'utente: ",
      orderItemsError,
    );
    throw new Error("Errore nel recupero dei prodotti dell'ordine dell'utente");
  }

  // Normalizza i dati
  const normalizedData = order_items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    orderItemPrice:
      item.quantity * (item.productId?.regularPrice - item.productId?.discount),
    product: {
      ...item.productId,
      image: item.productId?.image?.[0] || null,
    },
  }));

  // console.log(orderId);

  return { data: normalizedData, orderId, success: true };
}

//----------------------------------------------------------- ✅
export async function getCompletedUserOrder(sessionId) {
  const { userId } = await auth();

  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id, isTokenUsed")
    .eq("clerkUserId", userId)
    .eq("sessionId", sessionId)
    .single();

  if (orderError) {
    console.error("Errore nel recupero dell'ordine dell'utente: ", orderError);
    throw new Error("Errore nel recupero dell'ordine dell'utente");
  }

  const { id: orderId, isTokenUsed } = order;

  if (isTokenUsed) {
    return { success: false };
  }

  const { data: order_items, error: orderItemsError } = await supabase
    .from("order_items")
    .select(
      "id, productId(id, name, regularPrice, discount, quantity, details, image), quantity",
    )
    .eq("orderId", orderId);

  if (orderItemsError) {
    console.error(
      "Errore nel recupero dei prodotti dell'ordine dell'utente: ",
      orderItemsError,
    );
    throw new Error("Errore nel recupero dei prodotti dell'ordine dell'utente");
  }

  // Normalizza i dati
  const normalizedData = order_items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    orderItemPrice:
      item.quantity * (item.productId?.regularPrice - item.productId?.discount),
    product: {
      ...item.productId,
      image: item.productId?.image?.[0] || null,
    },
  }));

  return { data: normalizedData, orderId, success: true };
}

//----------------------------------------------------------- ✅
export async function getOrderItems(orderId) {
  "use cache";
  cacheTag(`order-items-${orderId}`);

  const { data: order_items, error: orderItemsError } = await supabase
    .from("order_items")
    .select(
      "id, productId(id, name, regularPrice, discount, quantity, details, image), quantity",
    )
    .eq("orderId", orderId);

  if (orderItemsError) {
    console.error(
      "Errore nel recupero dei prodotti dell'ordine dell'utente: ",
      orderItemsError,
    );
    throw new Error(
      "Errore nel recupero dei prodotti dell'ordine dell'utente.",
    );
  }

  const normalizedData = order_items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    orderItemPrice:
      item.quantity * (item.productId?.regularPrice - item.productId?.discount),
    product: {
      ...item.productId,
      image: item.productId?.image?.[0] || null,
    },
  }));

  return normalizedData;
}

//----------------------------------------------------------- ✅
export async function getSimulatedUserOrderItems(orderId) {
  const { data: order_items, error: orderItemsError } = await supabase
    .from("order_items")
    .select(
      "id, productId(id, name, regularPrice, discount, quantity, details, image), quantity",
    )
    .eq("orderId", orderId);

  if (orderItemsError) {
    console.error(
      "Errore nel recupero dei prodotti dell'ordine dell'utente: ",
      orderItemsError,
    );
    throw new Error("Errore nel recupero dei prodotti dell'ordine dell'utente");
  }

  // Normalizza i dati
  const normalizedData = order_items.map((item) => ({
    id: item.id,
    quantity: item.quantity,
    orderItemPrice:
      item.quantity * (item.productId?.regularPrice - item.productId?.discount),
    product: {
      ...item.productId,
      image: item.productId?.image?.[0] || null,
    },
  }));

  return { data: normalizedData };
}

//----------------------------------------------------------- ✅
export async function getBestSellers() {
  const { data, error } = await supabase.rpc("get_best_sellers");

  if (error) {
    console.error("Errore nel recupero dei best sellers:", error);
    throw new Error("Non è stato possibile caricare i prodotti più venduti.");
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getNewArrivals() {
  const { data: products, error } = await supabase
    .from("products")
    .select("*")
    .order("created_at", { ascending: false })
    .limit(8);

  if (error) {
    console.error("Errore nel recupero dei nuovi prodotti: ", orderError);
    throw new Error("Errore nel recupero dei nuovi prodotti dell'utente");
  }

  return products;
}
