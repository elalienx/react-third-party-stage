// Node modules
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

// Project files
import ProductItem from "../components/ProductItem";
import useGetProducts from "../queries/useGetProducts";
import PageNotFound from "./PageNotFound";

export default function Products() {
  // Global state
  const { category } = useParams();
  const queryClient = useQueryClient();
  const { data: products } = useGetProducts();

  // Local state
  const [size, setSize] = useState("");

  // Derived state
  const productsBySKU = products.filter((item) =>
    item.skus.find((sku) => sku.size === parseInt(size)),
  );
  const filteredProducts = size ? productsBySKU : products;

  // Methods
  const deleteProduct = useMutation({
    mutationFn: async (id: number) => {
      const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
      const endpoint = baseURL + `products/${id}`;
      const options = { method: "DELETE" };
      const response = await fetch(endpoint, options);

      // Safeguards
      if (!response.ok) throw response;
    },
    onSettled: () => {
      queryClient.invalidateQueries({ queryKey: ["products"] });
    },
  });

  // Safeguards
  if (!products || products.length === 0) return <PageNotFound />;

  return (
    <>
      {/* User interface */}
      <section id="filters">
        {/* Selectbox */}
        <label htmlFor="size">Filter by Size:</label>
        <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>

        {/* Results */}
        {size && <h2>Found {filteredProducts.length} items</h2>}
        {!size && <h2>Viewing all sizes</h2>}
      </section>

      {/* Content */}
      <section id="products">
        {filteredProducts.map((item) => (
          <ProductItem
            key={item.id}
            product={item}
            category={category}
            deleteProduct={deleteProduct}
          />
        ))}
      </section>
    </>
  );
}
