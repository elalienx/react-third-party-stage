// Node modules
import { Suspense } from "react";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";

// Project files
import Spinner from "./components/Spinner.tsx";
import Layout from "./Layout.tsx";
import Account from "./pages/Account.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import Detail from "./pages/Detail.tsx";
import Faker from "./pages/Faker.tsx";
import Products from "./pages/Products.tsx";
import "./styles/App.css";

export default function App() {
  // Derived state
  const elementDetail = (
    <Suspense fallback={<Spinner />}>
      <Detail />
    </Suspense>
  );
  const elementProduct = (
    <Suspense fallback={<Spinner />}>
      <Products />
    </Suspense>
  );
  const errorCart = <h1>Sorry, failed to load cart.</h1>;
  const errorProduct = <h1>Sorry, failed to load products.</h1>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={elementProduct} errorElement={errorProduct} />
        <Route path="/:category" element={elementProduct} />
        <Route path="/:category/:id" element={elementDetail} />
        <Route path="/cart" element={<Cart />} errorElement={errorCart} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faker" element={<Faker />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
