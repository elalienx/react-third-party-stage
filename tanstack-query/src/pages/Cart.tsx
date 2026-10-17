// Node modules
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

// Project files
import CartItem from "../components/CartItem";
import Spinner from "../components/Spinner";
import { useCart } from "../context/cartContext";
import { Product } from "../types/types";

export default function Cart() {
  // Global state
  const { cart, setCart } = useCart();
  const navigate = useNavigate();

  // Local state
  const [products, setProducts] = useState<Product[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  // Methods
  useEffect(() => {
    async function fetchData() {
      try {
        const url =
          import.meta.env.VITE_APP_API_BASE_URL +
          "products?" +
          cart.map(({ id }) => "id=" + id).join("&");
        const data = await fetch(url);
        if (!data.ok) {
          throw new Error(`Product not found: ${data.status}`);
        }
        const products = await data.json();
        setProducts(products);
      } catch (error) {
        setError(error as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, []);

  function updateQuantity(sku: string, quantity: number) {
    const cartWithoutItem = cart.filter((item) => item.sku !== sku);
    const cartWithNewQuantity = cart.map((item) =>
      item.sku === sku ? { ...item, quantity } : item,
    );
    const newCart = quantity === 0 ? cartWithoutItem : cartWithNewQuantity;

    setCart(newCart);
  }

  // Safeguards
  if (loading || !products) return <Spinner />;
  if (error) throw error;

  const numItemsInCart = cart.reduce((total, item) => total + item.quantity, 0);

  return (
    <section id="cart">
      <h1>
        {numItemsInCart === 0
          ? "Your cart is empty"
          : `${numItemsInCart} Item${numItemsInCart > 1 ? "s" : ""} in My Cart`}
      </h1>
      <ul>
        {cart.map((cartItem) => {
          const product = products.find((p) => p.id === cartItem.id);
          if (!product) throw new Error("Product not found");
          return (
            <CartItem
              key={cartItem.sku}
              cartItem={cartItem}
              product={product}
              updateQuantity={updateQuantity}
            />
          );
        })}
      </ul>
      {cart.length > 0 && (
        <button className="btn btn-primary" onClick={() => navigate("/checkout")}>
          Checkout
        </button>
      )}
    </section>
  );
}
