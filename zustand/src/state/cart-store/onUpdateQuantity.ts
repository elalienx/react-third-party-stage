// Project files
import { CartItem } from "../../types/types";

function onUpdateQuantity(cart: CartItem[], sku: string, quantity: number) {
  const filtered = cart.filter((i) => i.sku !== sku);
  const mapped = cart.map((i) => (i.sku === sku ? { ...i, quantity } : i));
  const updatedCart = quantity === 0 ? filtered : mapped;

  return updatedCart;
}

export default onUpdateQuantity;
