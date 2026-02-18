import { Product } from "../context/CartContext";
import { supabase } from "./supabase";

/**
 * Fetch all products from Supabase, ordered by newest first.
 * Maps `image_url` → `image` to match the app's Product interface.
 */
export async function fetchProducts(): Promise<Product[]> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, description, image_url, quantity")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching products:", error.message);
    throw error;
  }

  return (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    price: Number(row.price),
    description: row.description ?? "",
    image: row.image_url ?? "",
  }));
}

/**
 * Fetch a single product by its UUID.
 */
export async function fetchProductById(id: string): Promise<Product | null> {
  const { data, error } = await supabase
    .from("products")
    .select("id, name, price, description, image_url, quantity")
    .eq("id", id)
    .single();

  if (error) {
    console.error("Error fetching product:", error.message);
    return null;
  }

  if (!data) return null;

  return {
    id: data.id,
    name: data.name,
    price: Number(data.price),
    description: data.description ?? "",
    image: data.image_url ?? "",
  };
}
