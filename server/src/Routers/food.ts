import express, { Request, Response, NextFunction } from "express";
import { UploadedFile } from "express-fileupload";

import { db } from "../DB/db";
import { authenticateToken } from "../utils/token";
import { FoodModel } from "../DB/models/foodItem";
import { CartModel } from "../DB/models/cart";

export const FoodRouter = express.Router();

FoodRouter.get(
  "/api/getfoodies",
  authenticateToken,
  async (req: Request, res: Response) => {
    const foodies = await FoodModel.find({});
    res.send(foodies);
  }
);

FoodRouter.post(
  "/api/food/getfood",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { foodId } = req.body;
    const food = await FoodModel.findOne({ foodId });
    return res.send(food);
  }
);

FoodRouter.get("/api/food/dropDB", async (req: Request, res: Response) => {
  await db.dropDatabase();
  res.send({ msg: "Db dropped" });
});

FoodRouter.post(
  "/api/food/addtocart",
  authenticateToken,
  async (req: Request, res: Response) => {
    const foodId = req.body.foodId;

    CartModel.updateOne({}, { $push: { foodIds: foodId } }, () => {
      console.log("Food Item Added to cart successfully");
      return res.send({ message: "Food Item Added to cart successfully" });
    });
  }
);

FoodRouter.get(
  "/api/food/cartitems",
  authenticateToken,
  async (req: Request, res: Response) => {
    const foodies = await CartModel.find({});
    console.log(foodies);
    res.send(foodies);
  }
);

FoodRouter.post(
  "/api/food/add",
  authenticateToken,
  authenticateUser,
  async (req: Request, res: Response) => {
    const { name, foodId, tags, price, isAvailable, day } = req.body;

    const jsonTags = JSON.parse(tags);
    console.log(jsonTags);

    if (!req.files) {
      return res.status(400).json({ msg: "No file uploaded" });
    }

    const file: UploadedFile = req.files["filePath"] as UploadedFile;

    console.log("moving");
    file.mv("./uploads/" + file.name, (err) => {
      if (err) {
        console.error(err);
        return res.status(500).send(err);
      }
      console.log("Done moving");
    });

    const filePath = `uploads/${file.name}`;
    await FoodModel.findOne({ name })
      .then(async (food) => {
        if (food?.name == name) {
          return res.send({ message: "Food Item already exists" });
        }
      })
      .catch((e) => {
        console.log(e);
        new Error(e);
        return res.status(401).send({ error: e });
      });

    const foodItem = new FoodModel({
      name,
      foodId,
      tags: jsonTags,
      filePath,
      isAvailable,
      price,
      day,
    });

    await foodItem
      .save()
      .then((resp) => {
        console.log("Food Item Added successfully");
        return res.send({ message: "Food Item Added successfully" });
      })
      .catch((e: Error) => {
        console.log(e);
        return res.status(401).send({ error: e });
      });
  }
);

FoodRouter.patch(
  "/api/food/update",
  authenticateToken,
  authenticateUser,
  async (req: Request, res: Response) => {
    const { foodId, isAvailable } = req.body;
    console.log("Updating...");

    await FoodModel.updateOne({ foodId }, { isAvailable }).then(() =>
      res.send({ msg: "Updated!!!" })
    );
  }
);

FoodRouter.delete(
  "/api/food/delete",
  authenticateToken,
  authenticateUser,
  async (req: Request, res: Response) => {
    const { foodId } = req.body;

    await FoodModel.deleteOne({ foodId })
      .then(() => {
        return res.send({ msg: "Food Item deleted" });
      })
      .catch((e: Error) => {
        console.log(e);
        return res.status(401).send({ error: "Error creating user" });
      });
  }
);

function authenticateUser(req: any, res: Response, next: NextFunction) {
  const user = req.user;
  if (user.usn) {
    console.log("Error authenticating user!!!");
    return res.send("Error authenticating user!!!");
  } else next();
}
