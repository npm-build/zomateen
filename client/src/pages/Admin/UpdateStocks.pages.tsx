import { useState, useEffect, FC } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import { Button } from "react-bootstrap";

import { FoodType } from "../../utils/Types";
import "../../styles/StockItem.styles.scss";
import "../../styles/UpdateStocks.styles.scss";

const UpdateStocks: FC = () => {
  const accessToken = Cookies.get("accessToken");
  const [foodItems, setFoodItems] = useState<FoodType[] | null>();

  async function getFoodItems() {
    await axios
      .get("/api/getfoodies", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        setFoodItems(res.data);
        console.log("getting....");
        localStorage.setItem("foodItems", JSON.stringify(res.data));
      })
      .catch((e) => console.error(e));
  }

  async function handleToggle(fdId: number, isAv: string) {
    const item = { foodId: fdId, isAvailable: isAv };
    console.log("Changing!!!");

    const oldItems = [...foodItems!];

    oldItems?.filter((foodItem) => {
      if (foodItem.foodId === fdId)
        return (foodItem.isAvailable =
          foodItem.isAvailable === "true" ? "false" : "true");

      return foodItem;
    });

    localStorage.setItem("foodItems", JSON.stringify(oldItems));
    setFoodItems(oldItems);

    await axios
      .patch("/api/food/update", item, {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((e) => console.error(e));
  }

  useEffect(() => {
    const foodies: string | null = localStorage.getItem("foodItems");

    if (foodies) {
      setFoodItems(JSON.parse(foodies));
    } else {
      getFoodItems();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function filterFoodItem(foodItem: FoodType, gg: boolean) {
    if (gg && foodItem.isAvailable === "true") {
      return (
        <div key={foodItem.foodId} className="stock-item">
          <img
            src={`http://localhost:8000/${foodItem.filePath}`}
            alt="img"
            className="stock-item-img"
          />
          <h4>{foodItem.name}</h4>
          <Button
            onClick={() => handleToggle(foodItem.foodId, foodItem.isAvailable)}
            variant="danger"
          >
            Out of Stock?
          </Button>
        </div>
      );
    } else if (gg === false && foodItem.isAvailable === "false")
      return (
        <div key={foodItem.foodId} className="stock-item">
          <img
            src={`http://localhost:8000/${foodItem.filePath}`}
            alt="img"
            className="stock-item-img"
          />
          <h4>{foodItem.name}</h4>
          <Button
            onClick={() => handleToggle(foodItem.foodId, foodItem.isAvailable)}
            variant="success"
          >
            In Stock?
          </Button>
        </div>
      );
  }

  return (
    <main>
      <div id="search-box">
        <form className="search-bar">
          <button type="submit">
            <i className="fa fa-search" />
          </button>
          <input type="text" placeholder="Search.." name="search" />
        </form>
      </div>
      <div id="stocks">
        <div id="in-stock">
          <h4>In Stock</h4>
          <div className="stock-column">
            {foodItems?.map((foodItem) => filterFoodItem(foodItem, true))}
          </div>
        </div>
        <div id="out-of-stock">
          <h4>Out of Stock</h4>
          <div className="stock-column">
            {foodItems?.map((foodItem) => filterFoodItem(foodItem, false))}
          </div>
        </div>
      </div>
    </main>
  );
};

export default UpdateStocks;
