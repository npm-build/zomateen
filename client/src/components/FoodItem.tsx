import AddToCartBtn from "../components/AddToCartButton";
import { useHistory } from "react-router-dom";
import { pageVariants, pageTransition } from "../utils/Animations";
import { motion } from "framer-motion";
import { FoodType } from "../utils/Types";
import "../styles/FoodItem.styles.scss";

const FoodItem: React.FC<{ link: string; data: FoodType }> = ({
  link,
  data,
}) => {
  const history = useHistory();
  return (
    <motion.div
      initial="initial"
      animate="in"
      exit="out"
      variants={pageVariants}
      transition={pageTransition}
      whileHover={{ scale: 1.1 }}
      className="food-item"
    >
      <button onClick={() => history.push(link)}>
        <img
          className="food-item-img"
          src={`http://localhost:8000/${data.filePath}`}
          alt="dosa"
        />
        <div className="text-holder">
          <h5 className="food-item-title">{data.name}</h5>
          <p>
            <span className="food-item-price">Rs&nbsp;{data.price}</span>
            <span className="food-item-rating">4&nbsp;Star</span>
          </p>
        </div>
      </button>
      <AddToCartBtn fdId={data.foodId} />
    </motion.div>
  );
};

export default FoodItem;
