import React, { useState } from "react";
import axios from "axios";
import Cookie from "js-cookie";
import { Button } from "react-bootstrap";
import "../styles/StockItem.styles.scss";

interface FoodType {
  name: string;
  foodId: number;
  tags: string[];
  price: number;
  isAvailable: string;
  day: string;
  filePath: string;
  reviews: { userName: string; review: string }[];
  addOns: string[];
}

const StockItem: React.FC<{ data: FoodType }> = ({ data }) => {
  const accessToken = Cookie.get("accessToken");
  const [foodItem, setFoodItem] = useState<{
    foodId: number;
    isAvailable: string;
  }>();

  async function handleToggle() {
    setFoodItem({
      foodId: data.foodId,
      isAvailable: data.isAvailable === "true" ? "false" : "true",
    });

    await axios
      .patch("/api/food/update", foodItem, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => console.log(res))
      .catch((e) => console.log(e));
  }

  return (
    <div className="stock-item">
      <img
        src={`http://localhost:8000/${data.filePath}`}
        alt="img"
        className="stock-item-img"
      />
      <h4>{data.name}</h4>
      {data.isAvailable === "true" ? (
        <Button onClick={handleToggle} variant="danger">
          Out of Stock?
        </Button>
      ) : (
        <Button onClick={handleToggle} variant="success">
          In Stock?
        </Button>
      )}
    </div>
  );
};

export default StockItem;
