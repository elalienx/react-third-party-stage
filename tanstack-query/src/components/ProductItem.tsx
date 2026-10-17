// Node modules
import { Link } from "react-router-dom";

// Project files
import { Product } from "../types/types";

interface Props {
  product: Product;
  category: string | undefined;
  onDelete: (id: number) => void;
}

export default function ProductItem({ product, category, onDelete }: Props) {
  const { id, image, name, price } = product;

  // Safeguards
  if (!id) return <p>Can't render a product item without id</p>;
  if (!category) return <p>Can't render a product item without category</p>;

  return (
    <div className="product">
      <Link to={`/${category}/${id}`}>
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
      </Link>
      <button onClick={() => onDelete(id)}>Delete</button>
    </div>
  );
}
