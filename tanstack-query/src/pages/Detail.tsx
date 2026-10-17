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
  const { cart, setCart } = useCart();
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

    // Safeguards
    if (!data.ok) throw new Error(`Product not found: ${data.status}`);

    return data.json();
  }

  function onAddToCart() {
    // Safeguards
    if (!sku || !id) return alert("Select size.");

    setCart(getUpdatedCart(id, sku));
    toast("Added to cart", { icon: "🛒" });
  }

  function getUpdatedCart(id: string, sku: string) {
    const itemInCart = cart.find((i) => i.sku === sku);
    const appendedCart = [...cart, { id: parseInt(id), sku, quantity: 1 }];
    const incrementedCart = cart.map((item) => {
      const editedItem = { ...item, quantity: item.quantity + 1 };

      return item.sku === sku ? editedItem : item;
    });

    return itemInCart ? incrementedCart : appendedCart;
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
          onClick={onAddToCart}
        >
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
