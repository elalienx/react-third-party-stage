// Node modules
import { useMutation, useQueryClient } from "@tanstack/react-query";

export default function useDeleteProduct() {
  const queryKey = ["products"];
  const queryClient = useQueryClient();
  const mutationFn = deleteProduct;
  const onSettled = () => queryClient.invalidateQueries({ queryKey });

  return useMutation({ mutationFn, onSettled });
}

async function deleteProduct(id: number): Promise<void> {
  const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
  const endpoint = baseURL + `products/${id}`;
  const options = { method: "DELETE" };
  const response = await fetch(endpoint, options);

  // Safeguards
  if (!response.ok) throw response;
}
