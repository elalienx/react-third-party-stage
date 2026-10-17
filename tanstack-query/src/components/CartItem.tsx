// Node modules
import { ChangeEvent } from "react";

// Project files
import { CartItem as CartItemType, Product } from "../types/types";

interface Props {
  cartItem: CartItemType;
  product: Product;
  updateQuantity: (sku: string, quantity: number) => void;
}

export default function CartItem({ cartItem, product, updateQuantity }: Props) {
  // Derived state
  const { sku, quantity } = cartItem;
  const { name, image, skus, price } = product;
  const matchingSku = skus.find((s) => s.sku === sku);

  // Safeguards
  if (!matchingSku) throw new Error("Sku not found");

  return (
    <li className="cart-item">
      <img src={`/images/${image}`} alt={name} />
      <div>
        <h3>{name}</h3>
        <p>${price}</p>
        <p>Size: {matchingSku.size}</p>
        <p>
          <select
            aria-label={`Select quantity for ${name} size ${matchingSku.size}`}
            onChange={(event) => updateQuantity(sku, Number(event.target.value))}
            value={quantity}
          >
            <option value="0">Remove</option>
            <option value="1">1</option>
            <option value="2">2</option>
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
        </p>
      </div>
    </li>
  );
}
