import "./styles/App.css";
import Products from "./pages/Products.tsx";
import {
  Route,
  createBrowserRouter,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Detail from "./pages/Detail.tsx";
import Cart from "./pages/Cart.tsx";
import Checkout from "./pages/Checkout.tsx";
import Faker from "./Faker.tsx";
import { Layout } from "./Layout.tsx";
import { Account } from "./pages/Account.tsx";

export default function App() {
  const errPro = <h1>Sorry, failed to load products.</h1>;
  const errCat = <h1>Sorry, failed to load cart.</h1>;

  const router = createBrowserRouter(
    createRoutesFromElements(
      <Route path="/" element={<Layout />}>
        <Route path="/" element={<Products />} errorElement={errPro} />
        <Route path="/:category" element={<Products />} errorElement={errPro} />
        <Route path="/:category/:id" element={<Detail />} />
        <Route path="/cart" element={<Cart />} errorElement={errCat} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/account" element={<Account />} />
        <Route path="/faker" element={<Faker />} />
      </Route>,
    ),
  );

  return <RouterProvider router={router} />;
}
