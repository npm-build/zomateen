import { useState, useEffect } from "react";
import Cookies from "js-cookie";
import { Tabs, Tab } from "react-bootstrap";
import FoodItem from "../../components/FoodItem";
import { FoodType } from "../../utils/Types";
import "../../styles/Home.styles.scss";
import axios from "axios";
// import { motion } from "framer-motion";

const HomePage: React.FC = () => {
  const [key, setKey] = useState<string | null>("breakfast");
  const [foodItems, setFoodItems] = useState<FoodType[]>();
  const accessToken = Cookies.get("accessToken");

  async function getFoodItems() {
    await axios
      .get("/api/getfoodies", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        localStorage.setItem("foodItems", res.data);
        setFoodItems(res.data);
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      });
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

  return (
    <div
    // exit={{ opacity: 0, x: "-100vw", scale: 0.8 }}
    // initial={{ opacity: 0, x: "-100vw", scale: 0.8 }}
    // animate={{ opacity: 1, x: 0, scale: 1 }}
    // transition={{ type: "tween", ease: "anticipate", duration: 1 }}
    >
      <main id="home-content">
        <div id="categories">
          <Tabs activeKey={key} onSelect={(k) => setKey(k)}>
            <Tab eventKey="breakfast" title="Breakfast" />
            <Tab eventKey="lunch" title="Lunch" />
            <Tab eventKey="snacks" title="Snacks" />
          </Tabs>
        </div>

        <div id="menu">
          {foodItems?.map((food) => (
            <FoodItem
              key={food.foodId}
              data={food}
              link={`/user/food/${food.foodId}`}
            />
          ))}
        </div>
      </main>
    </div>
  );
};

export default HomePage;
