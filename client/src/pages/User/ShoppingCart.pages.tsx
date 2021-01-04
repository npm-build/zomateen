import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { FoodType } from "../../utils/Types";
// import bg from "../../assets/img/cartbg.png";
import cross from "../../assets/img/x.svg";
import "../../styles/UserCart.styles.scss";

function ShoppingCart() {
  const accessToken = Cookies.get("accessToken");
  const [foodItems, setFoodItems] = useState<FoodType[]>([]);

  async function getCartItems() {
    await axios
      .get("/api/food/cartitems", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        // console.log(res.data);
        setFoodItems(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function calculateSum() {
    let sum = 0;

    for (const food of foodItems) {
      sum += food.price;
    }

    return sum;
  }

  useEffect(() => {
    getCartItems();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="cart-page">
      <div id="cart-head">
        <h1>Your Orders</h1>
        <button id="cart-order">Place Order</button>
      </div>
      <div id="cart-body">
        <div id="cart-content">
          {foodItems?.map((food) => (
            <CartItem
              key={food.foodId}
              foodItem={food}
              onDelete={() => getCartItems()}
            />
          ))}
        </div>
        <hr />
        <div id="cart-total">
          <h1>Total:</h1>
          <h2>Rs {calculateSum()}</h2>
        </div>
      </div>
    </main>
  );
}

export default ShoppingCart;

const CartItem: React.FC<{ foodItem: FoodType; onDelete: () => void }> = ({
  foodItem,
  onDelete,
}) => {
  const accessToken = Cookies.get("accessToken");

  async function removeFromCart() {
    await axios
      .delete("/api/food/cartitems", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
        data: { foodId: foodItem.foodId },
      })
      .then((res) => {
        console.log(res);
        onDelete();
      });
  }
  return (
    <div className="cart-item">
      <div className="div-1">
        <img src={`http://localhost:8000/${foodItem.filePath}`} alt="img" />
        <h1>{foodItem.name}</h1>
      </div>
      <div className="div-2">
        <p>Rs {foodItem.price}</p>
        <button onClick={() => removeFromCart()}>
          <img src={cross} alt="img" />
        </button>
      </div>
    </div>
  );
};
