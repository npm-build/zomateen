import express, { Request, Response, NextFunction } from "express";

import { OrderModel, OrderType } from "../DB/models/orders";
// import { db } from "../DB/db";
import { authenticateToken } from "../utils/token";
// import { FoodModel, FoodType } from "../DB/models/foodItem";

export const OrderRouter = express.Router();

// OrderRouter.get("/api/food/dropDB", async (req: Request, res: Response) => {
//   await db.dropDatabase();
//   res.send({ msg: "Db dropped" });
// });

OrderRouter.get(
  "/api/order/getorders",
  authenticateToken,
  async (req: Request, res: Response) => {
    const foodies = await OrderModel.find({});
    res.send(foodies);
  }
);

OrderRouter.post(
  "/api/order/add",
  authenticateToken,
  async (req: Request, res: Response) => {
    const { foodIds, customerName, messages } = req.body;

    const OrderItem: OrderType = new OrderModel({
      foodIds,
      customerName,
      messages,
    });

    await OrderItem.save()
      .then(async (resp) => {
        return res.send({ message: "Order successfully placed" });
      })
      .catch((e: Error) => {
        console.log(e);
        return res.status(401).send({ error: "Error placing your order" });
      });
  }
);

OrderRouter.patch(
  "/api/order/update",
  authenticateToken,
  authenticateUser,
  async (req: Request, res: Response) => {
    const { orderId, status, isCompleted } = req.body;
    console.log({ orderId, status, isCompleted });

    await OrderModel.updateOne({ orderId }, { status, isCompleted })
      .then(() => {
        console.log("Updated Order!!!");
        res.send({ message: "Updated Order!!!" });
      })
      .catch((e: Error) => {
        console.error(e);
      });
  }
);

OrderRouter.delete(
  "/api/order/delete",
  authenticateToken,
  authenticateUser,
  async (req: Request, res: Response) => {
    const { orderId } = req.body;
    console.log(orderId);

    await OrderModel.deleteOne({ orderId })
      .then(() => {
        console.log("Order removed");
        return res.send({ message: "Order removed" });
      })
      .catch((e: Error) => {
        console.log(e);
        return res.status(401).send({ error: "Error removing order" });
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
