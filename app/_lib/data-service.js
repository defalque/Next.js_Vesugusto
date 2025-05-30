import { notFound } from "next/navigation";
import { supabase } from "./supabase";

export async function createUserAndCart(newUser) {
  const { data: userData, error } = await supabase
    .from("users")
    .insert([newUser])
    .select()
    .single();

  if (error) {
    console.error(error);
    throw new Error("User could not be created");
  }

  const userId = userData.id;

  const { data: cartData, error: cartError } = await supabase
    .from("carts")
    .insert([{ userId, created_at: new Date().toISOString() }])
    .select()
    .single();

  if (cartError) {
    console.error(cartError);
    throw new Error("Cart could not be created");
  }

  return {
    user: userData,
    cart: cartData,
  };
}

export async function getUser(email) {
  const { data, error } = await supabase
    .from("users")
    .select("*")
    .eq("email", email)
    .single();

  // No error here! We handle the possibility of no guest in the sign in callback
  return data;
}

export async function getCart(userId) {
  let { data, error } = await supabase
    .from("carts")
    .select("id")
    .eq("userId", userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error(
      "Non è stato possibile recuperare l'id del carrello dell'utente"
    );
  }

  return data;
}

export async function getProductsWithPagination(limit, filters) {
  const from = filters.page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*")
    .gt("quantity", 0)
    .range(from, to);

  if (filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters.price === "10") query = query.lte("regularPrice", 10);
  if (filters.price === "10-20")
    query = query.gt("regularPrice", 10).lte("regularPrice", 20);
  if (filters.price === "20-30")
    query = query.gt("regularPrice", 20).lte("regularPrice", 30);
  if (filters.price === "30-50")
    query = query.gt("regularPrice", 30).lte("regularPrice", 50);

  const { data, error } = await query;
  if (error) throw error;

  return data;
}

export async function getFilteredProductsWithPagination(limit, filters) {
  const from = filters.page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*")
    .gt("quantity", 0)
    .range(from, to)
    .order("created_at", { ascending: true });

  // Filtro per type (array)
  if (filters.type.length > 0) {
    query = query.in("type", filters.type);
  }

  // Filtro per price (array con più range)
  if (filters.price.length > 0) {
    const orClauses = filters.price.map((range) => {
      if (range.includes("-")) {
        const [min, max] = range.split("-").map(Number);
        return `and(regularPrice.gte.${min},regularPrice.lte.${max})`;
      } else {
        const max = Number(range);
        return `regularPrice.lte.${max}`;
      }
    });

    const orFilter = orClauses.join(",");
    query = query.or(orFilter);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data;
}

export async function getProductsCount(filters) {
  let query = supabase.from("products").select("*").gt("quantity", 0);

  if (filters.type !== "all") {
    query = query.eq("type", filters.type);
  }

  if (filters.price === "10") query = query.lte("regularPrice", 10);
  if (filters.price === "10-20")
    query = query.gt("regularPrice", 10).lte("regularPrice", 20);
  if (filters.price === "20-30")
    query = query.gt("regularPrice", 20).lte("regularPrice", 30);
  if (filters.price === "30-50")
    query = query.gt("regularPrice", 30).lte("regularPrice", 50);

  const { data, error } = await query;
  if (error) throw error;

  return data;
}

export async function getFilteredProductsCount(filters) {
  let query = supabase.from("products").select("*").gt("quantity", 0);

  // Filtro per tipo (multipli)
  if (filters.type.length > 0) {
    query = query.in("type", filters.type);
  }

  // Filtro per prezzo (multipli)
  if (filters.price.length > 0) {
    const orClauses = filters.price.map((range) => {
      if (range.includes("-")) {
        const [min, max] = range.split("-").map(Number);
        return `and(regularPrice.gte.${min},regularPrice.lte.${max})`;
      } else {
        const max = Number(range);
        return `regularPrice.lte.${max}`;
      }
    });

    const orFilter = orClauses.join(",");
    query = query.or(orFilter);
  }

  const { data, error } = await query;

  if (error) throw error;

  return data;
}

export async function getNotFoundPageProducts() {
  const { data, error } = await supabase
    .from("products")
    .select("name, image")
    .range(0, 5);

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
}

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    // console.error(error);
    notFound();
  }

  return data;
}

export async function getAllProductTypes() {
  let { data, error } = await supabase
    .from("unique_product_types")
    .select("type");

  if (error) {
    console.error(error);
  }

  return data;
}

export async function createFavoriteProduct(userId, productId) {
  const { data, error } = await supabase
    .from("favorites")
    .insert([{ userId, productId }])
    .select();

  if (error) {
    console.error(error);
    throw new Error("Favorite product could not be created");
  }

  return data;
}

export async function getFavorites(userId) {
  const { data: favoriteProducts, error: favoriteProductsError } =
    await supabase
      .from("favorites")
      .select("productId")
      .eq("userId", userId)
      .order("created_at", { ascending: false });

  if (favoriteProductsError) {
    console.error(favoriteProductsError);
    throw new Error(favoriteProductsError);
  }

  const productIds = favoriteProducts?.map((item) => Number(item.productId));

  const { data, error } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (error) {
    console.error(error);
  }

  const orderedProducts = productIds.map((id) =>
    data.find((product) => product.id === id)
  );

  return orderedProducts;
}

export async function getProductsWithoutFilter() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
  }

  return data;
}

