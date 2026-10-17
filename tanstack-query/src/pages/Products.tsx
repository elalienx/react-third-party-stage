// Node modules
import { useState } from "react";
import { useParams } from "react-router-dom";

// Project files
import ProductItem from "../components/ProductItem";
import Spinner from "../components/Spinner";
import useGetProducts from "../queries/useGetProducts";
import PageNotFound from "./PageNotFound";

export default function Products() {
  // Global state
  const { category } = useParams();
  const { data: products, isLoading } = useGetProducts();

  // Local state
  const [size, setSize] = useState("");

  // Safeguards
  if (isLoading) return <Spinner />;
  if (!products || products.length === 0) return <PageNotFound />;

  const productsBySKU = products.filter((item) =>
    item.skus.find((sku) => sku.size === parseInt(size)),
  );
  const filteredProducts = size ? productsBySKU : products;

  return (
    <>
      {/* User interface */}
      <section id="filters">
        {/* Selectbox */}
        <label htmlFor="size">Filter by Size:</label>
        <select id="size" value={size} onChange={(event) => setSize(event.target.value)}>
          <option value="">All sizes</option>
          <option value="7">7</option>
          <option value="8">8</option>
          <option value="9">9</option>
        </select>

        {/* Results */}
        {size && <h2>Found {filteredProducts.length} items</h2>}
        {!size && <h2>Viewing all sizes</h2>}
      </section>

      {/* Content */}
      <section id="products">
        {filteredProducts.map((item) => (
          <ProductItem key={item.id} product={item} category={category} />
        ))}
      </section>
    </>
  );
}
