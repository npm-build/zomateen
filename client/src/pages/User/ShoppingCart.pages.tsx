import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import Dosa from "../../assets/img/dosa.png";
import { FoodType } from "../../utils/Types";
// import bg from "../../assets/img/cartbg.png";
import "../../styles/UserCart.styles.scss";

function ShoppingCart() {
  const accessToken = Cookies.get("accessToken");
  const [cartItems, setCartItems] = useState<FoodType[]>([]);

  async function getCartItems() {
    await axios
      .get("/api/food/cartitems", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setCartItems(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getCartItems();
  }, []);

  return (
    <main id="cart-page">
      <div id="cart-head">
        {console.log(cartItems)}
        <h1>Your Orders</h1>
        <button id="cart-order">Place Order</button>
      </div>
      <div id="cart-body">
        <div id="cart-content">
          <div className="cart-item">
            <img src={Dosa} alt="img" />
            <h1>Masala Dosa</h1>
            <p>Rs 40</p>
          </div>
        </div>
        <hr />
        <h1>Total: </h1>
        <p>Rs 40</p>
      </div>
    </main>
  );
}

export default ShoppingCart;
