import { createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

const accessToken = Cookies.get("accessToken");

export interface CartContextInterface {
  addToCart: (fdId: number) => void;
  saveCartToLocalStorage: (props: void) => void;
  saveCartToDB: (props: void) => void;
  removeFromCart: (fdId: number) => void;
}

const CartContext = createContext<CartContextInterface | null>(null);

export const CartContextProvider: React.FC = ({ children }) => {
  let cartContents: number[] = [];
  //   const [cartOwner, setCartOwner] = useState<string>();
  //   const [loading, setLoading] = useState(true);

  async function addToCart(fdId: number) {
    console.log("Added to Cart");
    cartContents.push(fdId);
    console.log(fdId);

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
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function saveCartToLocalStorage() {
    console.log("Saved to local storage");
    localStorage.setItem("cartItems", JSON.stringify(cartContents));
  }

  async function saveCartToDB() {
    console.log(cartContents);
    console.log("Saved to Data Base");
    console.log("Sending to DB");

    await axios
      .post(
        "/api/food/addtocart",
        { foodIds: cartContents },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  function removeFromCart(fdId: number) {
    console.log("Saved to local storage");
    // eslint-disable-next-line array-callback-return
    const filteredArray = cartContents.filter((foodId) => {
      if (foodId !== fdId) {
        return foodId;
      }
    });

    cartContents = filteredArray;
  }

  const value = {
    addToCart,
    saveCartToLocalStorage,
    removeFromCart,
    saveCartToDB,
  };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};

export default CartContext;
