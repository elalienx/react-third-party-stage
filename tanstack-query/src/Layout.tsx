// Node modules
import { ErrorBoundary } from "react-error-boundary";
import { Outlet } from "react-router-dom";

// Project files
import Header from "./components/Header";

export default function Layout() {
  return (
    <div className="content">
      <Header />
      <main>
        <ErrorBoundary
          fallback={<h1>Sorry, an error occurred above routes.</h1>}
        >
          <Outlet />
        </ErrorBoundary>
      </main>
    </div>
  );
}
