import { Schema, model, Document } from "mongoose";

export interface OrderType extends Document {
  foodIds: number[];
  customerNames: string[];
  OrderId: number;
  Messages: string;
  isCompleted: boolean;
  dateOfOrder: Date;
}

export const OrderSchema: Schema = new Schema({
  foodIds: [{ type: Number, required: true, unique: true }],
  customerNames: [{ type: String, required: true }],
  OrderId: { type: Number, required: true },
  Messages: String,
  isCompleted: { type: Boolean, required: true },
  dateOfOrder: { type: Date, default: Date() },
});

export const OrderModel = model<OrderType>("admin", OrderSchema);
