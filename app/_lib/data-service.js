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

export async function getProductsWithPagination(limit, filters) {
  const from = filters.page * limit;
  const to = from + limit - 1;

  let query = supabase.from("products").select("*").range(from, to);

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

  let query = supabase.from("products").select("*").range(from, to);

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
  let query = supabase.from("products").select("*");

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
  let query = supabase.from("products").select("*");

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

export async function getProduct(id) {
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("id", id)
    .single();

  if (error) {
    console.error(error);
    throw new Error("Product could not be loaded");
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

export async function getAllProducts(page, limit, filter) {
  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*")
    .range(from, to)
    .order("id", { ascending: true });

  if (filter !== "all") {
    query = query.eq("type", filter);
  }

  const { data, error } = await query;
  if (error) throw error;

  return data;
}
