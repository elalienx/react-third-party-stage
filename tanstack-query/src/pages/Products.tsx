// Node modules
import { useState } from "react";
import { useParams } from "react-router-dom";

// Project files
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";
import { Product } from "../types/types";
import PageNotFound from "./PageNotFound";
import { useQuery } from "@tanstack/react-query";

export default function Products() {
  // Global state
  const { category } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["product"],
    queryFn: fetchProducts,
  });

  // Local state
  const [size, setSize] = useState("");

  // Derived state
  const products = data;

  // Methods
  async function fetchProducts(): Promise<Product[]> {
    const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = baseURL + "products";
    const data = await fetch(endpoint);

    // Safeguard
    if (!data.ok) throw new Error(`Product not found: ${data.status}`);

    return data.json();
  }

  // Safeguards
  if (error) throw error;
  if (isLoading) return <Spinner />;
  if (!products || products.length === 0) return <PageNotFound />;

  const productsBySKU = products.filter((item) =>
    item.skus.find((sku) => sku.size === parseInt(size)),
  );
  const filteredProducts = size ? productsBySKU : products;

  return (
    <>
      {/* User interface */}
      <header id="filters">
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
      </header>

      {/* Content */}
      <section id="products">
        {filteredProducts.map((item) => (
          <ProductItem key={item.id} product={item} category={category} />
        ))}
      </section>
    </>
  );
}
