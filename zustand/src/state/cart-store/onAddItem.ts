// Project files
import { CartItem } from "../../types/types";

function onAddItem(cart: CartItem[], id: string, sku: string) {
  const itemInCart = cart.find((item) => item.sku === sku);
  const newItem = [...cart, { id: parseInt(id), sku, quantity: 1 }];
  const existingItems = cart.map((item) => {
    // Safeguard
    if (item.sku !== sku) return item;

    return { ...item, quantity: item.quantity + 1 };
  });
  const updatedCart = itemInCart ? existingItems : newItem;

  return updatedCart;
}

export default onAddItem;
