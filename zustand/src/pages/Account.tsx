// Project files
import useShoeStore from "../state/shoeStore";

export function Account() {
  const user = useShoeStore((state) => state.user); // complex syntax but performant
  // const { user } = useShoeStore(); // simplete syntax

  return (
    <>
      <h1>Account</h1>
      {user ? <p>Email: {user.email}</p> : <p>Please log in.</p>}
    </>
  );
}
