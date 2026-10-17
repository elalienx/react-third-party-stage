// Node modules
import React from "react";
import ReactDOM from "react-dom/client";
import { ErrorBoundary } from "react-error-boundary";
import { Toaster } from "react-hot-toast";

// Project files
import Routes from "./Routes";
import "./styles/main.css";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ErrorBoundary fallback={<h1>Sorry, an error occurred.</h1>}>
      <Toaster />
      <Routes />
    </ErrorBoundary>
  </React.StrictMode>,
);
