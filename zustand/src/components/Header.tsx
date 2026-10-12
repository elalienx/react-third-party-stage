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
  const myUser = { id: 1, email: "cory@example.com" };
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
          {user && (
            <li>
              <NavLink to="/account">Account</NavLink>
            </li>
          )}
          {!user && (
            <li>
              <button onClick={() => login(myUser)}>Log in</button>
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
