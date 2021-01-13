import { useState, useEffect, useRef, RefObject } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { FoodType, UserType } from "../../utils/Types";
// import bg from "../../assets/img/cartbg.png";
import cross from "../../assets/img/x.svg";
import "../../styles/UserCart.styles.scss";

function ShoppingCart() {
  const accessToken = Cookies.get("accessToken");
  const [foodItems, setFoodItems] = useState<FoodType[]>([]);
  const [total, setTotal] = useState<number>(0);
  const [user, setUser] = useState<UserType | null>(null);
  const messagesRef: RefObject<HTMLInputElement> = useRef(null);

  async function getCurrentUser() {
    await axios
      .get("/api/user/getUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setUser(res.data);
      })
      .catch((e) => {
        console.error(e);
      });
  }

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

  async function placeOrder() {
    const foodIds: number[] = [];

    for (const food of foodItems) {
      foodIds.push(food.foodId);
    }

    await axios
      .post(
        "/api/order/add",
        {
          foodIds,
          customerName: user?.userName,
          messages: messagesRef.current!.value,
        },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  function calculateSum(quantity: number) {
    let sum = 0;
    console.log(quantity);

    for (const food of foodItems) {
      sum += food.price * quantity;
    }

    setTotal(sum);
  }

  useEffect(() => {
    getCurrentUser();
    getCartItems();
    calculateSum(1);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <main id="cart-page">
      <div id="cart-head">
        <h1>Your Orders</h1>
        <button onClick={() => placeOrder()} id="cart-order">
          Place Order
        </button>
      </div>
      <div id="cart-body">
        <div id="cart-content">
          {foodItems?.map((food) => (
            <CartItem
              key={food.foodId}
              foodItem={food}
              onDelete={() => getCartItems()}
              calculateSum={calculateSum}
            />
          ))}
          <div id="msg">
            <h3 id="msg-head">Any Message to be conveyed to your chef?</h3>
            <input
              id="msg-input"
              type="text"
              name="message"
              placeholder="Example: Extra Spicy, Not too Oily"
              ref={messagesRef}
            />
          </div>
        </div>
        <hr />
        <div id="cart-total">
          <h1>Total:</h1>
          <h2>Rs {total}</h2>
        </div>
      </div>
    </main>
  );
}

export default ShoppingCart;

const CartItem: React.FC<{
  foodItem: FoodType;
  onDelete: () => void;
  calculateSum: (quantity: number) => void;
}> = ({ foodItem, onDelete, calculateSum }) => {
  const accessToken = Cookies.get("accessToken");
  const [quantity, setQuantity] = useState(1);

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

    setQuantity(0);
  }

  useEffect(() => {
    calculateSum(quantity);

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quantity]);

  return (
    <div className="cart-item">
      <div className="div-1">
        <img src={`http://localhost:8000/${foodItem.filePath}`} alt="img" />
        <div className="cart-name">
          <h1>{foodItem.name}</h1>
          <p>
            Quantity -{" "}
            <input
              type="number"
              onChange={(e) => {
                if (
                  !isNaN(parseInt(e.target.value)) &&
                  parseInt(e.target.value) > 0
                ) {
                  return setQuantity(parseInt(e.target.value));
                }
              }}
              value={quantity}
            />
          </p>
        </div>
      </div>
      <div className="div-2">
        <p>
          Rs <span className="cash">{foodItem.price}</span>
        </p>
        <button onClick={() => removeFromCart()}>
          <img src={cross} alt="img" />
        </button>
      </div>
    </div>
  );
};
