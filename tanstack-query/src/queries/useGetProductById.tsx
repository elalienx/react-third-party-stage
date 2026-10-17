// Node modules
import { useSuspenseQuery } from "@tanstack/react-query";
import { Product } from "../types/types";

export default function useGetProductById(id: string | undefined) {
  const queryKey = ["product", id];
  const queryFn = () => getProductById(id);

  return useSuspenseQuery({ queryKey, queryFn });
}

async function getProductById(id: string | undefined): Promise<Product> {
  const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  const endpoint = baseURL + `products/${id}`;
  const data = await fetch(endpoint);

  // Safeguards
  if (!data.ok) throw new Error(`Product not found: ${data.status}`);

  return data.json();
}
