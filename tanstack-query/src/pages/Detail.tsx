// Node modules
import { useState } from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import toast from "react-hot-toast";

// Project files
import Spinner from "../components/Spinner";
import { useCart } from "../context/cartContext";
import type { Product } from "../types/types";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  // Global state
  const { setCart } = useCart();
  const { id } = useParams();
  const { data, isLoading, error } = useQuery({
    queryKey: ["products", id],
    queryFn: fetchProduct,
  });

  // Local state
  const [sku, setSku] = useState("");

  // Derived state
  const product = data;

  // Methods
  async function fetchProduct(): Promise<Product> {
    const baseURL = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = baseURL + `products/${id}`;
    const data = await fetch(endpoint);

    // Safeguard
    if (!data.ok) throw new Error(`Product not found: ${data.status}`);

    return data.json();
  }

  // Safeguards
  if (isLoading) return <Spinner />;
  if (!product || !id) return <PageNotFound />;
  if (error) throw error;

  return (
    <div id="detail">
      <h1>{product.name}</h1>
      <p>{product.description}</p>
      <p id="price">${product.price}</p>

      <select id="size" value={sku} onChange={(e) => setSku(e.target.value)}>
        <option value="">What size?</option>
        {product.skus.map((item) => (
          <option key={item.sku} value={item.sku}>
            {item.size}
          </option>
        ))}
      </select>

      <p>
        <button
          disabled={!sku}
          className="btn btn-primary"
          onClick={() => {
            if (!sku) return alert("Select size.");
            setCart((cart) => {
              const itemInCart = cart.find((i) => i.sku === sku);
              return itemInCart
                ? cart.map((item) =>
                    item.sku === sku
                      ? { ...item, quantity: item.quantity + 1 }
                      : item,
                  )
                : [...cart, { id: parseInt(id), sku, quantity: 1 }];
            });
            toast("Added to cart", { icon: "🛒" });
          }}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
