// Node modules
import { useQuery } from "@tanstack/react-query";
import { Product } from "../types/types";

export default function useGetProducts() {
  const queryKey = ["products"];
  const queryFn = getProducts;

  return useQuery({ queryKey, queryFn });
}

async function getProducts(): Promise<Product[]> {
  const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  const endpoint = baseURL + "XXXproducts";
  const data = await fetch(endpoint);

  // Safeguards
  if (!data.ok) throw new Error(`Products not found: ${data.status}`);

  return data.json();
}
