import { notFound } from "next/navigation";
import { supabase } from "./supabase";

//----------------------------------------------------------- ✅
export async function createUserAndCart(email, name, image) {
  const { error } = await supabase.rpc("create_user_and_cart_atomic", {
    p_email: email,
    p_name: name,
    p_image: image,
  });

  if (error) {
    console.error("Errore nella creazione di user e cart:", error);
    throw new Error("Impossibile creare utente e carrello.");
  }
}

//----------------------------------------------------------- ✅
export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

//----------------------------------------------------------- ✅
export async function getCart(userId) {
  let { data, error } = await supabase
    .from("carts")
    .select("id")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      "Non è stato possibile recuperare l'id del carrello dell'utente",
    );
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getPaginatedProducts(limit, filters) {
  const from = (filters.page - 1) * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("id, name, regularPrice, image")
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
  if (error) throw error;

  return data;
}

//----------------------------------------------------------- ✅
export async function getFilteredProductsCount(filters) {
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

  // if (filters.sort === "price-asc") {
  //   query = query.order("regularPrice", { ascending: true });
  // } else if (filters.sort === "price-desc") {
  //   query = query.order("regularPrice", { ascending: false });
  // } else if (filters.sort === "default") {
  //   query = query.order("created_at", { ascending: false });
  // }

  const { count, error } = await query;

  if (error) throw error;

  return count ?? 0;
}

//----------------------------------------------------------- ✅
export async function getProduct(id) {
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
}

//----------------------------------------------------------- ✅
export async function getProductNameAndDescription(id) {
  const { data, error } = await supabase
    .from("products")
    .select("name, description")
    .eq("id", id)
    .maybeSingle();

  if (error) {
    console.error(error);
    throw new Error("Non è stato possibile caricare il prodotto.");
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getFavorites(userId) {
  const { data: favoriteProducts, error: favoriteProductsError } =
    await supabase
      .from("favorites")
      .select(
        "id, productId(id, name, image, quantity, regularPrice, discount)",
      )
      .eq("userId", userId)
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
export async function getFavoriteProductIds(userId) {
  const { data, error } = await supabase
    .from("favorites")
    .select("productId")
    .eq("userId", userId);

  if (error) {
    console.error(error);
    throw new Error(error.message);
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getAllProducts() {
  const { data, error } = await supabase.from("products").select("id");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

//----------------------------------------------------------- ✅
export async function getCartProd(cartId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select(
      "id, created_at, productId(id, name, regularPrice, discount, quantity, details, image), quantity",
    )
    .eq("cartId", cartId)
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

  return normalizedData;
}

//----------------------------------------------------------- ❌
export async function getCartProducts(cartId) {
  const { data: cartItems, error: cartError } = await supabase
    .from("cart_items")
    .select("created_at, productId, quantity")
    .eq("cartId", cartId)
    .order("created_at", { ascending: true });

  if (cartError) {
    console.error(cartError);
    throw new Error("Cart products could not be loaded");
  }

  if (!cartItems || cartItems.length === 0) {
    return [];
  }

  const productIds = cartItems.map((item) => item.productId);

  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (productsError) {
    console.error(productsError);
    throw new Error("Could not load products");
  }

  // Ora combiniamo i dati delle quantità dai cartItems con i dettagli dei prodotti
  const cartProducts = cartItems.map((item) => {
    // Troviamo il prodotto corrispondente al productId in cartItems
    const product = products.find((p) => p.id === item.productId);

    if (product) {
      return {
        created_at: item.created_at,
        id: product.id,
        name: product.name,
        image: product.image,
        details: product.details,
        regularPrice: product.regularPrice,
        productQuantity: product.quantity,
        cartQuantity: item.quantity,
      };
    } else {
      // Se il prodotto non è trovato, ritorniamo un oggetto con dei valori di fallback
      return {
        name: "Prodotto non trovato",
        price: 0,
        quantity: item.quantity,
      };
    }
  });

  return cartProducts;
}

//----------------------------------------------------------- ✅
export async function getCartProductsCount(cartId) {
  const { count, error } = await supabase
    .from("cart_items")
    .select("productId", { count: "exact" })
    .eq("cartId", cartId);

  if (error) {
    console.error(error);
    throw new Error("Errore nel conteggio dei prodotti nel carrello");
  }

  return count;
}

//----------------------------------------------------------- ✅
export async function getUserInfo(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("via, numeroCivico, comune, cap, phoneNumber")
    .eq("id", userId)
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
export async function getUserOrdersCount(userId, filters) {
  let query = supabase
    .from("orders")
    .select("id", { count: "exact" })
    .eq("userId", userId)
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
  // const { count, error: ordersError } = await supabase
  //   .from("orders")
  //   .select("id", { count: "exact" })
  //   .eq("userId", userId)
  //   .order("created_at", { ascending: false });

  // if (ordersError) {
  //   console.error(
  //     "Errore nel recupero degli ordini dell'utente: ",
  //     ordersError,
  //   );
  //   throw new Error("Errore nel recupero degli ordini dell'utente.");
  // }

  return count ?? 0;
}

//----------------------------------------------------------- ✅
export async function getPaginatedUserOrders(limit, filters, userId) {
  const from = (filters.page - 1) * limit;
  const to = from + limit - 1;

  // const { data: orders, error: ordersError } = await supabase
  //   .from("orders")
  //   .select("id, orderDate, status, totalCost")
  //   .eq("userId", userId)
  //   .range(from, to)
  //   .order("created_at", { ascending: false });

  let query = supabase
    .from("orders")
    .select("id, orderDate, status, totalCost")
    .eq("userId", userId)
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

export async function getOrder(userId, orderId) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("id")
    .eq("id", orderId)
    .eq("userId", userId)
    .maybeSingle();

  if (orderError) {
    console.error("Errore nel recupero dell'ordine dell'utente: ", orderError);
    throw new Error("Errore nel recupero dell'ordine dell'utente");
  }

  return order;
}

//----------------------------------------------------------- ✅
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

  console.log(orderId);

  return { data: normalizedData, orderId, success: true };
}
