import { Schema, model, Document } from "mongoose";
import autoIncrement from "mongoose-auto-increment";

export interface OrderType extends Document {
  foodIds: number[];
  customerNames: string;
  orderId: number;
  messages: string;
  status: string;
  isCompleted: boolean;
  dateOfOrder: Date;
}

export const OrderSchema: Schema = new Schema({
  foodIds: [{ type: Number, required: true }],
  customerName: { type: String, required: true },
  orderId: { type: Number, default: 0 },
  messages: String,
  status: { type: String, default: "Order Placed" },
  isCompleted: { type: Boolean, default: false },
  dateOfOrder: { type: Date, default: Date() },
});

OrderSchema.plugin(autoIncrement.plugin, {
  model: "order",
  field: "orderId",
  startAt: 1,
  incrementBy: 1,
});

export const OrderModel = model<OrderType>("order", OrderSchema);
