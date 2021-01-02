import { useState, useEffect } from "react";
// import { motion } from "framer-motion";
import Cookies from "js-cookie";
import { Tabs, Tab } from "react-bootstrap";
import FoodItem from "../../components/FoodItem";
import { FoodType } from "../../utils/Types";
import "../../styles/Home.styles.scss";
import axios from "axios";

const HomePage: React.FC = () => {
  const [key, setKey] = useState<string | null>("breakfast");
  const [foods, setFoods] = useState<FoodType[]>();
  const accessToken = Cookies.get("accessToken");

  async function getFood() {
    await axios
      .get("/api/getfoodies", {
        headers: {
          Authorization: "Bearer " + accessToken,
        },
      })
      .then((res) => {
        console.log(res.data);
        setFoods(res.data);
      })
      .catch((e) => {
        console.log(e);
        throw new Error(e);
      });
  }

  useEffect(() => {
    getFood();

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
          {foods?.map((food) => (
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
