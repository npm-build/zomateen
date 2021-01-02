import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
// import { motion } from "framer-motion";
import { useHistory } from "react-router-dom";
import axios from "axios";

import back from "../../assets/img/arrow-left.svg";
import UserReview from "../../components/UserReview";
// import { pageVariants, pageTransition } from "../../utils/Animations";
import { FoodType } from "../../utils/Types";
import AddToCartBtn from "../../components/AddToCartButton";
import "../../styles/IndividualItem.styles.scss";

const IndividualItem: React.FC<any> = ({ match }) => {
  const {
    params: { foodId },
  } = match;

  const accessToken = Cookies.get("accessToken");

  // Get the food using the FoodId from server
  const [food, setFood] = useState<FoodType>();
  const history = useHistory();

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

  useEffect(() => {
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
            <img
              className="individual-food-item-img"
              src={`http://localhost:8000/${food.filePath}`}
              alt="food img"
            />
            <div className="individual-food-item-text">
              <h5 className="individual-food-item-text-title">{food.name}</h5>
              <h5 className="individual-food-item-text-rating">4 Star</h5>
              <h5 className="individual-food-item-text-tried-by">Tried by: </h5>
              <div>
                <h5 className="individual-food-item-text-price">
                  Rs {food.price}
                </h5>
                <AddToCartBtn />
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
