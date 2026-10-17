// Node modules
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/types";

export function useGetProductById(id: string | undefined) {
  const enabled = !!id;
  const queryKey = ["products", id];
  const queryFn = () => getProductById(id);

  return useQuery({ enabled, queryKey, queryFn });
}

async function getProductById(id: string | undefined): Promise<Product> {
  const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  const endpoint = baseURL + `products/${id}`;
  const data = await fetch(endpoint);

  // Safeguards
  if (!data.ok) throw new Error(`Product not found: ${data.status}`);

  return data.json();
}
