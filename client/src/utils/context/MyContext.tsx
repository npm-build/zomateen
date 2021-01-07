import { useState, useEffect, createContext } from "react";
import Cookies from "js-cookie";
import axios from "axios";

import { UserType } from "../Types";

const accessToken = Cookies.get("accessToken");

interface MyContextInterface {
  addToCart: (fdId: number) => void;
  saveCartToLocalStorage: () => void;
  saveCartToDB: () => void;
  removeFromCart: (fdId: number) => void;
  currentUser: UserType | null;
}

const MyContext = createContext<MyContextInterface | null>(null);

export const MyContextProvider: React.FC = ({ children }) => {
  const [currentUser, setcurrentUser] = useState<UserType | null>(null);
  let cartContents: number[] = [];

  async function getCurrentUser() {
    await axios
      .get("/api/user/getUser", {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
      .then((res) => {
        setcurrentUser(res.data);
      })
      .catch((e) => {
        console.log(e);
      });
  }

  useEffect(() => {
    getCurrentUser();
  }, []);

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
    currentUser,
    addToCart,
    saveCartToLocalStorage,
    removeFromCart,
    saveCartToDB,
  };

  return <MyContext.Provider value={value}>{children}</MyContext.Provider>;
};

export default MyContext;
