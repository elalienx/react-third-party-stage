// Node modules
import { Link } from "react-router-dom";

// Project files
import { Product } from "../types/types";

interface Props {
  product: Product;
  category?: string;
}

export default function ProductItem({ product, category }: Props) {
  return (
    <div className="product">
      <Link to={`/${category}/${product.id}`}>
        <img src={`/images/${product.image}`} alt={product.name} />
        <h3>{product.name}</h3>
        <p>${product.price}</p>
      </Link>
    </div>
  );
}
