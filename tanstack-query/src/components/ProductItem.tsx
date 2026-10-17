// Node modules
import { Link } from "react-router-dom";

// Project files
import { Product } from "../types/types";

interface Props {
  product: Product;
  category?: string;
  deleteProduct: any;
}

export default function ProductItem({ product, category, deleteProduct }: Props) {
  const { id, image, name, price } = product;

  return (
    <div className="product">
      <Link to={`/${category}/${id}`}>
        <img src={`/images/${image}`} alt={name} />
        <h3>{name}</h3>
        <p>${price}</p>
      </Link>
      <button onClick={() => deleteProduct.mutation(id)}>Delete</button>
    </div>
  );
}
