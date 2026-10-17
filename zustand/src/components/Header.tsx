// Node modules
import { Link, NavLink } from "react-router-dom";

// Project files
import useShoeStore from "../state/shoeStore";
import useCartStore from "../state/cartStore";

export default function Header() {
  // Global state
  const { cart } = useCartStore();
  const { user, login, logout } = useShoeStore();

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
            <li>
              <button onClick={() => login(defaultUser)}>Log in</button>
            </li>
          )}

          {/* Allow user to manage account */}
          {user && (
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
          )}
          {user && (
            <li>
              <button onClick={() => logout()}>Log out</button>
            </li>
          )}
        </ul>
      </nav>
    </header>
  );
}
