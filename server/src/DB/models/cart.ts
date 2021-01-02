import { Schema, model, Document } from "mongoose";

export interface CartType extends Document {
  foodIds: number;
}

export const CartSchema: Schema = new Schema({
  foodIds: [{ type: Number, required: true }],
});

export const CartModel = model<CartType>("cart", CartSchema);
