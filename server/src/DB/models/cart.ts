import { Schema, model, Document } from "mongoose";

export interface CartType extends Document {
  foodId: number;
}

export const CartSchema: Schema = new Schema({
  foodId: { type: Number, required: true },
});

export const CartModel = model<CartType>("cart", CartSchema);
