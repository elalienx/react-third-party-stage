// Node modules
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactDOM from "react-dom/client";
import { Toaster } from "react-hot-toast";

// Project files
import { CartProvider } from "./context/cartContext";
import { UserProvider } from "./context/userContext";
import Routes from "./Routes";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <CartProvider>
        <UserProvider>
          <Toaster />
          <Routes />
        </UserProvider>
      </CartProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