export async function getProducts(filter) {
  let query = supabase.from("products").select("*");

  if (filter !== "all") {
    query = query.eq("type", filter);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data;
}

export async function getAllProducts() {
  const { data, error } = await supabase.from("products").select("*");

  if (error) {
    console.error(error);
    throw new Error("Products could not be loaded");
  }

  return data;
}

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

export async function getCartProductsCount(cartId) {
  const { data, error } = await supabase
    .from("cart_items")
    .select("productId")
    .eq("cartId", cartId);

  if (error) {
    console.error(error);
    throw new Error("Errore nel conteggio dei prodotti nel carrello");
  }

  return data;
}

export async function getUserInfo(userId) {
  const { data, error } = await supabase
    .from("users")
    .select("via, numeroCivico, comune, cap")
    .eq("id", userId)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Errore");
  }

  return data;
}

export async function getUserOrders(userId) {
  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error(
      "Errore nel recupero degli ordini dell'utente: ",
      ordersError
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
    .select("*")
    .in("orderId", orderIds);

  if (orderItemsError) {
    console.error("Errore nel recupero degli order_items: ", orderItemsError);
    throw new Error("Errore nel recupero degli order_items");
  }

  const productIds = orderItems.map((item) => item.productId);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (productsError) {
    console.error("Errore nel recupero dei prodotti: ", productsError);
    throw new Error("Errore nel recupero dei prodotti");
  }

  // Associa i prodotti agli orderItems
  const orderItemsWithProducts = orderItems.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId),
  }));

  // Raggruppa per ordine e calcola totale
  const ordersWithItems = orders.map((order) => {
    const items = orderItemsWithProducts.filter(
      (item) => item.orderId === order.id
    );

    const total = items.reduce((sum, item) => {
      return sum + (item.product?.regularPrice || 0) * item.quantity;
    }, 0);

    return {
      ...order,
      items,
      total,
    };
  });

  return ordersWithItems;
}

export async function getUserOrdersWithPagination(limit, filters, userId) {
  const from = filters.page * limit;
  const to = from + limit - 1;

  const { data: orders, error: ordersError } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId)
    .range(from, to)
    .order("created_at", { ascending: false });

  if (ordersError) {
    console.error(
      "Errore nel recupero degli ordini dell'utente: ",
      ordersError
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
    .select("*")
    .in("orderId", orderIds);

  if (orderItemsError) {
    console.error("Errore nel recupero degli order_items: ", orderItemsError);
    throw new Error("Errore nel recupero degli order_items");
  }

  const productIds = orderItems.map((item) => item.productId);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (productsError) {
    console.error("Errore nel recupero dei prodotti: ", productsError);
    throw new Error("Errore nel recupero dei prodotti");
  }

  // Associa i prodotti agli orderItems
  const orderItemsWithProducts = orderItems.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId),
  }));

  // Raggruppa per ordine e calcola totale
  const ordersWithItems = orders.map((order) => {
    const items = orderItemsWithProducts.filter(
      (item) => item.orderId === order.id
    );

    const total = items.reduce((sum, item) => {
      return sum + (item.product?.regularPrice || 0) * item.quantity;
    }, 0);

    return {
      ...order,
      items,
      total,
    };
  });

  return ordersWithItems;
}

export async function getUserOrder(userId, orderId) {
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId)
    .eq("id", orderId);

  if (orderError) {
    console.error("Errore nel recupero dell'ordine dell'utente: ", orderError);
    throw new Error("Errore nel recupero dell'ordine dell'utente");
  }

  // Se non ci sono ordini, ritorna direttamente
  if (!order || order.length === 0) {
    return [];
  }

  const orderIds = order.map((order) => order.id);

  // Recupera gli order_items associati a quegli ordini
  const { data: orderItems, error: orderItemsError } = await supabase
    .from("order_items")
    .select("*")
    .in("orderId", orderIds);

  if (orderItemsError) {
    console.error("Errore nel recupero degli order_items: ", orderItemsError);
    throw new Error("Errore nel recupero degli order_items");
  }

  const productIds = orderItems.map((item) => item.productId);
  const { data: products, error: productsError } = await supabase
    .from("products")
    .select("*")
    .in("id", productIds);

  if (productsError) {
    console.error("Errore nel recupero dei prodotti: ", productsError);
    throw new Error("Errore nel recupero dei prodotti");
  }

  // Associa i prodotti agli orderItems
  const orderItemsWithProducts = orderItems.map((item) => ({
    ...item,
    product: products.find((product) => product.id === item.productId),
  }));

  // Raggruppa per ordine e calcola totale
  const ordersWithItems = order.map((order) => {
    const items = orderItemsWithProducts.filter(
      (item) => item.orderId === order.id
    );

    const total = items.reduce((sum, item) => {
      return sum + (item.product?.regularPrice || 0) * item.quantity;
    }, 0);

    return {
      ...order,
      items,
      total,
    };
  });

  return ordersWithItems;
}

export async function getOrderSession(userId, sessionId) {
  const { data: order, error } = await supabase
    .from("orders")
    .select("*")
    .eq("userId", userId)
    .eq("sessionId", sessionId)
    .single();

  if (error) {
    console.error("Errore nel recupero dello stato dell'ordine", error);
    throw new Error("Errore nel recupero dello stato dell'ordine");
  }

  return order;
}

export async function getRecipes(userId) {
  const { data: recipes, error } = await supabase
    .from("recipes")
    .select("*")
    .eq("userId", userId)
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Errore nel recupero delle ricette dell'utente", error);
    throw new Error("Errore nel recupero delle ricette dell'utente");
  }

  return recipes;
}
