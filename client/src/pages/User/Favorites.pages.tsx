import { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { UserType, FoodType } from "../../utils/Types";
// import { pageVariants, pageTransition } from '../../utils/Animations';
// import { motion } from 'framer-motion';
import cross from "../../assets/img/x.svg";
import "../../styles/UserFavorites.styles.scss";

const FavoritePage: React.FC = () => {
  const accessToken = Cookies.get("accessToken");
  const [favorites, setFavorites] = useState<FoodType[] | null>(null);
  const [user, setUser] = useState<UserType | null>(null);

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

  async function getFavorites() {
    await axios
      .post(
        "/api/user/getfavorites",
        { usn: user?.usn },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      )
      .then((res) => {
        setFavorites(res.data.favorites);
      })
      .catch((e) => console.log(e));
  }

  useEffect(() => {
    getCurrentUser();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    getFavorites();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [user]);

  return (
    <main id="favorites-page">
      <div id="favorites-head">
        <h1>Your Favorites</h1>
      </div>
      <div id="favorites-body">
        <div id="favorites-content">
          {favorites?.map((foodItem) => (
            <FavoriteItem
              key={foodItem.foodId}
              foodItem={foodItem}
              usn={user!.usn}
              getItAgain={() => getFavorites()}
            />
          ))}
        </div>
      </div>
    </main>
  );
};

const FavoriteItem: React.FC<{
  foodItem: FoodType;
  usn: string;
  getItAgain: () => void;
}> = ({ foodItem, usn, getItAgain }) => {
  const accessToken = Cookies.get("accessToken");

  async function removeFromFavorites() {
    await axios
      .patch(
        "/api/user/deletefromfavorites",
        { usn, foodId: foodItem.foodId },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => {
        console.log(res);
        getItAgain();
      })
      .catch((e) => console.error(e));
  }

  return (
    <div className="favorite">
      <div className="div-1">
        <img src={`http://localhost:8000/${foodItem.filePath}`} alt="img" />
        <div className="cart-name">
          <h1>{foodItem.name}</h1>
          <p>Quantity - </p>
        </div>
      </div>
      <div className="div-2">
        <p>
          Rs <span className="cash">{foodItem.price}</span>
        </p>
        <button onClick={() => removeFromFavorites()}>
          <img src={cross} alt="img" />
        </button>
      </div>
    </div>
  );
};

export default FavoritePage;
