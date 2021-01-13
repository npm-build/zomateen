import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";

import { OrderType, FoodType } from "../utils/Types";
import "../styles/FoodProgress.styles.scss";

const FoodItem: React.FC<{
  food: FoodType;
  btn: {
    btnTxt: string;
    style: any;
    handleClick: (data: {
      id: number;
      status: string;
      isCompleted: boolean;
    }) => void;
  }[];
  order: OrderType;
}> = ({ food, btn, order }) => {
  const [data, setData] = useState<{
    id: number;
    status: string;
    isCompleted: boolean;
  } | null>(null);

  function setMyData() {
    if (btn[0].btnTxt === "Accept") {
      setData({
        id: order.orderId,
        status: "In Progress",
        isCompleted: false,
      });
    } else if (btn[0].btnTxt === "Done") {
      setData({
        id: order.orderId,
        status: "Order Ready",
        isCompleted: false,
      });
    }
  }

  useEffect(() => {
    setMyData();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="FoodProgressContent">
      <img
        className="FoodProgressImg"
        src={`http://localhost:8000/${food.filePath}`}
        alt="img"
      />
      <div className="FoodProgressText">
        <h6>{food.name}</h6>
      </div>
      <div className="FoodProgressExtra">
        <h4>In Cash</h4>
        {btn.map((b) => (
          <button
            key={b.btnTxt}
            style={b.style}
            onClick={() => b.handleClick(data!)}
            className="food-progress-btn"
          >
            {b.btnTxt}
          </button>
        ))}
      </div>
    </div>
  );
};

const FoodProgress: React.FC<{
  prp: {
    progressStyle: any;
    btn: {
      btnTxt: string;
      style: any;
      handleClick: (data: {
        id: number;
        status: string;
        isCompleted: boolean;
      }) => void;
    }[];
  };
  order: OrderType;
}> = ({ prp, order }) => {
  const accessToken = Cookies.get("accessToken");
  const [foodItems, setFoodItems] = useState<FoodType[] | null>(null);
  const [requiredFoodItems, setRequiredFoodItems] = useState<FoodType[] | null>(
    null
  );

  function getFood() {
    const local = localStorage.getItem("foodItems");
    if (local) {
      setFoodItems(JSON.parse(local));
    } else {
      getFoodItems();
    }
  }

  async function getFoodItems() {
    await axios
      .get("/api/getfoodies", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setFoodItems(res.data);
      })
      .catch((e) => {
        console.error(e);
        throw new Error(e);
      });
  }

  function filterFood() {
    setRequiredFoodItems(
      foodItems!.filter((food) => order.foodIds.includes(food.foodId))
    );
  }

  useEffect(() => {
    getFood();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (foodItems) filterFood();

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [foodItems]);

  return (
    <div className="FoodProgress">
      <div style={prp.progressStyle} className="progress-bar" />
      <div className="FoodProgressHead">
        <h6>#{order.orderId}</h6>
        <p>Roshan Jose</p>
      </div>
      {requiredFoodItems?.map((food) => (
        <FoodItem key={food.foodId} btn={prp.btn} order={order} food={food} />
      ))}
    </div>
  );
};

export default FoodProgress;
