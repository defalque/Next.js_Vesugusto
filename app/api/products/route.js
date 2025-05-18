import { NextResponse } from "next/server";
import { supabase } from "@/app/_lib/supabase";

// Funzione helper per validare i parametri query
const parseQueryParam = (value, fallback = 0) => {
  const parsed = parseInt(value, 10);
  return isNaN(parsed) ? fallback : parsed;
};

export async function GET(req) {
  const { searchParams } = new URL(req.url);

  const page = parseQueryParam(searchParams.get("page"), 0);
  const limit = parseQueryParam(searchParams.get("limit"), 9);
  const filter = searchParams.get("filter") || "all";

  const from = page * limit;
  const to = from + limit - 1;

  let query = supabase
    .from("products")
    .select("*")
    .range(from, to)
    .order("created_at", { ascending: false });

  if (filter !== "all") {
    query = query.eq("type", filter);
  }

  const { data, error } = await query;

  if (error) {
    console.error("Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json(data);
}
