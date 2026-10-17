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
  const errPro = <h1>Sorry, failed to load products.</h1>;
  const errCat = <h1>Sorry, failed to load cart.</h1>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route
          path="/"
          element={
            <Suspense fallback={<Spinner />}>
              <Products />
            </Suspense>
          }
          errorElement={errPro}
        />
        <Route
          path="/:category"
          element={
            <Suspense fallback={<Spinner />}>
              <Products />
            </Suspense>
          }
        />
        <Route
          path="/:category/:id"
          element={
            <Suspense fallback={<Spinner />}>
              <Detail />
            </Suspense>
          }
        />
        <Route path="/cart" element={<Cart />} errorElement={errCat} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faker" element={<Faker />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
