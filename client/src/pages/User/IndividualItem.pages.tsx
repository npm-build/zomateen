import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import axios from "axios";

import back from "../../assets/img/arrow-left.svg";
import UserReview from "../../components/UserReview";
// import { pageVariants, pageTransition } from "../../utils/Animations";
import { FoodType, UserType } from "../../utils/Types";
import heart from "../../assets/img/heart.svg";
import AddToCartBtn from "../../components/AddToCartButton";
import "../../styles/IndividualItem.styles.scss";

const IndividualItem: React.FC<any> = ({ match }) => {
  const {
    params: { foodId },
  } = match;

  const accessToken = Cookies.get("accessToken");
  const [image, setImage] = useState(false);
  const [food, setFood] = useState<FoodType>();
  const [user, setUser] = useState<UserType | null>(null);
  const history = useHistory();

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

  async function getFood() {
    console.log(foodId);
    await axios
      .post(
        "/api/food/getfood",
        { foodId },
        {
          headers: {
            Authorization: "Bearer " + accessToken,
          },
        }
      )
      .then((res) => setFood(res.data))
      .catch((e) => console.log(e));
  }

  async function handleToggle() {
    image
      ? await axios
          .patch(
            "/api/user/deletefromfavorites",
            { usn: user?.usn, foodId },
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setImage(false);
          })
          .catch((e) => console.error(e))
      : await axios
          .patch(
            "/api/user/addtofavorites",
            { usn: user?.usn, foodId },
            {
              headers: {
                Authorization: "Bearer " + accessToken,
              },
            }
          )
          .then((res) => {
            console.log(res);
            setImage(true);
          })
          .catch((e) => console.error(e));
  }

  useEffect(() => {
    getCurrentUser();
    getFood();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      // initial="initial"
      // animate="in"
      // exit="out"
      // variants={pageVariants}
      // transition={pageTransition}
      className="individual-food-item"
    >
      <button className="back-btn" onClick={() => history.goBack()}>
        <img src={back} alt="go back" />
      </button>

      {food && (
        <main className="individual-food-item-content">
          <div className="item">
            <div className="individual-food-img">
              <img
                className="individual-food-item-img"
                src={`http://localhost:8000/${food.filePath}`}
                alt="food img"
              />
              <button
                onClick={() => handleToggle()}
                className="individual-food-item-img-btn"
              >
                {image ? (
                  <i className="fas fa-heart" />
                ) : (
                  <img src={heart} alt="favorite" />
                )}
              </button>
            </div>
            <div className="individual-food-item-text">
              <h5 className="individual-food-item-text-title">{food.name}</h5>
              <h5 className="individual-food-item-text-rating">4 Star</h5>
              <h5 className="individual-food-item-text-tried-by">Tried by: </h5>
              <div>
                <h5 className="individual-food-item-text-price">
                  Rs {food.price}
                </h5>
                <AddToCartBtn fdId={food.foodId} />
              </div>
            </div>
          </div>
          <div className="individual-food-item-reviews">
            <h3>Reviews</h3>
            <UserReview />
            <UserReview />
            <UserReview />
            <UserReview />
          </div>

          <div className="individual-food-item-similar-food">
            {/* <FoodItem link='/food/1' />
					  <FoodItem link='/food/1' />
					  <FoodItem link='/food/1' />
					  <FoodItem link='/food/1' />
					  <FoodItem link='/food/1' /> */}
          </div>
        </main>
      )}
    </div>
  );
};

export default IndividualItem;
