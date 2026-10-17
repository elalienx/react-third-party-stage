// Node modules
import { useState } from "react";
import { useParams } from "react-router-dom";
import toast from "react-hot-toast";

// Project files
import Spinner from "../components/Spinner";
import { useCart } from "../context/cartContext";
import useGetProductById from "../queries/useGetProductById";
import PageNotFound from "./PageNotFound";

export default function Detail() {
  // Global state
  const { cart, setCart } = useCart();
  const { id } = useParams();
  const { data: product, isLoading, error } = useGetProductById(id);

  // Local state
  const [sku, setSku] = useState("");

  // Methods
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
        <button disabled={!sku} className="btn btn-primary" onClick={onAddToCart}>
          Add to cart
        </button>
      </p>
      <img src={`/images/${product.image}`} alt={product.category} />
    </div>
  );
}
