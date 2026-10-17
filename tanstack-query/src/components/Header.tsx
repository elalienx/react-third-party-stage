// Node modules
import { Link, NavLink } from "react-router-dom";

// Project files
import { useCart } from "../context/cartContext";
import { useUser } from "../context/userContext";

export default function Header() {
  // Global state
  const { cart } = useCart();
  const { user, setUser } = useUser();

  // Derived state
  const defaultUser = { id: 1, email: "cory@example.com" };
  const itemsInCart = cart.reduce((prev, acc) => {
    return prev + acc.quantity;
  }, 0);

  return (
    <header>
      <nav>
        <ul>
          <li>
            <Link to="/">
              <img alt="Carved Rock Fitness" src="/images/logo.png" />
            </Link>
          </li>
          <li>
            <NavLink to="/shoes">Shoes</NavLink>
          </li>
          <li>
            <NavLink to="/cart">Cart ({itemsInCart})</NavLink>
          </li>
          {/* Allow user to login */}
          {!user && (
            <button onClick={() => setUser(defaultUser)}>Log in</button>
          )}

          {/* Allow user to manage account */}
          {user && (
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
          )}
          {user && (
            <li>
              <button onClick={() => setUser(null)}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
