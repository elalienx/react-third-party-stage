// Node modules
import React from "react";
import { ErrorBoundary } from "react-error-boundary";
import ReactDOM from "react-dom/client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Toaster } from "react-hot-toast";

// Project files
import { CartProvider } from "./context/cartContext";
import { UserProvider } from "./context/userContext";
import Routes from "./Routes";
import "./styles/main.css";

// Properties
const queryClient = new QueryClient();

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <QueryClientProvider client={queryClient}>
        <CartProvider>
          <UserProvider>
            <Toaster />
            <Routes />
            <ReactQueryDevtools />
          </UserProvider>
        </CartProvider>
      </QueryClientProvider>
    </ErrorBoundary>
  </React.StrictMode>,
);
