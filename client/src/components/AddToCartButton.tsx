import { useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import add from "../assets/img/add.svg";
import "../styles/AddToCart.styles.scss";

const AddToCartButton: React.FC<{ fdId: number }> = ({ fdId }) => {
  const accessToken = Cookies.get("accessToken");

  async function AddToCart() {
    await axios
      .post(
        "/api/food/addtocart",
        { foodId: fdId },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    AddToCart();
  }, []);

  return (
    <button onClick={() => AddToCart()} className="add-to-cart-btn">
      <img className="add-to-cart-btn-img" src={add} alt="+" />
      <span>Add to Cart</span>
    </button>
  );
};

export default AddToCartButton;
