import { useContext } from "react";

import useMyContext from "../utils/context/MyContext";
import add from "../assets/img/add.svg";
import "../styles/AddToCart.styles.scss";

const AddToCartButton: React.FC<{ fdId: number }> = ({ fdId }) => {
  const value = useContext(useMyContext);

  async function AddToCart() {
    value?.addToCart(fdId);
    // value?.saveCartToDB();
  }

  return (
    <button onClick={AddToCart} className="add-to-cart-btn">
      <img className="add-to-cart-btn-img" src={add} alt="+" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;
