// Node modules
import { useState } from "react";
import { useParams, Link } from "react-router-dom";

// Project files
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

  // Component
  function renderProduct(p: Product) {
    return (
      <div key={p.id} className="product">
        <Link to={`/${category}/${p.id}`}>
          <img src={`/images/${p.image}`} alt={p.name} />
          <h3>{p.name}</h3>
          <p>${p.price}</p>
        </Link>
      </div>
    );
  }

  // Safeguards
  if (error) throw error;
  if (isLoading) return <Spinner />;
  if (!products || products.length === 0) return <PageNotFound />;

  const filteredProducts = size
    ? products.filter((product) =>
        product.skus.find((sku) => sku.size === parseInt(size)),
      )
    : products;

  return (
    <>
      <section id="filters">
        <label htmlFor="size">Filter by Size:</label>{" "}
        <select
          id="size"
          value={size}
          onChange={(e) => setSize(e.target.value)}
        >
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>
        {size && <h2>Found {filteredProducts.length} items</h2>}
      </section>
      <section id="products">{filteredProducts.map(renderProduct)}</section>
    </>
  );
}
